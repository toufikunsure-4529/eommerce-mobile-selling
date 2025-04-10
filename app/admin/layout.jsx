"use client"

import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AdminHeader from './components/Header';
import AdminLayout from './components/AdminLayout';
import { AuthContextProvider, useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';

function Layout({ children }) {
    return (
        <AuthContextProvider>
            <AdminChecking>{children}</AdminChecking>
        </AuthContextProvider>
    );
}

export default Layout;


function AdminChecking({ children }) {
    const { user, isLoading } = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (!user && !isLoading) {
            router.push("/login")
        }
    }, [user, isLoading])




    if (isLoading) {
        return (
            <div className="md:h-screen w-full flex flex-col justify-center items-center bg-gray-100">
                <CircularProgress size={50} thickness={4} color="primary" />
                <p className="mt-4 text-gray-600 font-medium">Checking authentication...</p>
            </div>
        );
    }


    if (!user) {
        return <div className='h-screen w-screen flex justify-center items-center'>
            <h3 className='text-xl font-bold'>Please Login Frist Access Admin Dashboard</h3>
        </div>
    }

    return <AdminLayout>
        {children}
    </AdminLayout>
}
