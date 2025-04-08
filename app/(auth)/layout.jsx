"use client"
import { AuthContextProvider } from '@/context/AuthContext';

import Header from '../components/Header';
import Footer from '../components/Footer';

function layout({ children }) {
    return (
        <AuthContextProvider>
            <Header />
            {children}
            <Footer />
        </AuthContextProvider>
    )
}

export default layout