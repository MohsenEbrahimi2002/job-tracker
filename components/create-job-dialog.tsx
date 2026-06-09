import { useState } from "react";
import Button from "./button";
import { Plus } from "lucide-react";
import Input from "./input";

type DialogProps = {
  columnId: string;
  boardId: string;
};

function CreateJobApplicationDialog({ columnId, boardId }: DialogProps) {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <Button variant="ghost" onClick={() => setOpenDialog(true)}>
        <Plus className="h-5 w-5" />
        Add Job
      </Button>
      {openDialog && (
        <div
          onClick={() => setOpenDialog(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-4 overflow-y-auto max-h-[90vh] w-full max-w-md"
          >
            <h2 className=" text-lg font-bold">Add Job Application</h2>
            <form action="">
              <div className="grid grid-cols-2 gap-x-4 w-full">
                <Input id="comp" label="Company *" required/>
                <Input id="pos" label="Position *" required/>
                <Input id="loc" label="Location" />
                <Input
                  id="sal"
                  label="Salary"
                  placeholder="e.g, $100k - $150k"
                />
              </div>
              <div className="w-full">
                <Input id="url" label="Job URL" placeholder="https://" />
                <Input id="tag" label="Tags (comma separated)" placeholder="React, Tailwind, etc" />
                <label htmlFor="des" className="font-semibold mb-1">
                  Description
                </label>
                <textarea
                  id="des"
                  rows={2}
                  className="w-full p-2 border rounded"
                />
                <label htmlFor="note" className="font-semibold">
                  Notes
                </label>
                <textarea
                  id="note"
                  rows={2}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpenDialog(false)}
                  className="h-10 border border-primary"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="h-10">
                  Add Job
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateJobApplicationDialog;
