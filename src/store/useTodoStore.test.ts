import { act } from "react";
import { useTodoStore } from "./useTodoStore";

describe("useTodoStore", () => {
  beforeEach(() => {
    useTodoStore.setState({ tasks: [] });
  });

  it("adds a task", () => {
    act(() => {
      useTodoStore.getState().addTask("New Task", "New Description");
    });

    expect(useTodoStore.getState().tasks).toHaveLength(1);
    expect(useTodoStore.getState().tasks[0].title).toBe("New Task");
    expect(useTodoStore.getState().tasks[0].description).toBe(
      "New Description"
    );
  });

  it("toggles a task", () => {
    act(() => {
      useTodoStore.getState().addTask("New Task", "New Description");
    });

    const taskId = useTodoStore.getState().tasks[0].id;

    act(() => {
      useTodoStore.getState().toggleTask(taskId);
    });

    expect(useTodoStore.getState().tasks[0].completed).toBe(true);
  });

  it("deletes a task", () => {
    act(() => {
      useTodoStore.getState().addTask("New Task", "New Description");
    });

    const taskId = useTodoStore.getState().tasks[0].id;

    act(() => {
      useTodoStore.getState().deleteTask(taskId);
    });

    expect(useTodoStore.getState().tasks).toHaveLength(0);
  });
});
