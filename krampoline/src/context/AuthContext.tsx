import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { decodeToken, getToken } from "../utils/token";
import {
  AuthContextProps,
  AuthStateChangeType,
  AuthenticatedUser,
} from "../types/Auth.types";

const AuthContext = createContext<AuthContextProps>({
  onAuthStateChange: (_: AuthStateChangeType) => {},
  user: undefined,
  isInitializing: true,
});

type Props = {
  children: React.ReactElement;
};

export default function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<undefined | AuthenticatedUser | null>();
  const [isInitializing, setIsInitializing] = useState(true);

  const initialize = () => {
    const token = getToken("token");
    const decodedUser = token && decodeToken(token);

    if (token && decodedUser) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      setUser(decodedUser);
    }
  };

  useEffect(() => {
    initialize();
    setIsInitializing(false);
  }, []);

  const onAuthStateChange = (type: AuthStateChangeType) => {
    if (type === "login") {
      initialize();
      return;
    }
    setUser(undefined);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        onAuthStateChange,
        user,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
