import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import CalendarDialog from "../CalendarDialog";

describe("Calendar Dialog Test", () => {
  test("스냅샷 테스트", () => {
    const { asFragment } = renderCalendarDialog();
    expect(asFragment()).toMatchSnapshot();
  });

  function renderCalendarDialog() {
    return render(
      <CalendarDialog
        value={{
          eventTitle: "",
          setEventTitle: () => {}, // Replace with the actual implementation
          selectedRange: null,
          setSelectedRange: () => {}, // Replace with the actual implementation
          isDialogOpen: true,
          setIsDialogOpen: () => {}, // Replace with the actual implementation
          events: [], // Replace with actual Event array if available
          setEvents: () => {}, // Replace with the actual implementation
          setNewEvent: () => {}, // Replace with the actual implementation
          selectedEvent: null,
          startTime: null,
          setStartTime: () => {}, // Replace with the actual implementation
          endTime: null,
          setEndTime: () => {}, // Replace with the actual implementation
        }}
      />
    );
  }
});
