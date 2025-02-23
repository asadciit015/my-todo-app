import { render, screen, fireEvent } from "@testing-library/react";
import TaskModal from "./TaskModal";
import { useTodoStore } from "../store/useTodoStore";

jest.mock("../store/useTodoStore", () => ({
  useTodoStore: jest.fn(),
}));

describe("TaskModal", () => {
  const mockAddTask = jest.fn();
  const mockEditTask = jest.fn();
  const mockCloseModal = jest.fn();
  const mockIsDuplicateTask = jest.fn();
  const mockShowSnackbar = jest.fn();

  beforeEach(() => {
    (useTodoStore as unknown as jest.Mock).mockImplementation(() => {
      const state = {
        isModalOpen: true,
        modalMode: "add",
        editingTask: null,
        addTask: mockAddTask,
        editTask: mockEditTask,
        closeModal: mockCloseModal,
        isDuplicateTask: mockIsDuplicateTask,
        showSnackbar: mockShowSnackbar,
      };
      return state; 
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal in add mode", () => {
    render(<TaskModal />);
    expect(screen.getByText("Add a New Task")).toBeInTheDocument();
    expect(screen.getByLabelText("Title *")).toBeInTheDocument();
    expect(screen.getByLabelText("Description *")).toBeInTheDocument();
  });


  it("shows validation errors for empty title and description", () => {
    render(<TaskModal />);

    fireEvent.click(screen.getByText("Add Task"));

    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(screen.getByText("Description is required")).toBeInTheDocument();
    expect(mockShowSnackbar).toHaveBeenCalledWith(
      "Correct the errors and try again!",
      "error"
    );
  });

  it("shows validation error for title less than 3 characters", () => {
    render(<TaskModal />);

    fireEvent.change(screen.getByLabelText("Title *"), {
      target: { value: "ab" },
    });
    fireEvent.click(screen.getByText("Add Task"));

    expect(
      screen.getByText("Title must be at least 3 characters")
    ).toBeInTheDocument();
  });

  it("shows validation error for title more than 50 characters", () => {
    render(<TaskModal />);

    const longTitle = "a".repeat(51);
    fireEvent.change(screen.getByLabelText("Title *"), {
      target: { value: longTitle },
    });
    fireEvent.click(screen.getByText("Add Task"));

    expect(
      screen.getByText("Title must be less than 50 characters")
    ).toBeInTheDocument();
  });

  it("shows validation error for duplicate task title", () => {
    mockIsDuplicateTask.mockReturnValue(true);

    render(<TaskModal />);

    fireEvent.change(screen.getByLabelText("Title *"), {
      target: { value: "Duplicate Task" },
    });
    fireEvent.click(screen.getByText("Add Task"));

    expect(
      screen.getByText("Duplicate task name provided")
    ).toBeInTheDocument();
  });

  it("shows validation error for description less than 10 characters", () => {
    render(<TaskModal />);

    fireEvent.change(screen.getByLabelText("Description *"), {
      target: { value: "short" },
    });
    fireEvent.change(screen.getByLabelText("Title *"), {
      target: { value: "Valid Title" },
    });
    fireEvent.click(screen.getByText("Add Task"));

    expect(
      screen.getByText("Description must be at least 10 characters")
    ).toBeInTheDocument();
  });

  it("shows validation error for description more than 500 characters", () => {
    render(<TaskModal />);

    const longDescription = "a".repeat(501);
    fireEvent.change(screen.getByLabelText("Description *"), {
      target: { value: longDescription },
    });
    fireEvent.click(screen.getByText("Add Task"));

    expect(
      screen.getByText("Description must be less than 500 characters")
    ).toBeInTheDocument();
  });

  it("submits the form successfully in add mode", () => {
    mockIsDuplicateTask.mockReturnValue(false);
    render(<TaskModal />);

    fireEvent.change(screen.getByLabelText("Title *"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText("Description *"), {
      target: { value: "This is a new description that meets the minimum length" },
    });
    fireEvent.click(screen.getByText("Add Task"));

    expect(mockAddTask).toHaveBeenCalledWith("New Task", "This is a new description that meets the minimum length");
    expect(mockCloseModal).toHaveBeenCalled();
    expect(mockShowSnackbar).not.toHaveBeenCalled();
  });


  it("closes the modal when cancel button is clicked", () => {
    render(<TaskModal />);

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
