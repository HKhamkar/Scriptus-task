"use client";

import React, { useEffect } from "react";
import Pusher from "pusher-js";
import { useDispatch } from "react-redux";
import { moveTask } from "../lib/features/kabanBoard/kanbanBoardSlice";

export const PusherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
      }
    );

    const channel = pusher.subscribe("kanban-board");
    channel.bind("task-moved", (data: any) => {
      console.log("Received Pusher data:", data);
      dispatch(moveTask({ taskId: data.taskId, newStatus: data.newStatus }));
    });

    return () => {
      pusher.unsubscribe("kanban-board");
    };
  }, [dispatch]);

  return <>{children}</>;
};
