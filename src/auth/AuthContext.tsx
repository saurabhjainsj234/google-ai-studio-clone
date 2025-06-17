import React, { createContext, useContext } from "react";
import { AuthContextType } from "./auth.types";
import { useAuthLogic } from "./useAuthLogic";

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, signIn, signOut } = useAuthLogic();

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
