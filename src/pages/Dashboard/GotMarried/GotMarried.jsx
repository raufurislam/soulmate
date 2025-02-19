import { dataTagSymbol, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GotMarried = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [marriageDate, setMarriageDate] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selfBiodataId: "",
      partnerBiodataId: "",
      coupleImageLink: "",
      successStory: "",
      reviewStar: 0,
    },
  });

  const { data: biodatas = [] } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const res = await axiosSecure.get(`biodatas/email/${user.email}`);
      return res.data;
    },
    onSuccess: (data) => {
      // Update the default values when biodatas load
      setValue("selfBiodataId", data.biodataId || "");
    },
  });

  const onSubmit = async (data) => {
    if (!marriageDate) {
      toast.error("Please select a marriage date.");
      return;
    }

    if (data.reviewStar > 5) {
      toast.error("Review star cannot be more than 5.");
      return;
    }

    const submissionData = {
      ...data,
      marriageDate,
    };

    // console.log(submissionData);

    const formData = {
      selfBiodataId: data.selfBiodataId,
      partnerBiodataId: data.partnerBiodataId,
      marriageDate: marriageDate,
      coupleImageLink: data.coupleImageLink,
      reviewStar: data.reviewStar,
      successStory: data.successStory,
    };

    // send formdata to db
    const formRes = await axiosSecure.post("/marriage", formData);
    console.log(formRes.data);

    if (formRes.data.insertedId) {
      toast.success("Form submitted to db successfully!");
    }

    toast.success("Form submitted successfully!");
  };

  const handleDateChange = (date) => {
    if (date > new Date()) {
      toast.error("Marriage date cannot be in the future.");
    } else {
      setMarriageDate(date);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-4 lg:px-8 bg-base-100">
      <ToastContainer position="top-center" autoClose={1500} />

      <div className="">
        {/* Page Header */}
        <div className="bg-neutral shadow-lg rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-semibold text-text1">Got Married</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Self Biodata Id */}
              <div className="form-control w-full">
                <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
                  Self Biodata Id
                </label>
                <input
                  {...register("selfBiodataId", { required: true })}
                  type="text"
                  value={biodatas?.biodataId || ""}
                  readOnly
                  className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                />
              </div>

              {/* Partner Biodata Id */}
              <div className="form-control w-full">
                <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
                  Partner Biodata Id
                </label>
                <input
                  {...register("partnerBiodataId", { required: true })}
                  type="number"
                  placeholder="Enter partner's Biodata ID"
                  className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Marriage Date */}
              <div className="form-control w-full">
                <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
                  Marriage Date
                </label>
                <DatePicker
                  selected={marriageDate}
                  onChange={handleDateChange}
                  maxDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select a date"
                  className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                />
              </div>

              {/* Couple Image Link */}
              <div className="form-control w-full">
                <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
                  Couple Image Link
                </label>
                <input
                  {...register("coupleImageLink", { required: true })}
                  type="url"
                  placeholder="Enter couple image URL"
                  className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                />
              </div>
            </div>

            {/* Success Story */}
            <div className="form-control w-full">
              <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
                Success Story
              </label>
              <textarea
                {...register("successStory", { required: true })}
                placeholder="Share your success story"
                rows="3"
                className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              />
            </div>

            {/* Review Stars */}
            <div className="form-control w-fit">
              <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
                Review Star (out of 5)
              </label>
              <input
                {...register("reviewStar", {
                  required: "Review star is required.",
                  min: {
                    value: 0,
                    message: "Review star cannot be less than 0.",
                  },
                  max: {
                    value: 5,
                    message: "Review star cannot be more than 5.",
                  },
                })}
                type="number"
                placeholder="Enter a rating (0-5)"
                className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              />
              {errors.reviewStar && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reviewStar.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-[#ED5A6A] text-white rounded-lg hover:bg-[#d64a5b]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GotMarried;
