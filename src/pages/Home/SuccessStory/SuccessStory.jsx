import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReactStars from "react-rating-stars-component";

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
    <div className="max-w-screen-xl p-5 mx-auto bg-white shadow-lg">
      <h1 className="md:text-3xl text-2xl font-bold ">Our Success Story</h1>
      <p className="lg:w-1/2 mx-auto mt-2 mb-6">
        Explore heartwarming success stories from people just like you who took
        the first step toward lifelong love.
      </p>
      {/* Swiper for dynamic slides */}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
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
            spaceBetween: 40,
          },
        }}
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
              <div className="text-left w-full md:w-1/2">
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
