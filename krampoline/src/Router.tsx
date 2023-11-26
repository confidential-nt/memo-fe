import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Todo from "./pages/Todo";
import MyCalendar from "./pages/MyCalendar";
import Memo from "./pages/Memo";
import Login from "./pages/Login";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" index element={<Todo />} />
        {/* <Route path="/" element={<Navigate to="/today" replace />} /> */}
        <Route path="/today" element={<Todo />} />
        <Route path="/openApi/kakao" element={<Login />}></Route>
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/memo" element={<Memo />} />
      </Route>
    </Routes>
  );
}
