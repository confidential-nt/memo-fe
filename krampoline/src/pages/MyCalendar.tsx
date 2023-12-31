import { useState, useEffect } from "react";
import { Calendar, luxonLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarDialog from "../components/calendar/CalendarDialog";
import EditDialog from "../components/calendar/EditDialog";
import useTodo from "../hooks/useTodo";
import { transformData } from "../utils/todo";
// import { useAuthContext } from "../context/AuthContext";

const localizer = luxonLocalizer(DateTime);

function readTodosFromLocalStorage() {
  const eventsDataString = localStorage.getItem("eventsData");
  if (!eventsDataString) {
    return [];
  }

  const eventsData = eventsDataString ? JSON.parse(eventsDataString) : [];
  if (!Array.isArray(eventsData)) {
    return [];
  }

  const modifiedEventsData: Event[] = eventsData.map((data: Event) => ({
    ...data,
    start: new Date(data.start),
    end: new Date(data.end),
  }));

  return modifiedEventsData;
}

export type Event = {
  id: string;
  title: string;
  status: string;
  start: Date;
  end: Date;
};

const MyCalendar = () => {
  const { todoQuery } = useTodo();
  // const { user } = useAuthContext();
  const [events, setEvents] = useState<Event[]>(() =>
    readTodosFromLocalStorage()
  );
  const [newEvent, setNewEvent] = useState<Event | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [selectedRange, setSelectedRange] = useState<{ slots: Date[] } | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(dayjs().toDate());
  const [endTime, setEndTime] = useState<Date | null>(
    dayjs().add(1, "hour").toDate()
  );
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    if (newEvent) {
      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents, newEvent];
        localStorage.setItem("eventsData", JSON.stringify(updatedEvents));
        return updatedEvents;
      });
      setNewEvent(null);
    }
  }, [newEvent]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleSelectSlot = ({ slots }: { slots: Date[] }) => {
    setSelectedRange({ slots });
    handleOpenDialog();
  };

  const handleOnClick = (event: Event) => {
    setSelectedEvent(event);
    setEventTitle(event.title);

    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    const isSameDate = startDate.toDateString() === endDate.toDateString();
    const dateArray = isSameDate ? [startDate] : [startDate, endDate];

    setSelectedRange({ slots: dateArray });

    setStartTime(startDate);
    setEndTime(endDate);

    setOpenEditDialog(true);
  };

  return (
    <div className="h-[30rem]">
      {
        <>
          <Calendar
            localizer={localizer}
            events={[...(transformData(todoQuery.data) as Event[]), ...events]}
            startAccessor="start"
            endAccessor="end"
            views={{
              month: true,
            }}
            formats={{
              monthHeaderFormat: "yyyy-MM-dd",
            }}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleOnClick}
            popup
          />
          <CalendarDialog
            value={{
              eventTitle,
              setEventTitle,
              selectedRange,
              setSelectedRange,
              isDialogOpen,
              setIsDialogOpen,
              events,
              setEvents,
              setNewEvent,

              selectedEvent,

              startTime,
              setStartTime,
              endTime,
              setEndTime,
            }}
          />
          <EditDialog
            value={{
              eventTitle,
              setEventTitle,
              selectedRange,
              setSelectedRange,
              events,
              setEvents,
              setNewEvent,
              selectedEvent,
              startTime,
              setStartTime,
              endTime,
              setEndTime,
              openEditDialog,
              setOpenEditDialog,
            }}
          />
        </>
      }
    </div>
  );
};

export default MyCalendar;
