import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Todo from "./pages/Todo";
import Calendar from "./pages/Calendar";
import Memo from "./pages/Memo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" index element={<Todo />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/memo" element={<Memo />} />
      </Route>
    </Routes>
  );
}

export default App;
