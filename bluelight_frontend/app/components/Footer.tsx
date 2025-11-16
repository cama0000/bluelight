import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
        <h2 className="text-4xl font-extrabold tracking-wide text-transparent bg-clip-text 
          bg-gradient-to-r from-blue-400 to-blue-600 
          drop-shadow-[0_0_12px_rgba(0,150,255,0.35)]">
          bluelight
        </h2>

        <div className="flex items-center gap-6 mt-3">
          <Link href="https://www.linkedin.com/in/cameronarmijo000/" target="_blank">
            <Linkedin className="w-6 h-6 text-zinc-400 hover:text-blue-400 transition" />
          </Link>

          <Link href="https://x.com" target="_blank">
            <Twitter className="w-6 h-6 text-zinc-400 hover:text-blue-400 transition" />
          </Link>

          <Link href="https://instagram.com" target="_blank">
            <Instagram className="w-6 h-6 text-zinc-400 hover:text-blue-400 transition" />
          </Link>

          <Link href="https://github.com/cama0000" target="_blank">
            <Github className="w-6 h-6 text-zinc-400 hover:text-blue-400 transition" />
          </Link>
        </div>

        <div className="w-full h-px bg-zinc-800 my-6" />

        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <Link 
            href="/terms" 
            className="hover:text-blue-400 hover:underline transition"
          >
            Terms of Service
          </Link>

          <span>•</span>

          <Link 
            href="/privacy" 
            className="hover:text-blue-400 hover:underline transition"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-zinc-600 mt-4">
          © {new Date().getFullYear()} Bluelight. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
