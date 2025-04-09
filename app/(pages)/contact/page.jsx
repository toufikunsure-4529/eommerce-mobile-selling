"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Mail, Phone, User, MessageCircle, Send } from "lucide-react";

export default function ContactUs() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log("Form Data:", data);
            toast.success("Thanks for contacting us!");
            reset();
        } catch (error) {
            console.error(error.message);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <section className="max-w-8xl bg-gray-100 py-14 px-4 md:px-8 lg:px-20 " id="contact">
            <div className="mx-auto">
                <h2 className="text-5xl font-bold text-center text-grat-900 mb-6">Contact Us</h2>
                <p className="text-center text-gray-600 mb-10">
                    Any question or remarks? Just write us a message!                </p>
            </div>
            <div className=" px-6 py-8 md:px-20 mx-auto bg-white rounded mb-10 shadow-sm border border-gray-200">


                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Info & Map */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-green-100 p-4 rounded-lg">
                            <Phone className="text-green-600" size={24} />
                            <p className="text-gray-700">+123 456 7890</p>
                        </div>
                        <div className="flex items-center gap-4 bg-yellow-100 p-4 rounded-lg">
                            <Mail className="text-yellow-600" size={24} />
                            <p className="text-gray-700">contact@example.com</p>
                        </div>

                    </div>

                    {/* Contact Form */}
                    <div>
                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative">
                                <User className="absolute top-3 left-4 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Your Name"
                                    className="w-full bg-gray-100 text-gray-800 pl-12 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 border border-gray-300"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>

                            <div className="relative">
                                <Mail className="absolute top-3 left-4 text-gray-500" size={20} />
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    placeholder="Your Email"
                                    className="w-full bg-gray-100 text-gray-800 pl-12 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 border border-gray-300"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            <div className="relative">
                                <Phone className="absolute top-3 left-4 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    {...register("phone", { required: "Phone is required" })}
                                    placeholder="Your Phone"
                                    className="w-full bg-gray-100 text-gray-800 pl-12 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 border border-gray-300"
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                            </div>

                            <div className="relative">
                                <MessageCircle className="absolute top-3 left-4 text-gray-500" size={20} />
                                <textarea
                                    {...register("message", { required: "Message is required" })}
                                    rows="4"
                                    placeholder="Your Message"
                                    className="w-full bg-gray-100 text-gray-800 pl-12 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 border border-gray-300"
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                            >
                                {isSubmitting ? "Submitting..." : "Send Message"}
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </div>


            </div>
            <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
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