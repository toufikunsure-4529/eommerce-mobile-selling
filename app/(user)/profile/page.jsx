"use client";

import React, { useState } from "react";
import toast from 'react-hot-toast';


function Page() {
    const [displayName, setDisplayName] = useState("James Henrick");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePhoto(URL.createObjectURL(file));
        }
    };

    const handleUpdate = () => {
        setTimeout(() => {
            setSuccessMessage("Profile updated successfully!");
            toast.success("Profile updated successfully!");

            setTimeout(() => setSuccessMessage(""), 3000);
        }, 1000);
    };

    const handleClear = () => {
        setDisplayName("");
        setEmail("");
        setMobileNumber("");
        setProfilePhoto(null);
        setSuccessMessage("");
    };

    const handleLogout = () => {
        setTimeout(() => {
            toast.success("Logout successfully!");
        }, 500);
    };


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-2xl border border-gray-200">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Edit profile</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center">
                        <img
                            src={profilePhoto || "/profile.png"}
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover mb-3 border-2 border-gray-300"
                        />
                        <label className="cursor-pointer bg-gray-100 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-200 transition duration-200">
                            Upload
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                            />
                        </label>
                        <p className="text-sm text-gray-600 mt-1">Profile photo</p>
                    </div>
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-6 text-gray-800">Account info</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">DISPLAY NAME</label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">EMAIL</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">MOBILE NUMBER</label>
                                <input
                                    type="tel"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {successMessage && (
                    <p className="text-green-600 text-center mt-6">{successMessage}</p>
                )}
                <div className="flex justify-between mt-8">
                    <button
                        className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition duration-200"
                        onClick={handleClear}
                    >
                        Clear all
                    </button>
                    <button
                        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                </div>
                <button
                    className="mt-4 bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition duration-200 flex items-center"
                    onClick={handleLogout}
                >
                    <span className="mr-2">🔓</span> Log Out
                </button>
            </div>
        </div>
    );
}

export default Page;