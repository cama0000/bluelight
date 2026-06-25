'use client';

import { usePathname } from "next/navigation";
import MainNavBar from "./components/nav/MainNavBar";
import Footer from "./components/nav/Footer";

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
  