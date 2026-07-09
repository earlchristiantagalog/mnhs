"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AUTH_PATHS = ["/login", "/forgot-password"];
const PORTAL_PREFIXES = ["/registrar", "/ict", "/library", "/teachers", "/students"];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = AUTH_PATHS.includes(pathname);
  const isPortal = PORTAL_PREFIXES.some((p) => pathname.startsWith(p));

  if (isAuth || isPortal) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
