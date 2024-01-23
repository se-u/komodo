'use client'
import { SetStateAction, createContext } from "react";
import { Dispatch } from "react";

type contextType = [null, Dispatch<SetStateAction<null | any>>]

const AuthContext = createContext<contextType>([null, () => {}]);
export default AuthContext;