"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Paper, Box } from "@mui/material";
import DraggableTask from "./components/KanbanBoard/DraggableTask";
import TaskDialog from "./components/KanbanBoard/TaskDialog";
import Grid from "@mui/material/Grid2";
import DroppableColumn from "./components/KanbanBoard/DroppableColumn";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  editTask,
  moveTask,
} from "@/lib/features/kabanBoard/kanbanBoardSlice";
import DrawerAppBar from "./components/Nav";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
}

const statuses = ["todo", "inprogress", "done"] as const;

const KanbanBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.kanban.tasks);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    dispatch(
      moveTask({
        taskId: active.id,
        newStatus: over.id as "todo" | "inprogress" | "done",
      })
    );

    try {
      const response = await fetch("/api/trigger-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: active.id,
          newStatus: over.id as "todo" | "inprogress" | "done",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to trigger Pusher event.");
      }
    } catch (error) {
      console.error("Error triggering Pusher event:", error);
    }

    setActiveTask(null);
  };

  const handleAddTask = (status: string) => {
    setCurrentTask({ id: "", title: "", description: "", status } as Task);
    setIsDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask({ ...task });
    setIsDialogOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentTask(null);
  };

  const handleDialogSubmit = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    if (currentTask?.id) {
      const task = tasks
        .map((task) =>
          task.id === currentTask.id ? { ...task, title, description } : task
        )
        .find((item) => item.id === currentTask.id);

      dispatch(editTask(task));
    } else {
      const newTask = {
        id: Math.random().toString(),
        title,
        description,
        status: "todo",
      };
      dispatch(addTask(newTask));
    }

    handleDialogClose();
  };

  return (
    <>
      <DrawerAppBar />
      <Box
        sx={{
          display: "inline-block",
          width: "100%",
          mt: "60px",
          minHeight: "calc(100vh - 68px)",
        }}
      >
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={(event) => {
            const activeTask = tasks.find(
              (task) => task.id === event.active.id
            );
            setActiveTask(activeTask || null);
          }}
          onDragEnd={handleDragEnd}
        >
          <Grid container spacing={2} sx={{ m: 2 }}>
            {statuses.map((status) => (
              <Grid size={4} key={status}>
                <DroppableColumn status={status} handleAddTask={handleAddTask}>
                  <SortableContext
                    items={tasks
                      .filter((task) => task.status === status)
                      .map((task) => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task) => (
                        <DraggableTask
                          key={task.id}
                          task={task}
                          onEdit={() => handleEditTask(task)}
                          onDelete={() => handleDeleteTask(task.id)}
                        />
                      ))}
                  </SortableContext>
                </DroppableColumn>
              </Grid>
            ))}
          </Grid>

          <DragOverlay>
            {activeTask ? (
              <Paper
                style={{
                  padding: "8px",
                  backgroundColor: "lightblue",
                  cursor: "grabbing",
                }}
              >
                {activeTask.title}
              </Paper>
            ) : null}
          </DragOverlay>

          <TaskDialog
            open={isDialogOpen}
            onClose={handleDialogClose}
            onSubmit={handleDialogSubmit}
            initialData={currentTask || { title: "", description: "" }}
          />
        </DndContext>
      </Box>
    </>
  );
};

export default KanbanBoard;
