import { useDroppable } from "@dnd-kit/core";
import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

const DroppableColumn = ({
  status,
  handleAddTask,
  children,
}: {
  status: string;
  handleAddTask: (status: string) => void;
  children: React.ReactNode;
}) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        padding: "10px",
        minHeight: "calc(100vh - 68px)",
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: "16px", textTransform: "capitalize" }}
      >
        {status}
      </Typography>

      <Box
        sx={{
          display: "inline-block",
          width: "100%",
          minHeight: "calc(100vh - 208px)",
        }}
      >
        {children}
      </Box>

      <Button
        variant="contained"
        onClick={() => handleAddTask(status)}
        sx={{ marginTop: "10px", width: "100%", gap: 1 }}
      >
        <AddIcon />
        Add Card
      </Button>
    </Paper>
  );
};

export default DroppableColumn;
