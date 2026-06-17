"use client";

import { Board, Column, JobApplication } from "@/lib/models/models.type";
import {
  Award,
  Calendar,
  CheckCircle2,
  Mic,
  Trash2,
  XCircle,
} from "lucide-react";
import CreateJobApplicationDialog from "./create-job-dialog";
import JobApplicationCard from "./job-application-card";
import {
  closestCorners,
  DndContext,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type KanbanBoardProps = {
  board: Board;
  userId: string;
};
interface ColConfig {
  color: string;
  icon: React.ReactNode;
}
const COLUMN_CONFIG: Array<ColConfig> = [
  {
    color: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="h-4 w-4" />,
  },
];

function DroppableColumn({
  column,
  config,
  boardId,
  sortedColumns,
}: {
  column: Column;
  config: ColConfig;
  boardId: string;
  sortedColumns: Column[];
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column._id,
    data: {
      type: "column",
      columnId: column._id,
    },
  });
  const sortedJobs =
    column.jobApplications.sort((a, b) => a.order - b.order) || [];

  console.log(
    column.name,
    column.jobApplications.map((j) => ({
      id: j._id,
      position: j.position,
    })),
  );
  return (
    <div className="w-full min-w-75 p-0 shadow-md shrink-0 my-4">
      <div className={`${config.color} p-4 rounded-t-lg pb-3`}>
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            {config.icon}
            <span className="font-semibold text-nowrap">{column.name}</span>
          </div>

          <Trash2 className="h-5 w-5" />
        </div>
      </div>
      {/* Card Content */}
      <div
        ref={setNodeRef}
        className={`space-y-2 py-4 bg-gray-50/50 min-h-100 rounded-b-lg ${isOver ? "ring-2 ring-blue-500" : ""}`}
      >
        <SortableContext
          items={sortedJobs.map((job) => job._id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedJobs.map((job, key) => (
            <SortableJobCard
              key={key}
              job={{ ...job, columnId: job.columnId || column._id }}
              columns={sortedColumns}
            />
          ))}
        </SortableContext>

        <CreateJobApplicationDialog boardId={boardId} columnId={column._id} />
      </div>
    </div>
  );
}

function SortableJobCard({
  job,
  columns,
}: {
  job: JobApplication;
  columns: Column[];
}) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({
    id: job._id,
    data: {
      type: "job",
      job,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging? 0.5 : 1
  }
  return (
    <div ref={setNodeRef}>
      <JobApplicationCard job={job} columns={columns} />
    </div>
  );
}
function KanbanBoard({ board, userId }: KanbanBoardProps) {
  const columns = board.columns;
  const sortedColumns = columns?.sort((a, b) => a.order - b.order) || [];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  async function handleDragStart() {}

  async function handleDragEnd() {}

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div>
        <div>
          {columns.map((col, key) => {
            const config = COLUMN_CONFIG[key] || {
              color: "bg-gray-500",
              icon: <Calendar className="h-4 w-4" />,
            };
            return (
              <DroppableColumn
                key={key}
                column={col}
                config={config}
                boardId={board._id}
                sortedColumns={sortedColumns}
              />
            );
          })}
        </div>
      </div>
    </DndContext>
  );
}

export default KanbanBoard;
