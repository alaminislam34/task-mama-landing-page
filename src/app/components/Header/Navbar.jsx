// components/Navbar.jsx
"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; 
import { toast } from "react-toastify";
import { useAuth } from "@/context/SessionProvider";
import LoadingSpinner from "../Loading";

const links = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Products", href: "/products" },
];

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); 
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null); 

  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);

  // Close dropdown/sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close User Dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      // Close Mobile Sidebar
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]); // Dependency on menuOpen is good practice here

  // Email send handler (unchanged)
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

    setLoadingEmail(true);

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
      setLoadingEmail(false);
    }
  };
  
  // Logout handler (unchanged)
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/signin";
  };

  // User Dropdown Component (Reusable function for both desktop and mobile)
  const UserAuthSection = () => (
    <div className="flex items-center justify-end">
      {loading ? (
        <LoadingSpinner />
      ) : user ? (
        <div ref={dropdownRef} className="flex items-center gap-2 relative">
          <Image
            onClick={() => setShowDropdown(!showDropdown)}
            src={user.image || "/default-avatar.png"}
            alt="user"
            width={32}
            height={32}
            className="rounded-full cursor-pointer ring-2 ring-primary p-0.5" 
          />
          {showDropdown && (
            <div className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-2xl p-4 z-50 border border-gray-100 space-y-3 transition duration-300">
              <p className="text-sm text-gray-500">Hello,</p>
              <p className="text-sm font-bold text-gray-800 truncate">
                {user.name || user.email.split('@')[0]}
              </p>
              <Link
                href={"/coursepanel"}
                className="text-primary hover:text-primary/80 transition block text-sm font-medium pt-1"
                onClick={() => setShowDropdown(false)}
              >
                My Courses
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-sm mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          href={"/signin"}
          className="py-[9px] px-[18px] rounded-xl bg-primary text-white text-xs border border-primary hover:bg-primary/90 duration-300 font-semibold"
        >
          Login
        </Link>
      )}
    </div>
  );

  return (
    <div>
      {/* FIX: Use grid-cols-3 for desktop to ensure center column (links) 
        is truly centered, regardless of the width of the actions column.
      */}
      <nav className="grid grid-cols-2 lg:grid-cols-3 items-center py-[20px] max-w-[1440px] mx-auto w-11/12">
        {/* COL 1: Logo (Left Aligned) */}
        <div className="flex items-center justify-start">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              height={74}
              width={122}
              className="w-[122px] h-auto"
              alt="Task mama logo"
            />
          </Link>
        </div>

        {/* COL 2: Desktop Nav Links (CENTER ALIGNED) */}
        <div className="hidden lg:flex items-center justify-center">
          <ul className="flex items-center gap-[43px]">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm hover:text-primary transition duration-300 ${
                    pathname === link.href ? "font-bold text-primary" : "font-medium text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 3: Right Side (Download & User Auth) */}
        <div className="flex items-center justify-end gap-2">
          {/* Download Input Section (Desktop only) */}
          <div className="hidden lg:flex items-center gap-2">
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
                className="py-[9px] px-4 pl-[35px] focus:ring-2 focus:ring-primary focus:outline-none rounded-xl bg-secondary text-xs font-normal w-52"
              />
            </div>
            <button
              disabled={loadingEmail}
              onClick={handleSendEmail}
              className="py-[9px] px-[20px] rounded-xl bg-primary cursor-pointer text-white text-xs border border-primary hover:bg-primary/90 duration-300 font-semibold disabled:opacity-50"
            >
              {loadingEmail ? "Sending..." : "Get Download Link"}
            </button>
          </div>
          
          {/* User Auth (All devices - hidden on desktop by UserAuthSection's flex/justify-end) */}
          <div className="hidden lg:block">
            <UserAuthSection />
          </div>
          
          {/* Mobile/Tablet Controls */}
          <div className="flex items-center lg:hidden gap-3">
            {/* User Auth (Mobile/Tablet) */}
            <UserAuthSection /> 

            {/* Mobile Menu Button */}
            <button
                className="bg-primary p-2 rounded-xl text-white cursor-pointer transition hover:bg-primary/90"
                onClick={() => setMenuOpen(true)}
                aria-label="Toggle navigation menu"
            >
                <Menu size={24} /> 
            </button>
          </div>
        </div>
      </nav>

      {/* ------------------------------------------------------------------- */}
      {/* MOBILE SIDEBAR (Drawer) */}
      {/* ------------------------------------------------------------------- */}
      <div 
        className={`fixed top-0 left-0 h-full w-full lg:hidden z-40 transition-opacity duration-300 ${
            menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: menuOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}
        onClick={() => setMenuOpen(false)} 
      >
        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl p-6 transform transition-transform duration-300 ease-in-out z-50 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header and Close Button */}
          <div className="flex justify-between items-center mb-10 border-b pb-4">
            <Link href={"/"} onClick={() => setMenuOpen(false)}>
                <Image
                    src={"/logo.png"}
                    height={74}
                    width={122}
                    className="w-[100px] h-auto"
                    alt="Task mama logo"
                />
            </Link>
            <button
              className="text-gray-600 hover:text-primary transition"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <ul className="flex flex-col gap-5 text-lg font-semibold mb-10">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2 hover:text-primary transition ${
                    pathname === link.href ? "text-primary border-r-4 border-primary" : "text-gray-700"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Download Input Section (Mobile) */}
          <div className="mt-8 pt-4 border-t border-gray-200">
             <h4 className="text-md font-bold mb-3 text-gray-800">Get the App Link</h4>
            <div className="relative mb-3">
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
                className="w-full py-3 px-4 pl-[35px] focus:ring-2 focus:ring-primary focus:outline-none rounded-xl bg-secondary text-sm font-normal"
              />
            </div>
            <button
              disabled={loadingEmail}
              onClick={handleSendEmail}
              className="w-full py-3 px-4 rounded-xl bg-primary text-white text-sm border border-primary hover:bg-primary/90 duration-300 font-semibold disabled:opacity-50"
            >
              {loadingEmail ? "Sending..." : "Get Download Link"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Navbar;