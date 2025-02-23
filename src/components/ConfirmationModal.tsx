import React from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import { useTodoStore } from "../store/useTodoStore";

const ConfirmationModal: React.FC = () => {
  const { isDeleteModalOpen, taskToDelete, deleteTask, closeDeleteModal } =
    useTodoStore();

  const handleDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      closeDeleteModal();
    }
  };

  return (
    <Modal open={isDeleteModalOpen} onClose={closeDeleteModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Delete Task
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Are you sure you want to delete this task?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={closeDeleteModal}>Cancel</Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
