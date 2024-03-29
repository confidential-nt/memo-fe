import "./App.css";
import AuthContextProvider from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Router";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <Router />
          </AuthContextProvider>
        </QueryClientProvider>
      </UserContextProvider>
    </RecoilRoot>
  );
}

export default App;
