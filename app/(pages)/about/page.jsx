"use client";

import Image from "next/image";
import { Truck, ShieldCheck, Tag, Clock, Headphones, Trophy } from "lucide-react";

export default function About() {
    return (
        <>
            <div className="min-h-screen bg-gray-50 mt-12">
                {/* Hero Section */}
                <section className="relative bg-blue-900 text-white py-44 px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold mb-4">About Phoner.in</h1>
                        <p className="text-lg text-blue-100">Revolutionizing Mobile Spare Parts Retail</p>
                    </div>
                </section>

                {/* About Section */}
                <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                        <Image src="/about.webp" alt="About Phoner.in" fill className="object-cover" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Phoner.in</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Established in 2018, Phoner.in is your one-stop destination for the highest-quality mobile spare parts at unbeatable prices. We source directly to ensure the fastest delivery and reliability.
                        </p>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="bg-white py-16 px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Choose Phoner.in?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[{ icon: Truck, title: "Fast Delivery", text: "Get spare parts quickly across India." },
                        { icon: ShieldCheck, title: "Premium Quality", text: "Each product meets high standards." },
                        { icon: Tag, title: "Best Prices", text: "Direct sourcing ensures affordability." },
                        { icon: Clock, title: "24/7 Support", text: "Assistance anytime you need." },
                        { icon: Headphones, title: "Expert Guidance", text: "Specialist advice on mobile repairs." },
                        { icon: Trophy, title: "Trusted Brand", text: "5+ years of excellence." },
                        ].map((item, index) => (
                            <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
                                <item.icon className="mx-auto text-blue-600" size={40} />
                                <h3 className="text-lg font-semibold mt-4 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="bg-gray-100 py-16 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission & Vision</h2>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
                            Our mission is to redefine the mobile spare parts industry by providing unparalleled quality, affordability, and convenience. We envision a future where spare parts are easily accessible, ensuring seamless mobile repairs for everyone.
                        </p>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16 px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-lg mb-6">Get exclusive offers and latest updates</p>
                    <div className="max-w-md mx-auto flex gap-4">
                        <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-gray-900" />
                        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">Subscribe</button>
                    </div>
                </section>
            </div>
        </>
    );
}
