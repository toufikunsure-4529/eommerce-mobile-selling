"use client";

import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import Link from "next/link";

export default function AdminButton() {
    const { user } = useAuth();
    const email = user?.email || ""; // Ensure a stable argument for useAdmin

    // Always call the hook at the top level
    const { data, isLoading } = useAdmin({ email });

    // Handle loading state or no admin access
    if (isLoading || !data) return null;

    return (
        <Link href="/admin">
            <button className="text-xs font-semibold">Admin</button>
        </Link>
    );
}
