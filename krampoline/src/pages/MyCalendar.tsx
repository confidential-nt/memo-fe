import { useState, useEffect } from 'react';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { DateTime } from 'luxon';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarDialog from '../components/calendarDialog/CalendarDialog';

const localizer = luxonLocalizer(DateTime);

function readTodosFromLocalStorage() {
  const eventsDataString = localStorage.getItem("eventsData");
  const eventsData = eventsDataString ? JSON.parse(eventsDataString) : [];

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
  const [selectedRange, setSelectedRange] = useState<{ start: Date; end: Date } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedRange({ start, end });
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
            setNewEvent
          }} />
        </>
      }
    </div>
  );
};

export default MyCalendar;

