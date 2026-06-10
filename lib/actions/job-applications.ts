"use server";

import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Board, Column, JobApplication } from "../models";

interface JobApplicationData {
  company: string;
  position: string;
  location?: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  columnId: string;
  boardId: string;
  tags?: string[];
  description?: string;
}

export const createJobApplication = async (data: JobApplicationData) => {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await connectDB();
  const {
    boardId,
    columnId,
    company,
    position,
    description,
    jobUrl,
    location,
    notes,
    salary,
    tags,
  } = data;

  if (!boardId || !columnId || !company || !position) {
    return { err: "Missing fields required" };
  }

  // Verify board ownership
  const board = Board.findOne({
    _id: boardId,
    userId: session.user.id,
  });
  if (!board) {
    return { Error: "Board not found" };
  }

  // Verify columns belong to board
  const column = Column.findOne({
    _id: columnId,
    boardId: boardId,
  });

  if (!column) {
    return { error: "Column not found" };
  }
  const maxOrder = (await JobApplication.findOne({ columnId })
    .sort({ order: -1 })
    .select("order")
    .lean()) as { order: number } | null;

  const jobApplication = await JobApplication.create({
    company,
    position,
    location,
    notes,
    salary,
    jobUrl,
    columnId,
    boardId,
    userId: session.user.id,
    tags: tags || [],
    description,
    status: "applied",
    order: maxOrder ? maxOrder.order + 1 : 0,
  });
  await Column.findByIdAndUpdate(columnId, {
    $push: { jobApplications: jobApplication._id },
  });

//   revalidatePath("/dashboard");

  return { data: JSON.parse(JSON.stringify(jobApplication)) };
};
