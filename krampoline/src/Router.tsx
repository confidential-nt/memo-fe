import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Todo from "./pages/Todo";
import Memo from "./pages/Memo";
import Login from "./pages/Login";
import { Suspense, lazy } from "react";

const MyCalendar = lazy(() => import("./pages/MyCalendar"));

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/today" replace />} />
        <Route path="/today" index element={<Todo />} />
        <Route path="/openApi/kakao" element={<Login />}></Route>
        <Route
          path="/calendar"
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <MyCalendar />
            </Suspense>
          }
        />
        <Route path="/memo" element={<Memo />} />
      </Route>
    </Routes>
  );
}
