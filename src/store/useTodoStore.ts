import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

interface TodoStore {
  tabValue: "all" | "completed" | "incomplete";
  tasks: Task[];
  isModalOpen: boolean;
  modalMode: "add" | "edit";
  editingTask: Task | null;
  isDeleteModalOpen: boolean;
  taskToDelete: Task | null;
  sortBy: "" | "name-asc" | "name-desc" | "completed-asc" | "completed-desc";
  snackbar: SnackbarState;
  addTask: (title: string, description: string) => void;
  editTask: (id: string, title: string, description: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
  setTabValue: (value: "all" | "completed" | "incomplete") => void;
  openModal: (mode: "add" | "edit", task?: Task) => void;
  closeModal: () => void;
  openDeleteModal: (task: Task) => void;
  closeDeleteModal: () => void;
  setSortBy: (
    sortBy: "name-asc" | "name-desc" | "completed-asc" | "completed-desc"
  ) => void;
  isDuplicateTask: (title: string) => boolean;
  showSnackbar: (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => void;
  closeSnackbar: () => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      tabValue: "all",
      tasks: [],
      isModalOpen: false,
      modalMode: "add",
      editingTask: null,
      isDeleteModalOpen: false,
      taskToDelete: null,
      sortBy: "",
      snackbar: {
        open: false,
        message: "",
        severity: "success",
      },
      addTask: (title, description) =>
        set((state) => {
          const newTask = {
            id: Date.now().toString(),
            title,
            description,
            completed: false,
          };

          return {
            tasks: [...state.tasks, newTask],
            snackbar: {
              open: true,
              message: `Task '${title}' added successfully!`,
              severity: "success",
            },
          };
        }),
      editTask: (id, title, description) =>
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task.id === id ? { ...task, title, description } : task
          );

          const editedTask = state.tasks.find((task) => task.id === id);
          if (editedTask) {
            return {
              tasks: updatedTasks,
              snackbar: {
                open: true,
                message: `Task '${editedTask.title}' updated successfully!`,
                severity: "success",
              },
            };
          }

          return { tasks: updatedTasks };
        }),

      deleteTask: (id) =>
        set((state) => {
          const deletedTask = state.tasks.find((task) => task.id === id);
          if (deletedTask) {
            return {
              tasks: state.tasks.filter((task) => task.id !== id),
              snackbar: {
                open: true,
                message: `Task '${deletedTask.title}' deleted successfully!`,
                severity: "info",
              },
            };
          }

          return { tasks: state.tasks.filter((task) => task.id !== id) };
        }),
      toggleTask: (id) =>
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          );

          const toggledTask = state.tasks.find((task) => task.id === id);
          if (toggledTask) {
            return {
              tasks: updatedTasks,
              snackbar: {
                open: true,
                message: `Task '${toggledTask.title}' is marked as ${
                  toggledTask.completed ? "incomplete" : "completed"
                }`,
                severity: "info",
              },
            };
          }

          return { tasks: updatedTasks };
        }),
      reorderTasks: (startIndex, endIndex) =>
        set((state) => {
          const { tasks, tabValue } = state;

          const filteredTasks = (() => {
            switch (tabValue) {
              case "completed":
                return tasks.filter((task) => task.completed);
              case "incomplete":
                return tasks.filter((task) => !task.completed);
              case "all":
              default:
                return [...tasks];
            }
          })();

          const [removed] = filteredTasks.splice(startIndex, 1);
          filteredTasks.splice(endIndex, 0, removed);

          const filteredTasksMap = new Map(
            filteredTasks.map((task) => [task.id, task])
          );

          const updatedTasks = tasks
            .filter((task) => !filteredTasksMap.has(task.id))
            .concat(filteredTasks);

          return { tasks: updatedTasks };
        }),
      setTabValue: (value) => {
        return set({ tabValue: value });
      },
      openModal: (mode, task) =>
        set({ isModalOpen: true, modalMode: mode, editingTask: task || null }),
      closeModal: () =>
        set({ isModalOpen: false, modalMode: "add", editingTask: null }),
      openDeleteModal: (task) =>
        set({ isDeleteModalOpen: true, taskToDelete: task }),
      closeDeleteModal: () =>
        set({ isDeleteModalOpen: false, taskToDelete: null }),
      setSortBy: (sortBy) =>
        set((state) => ({
          sortBy,
          tasks: sortTasks([...state.tasks], sortBy),
        })),
      isDuplicateTask: (title) => {
        const { tasks, editingTask } = get();
        return tasks.some(
          (task) =>
            task.title.toLowerCase() === title.toLowerCase() &&
            task.id !== editingTask?.id
        );
      },
      showSnackbar: (message, severity) =>
        set({ snackbar: { open: true, message, severity } }),
      closeSnackbar: () =>
        set({ snackbar: { open: false, message: "", severity: "success" } }),
    }),
    {
      name: "todo-storage",
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);

const sortTasks = (
  tasks: Task[],
  sortBy: "" | "name-asc" | "name-desc" | "completed-asc" | "completed-desc"
): Task[] => {
  switch (sortBy) {
    case "name-asc":
      return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return [...tasks].sort((a, b) => b.title.localeCompare(a.title));
    case "completed-asc":
      return [...tasks].sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1
      );
    case "completed-desc":
      return [...tasks].sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? -1 : 1
      );
    default:
      return tasks;
  }
};
