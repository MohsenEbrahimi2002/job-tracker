"use client";
import { Column, JobApplication } from "@/lib/models/models.type";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import DropDownMenu from "./dropdown";
import { useState } from "react";
import { useClickOutside } from "@/lib/utils";

type JobApplicationCardProps = {
  job: JobApplication;
  columns: Column[];
};

function JobApplicationCard({ job, columns }: JobApplicationCardProps) {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const dropdown = useClickOutside(() => setOpenDropDownMenu(false));
  return (
    <>
      <div className="relative cursor-pointer mx-auto my-4 rounded w-[94%] transition-shadow hover:shadow-lg bg-white group shadow-sm">
        <div className="p-3">
          <div className=" flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1 ">{job.position}</h3>
              <p className="text-xs mb-2 text-muted-foreground">
                {job.company}
              </p>
              {job.description && (
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {job.description}
                </p>
              )}
              {job.tags && job.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {job.tags.map((tag, key) => (
                    <span
                      key={key}
                      className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {job.jobUrl && (
                <a
                  href={job.jobUrl}
                  target="_blank"
                  onClick={(e) => e.stopPropagation}
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
            <div ref={dropdown}>
              <button
                onClick={() => setOpenDropDownMenu((prev) => !prev)}
                className="h-6 w-6 cursor-pointer"
              >
                <MoreVertical />
              </button>
              {openDropDownMenu && (
                <DropDownMenu>
                  <span className="flex items-center  rounded px-2 hover:bg-slate-100/60">
                    <Edit2 size={16} className="mr-2 h-4 w-4" /> Edit
                  </span>
                  {columns.length > 1 && (
                    <>
                      {columns
                        .filter((c) => c._id !== job.columnId)
                        .map((col) => (
                          <button
                            key={col._id}
                            className="text-left rounded px-2 hover:bg-slate-100/60"
                          >
                            Move to {col.name}
                          </button>
                        ))}
                    </>
                  )}
                  <span className="flex items-center rounded px-2 hover:bg-slate-100/60">
                    <Trash2 size={16} className="mr-2 h-4 w-4" /> Delete
                  </span>
                </DropDownMenu>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobApplicationCard;
