"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/common/navbar";
import FinalCtaSection from "@/components/cta/finalCtaSection";
import Footer from "@/components/common/footer";

export default function SiteShell({ children }) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}

      <main className="flex-1">
        {children}
      </main>

      {!isLoginPage && <FinalCtaSection />}
      {!isLoginPage && <Footer />}
    </>
  );
}