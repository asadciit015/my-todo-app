import React from "react";
import { Checkbox, Typography, Box, IconButton, Tooltip } from "@mui/material";
import { useTodoStore } from "../store/useTodoStore";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface TaskDetailProps {
  task: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  };
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  const { toggleTask, openDeleteModal, openModal } = useTodoStore();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <Tooltip
          title={`Mark as ${task.completed ? "incomplete" : "completed"}`}
          placement="left-start"
        >
          <Checkbox
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            sx={{ flexShrink: 0 }}
          />
        </Tooltip>

        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography
            variant="body1"
            sx={{
              textDecoration: task.completed ? "line-through" : "none",
              fontWeight: "bold",
              wordWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            {task.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textDecoration: task.completed ? "line-through" : "none",
              wordWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            {task.description}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexShrink: 0,
        }}
      >
        <Tooltip title="Edit Task" placement="top">
          <IconButton color="primary" onClick={() => openModal("edit", task)}>
            <ModeEditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Task" placement="top">
          <IconButton color="error" onClick={() => openDeleteModal(task)}>
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TaskDetail;
