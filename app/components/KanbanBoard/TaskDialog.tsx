import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: { title: string; description: string }) => void;
  initialData?: { title: string; description: string };
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData = { title: "", description: "" },
}) => {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);

  useEffect(() => {
    if (open) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [open, initialData]);

  const handleSave = () => {
    onSubmit({ title, description });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData.title ? "Edit Task" : "Add Task"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
