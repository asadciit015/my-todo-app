import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { useTodoStore } from "../store/useTodoStore";
import TaskDetail from "./TaskDetail";
import React from "react";

const TaskList = () => {
  const { openModal, tasks, reorderTasks, tabValue } = useTodoStore();

  const filteredTasks = React.useMemo(() => {
    switch (tabValue) {
      case "all":
        return tasks;
      case "completed":
        return tasks.filter((task) => task.completed);
      case "incomplete":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tabValue, tasks]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceSection = result.source.droppableId;
    const destinationSection = result.destination.droppableId;

    if (sourceSection !== destinationSection) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  return (
    <Box sx={{ my: 4 }}>
      {filteredTasks.length > 0 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={`${tabValue}-tasks`}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
                          <CardContent>
                            <TaskDetail task={task} />
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <Box sx={{ textAlign: "center", p: 3 }}>
          <CardContent>
            <Typography variant="h6" color="textPrimary">
              No tasks available
            </Typography>
            <Typography color="textSecondary" sx={{ mt: 1 }}>
              {`You have no ${
                tabValue === "all" ? "" : tabValue
              } tasks currently. Stay organized by adding a new task to keep
              track of your work.`}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                aria-label="add"
                onClick={() => openModal("add")}
                startIcon={<AddIcon />}
              >
                Add New Task
              </Button>
            </Box>
          </CardContent>
        </Box>
      )}
    </Box>
  );
};

export default TaskList;
