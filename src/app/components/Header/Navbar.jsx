"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TextAlignJustifyIcon, X } from "lucide-react";
import { toast } from "react-toastify";


// nav bar links
const links = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Affiliate", href: "/affiliate" },
];

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // email state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  // email send handler
  const handleSendEmail = async () => {
    if (!email) {
      toast.error("Please Enter your email!", {
        pauseOnHover: true,
        progress: undefined,
        style: { backgroundColor: "#E6E6FA", color: "#00000069" },
        hideProgressBar: true,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({ type: "download", email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, {
          pauseOnHover: true,
          progress: undefined,
          style: { backgroundColor: "#E6E6FA", color: "#00000069" },
          hideProgressBar: true,
        });
        setEmail("");
      } else {
        toast.error(data.error || "Failed to send email", {
          pauseOnHover: true,
          progress: undefined,
          style: { backgroundColor: "#E6E6FA", color: "#00000069" },
          hideProgressBar: true,
        });
      }
    } catch (err) {
      console.error("Send email error:", err);
      toast.error("Something went wrong!", {
        pauseOnHover: true,
        progress: undefined,
        style: { backgroundColor: "#E6E6FA", color: "#00000069" },
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav className="grid grid-cols-2 lg:grid-cols-3 items-start py-[27px] max-w-[1440px] mx-auto w-11/12">
      
        {/* logo */}
        <div>
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              height={200}
              width={300}
              className="w-[122px] h-[74px]"
              alt="Task mama logo"
            />
          </Link>
        </div>

        {/* nav links for desktop */}
        <div className="lg:flex items-center justify-center hidden">
          <ul className="flex items-center gap-6 md:gap-8 lg:gap-[43px]">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`hover:font-bold duration-300 ${
                    pathname === link.href ? "font-bold" : "font-light"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* download link input or button for desktop */}
        <div className="hidden lg:flex gap-2 items-center justify-end">
          <div className="relative">
            <Image
              src={"/icons/mail.png"}
              height={14}
              width={14}
              alt="Email icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your mail..."
              className="py-[9px] px-4 pl-[35px] focus:outline-primary rounded-xl bg-secondary text-xs font-normal"
            />
          </div>
          <button
            disabled={loading}
            onClick={handleSendEmail}
            className="cursor-pointer py-[9px] px-[30px] rounded-xl bg-primary text-white text-xs border hover:border-primary hover:bg-primary/20 hover:text-primary duration-300"
          >
            {loading ? "App link Sending..." : "Get Download Link"}
          </button>
        </div>

        {/* mobile menu button */}
        <div className="flex items-center justify-end lg:hidden">
          <button
            className="bg-primary p-2 rounded-xl text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <TextAlignJustifyIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* mobile modal */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur bg-opacity-80 z-40 
    transition-opacity duration-300 
    ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"} 
    lg:hidden`}
      />

      {/* modal content */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 p-6 lg:hidden
    transform transition-all duration-300 delay-200
    ${
      menuOpen
        ? "scale-100 opacity-100"
        : "scale-90 opacity-0 pointer-events-none"
    }`}
      >
        {/* close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl border border-primary bg-primary/20 text-white cursor-pointer"
        >
          <X/>
        </button>

        {/* nav links */}
        <ul className="flex flex-col items-center gap-6 text-white text-lg">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`${
                  pathname === link.href ? "font-bold" : "font-light"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* download input + button */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <div className="relative w-full">
            <Image
              src={"/icons/mail.png"}
              height={14}
              width={14}
              alt="Email icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your mail..."
              className="w-full py-[9px] px-4 pl-[35px] focus:outline-primary rounded-xl bg-secondary text-xs font-normal"
            />
          </div>
          <button
            onClick={handleSendEmail}
            disabled={loading}
            className="cursor-pointer py-[9px] px-[30px] rounded-xl bg-primary text-white text-xs w-full"
          >
            {loading ? "App link Sending..." : "Get Download link"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
