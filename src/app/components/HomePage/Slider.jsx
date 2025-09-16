"use client";

import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Sophia R",
    location: "Boston, USA",
    text: "TaskMama is the first app that actually understands my day. The AI balances school drop-offs, client calls, and even reminds me to breathe. Total lifesaver",
    image: "/images/sophia.jpg",
  },
  {
    name: "Rachel K.",
    location: "Boston, USA",
    text: "Before TaskMama, I had five different apps for work and family. Now everything — chores, invoices, and meal plans — is in one place. I finally feel organized",
    image: "/images/rachel.jpg",
  },
  {
    name: "Alicia M",
    location: "Boston, USA",
    text: "My kids love the rewards for finishing chores, and I love flipping into Boss Mode to focus on my business. It’s like having a personal assistant in my pocket.",
    image: "/images/alicia.jpg",
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            What Our Users Say
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Hear from families and professionals who are loving TaskMama.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          modules={[Pagination, Autoplay, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="pb-14"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-3xl shadow-xl p-8 h-full flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="relative mb-5">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover border-4 border-sky-200"
                  />
                  <span className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 p-2 rounded-full bg-yellow-400 text-white shadow-lg">
                    <Star className="w-5 h-5 fill-current" />
                  </span>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-lg italic mb-6">“{t.text}”</p>
                <h3 className="text-xl font-bold text-sky-700">{t.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{t.location}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button className="swiper-button-prev bg-white shadow-md hover:bg-gray-100 p-2 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button className="swiper-button-next bg-white shadow-md hover:bg-gray-100 p-2 rounded-full">
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
