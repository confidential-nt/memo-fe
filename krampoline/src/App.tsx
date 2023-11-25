import "./App.css";
import AuthContextProvider from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
import Router from "./Router";

function App() {
  return (
    <UserContextProvider>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </UserContextProvider>
  );
}

export default App;
