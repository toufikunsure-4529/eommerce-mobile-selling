"use client";

import Image from "next/image";
import { Truck, ShieldCheck, Tag, Clock, Headphones, Trophy } from "lucide-react";
import AboutHero from "./components/AboutHero";
import MissionVision from "./components/MissionVison";

export default function About() {
    return (
        <>
            <main className=" min-h-screen">
                <AboutHero />
                <MissionVision />
            </main>
        </>
    );
}
