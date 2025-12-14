'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { reviews } from "@/lib/utils";
import { ReviewCard } from "@/components/reviews/review-card";

// Import Swiper styles
import "swiper/css";

export function ReviewsCarousel() {
  return (
    <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={15}
        slidesPerView={1}
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
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1536: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        className="reviews-swiper"
      >
        {reviews().map((review, index) => (
          <SwiperSlide key={index}>
            <ReviewCard {...review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

