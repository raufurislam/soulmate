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
    <div className="max-w-screen-xl mx-auto p-5 lg:px-40">
      <ToastContainer position="top-center" autoClose={1500} />

      <div className="bg-blue-50 p-5 lg:p-8">
        <h1>Got Married</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            {/* Self Biodata Id */}
            <div className="form-control w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Self Biodata Id
              </label>
              <input
                {...register("selfBiodataId", { required: true })}
                type="text"
                value={biodatas?.biodataId || ""}
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* Partner Biodata Id */}
            <div className="form-control w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Partner Biodata Id
              </label>
              <input
                {...register("partnerBiodataId", { required: true })}
                type="number"
                placeholder="Enter partner's Biodata ID"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* Marriage Date */}
            <div className="form-control w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Marriage Date
              </label>
              <DatePicker
                selected={marriageDate}
                onChange={handleDateChange}
                maxDate={new Date()}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select a date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* Couple Image Link */}
            <div className="form-control w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Couple Image Link
              </label>
              <input
                {...register("coupleImageLink", { required: true })}
                type="url"
                placeholder="Enter couple image URL"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* Success Story */}
            <div className="form-control w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Success Story
              </label>
              <textarea
                {...register("successStory", { required: true })}
                placeholder="Share your success story"
                rows="3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* Review Stars */}
            <div className="form-control w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
