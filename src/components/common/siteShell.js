"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/common/navbar";
import FinalCtaSection from "@/components/cta/finalCtaSection";
import Footer from "@/components/common/footer";

export default function SiteShell({ children }) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <>
      {!isLoginPage && !isAdminPage && <Navbar />}

      <main className="flex-1">
        {children}
      </main>

      {!isLoginPage && !isAdminPage && <FinalCtaSection />}
      {!isLoginPage && !isAdminPage && <Footer />}
    </>
  );
}