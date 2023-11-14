// import React from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide, TextField, ThemeProvider, createTheme } from '@mui/material';
// import dayjs from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

// type Event = {
//     id: number;
//     title: string;
//     status: string;
//     start: Date;
//     end: Date;
// };

// type EditDialogProps = {
//     value: {
//         eventTitle: string;
//         setEventTitle: React.Dispatch<React.SetStateAction<string>>;
//         selectedRange: { slots: Date[] } | null;
//         setSelectedRange: React.Dispatch<React.SetStateAction<{ slots: Date[] } | null>>;
//         isDialogOpen: boolean;
//         setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
//         events: Event[];
//         setEvents: React.Dispatch<React.SetStateAction<Event[]>>
//         setNewEvent: React.Dispatch<React.SetStateAction<Event | null>>;
//         selectedEvent: Event | null;
//         startTime: Date | null;
//         setStartTime: React.Dispatch<React.SetStateAction<Date | null>>;
//         endTime: Date | null;
//         setEndTime: React.Dispatch<React.SetStateAction<Date | null>>;
//     };
// };

// const theme = createTheme({
//     components: {
//         MuiTextField: {
//             styleOverrides: {
//                 root: {
//                     '& .MuiInputBase-input': {
//                         display: 'flex',
//                         height: '2rem',
//                         border: '2px solid #000',
//                         borderRadius: '15px',
//                         boxShadow: '4px 4px 0 0',
//                         marginTop: '0.8rem',
//                         paddingRight: '10rem',
//                         paddingLeft: '0.8rem'
//                     },
//                 },
//             },
//         },
//     },
// });

// const EditDialog: React.FC<EditDialogProps> = ({ value }) => {
//     const {
//         eventTitle,
//         setEventTitle,
//         selectedRange,
//         setSelectedRange,
//         isDialogOpen,
//         setIsDialogOpen,
//         events,
//         setEvents,
//         setNewEvent,
//         selectedEvent,
//         startTime,
//         setStartTime,
//         endTime,
//         setEndTime
//     } = value;

//     const handleSave = () => {
//         // Your save logic here
//         onClose();
//     };

//     return (
//         <Dialog open={isDialogOpen} TransitionComponent={Slide} onClose={handleCloseDialog} className="w-200 h-300">
//             <DialogTitle className="border-b-2">Todo 입력</DialogTitle>
//             <DialogContent>
//                 <DialogContentText>
//                     <ThemeProvider theme={theme}>
//                         <div className="flex flex-col md:flex-row mt-2">
//                             <h1 className="w-24 h-8 bg-amber-400 border-black border-2 rounded-full flex items-center font-bold justify-center my-2 mr-5 mt-4">Todo</h1>
//                             <TextField
//                                 variant="standard"
//                                 InputProps={{
//                                     disableUnderline: true,
//                                 }}
//                                 value={eventTitle}
//                                 onChange={(e) => setEventTitle(e.target.value)}
//                             />
//                         </div>
//                     </ThemeProvider>
//                     <div className="flex flex-col md:flex-row">
//                         <h1 className="w-24 h-8 bg-amber-400 border-black border-2 rounded-full flex items-center font-bold justify-center my-2 mr-3 mt-8">날짜</h1>
//                         <p className="flex justify-between items-center sm:w-50 md:w-[23rem] lg:w-[23rem] xl:w-[23rem] h-12 border-black border-2 rounded-[15px] shadow-standard bg-white my-4 pl-3 ml-2 mt-6">
//                             {selectedRange?.slots ? (
//                                 selectedRange.slots.length > 2
//                                     ? `${selectedRange.slots[0].toLocaleDateString()} ~ ${selectedRange.slots[selectedRange.slots.length - 1].toLocaleDateString()}`
//                                     : selectedRange.slots.map(date => date.toLocaleDateString()).join(' ~ ')
//                             ) : ''}
//                         </p>
//                     </div>
//                     <div className="flex flex-col md:flex-row">
//                         <h1 className="w-24 h-8 bg-amber-400 border-black border-2 rounded-full flex items-center font-bold justify-center my-2 mr-5 mt-4">시작 시간</h1>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <MobileTimePicker
//                                 value={dayjs(startTime)}
//                                 onChange={(newStartTime) => {
//                                     if (newStartTime) {
//                                         setStartTime(newStartTime.toDate());
//                                     }
//                                 }}
//                             />
//                         </LocalizationProvider>
//                     </div>
//                     <div className="flex flex-col md:flex-row">
//                         <h1 className="w-24 h-8 bg-amber-400 border-black border-2 rounded-full flex items-center font-bold justify-center my-2 mr-5 mt-4">마감 시간</h1>
//                         <LocalizationProvider
//                             dateAdapter={AdapterDayjs}
//                         >
//                             <MobileTimePicker
//                                 value={dayjs(endTime)}
//                                 onChange={(newEndTime) => {
//                                     if (newEndTime) {
//                                         setEndTime(newEndTime.toDate());
//                                     }
//                                 }}
//                             />

//                         </LocalizationProvider>
//                     </div>
//                 </DialogContentText>
//             </DialogContent>
//             <DialogActions className="border-t-2">
//                 <Button onClick={handleEventSave}>입력</Button>
//                 <Button onClick={handleCloseDialog}>취소</Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default EditDialog;
