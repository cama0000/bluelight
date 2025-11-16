'use client';

import { usePathname } from "next/navigation";
import MainNavBar from "./components/MainNavBar";
import Footer from "./components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = pathname !== "/" && pathname !== "/register";

  return (
    <>
        {showNav && (
            <MainNavBar />
        )}

      <main>{children}</main>

      <Footer/>
    </>
  );
}
  