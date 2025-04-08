"use client"; // Ensure this is a Client Component

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export default function ClientProviders({ children }) {
  return (
    <>
      <Toaster />
      <NextUIProvider>{children}</NextUIProvider>
    </>
  );
}
