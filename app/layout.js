// app/layout.js or app/layout.tsx
import { Geist, Geist_Mono, Jost } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClientProviders from "./ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-jost",
});

// ✅ Update metadata
export const metadata = {
  title: "E Commerce Website",
  description: "Created By Intellij Technologies",
  icons: {
    icon: "/favicon.png", // ✅ PNG favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jost.variable}>
      <body className="font-jost antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
