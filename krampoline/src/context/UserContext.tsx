import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { initMemoStore } from "../service/database/api";

export const LOCALSTORAGE_KEY = "UID";

export interface UserContextProps {
  tempUserId?: string;
}

export const UserContext = createContext<UserContextProps>({
  tempUserId: undefined,
});

type Props = {
  children: React.ReactElement;
};

export function UserContextProvider({ children }: Props) {
  const [tempUserId, setTempUserId] = useState<string>();

  useEffect(() => {
    let tempUserId = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!tempUserId) {
      tempUserId = uuid();
      localStorage.setItem(LOCALSTORAGE_KEY, tempUserId);
    }
    initMemoStore(tempUserId);
    setTempUserId(tempUserId);
  }, []);
  return (
    <UserContext.Provider
      value={{
        tempUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
  return useContext(UserContext);
}
