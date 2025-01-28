import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StarRatings from "react-star-ratings";

const SuccessStory = () => {
  const axiosPublic = useAxiosPublic();

  // Fetching the marriage data
  const { data: marriages = [] } = useQuery({
    queryKey: ["marriage"],
    queryFn: async () => {
      const res = await axiosPublic.get("marriage");
      return res.data;
    },
  });

  return (
    <div className="max-w-screen-xl p-5 mx-auto bg-white shadow-lg">
      <h1 className="md:text-3xl text-2xl font-bold ">Our Success Story</h1>
      <p className="lg:w-1/2 mx-auto mt-2 mb-6">
        Explore heartwarming success stories from people just like you who took
        the first step toward lifelong love.
      </p>
      {/* Swiper for dynamic slides */}
      <Swiper
        spaceBetween={50}
        slidesPerView={1} // Show only one story per pagination
        navigation
        pagination={{ clickable: true }}
      >
        {marriages.map((marriage) => (
          <SwiperSlide key={marriage._id}>
            {/* Individual Slide */}
            <div className="flex flex-col md:flex-row gap-8 items-center lg:px-20">
              <div className="w-full md:w-1/2">
                <img
                  src={marriage.coupleImageLink}
                  alt="Couple"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:text-left text-center w-full md:w-1/2">
                <div>
                  <p className="text-gray-500">Marriage Date:</p>
                </div>
                <h2 className="text-lg font-bold">
                  {new Date(marriage.marriageDate).toLocaleDateString()}
                </h2>
                {/* Rating Component */}
                <div className="my-4 flex justify-center">
                  <StarRatings
                    rating={marriage.reviewStar || 0} // Fallback to 0 if no rating
                    starRatedColor="gold"
                    numberOfStars={5}
                    starDimension="24px"
                    starSpacing="2px"
                  />
                </div>
                {/* Success Story */}
                <p className="text-lg">"{marriage.successStory}"</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SuccessStory;
