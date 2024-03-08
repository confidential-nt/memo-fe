import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Task from "../Task";

describe("Task Test", () => {
  it("스냅샷 테스트", () => {
    const { asFragment } = renderTask();
    expect(asFragment()).toMatchSnapshot();
  });

  it("할 일이 표시되어야한다", () => {
    renderTask();
    expect(screen.getByText("할일 목록 항목")).toBeInTheDocument();
  });

  it("수정중일때는 수정중일때의 UI가 보여야한다", async () => {
    renderTask();
    await userEvent.click(screen.getByLabelText("수정 버튼"));
    expect(screen.getByDisplayValue("할일 목록 항목")).toBeInTheDocument();
  });

  function renderTask() {
    // 나중에 swr의 renderConfig를 베껴보는건?
    return render(
      <Task
        todo={{
          id: 1,
          title: "할일 목록 항목",
          status: "active",
          start: new Date("2024-03-01"),
          end: new Date("2024-03-15"),
        }}
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    );
  }
});
