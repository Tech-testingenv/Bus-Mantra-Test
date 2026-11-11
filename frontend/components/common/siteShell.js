"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

export default function SiteShell({ children }) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}

      <div className="flex-1">
        {children}
      </div>

      {!isLoginPage && <Footer />}
    </>
  );
}