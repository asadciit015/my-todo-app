import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, TextField, Button } from "@mui/material";
import { useTodoStore } from "../store/useTodoStore";

interface FormErrors {
  [key: string]: string;
}

const TaskModal: React.FC = () => {
  const {
    isModalOpen,
    modalMode,
    editingTask,
    addTask,
    editTask,
    closeModal,
    isDuplicateTask,
    showSnackbar,
  } = useTodoStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<FormErrors>({});

  useEffect(() => {
    if (modalMode === "edit" && editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
    setError({});
  }, [isModalOpen, modalMode, editingTask]);

  const validateForm = () => {
    const validationErrors: FormErrors = {};

    if (!title.trim()) {
      validationErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      validationErrors.title = "Title must be at least 3 characters";
    } else if (title.trim().length > 50) {
      validationErrors.title = "Title must be less than 50 characters";
    } else if (isDuplicateTask(title.trim())) {
      validationErrors.title = "Duplicate task name provided";
    }

    if (!description.trim()) {
      validationErrors.description = "Description is required";
    } else if (description.trim().length < 10) {
      validationErrors.description =
        "Description must be at least 10 characters";
    } else if (description.trim().length > 500) {
      validationErrors.description =
        "Description must be less than 500 characters";
    }

    setError(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      showSnackbar("Correct the errors and try again!", "error");
      return;
    }

    if (modalMode === "add") addTask(title, description);
    else if (modalMode === "edit" && editingTask)
      editTask(editingTask.id, title, description);

    closeModal();
  };

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {modalMode === "add" ? "Add a New Task" : "Edit Task"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Title *"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError({
                ...error,
                title: "",
              });
            }}
            fullWidth
            margin="normal"
            error={!!error.title}
            helperText={error.title || ""}
          />
          <TextField
            label="Description *"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError({
                ...error,
                description: "",
              });
            }}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!error.description}
            helperText={error.description || ""}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={closeModal} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="outlined">
              {modalMode === "add" ? "Add Task" : "Save Changes"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
