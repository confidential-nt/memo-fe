import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import './timePicker.css'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Slide,
    TextField,
    ThemeProvider,
    createTheme
} from '@mui/material';

type Event = {
    id: number;
    content: string;
    status: string;
    startDate: Date;
    endDate: Date;
};

type CalendarDialogProps = {
    value: {
        eventTitle: string;
        setEventTitle: React.Dispatch<React.SetStateAction<string>>;
        selectedRange: {
            start: Date;
            end: Date;
        } | null;
        setSelectedRange: React.Dispatch<React.SetStateAction<{ start: Date; end: Date } | null>>;
        isDialogOpen: boolean;
        setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
        events: Event[];
        setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
    };
};

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        display: 'flex',
                        height: '2rem', // 12 / 4 = 3 (1rem = 4px)
                        border: '2px solid #000',
                        borderRadius: '15px',
                        boxShadow: '4px 4px 0 0',
                        marginTop: '0.8rem', // 4 / 4 = 1 (1rem = 4px)
                        paddingRight: '10rem',
                        paddingLeft: '0.8rem'
                    },
                },
            },
        },
    },
});


const CalendarDialog: React.FC<CalendarDialogProps> = ({ value }) => {
    const {
        eventTitle,
        setEventTitle,
        selectedRange,
        setSelectedRange,
        isDialogOpen,
        setIsDialogOpen,
        events,
        setEvents,
    } = value;

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleEventSave = () => {
        if (eventTitle && selectedRange) {
            const event: Event = {
                id: events.length + 1,
                content: eventTitle,
                status: '진행중',
                startDate: selectedRange.start,
                endDate: selectedRange.end,
            };
            setEvents([...events, event]);
            setEventTitle('');
            setSelectedRange(null);
            handleCloseDialog();
        }
    };

    return (
        <Dialog open={isDialogOpen} TransitionComponent={Slide} onClose={handleCloseDialog} className="w-200 h-300">
            <DialogTitle className="border-b-2">Todo 입력</DialogTitle>
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
                            <p className="flex justify-between items-center w-30 h-12 border-black border-2 rounded-[15px] shadow-standard bg-white my-4 pl-3">{selectedRange?.start?.toLocaleDateString()} ~ {selectedRange?.end?.toLocaleDateString()}</p>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <h1 className="w-24 h-8 bg-amber-400 border-black border-2 rounded-full flex items-center font-bold justify-center my-2 mr-3 mt-8">시작 시간</h1>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileTimePicker
                                    defaultValue={dayjs('2022-04-17T15:30')}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <h1 className="w-24 h-8 bg-amber-400 border-black border-2 rounded-full flex items-center font-bold justify-center my-2 mr-3 mt-8">마감 시간</h1>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileTimePicker
                                    defaultValue={dayjs('2022-04-17T15:30')}
                                />
                            </LocalizationProvider>
                        </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions className="border-t-2">
                <Button onClick={handleEventSave}>입력</Button>
                <Button onClick={handleCloseDialog}>취소</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CalendarDialog