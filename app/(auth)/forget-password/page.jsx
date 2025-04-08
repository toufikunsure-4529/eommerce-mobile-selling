'use client';

import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Button } from '@nextui-org/react';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleResetPassword = async (data) => {
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, data.email);
            toast.success('Password reset email sent! Check your inbox.');
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex h-screen bg-gray-100 justify-center items-center px-3 md:px-0">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-black mb-6 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit(handleResetPassword)}>
                    <div>
                        <label className="block text-sm font-medium text-black">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <Button
                        type="submit"
                        isDisabled={isLoading}
                        className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition shadow-md mt-4 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                    >
                        Send Reset Email
                        {isLoading && <CircularProgress size={20} thickness={7} color="primary" />}
                    </Button>
                </form>
                <div className="text-sm text-black text-center mt-4">
                    <Link href="/login" className="hover:underline">Back to Login</Link>
                </div>
            </div>
        </div>
    );
}
