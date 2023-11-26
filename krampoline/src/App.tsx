import "./App.css";
import AuthContextProvider from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Router";

const queryClient = new QueryClient();

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
