import { Geist, Geist_Mono, Jost } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClientProviders from "./ClientProviders"; // Import ClientProviders

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
  weight: ["400", "500", "700"], // Add weights you need
  display: "swap",
  variable: "--font-jost",
});

export const metadata = {
  title: "E Commarce Website",
  description: "Created By Intellij Technologies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jost.variable}>
      <body className={`font-jost antialiased`}>
        <ClientProviders>{children}</ClientProviders>{" "}
        {/* Uses the Client Component */}
      </body>
    </html>
  );
}
