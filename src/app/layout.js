import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import FinalCtaSection from "@/components/cta/finalCtaSection";
import Footer from "@/components/common/footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BUS MANTRA - Your Group. Your Bus. Your Journey.",
  description: "Bus Mantra - Your group, your bus, your journey.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <FinalCtaSection />
        <Footer />
      </body>
    </html>
  );
}
