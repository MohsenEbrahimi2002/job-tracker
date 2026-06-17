"use client";
import { Column, JobApplication } from "@/lib/models/models.type";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import DropDownMenu from "./dropdown";
import React, { FormEvent, useState } from "react";
import { useClickOutside } from "@/lib/utils";
import {
  deleteJobApplication,
  updateJobApplication,
} from "@/lib/actions/job-applications";
import Input from "./input";
import Button from "./button";

type JobApplicationCardProps = {
  job: JobApplication;
  columns: Column[];
  dragHandleProps?: React.HTMLAttributes<HTMLElement>;
};

function JobApplicationCard({
  job,
  columns,
  dragHandleProps,
}: JobApplicationCardProps) {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [formData, setFormData] = useState({
    company: job.company,
    position: job.position,
    location: job.location || "",
    notes: job.notes || "",
    salary: job.salary || "",
    jobUrl: job.jobUrl || "",
    columnId: job.columnId || "",
    tags: job.tags?.join(", ") || "",
    description: job.description || "",
  });

  const dropdown = useClickOutside(() => setOpenDropDownMenu(false));

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await updateJobApplication(job._id, {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });
      if (!result.error) {
        setOpenEditDialog(false);
      }
    } catch (error) {
      console.error("Failed to move job application", error);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteJobApplication(job._id);
      if (result.error) {
        console.error("Failed to delete job application", result.error);
      }
    } catch (error) {
      console.error("Failed to move job application", error);
    }
  };

  const handleMove = async (newColumnId: string) => {
    try {
      const result = await updateJobApplication(job._id, {
        columnId: newColumnId,
      });
    } catch (error) {
      console.error("Failed to move job application", error);
    }
  };
  return (
    <>
      <div
        {...dragHandleProps}
        className="relative cursor-pointer mx-auto my-4 rounded w-[94%] transition-shadow hover:shadow-lg bg-white group shadow-sm"
      >
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
                  <span
                    onClick={() => {
                      setOpenDropDownMenu(false);
                      setOpenEditDialog(!openEditDialog);
                    }}
                    className="flex items-center  rounded px-2 hover:bg-slate-100/60"
                  >
                    <Edit2 size={16} className="mr-2 h-4 w-4" /> Edit
                  </span>
                  {columns.length > 1 && (
                    <>
                      {columns
                        .filter((c) => c._id !== job.columnId)
                        .map((col) => (
                          <button
                            key={col._id}
                            onClick={() => {
                              setOpenDropDownMenu(false);
                              handleMove(col._id);
                            }}
                            className="text-left rounded px-2 hover:bg-slate-100/60"
                          >
                            Move to {col.name}
                          </button>
                        ))}
                    </>
                  )}
                  <span
                    onClick={() => {
                      setOpenDropDownMenu(false);
                      handleDelete();
                    }}
                    className="flex items-center rounded px-2 hover:bg-slate-100/60"
                  >
                    <Trash2 size={16} className="mr-2 h-4 w-4" /> Delete
                  </span>
                </DropDownMenu>
              )}
            </div>
          </div>
        </div>
      </div>
      {openEditDialog && (
        <div
          onClick={() => setOpenEditDialog(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-4 overflow-y-auto max-h-[90vh] w-full max-w-md"
          >
            <h2 className="text-lg font-bold">Add Job Application</h2>
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-2 gap-x-4 w-full">
                <Input
                  id="comp"
                  label="Company *"
                  required
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
                <Input
                  id="pos"
                  label="Position *"
                  required
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                />
                <Input
                  id="loc"
                  label="Location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
                <Input
                  id="sal"
                  label="Salary"
                  placeholder="e.g, $100k - $150k"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  id="url"
                  label="Job URL"
                  placeholder="https://"
                  value={formData.jobUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, jobUrl: e.target.value })
                  }
                />
                <Input
                  id="tag"
                  label="Tags (comma separated)"
                  placeholder="React, Tailwind, etc"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                />
                <label htmlFor="des" className="font-semibold mb-1">
                  Description
                </label>
                <textarea
                  id="des"
                  rows={2}
                  className="w-full p-2 border rounded"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <label htmlFor="note" className="font-semibold">
                  Notes
                </label>
                <textarea
                  id="note"
                  rows={2}
                  className="w-full p-2 border rounded"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpenEditDialog(false)}
                  className="h-10 border border-primary"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="h-10">
                  Save changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default JobApplicationCard;
