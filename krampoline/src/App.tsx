import "./App.css";
import { UserContextProvider } from "./context/UserContext";
import Router from "./Router";

function App() {
  return (
    <UserContextProvider>
      <Router />
    </UserContextProvider>
  );
}

export default App;
