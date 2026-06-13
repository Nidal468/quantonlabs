"use client";

import { UserDocument } from "@/model/user";
import { createContext, useContext } from "react";

interface UserContextType {
  user: UserDocument | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const UserProvider = ({
  value,
  children,
}: {
  value: UserContextType;
  children: React.ReactNode;
}) => <UserContext.Provider value={value}>{children}</UserContext.Provider>;

export default UserProvider;