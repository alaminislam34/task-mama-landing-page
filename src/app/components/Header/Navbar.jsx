"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TextAlignJustifyIcon, X } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/SessionProvider";

const links = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Products", href: "/products" },
];

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);

  const { user, loading } = useAuth(); // ✅ useAuth context
  const [email, setEmail] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Email send handler
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
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/signin"; // redirect after logout
  };

  return (
    <div>
      <nav className="grid grid-cols-2 lg:grid-cols-3 items-center py-[27px] max-w-[1440px] mx-auto w-11/12">
        {/* logo */}
        <div className="flex items-start justify-start">
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

        {/* right side */}
        <div className="hidden lg:flex items-center justify-end gap-4">
          {/* download input */}
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
            disabled={loadingEmail}
            onClick={handleSendEmail}
            className="cursor-pointer py-[9px] px-[30px] rounded-xl bg-primary text-white text-xs border hover:border-primary hover:bg-primary/20 hover:text-primary duration-300"
          >
            {loadingEmail ? "App link Sending..." : "Get Download Link"}
          </button>

          {/* user login/logout */}
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div ref={dropdownRef} className="flex items-center gap-2 relative">
              <Image
                onClick={() => setShowModal(!showModal)}
                src={user.image || "/default-avatar.png"}
                alt="user"
                width={32}
                height={32}
                className="rounded-full cursor-pointer"
              />
              {showModal && (
                <div className="absolute top-12 right-0 w-44 bg-white rounded-xl shadow-lg p-4 z-50 border border-gray-100 space-y-4">
                  <p className="text-sm text-gray-500">Hello,</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user.name || user.email}
                  </p>
                  <div>
                    <Link href={"/coursepanel"} className="text-primary">
                      My Courses
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-sm mt-6 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition cursor-pointer text-center"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={"/signin"}
              className="cursor-pointer py-[9px] px-[30px] rounded-xl bg-primary text-white text-xs border hover:border-primary hover:bg-primary/20 hover:text-primary duration-300"
            >
              Login
            </Link>
          )}
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
    </div>
  );
}

export default Navbar;
