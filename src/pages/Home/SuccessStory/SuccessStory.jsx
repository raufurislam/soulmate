// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "animate.css";
// import StarRatings from "react-star-ratings";
// import { useState, useEffect, useRef } from "react";

// const SuccessStory = () => {
//   const axiosPublic = useAxiosPublic();
//   const [activeIndex, setActiveIndex] = useState(0);
//   const swiperRef = useRef(null);

//   // Fetching marriage data
//   const { data: marriages = [] } = useQuery({
//     queryKey: ["marriage"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("marriage");
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     if (swiperRef.current && swiperRef.current.swiper) {
//       swiperRef.current.swiper.params.navigation.prevEl = ".custom-prev";
//       swiperRef.current.swiper.params.navigation.nextEl = ".custom-next";
//       swiperRef.current.swiper.navigation.init();
//       swiperRef.current.swiper.navigation.update();
//     }
//   }, []);

//   return (
//     <div className="bg-gray-900 text-white py-16">
//       <div className="max-w-6xl mx-auto px-6 text-center">
//         {/* Heading */}
//         <h1 className="text-4xl lg:text-5xl font-extrabold text-white">
//           Love Stories That Inspire
//         </h1>
//         <p className="text-gray-300 text-lg lg:w-2/3 mx-auto mt-3 mb-8">
//           Witness the beautiful journeys of couples who found love on our
//           platform.
//         </p>

//         {/* Swiper Container */}
//         <div className="relative">
//           <Swiper
//             ref={swiperRef}
//             loop={true}
//             spaceBetween={30}
//             centeredSlides={true}
//             autoplay={{
//               delay: 4000,
//               disableOnInteraction: false,
//             }}
//             pagination={{
//               clickable: true,
//               el: ".custom-pagination",
//             }}
//             navigation={{
//               nextEl: ".custom-next",
//               prevEl: ".custom-prev",
//             }}
//             modules={[Autoplay, Pagination, Navigation]}
//             className="mySwiper"
//             onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//           >
//             {marriages.map((marriage) => (
//               <SwiperSlide key={marriage._id} className="p-4">
//                 <div className="flex flex-col lg:flex-row items-center bg-white text-gray-900 shadow-2xl rounded-xl overflow-hidden">
//                   {/* Image Section */}
//                   <div className="lg:w-1/2 w-full relative">
//                     <img
//                       src={marriage.coupleImageLink}
//                       alt="Couple"
//                       className="w-full h-[400px] object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
//                     <div className="absolute bottom-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded-lg">
//                       Married on:{" "}
//                       {new Date(marriage.marriageDate).toLocaleDateString()}
//                     </div>
//                   </div>

//                   {/* Story Content */}
//                   <div className="lg:w-1/2 w-full p-8 text-left">
//                     <h2 className="text-3xl font-bold">
//                       {marriage.coupleNames}
//                     </h2>
//                     {/* Rating Component */}
//                     <div className="my-4 flex">
//                       <StarRatings
//                         rating={marriage.reviewStar || 0}
//                         starRatedColor="#FFD700"
//                         numberOfStars={5}
//                         starDimension="24px"
//                         starSpacing="3px"
//                       />
//                     </div>
//                     {/* Success Story */}
//                     <p className="text-lg text-gray-700 italic">
//                       "{marriage.successStory}"
//                     </p>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {/* Custom Navigation Buttons */}
//           <div className="flex justify-center items-center gap-6 mt-0">
//             <button className="custom-prev swiper-button-prev bg-blue-400 p-5 rounded-full w-20 h-20"></button>
//             <button className="custom-next swiper-button-next"></button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuccessStory;
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Slider from "react-slick";
import StarRatings from "react-star-ratings";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const SuccessStory = () => {
  const axiosPublic = useAxiosPublic();
  const sliderRef = useRef(null);

  // Fetching marriage data
  const { data: marriages = [] } = useQuery({
    queryKey: ["marriage"],
    queryFn: async () => {
      const res = await axiosPublic.get("marriage");
      return res.data;
    },
  });

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false, // Hide default arrows
  };

  return (
    <div className="max-w-screen-xl mx-auto pt-4 lg:px-2 px-4">
      <div className="">
        {/* Heading */}
        <div>
          <h1 className="lg:text-3xl md:text-2xl text-lg font-bold text-center text-text1 md:mb-3 mb-2">
            Love Stories That Inspire
          </h1>
          <p className="text-center w-4/5 mx-auto text-text2 md:text-xl mb-8">
            Witness the beautiful journeys of couples who found love on our
            platform.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {marriages.map((marriage) => (
              <div key={marriage._id} className="">
                <div className="flex flex-col md:flex-row items-center bg-neutral text-gray-900 rounded-xl relative">
                  {/* Image Section */}
                  <div className="lg:w-1/2 w-full  relative">
                    <img
                      src={marriage.coupleImageLink}
                      alt="Couple"
                      className="w-full lg:h-[480px] md:h-[320px] h-[320px] rounded-xl md:rounded-l-xl object-cover"
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div> */}
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded-lg">
                      Married on:{" "}
                      {new Date(marriage.marriageDate).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="lg:w-1/2 w-full h-96 md:h-auto p-8 text-left">
                    <h2 className="text-3xl font-bold">
                      {marriage.coupleNames}
                    </h2>
                    {/* Rating Component */}
                    <div className="my-4 flex">
                      <StarRatings
                        rating={marriage.reviewStar || 0}
                        starRatedColor="#FFD700"
                        numberOfStars={5}
                        starDimension="24px"
                        starSpacing="3px"
                      />
                    </div>
                    {/* Success Story */}
                    <p className="text-lg text-text2 lg:w-11/12 italic">
                      "{marriage.successStory}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Custom Navigation Buttons (Inside the Slider) */}
          <button
            className="absolute left-4 top-1/3 md:top-1/2 transform -translate-y-1/2 bg-transparent text-primary ml-3 border-primary border rounded-full p-3 shadow-lg hover:bg-gray-300 transition-all"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <FaArrowLeft />
          </button>

          <button
            className="absolute right-4 top-1/3 md:top-1/2 transform -translate-y-1/2 bg-transparent text-primary mr-3 rounded-full p-3  border-primary border shadow-lg hover:bg-gray-300 transition-all"
            onClick={() => sliderRef.current.slickNext()}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStory;
