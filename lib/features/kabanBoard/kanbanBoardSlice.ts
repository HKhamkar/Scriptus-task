import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
}

interface KanbanState {
  tasks: Task[];
}

const initialState: KanbanState = {
  tasks: [
    { id: "1", title: "Task 1", description: "Description 1", status: "todo" },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      status: "inprogress",
    },
    { id: "3", title: "Task 3", description: "Description 3", status: "done" },
  ],
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    moveTask: (
      state,
      action: PayloadAction<{
        taskId: any;
        newStatus: "todo" | "inprogress" | "done";
      }>
    ) => {
      const { taskId, newStatus } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
    },
    addTask: (state, action: PayloadAction<any>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<any>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              title: action.payload.title,
              description: action.payload.description,
            }
          : task
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { moveTask, addTask, editTask, deleteTask, setTasks } =
  kanbanSlice.actions;
export default kanbanSlice.reducer;
