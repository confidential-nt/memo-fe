import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide, TextField, ThemeProvider, createTheme } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { HiOutlineTrash } from "react-icons/hi";

type Event = {
    id: string;
    title: string;
    status: string;
    start: Date;
    end: Date;
};

type EditDialogProps = {
    value: {
        eventTitle: string;
        setEventTitle: React.Dispatch<React.SetStateAction<string>>;
        selectedRange: { slots: Date[] } | null;
        setSelectedRange: React.Dispatch<React.SetStateAction<{ slots: Date[] } | null>>;
        events: Event[];
        setEvents: React.Dispatch<React.SetStateAction<Event[]>>
        setNewEvent: React.Dispatch<React.SetStateAction<Event | null>>;
        selectedEvent: Event | null;
        startTime: Date | null;
        setStartTime: React.Dispatch<React.SetStateAction<Date | null>>;
        endTime: Date | null;
        setEndTime: React.Dispatch<React.SetStateAction<Date | null>>;
        openEditDialog: boolean;
        setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
    };
};

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        display: 'flex',
                        height: '2rem',
                        border: '2px solid #000',
                        borderRadius: '15px',
                        boxShadow: '4px 4px 0 0',
                        marginTop: '0.8rem',
                        paddingRight: '10rem',
                        paddingLeft: '0.8rem'
                    },
                },
            },
        },
    },
});

const EditDialog: React.FC<EditDialogProps> = ({ value }) => {
    const {
        eventTitle,
        setEventTitle,
        selectedRange,
        setSelectedRange,
        setEvents,
        selectedEvent,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        openEditDialog,
        setOpenEditDialog
    } = value;

    const handleCloseEditDialog = () => {
        setEventTitle('');
        setSelectedRange(null);
        setStartTime(dayjs().toDate());
        setEndTime(dayjs().add(1, 'hour').toDate());
        setOpenEditDialog(false);
    };

    const handleEditSave = () => {
        const updatedEvent = selectedEvent
            ? {
                id: selectedEvent.id,
                title: eventTitle,
                start: startTime,
                end: endTime,
            }
            : undefined;

        const storedEvents = JSON.parse(localStorage.getItem('eventsData') || '[]');
        const updatedEvents = storedEvents.map((event: Event) =>
            event.id === selectedEvent?.id ? updatedEvent : event
        );

        localStorage.setItem('eventsData', JSON.stringify(updatedEvents));

        setEvents(updatedEvents);
        setEventTitle('');
        setSelectedRange(null);
        setStartTime(dayjs().toDate());
        setEndTime(dayjs().add(1, 'hour').toDate());
        handleCloseEditDialog();
    };

    const handleEventDelete = () => {
        if (selectedEvent) {
            const storedEvents = JSON.parse(localStorage.getItem('eventsData') || '[]');
            const updatedEvents = storedEvents.filter((event: Event) => event.id !== selectedEvent.id);
            localStorage.setItem('eventsData', JSON.stringify(updatedEvents));
    
            setEvents((prevEvents) => {
                const updated = prevEvents.filter((event: Event) => event.id !== selectedEvent.id);
                return updated;
            });
            handleCloseEditDialog();
        }
    };
    

    return (
        <Dialog open={openEditDialog} TransitionComponent={Slide} onClose={handleCloseEditDialog} className="w-200 h-300">
            <DialogTitle className="border-b-2 flex justify-between items-center">
                <span className="flex-1">Todo 입력</span>
                <HiOutlineTrash
                    onClick={handleEventDelete}
                    className="w-6 h-6 mx-1 cursor-pointer"
                />
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <ThemeProvider theme={theme}>
                        <div className="flex flex-col md:flex-row mt-2">
                            <h1 className="w-24 h-8 bg-amber-400 border-black border-2 rounded-full flex items-center font-bold justify-center my-2 mr-5 mt-4">Todo</h1>
                            <TextField
                                variant="standard"
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)}
                            />
                        </div>
                    </ThemeProvider>
                    <div className="flex flex-col md:flex-row">
                        <h1 className="w-24 h-8 bg-amber-400 border-black border-2 rounded-full flex items-center font-bold justify-center my-2 mr-3 mt-8">날짜</h1>
                        <p className="flex justify-between items-center sm:w-50 md:w-[23rem] lg:w-[23rem] xl:w-[23rem] h-12 border-black border-2 rounded-[15px] shadow-standard bg-white my-4 pl-3 ml-2 mt-6">
                            {selectedRange?.slots ? (
                                selectedRange.slots.length > 2
                                    ? `${selectedRange.slots[0].toLocaleDateString()} ~ ${selectedRange.slots[selectedRange.slots.length - 1].toLocaleDateString()}`
                                    : selectedRange.slots.map(date => date.toLocaleDateString()).join(' ~ ')
                            ) : ''}
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <h1 className="w-24 h-8 bg-amber-400 border-black border-2 rounded-full flex items-center font-bold justify-center my-2 mr-5 mt-4">시작 시간</h1>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileTimePicker
                                value={dayjs(startTime)}
                                onChange={(newStartTime) => {
                                    if (newStartTime) {
                                        setStartTime(newStartTime.toDate());
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <h1 className="w-24 h-8 bg-amber-400 border-black border-2 rounded-full flex items-center font-bold justify-center my-2 mr-5 mt-4">마감 시간</h1>
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                        >
                            <MobileTimePicker
                                value={dayjs(endTime)}
                                onChange={(newEndTime) => {
                                    if (newEndTime) {
                                        setEndTime(newEndTime.toDate());
                                    }
                                }}
                            />

                        </LocalizationProvider>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions className="border-t-2">
                <Button onClick={handleEditSave}>입력</Button>
                <Button onClick={handleCloseEditDialog}>취소</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDialog;
