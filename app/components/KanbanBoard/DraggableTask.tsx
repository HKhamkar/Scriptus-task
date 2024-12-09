import { useDraggable } from "@dnd-kit/core";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

const DraggableTask = ({
  task,
  onEdit,
  onDelete,
}: {
  task: any;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
  });

  return (
    <Paper
      ref={setNodeRef}
      {...attributes}
      sx={{
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: "white",
        cursor: "grab",
      }}
    >
      <Grid container spacing={2}>
        <Grid size={10}>
          <Stack>
            <Typography variant="subtitle1" {...listeners}>
              {task.title}
            </Typography>
            <Typography variant="body2">{task.description}</Typography>
          </Stack>
        </Grid>
        <Grid size={2}>
          <Box display="flex">
            <IconButton
              aria-label="Edit"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <BorderColorIcon sx={{ fontSize: "18px" }} />
            </IconButton>

            <IconButton
              aria-label="Delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <DeleteIcon sx={{ fontSize: "18px", color: "#ed4c4c" }} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DraggableTask;
