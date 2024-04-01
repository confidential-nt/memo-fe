import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Task from "../Task";
import { TodoItem } from "../../../types/Todo.types";

const TODO_TITLE = "할일 목록 항목";

const todo = {
  id: 1,
  title: TODO_TITLE,
  status: "active",
  start: new Date("2024-03-01"),
  end: new Date("2024-03-15"),
} as TodoItem;

describe("Task Test", () => {
  const onDelete = vi.fn();
  const onUpdate = vi.fn();

  afterEach(() => {
    onDelete.mockReset();
    onUpdate.mockReset();
  });

  it("스냅샷 테스트", () => {
    const { asFragment } = renderTask();
    expect(asFragment()).toMatchSnapshot();
  });

  it("할 일이 표시되어야한다", () => {
    renderTask();
    expect(screen.getByText(TODO_TITLE)).toBeInTheDocument();
  });

  it("수정중일때는 수정중일때의 UI가 보여야한다", async () => {
    renderTask();
    await userEvent.click(screen.getByLabelText("수정 버튼"));
    expect(screen.getByDisplayValue(TODO_TITLE)).toBeInTheDocument();
  });

  it("삭제 버튼을 누르면 onDelete 콜백이 호출되어야 한다", async () => {
    renderTask();
    await userEvent.click(screen.getByLabelText("삭제 버튼"));
    expect(onDelete).toBeCalledTimes(1);
  });

  it("체크 박스에 체크하면 onUpdate 콜백이 호출되어야 한다", async () => {
    renderTask();
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onUpdate).toBeCalledTimes(1);
  });

  it("체크 박스에 체크하면 할 일의 status가 'active'에서 'completed'로 바뀌어야한다", async () => {
    renderTask();
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onUpdate).toBeCalledWith({ ...todo, status: "completed" });
  });

  it("할 일의 이름을 수정하면 해당 수정사항이 반영되어야한다", async () => {
    const text = " - 완료";
    renderTask();
    await userEvent.click(screen.getByLabelText("수정 버튼"));
    const input = screen.getByDisplayValue(TODO_TITLE);
    await userEvent.type(input, `${text}{enter}`);
    expect(onUpdate).toBeCalledWith({ ...todo, title: TODO_TITLE + text });
  });

  function renderTask() {
    return render(<Task todo={todo} onDelete={onDelete} onUpdate={onUpdate} />);
  }
});
