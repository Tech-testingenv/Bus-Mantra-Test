import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SiteShell from "@/components/common/siteShell";

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
  icons: {
    icon: "/icon-bus-mantra.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-10">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}