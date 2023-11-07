import { useState, useEffect } from 'react';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { DateTime } from 'luxon';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarDialog from '../components/calendarDialog/CalendarDialog';

const localizer = luxonLocalizer(DateTime);

type Event = {
  id: number;
  content: string;
  status: string,
  startDate: Date;
  endDate: Date;
};

const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [selectedRange, setSelectedRange] = useState<{ start: Date; end: Date } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // JSON 파일 로드 및 파싱
    fetch(`data/todos.json`) // JSON 파일 경로에 따라 수정
      .then((res) => res.json())
      .then((data) => {
        // JSON 데이터를 Event 데이터로 변환
        const eventList = data.map((item: Event) => ({
          id: item.id,
          title: item.content,
          status: item.status,
          start: new Date(item.startDate),
          end: new Date(item.endDate),
        }));
        setEvents(eventList);
      });
  }, [events]);

  const handleOpenDialog = () => {
      setIsDialogOpen(true);
    };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedRange({ start, end });
    handleOpenDialog();

    if (newEvent) {
      setEvents([...events, newEvent]);
      setNewEvent(null);
    }
  };


  return (
    <div className="h-[30rem]">
      <Calendar
        localizer={localizer}
        events={events}
        // startAccessor="start"
        // endAccessor="end"
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
      }}/>
    </div>
  );
};

export default MyCalendar;

