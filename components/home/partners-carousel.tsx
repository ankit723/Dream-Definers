'use client'

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { partners, getFaviconUrl } from "@/lib/utils";

// Import Swiper styles
import "swiper/css";

export function PartnersCarousel() {
  return (
    <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 mt-12 ">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={15}
        slidesPerView={2}
        loop={true}
        speed={3000}
        freeMode={true}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
          1536: {
            slidesPerView: 7,
            spaceBetween: 50,
          },
        }}
        className="partners-swiper"
      >
        {partners().map((partner) => (
          <SwiperSlide key={partner.name}>
            <Link
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 rounded-lg border-2 border-blue-950/20 hover:border-blue-950 hover:shadow-lg transition-all duration-300 bg-white h-full"
            >
              <div className="relative w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <Image
                  src={getFaviconUrl(partner.url, 128)}
                  alt={partner.name}
                  width={96}
                  height={96}
                  className="object-contain w-full h-full"
                  unoptimized
                />
              </div>
              <p className="text-xs xs:text-sm sm:text-base font-semibold text-blue-950 text-center px-1">
                {partner.name}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

