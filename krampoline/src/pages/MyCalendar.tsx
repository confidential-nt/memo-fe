import { useState, useEffect } from 'react';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { DateTime } from 'luxon';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarDialog from '../components/calendar/CalendarDialog';

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

type Event = {
  id: number;
  title: string;
  status: string,
  start: Date;
  end: Date;
};

const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>(() => readTodosFromLocalStorage());
  const [newEvent, setNewEvent] = useState<Event | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [selectedRange, setSelectedRange] = useState<{ slots: Date[] } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(dayjs().toDate());
  const [endTime, setEndTime] = useState<Date | null>(dayjs().add(1, 'hour').toDate());

  useEffect(() => {
    if (newEvent) {
      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents, newEvent];
        localStorage.setItem('eventsData', JSON.stringify(updatedEvents));
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

  return (
    <div className="h-[30rem]">
      {
        <>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={{
              month: true,
            }}
            formats={{
              monthHeaderFormat: 'yyyy-MM-dd',
            }}
            selectable
            onSelectSlot={handleSelectSlot}
            popup
          />
          <CalendarDialog value={{
            eventTitle,
            setEventTitle,
            selectedRange,
            setSelectedRange,
            isDialogOpen,
            setIsDialogOpen,
            events,
            setEvents,
            setNewEvent,
            startTime,
            setStartTime,
            endTime,
            setEndTime
          }} />
        </>
      }
    </div>
  );
};

export default MyCalendar;

