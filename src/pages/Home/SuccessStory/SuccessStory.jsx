import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Correct Swiper CSS import
import "swiper/css/navigation"; // Navigation specific styles
import "swiper/css/pagination"; // Pagination specific styles
import ReactStars from "react-rating-stars-component"; // Rating component

const SuccessStory = () => {
  const axiosPublic = useAxiosPublic();

  // Fetching the marriage data
  const { data: marriages = [] } = useQuery({
    queryKey: ["marriage"],
    queryFn: async () => {
      const res = await axiosPublic.get("marriage");
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <div className="max-w-screen-xl p-5 mx-auto">
      {/* Swiper for dynamic slides */}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {marriages.map((marriage) => (
          <SwiperSlide key={marriage._id}>
            {/* Individual Slide */}
            <div className="flex gap-8 items-center">
              <div className="w-1/2">
                <img
                  src={marriage.coupleImageLink}
                  alt="Couple"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold">
                  Marriage Date:{" "}
                  {new Date(marriage.marriageDate).toLocaleDateString()}
                </h2>
                {/* Rating Component */}
                <div className="my-4">
                  <ReactStars
                    count={5}
                    value={marriage.reviewStar}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
                {/* Success Story */}
                <p className="text-lg">{marriage.successStory}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SuccessStory;
