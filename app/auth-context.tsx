"use client";
import { SetStateAction, createContext, Dispatch, useState } from "react";

type contextType = [null, Dispatch<SetStateAction<null | any>>];

// export const AuthContext = createContext<>(null);
export const AuthContext = createContext<contextType>([null, () => {}]);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const authContext = useState(null);
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
