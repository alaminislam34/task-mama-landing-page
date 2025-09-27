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
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        menuOpen
      ) {
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
        <div
          ref={dropdownRef}
          className="flex items-center gap-2 relative group"
          onClick={() => setShowDropdown(!showDropdown)} // Toggle on click
          aria-expanded={showDropdown}
          aria-haspopup="true"
        >
          {/* 1. Avatar - Made it a bit more interactive/prominent */}
          <Image
            src={user.image || "/default-avatar.png"}
            alt="user"
            width={36} // Slightly larger avatar
            height={36}
            className="rounded-full cursor-pointer ring-2 ring-primary p-0.5 hover:ring-2 hover:ring-primary/80 transition-all duration-200"
          />

        
          {showDropdown && (
            <div className="absolute top-14 right-0 w-64 bg-white rounded-xl shadow-2xl p-0 z-50 border border-gray-100 transition duration-300 origin-top-right animate-in fade-in-0 zoom-in-95">
              {/* 2. Dropdown Header with Full Name and Email */}
              <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user.name || "User Profile"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">
                  {user.email}
                </p>
              </div>

              {/* 3. Dropdown Links with Icons */}
              <div className="p-2 space-y-1">
                {/* Profile Link */}
                <Link
                  href={"/profile"} // Assuming a profile page exists
                  className="flex items-center gap-3 p-2 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg transition"
                  onClick={() => setShowDropdown(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="text-sm font-medium">Profile Settings</span>
                </Link>

                {/* My Courses Link (as originally intended) */}
                <Link
                  href={"/coursepanel"}
                  className="flex items-center gap-3 p-2 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg transition"
                  onClick={() => setShowDropdown(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                    <path d="M10 2v20" />
                    <path d="M14 10h2" />
                  </svg>
                  <span className="text-sm font-medium">My Courses</span>
                </Link>
              </div>

              {/* 4. Logout Button - Visual separation with a border and use red color */}
              <div className="p-2 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 text-sm bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition font-semibold cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                  </svg>
                  Logout
                </button>
              </div>
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
                    pathname === link.href
                      ? "font-bold text-primary"
                      : "font-medium text-gray-700"
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
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: menuOpen ? "rgba(0, 0, 0, 0.5)" : "transparent",
        }}
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
                    pathname === link.href
                      ? "text-primary border-r-4 border-primary"
                      : "text-gray-700"
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
            <h4 className="text-md font-bold mb-3 text-gray-800">
              Get the App Link
            </h4>
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
