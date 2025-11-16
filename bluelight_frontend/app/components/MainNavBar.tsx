"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { useRouter } from "next/navigation";

const MainNavBar = () => {
    const {user, authLogout} = useAuth();
    const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Profile", href: "/profile" },
    { name: "Questions", href: "/questions" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Community", href: "/community" },
  ];

  async function handleLogout(){

    try{
      await authLogout();

      router.push("/");
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              bluelight
            </span>
          </Link>

          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "relative text-sm font-medium transition-all duration-200 tracking-wide",
                      isActive
                        ? "text-blue-400"
                        : "text-zinc-400 hover:text-blue-300"
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeLink"
                        className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end w-[160px]">
            {user && (
                <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-semibold rounded-xl
                            bg-blue-300 text-white shadow-lg 
                            hover:bg-blue-400 transition-all duration-200 
                            hover:shadow-blue-500/30 hover:cursor-pointer"
                >
                Logout
                </motion.button>
            )}
        </div>



        </div>
      </div>
    </nav>
  );
};

export default MainNavBar;