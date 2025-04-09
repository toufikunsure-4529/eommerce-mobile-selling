"use client";

import { useForm } from "react-hook-form";

export default function ContactUs() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    return (
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            </div>
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex flex-col lg:flex-row mb-10">
                {/* Left */}
                <div
                    className="text-white p-8 w-full lg:w-1/3 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/contact-bg.png)' }}
                >                    <h3 className="text-xl font-bold mb-2">Contact Information</h3>
                    <p className="mb-6">Say something to start a live chat!</p>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-center gap-2">
                            <span>📞</span> +1012 3456 789
                        </li>
                        <li className="flex items-center gap-2">
                            <span>📧</span> demo@gmail.com
                        </li>
                        <li className="flex items-start gap-2">
                            <span>📍</span>
                            132 Dartmouth Street Boston, Massachusetts 02156 United States
                        </li>
                    </ul>
                </div>

                {/* Right */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full lg:w-2/3 p-8 space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                {...register("firstName", { required: "First name is required" })}
                                className="w-full border-b border-gray-400 focus:outline-none focus:border-red-500 py-1"
                            />
                            {errors.firstName && (
                                <p className="text-red-600 text-sm">{errors.firstName.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                {...register("lastName", { required: "Last name is required" })}
                                className="w-full border-b border-gray-400 focus:outline-none focus:border-red-500 py-1"
                            />
                            {errors.lastName && (
                                <p className="text-red-600 text-sm">{errors.lastName.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                                className="w-full border-b border-gray-400 focus:outline-none focus:border-red-500 py-1"
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9\s+-]+$/,
                                        message: "Invalid phone number",
                                    },
                                })}
                                className="w-full border-b border-gray-400 focus:outline-none focus:border-red-500 py-1"
                            />
                            {errors.phone && (
                                <p className="text-red-600 text-sm">{errors.phone.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Message</label>
                        <textarea
                            {...register("message", { required: "Message is required" })}
                            rows="4"
                            placeholder="Write your message.."
                            className="w-full border-b border-gray-400 focus:outline-none focus:border-red-500 py-1"
                        />
                        {errors.message && (
                            <p className="text-red-600 text-sm">{errors.message.message}</p>
                        )}
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-red-600 text-white font-medium px-6 py-2 rounded hover:bg-red-700 transition"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
            <div className="max-w-5xl mx-auto h-[500px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                    width="100%"
                    height="100%"
                    className="rounded-lg"
                    src="https://maps.google.com/maps?q=kolkata&output=embed"
                    style={{ filter: "grayscale(0) contrast(1.2) opacity(100%)" }}
                ></iframe>
            </div>
        </section>
    );
}
