import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "animate.css";
import { Link } from "react-router-dom";

const Banner = () => {
  const [slides] = useState([
    {
      id: 1,
      title: "Find Your Perfect Soulmate.",
      description:
        "Join our community and discover meaningful connections designed to help you find the love of your life, starting today.",
      image: "https://i.ibb.co.com/6HhXpN2/Assignment-banner-12.png",
    },
    {
      id: 2,
      title: "Celebrate Love with Soulmate",
      description:
        "Explore profiles, find love, and begin your happily ever after with a trusted platform built for finding genuine relationships.",
      image: "https://i.ibb.co.com/NCRm6TM/Assignment-banner-09.png",
    },
    {
      id: 3,
      title: "Matches Made with Care",
      description:
        "Thousands of success stories await you on our platform, where love meets compatibility and relationships thrive.",
      image: "https://i.ibb.co.com/P4RspZC/Assignment-banner-11.png",
    },
    {
      id: 4,
      title: "Love Beyond Boundaries",
      description:
        "Discover compatible matches from around the world, and build meaningful relationships that transcend physical distance.",
      image: "https://i.ibb.co.com/zmV2vRM/Assignment-banner-10.png",
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  // https://i.ibb.co.com/NCRm6TM/Assignment-banner-09.png
  // https://i.ibb.co.com/zmV2vRM/Assignment-banner-10.png
  // https://i.ibb.co.com/P4RspZC/Assignment-banner-11.png
  // https://i.ibb.co.com/6HhXpN2/Assignment-banner-12.png
  return (
    <div className="max-w-screen-xl mx-auto pt-4 lg:px-2 px-4 bg-pink-50">
      <div className="rounded-lg bg-base-200 lg:px-12 px-4 md:px-7 py-5">
        <Swiper
          loop={true}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination", // Target the custom class
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="flex flex-col-reverse md:flex-row gap-8 items-center">
                {/* Text Content */}
                <div
                  className={`flex-1 ${
                    activeIndex === index
                      ? "animate__animated animate__fadeIn"
                      : "opacity-0"
                  }`}
                >
                  <h1 className="lg:text-4xl md:text-3xl text-2xl mb-3 font-bold">
                    {slide.title}
                  </h1>
                  <p className="lg:w-2/3 text-sm text-gray-500">
                    {slide.description}
                  </p>
                  <button className="text-white bg-[#ED5A6A] hover:bg-[#d64a5b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-6">
                    Explore Now
                  </button>
                </div>
                {/* Image */}
                <div className="flex-1">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Pagination */}
        <div className="custom-pagination flex justify-center mt-6"></div>
      </div>
    </div>
  );
};

export default Banner;
