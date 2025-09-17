"use client";

import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

function ContactForm() {
  const [email, setEmail] = useState(""); // ✅ email state
  const [subject, setSubject] = useState(""); // ✅ subject state
  const [message, setMessage] = useState(""); // ✅ message state
  const [error, setError] = useState(""); // ✅ error state
  const [loading, setLoading] = useState(false); // ✅ loading state

  //   form submit handler
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!email || !subject || !message) {
      setError("All fields are required");
      return;
    } else {
      setError("");
    }

    setLoading(true); // start loading

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({ type: "contact", email, subject, message }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully!", {
          pauseOnHover: true,
          style: { backgroundColor: "#E6E6FA", color: "#00000069" },
          hideProgressBar: true,
        });
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        toast.error(data.error || "Failed to send email", {
          pauseOnHover: true,
          style: { backgroundColor: "#E6E6FA", color: "#00000069" },
          hideProgressBar: true,
        });
      }
    } catch (err) {
      console.error("Send email error:", err);
      toast.error("Something went wrong!", {
        pauseOnHover: true,
        style: { backgroundColor: "#E6E6FA", color: "#00000069" },
        hideProgressBar: true,
      });
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <section className="relative py-12 lg:pb-20">
      <div className="absolute top-0 left-0 w-full h-full  bg-[#B0A2DA]/10 blur-xl -z-10"></div>
      <div className="max-w-[1440px] w-11/12 mx-auto flex flex-col lg:flex-row gap-12 items-center justify-between">
        <div className="w-full max-w-[490px]">
          <form
            onSubmit={handleSubmitForm}
            className="space-y-4 lg:space-y-5 flex flex-col"
          >
            <input
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="py-3 lg:py-5 px-4 lg:px-6 lg:text-lg placeholder:text-[#6B6B6B] rounded-lg bg-white focus:outline-primary"
            />
            <input
              value={subject}
              required
              onChange={(e) => setSubject(e.target.value)}
              type="text"
              placeholder="Subject"
              className="py-3 lg:py-5 px-4 lg:px-6 lg:text-lg placeholder:text-[#6B6B6B] rounded-lg bg-white focus:outline-primary"
            />
            <textarea
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              rows={5}
              className="py-3 lg:py-5 px-4 lg:px-6 lg:text-lg placeholder:text-[#6B6B6B] rounded-lg bg-white focus:outline-primary"
            />
            {error && (
              <span className="text-red-400 text-xs py-2 text-left">
                {error}
              </span>
            )}
            <div className="flex justify-start items-center">
              <button
                disabled={loading}
                type="submit"
                className="lg:text-lg font-poppins text-white bg-[#C5BBE4] tracking-tight py-4 lg:py-6 px-8 lg:px-12 rounded-[40px_5px_50px_5px] mt-2 shadow-[0px_1.85px_3.15px_0px_#18A7B906,0px_8.15px_6.52px_0px_#18A7B90A,0px_20px_13px_0px_#18A7B90D,0px_38.52px_25.48px_0px_#18A7B90F,0px_64.81px_46.85px_0px_#18A7B913] cursor-pointer"
              >
                {loading ? "Sending..." : "Send Message"}{" "}
                {/* ✅ loading text */}
              </button>
            </div>
          </form>
        </div>
        <div>
          <Image
            src={"/images/map.png"}
            height={600}
            width={800}
            alt="Map Image"
            className="lg:w-[782px] lg:h-[500px] object-center"
          />
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
