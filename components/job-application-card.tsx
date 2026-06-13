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
      <div className="border-8">
        <div>
          <div className="relative">
            <div>
              <h3>{job.position}</h3>
              <p>{job.company}</p>
              {job.description && <p>{job.description}</p>}
              {job.tags && job.tags.length > 0 && (
                <div>
                  {job.tags.map((tag, key) => (
                    <span key={key}>{tag}</span>
                  ))}
                </div>
              )}
              {job.jobUrl && (
                <a
                  href={job.jobUrl}
                  target="_blank"
                  onClick={(e) => e.stopPropagation}
                >
                  <ExternalLink />
                </a>
              )}
            </div>
            <div ref={dropdown}>
              <button
                onClick={() => setOpenDropDownMenu((prev) => !prev)}
                className="h-8 w-8 cursor-pointer flex justify-between items-center"
              >
                <MoreVertical />
              </button>
              {openDropDownMenu && (
                <DropDownMenu>
                  <span className="flex items-center gap-2">
                    <Edit2 size={16} /> Edit
                  </span>
                  {columns.length > 1 && (
                    <>
                      {columns
                        .filter((c) => c._id !== job.columnId)
                        .map((col) => (
                          <button key={col._id} className="text-left">
                            Move to {col.name}
                          </button>
                        ))}
                    </>
                  )}
                  <span className="flex items-center gap-2">
                    <Trash2 size={16} /> Delete
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
