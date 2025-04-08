"use client"
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'


const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(undefined)
    useEffect(() => {
        //firebase method check simutinaltly user login or not
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })

        return () => unsub() // Cleanup function
    }, [])
    return <AuthContext.Provider value={{ user, isLoading: user === undefined }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)