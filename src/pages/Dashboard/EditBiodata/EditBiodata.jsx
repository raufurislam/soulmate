import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../hooks/useAuth";

const divisions = [
  "Dhaka",
  "Chittagong",
  "Khulna",
  "Sylhet",
  "Rajshahi",
  "Barisal",
  "Rangpur",
  "Mymensingh",
];

const heights = Array.from({ length: 40 }, (_, i) => `${140 + i} cm`);
const weights = Array.from({ length: 60 }, (_, i) => `${40 + i} kg`);
const occupations = ["Student", "Engineer", "Doctor", "Teacher", "Other"];

const EditBiodata = () => {
  const { user } = useAuth();
  const { register, handleSubmit, setValue } = useForm();
  const [birthDate, setBirthDate] = useState(null);

  useEffect(() => {
    fetch(
      `https://assignment-12-server-raufur-web-10-0934.vercel.app/biodatas/email/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Object.keys(data).forEach((key) => {
            if (key === "birthDate") {
              setBirthDate(new Date(data[key]));
            } else {
              setValue(key, data[key]);
            }
          });
        }
      });
  }, [user.email, setValue]);

  const handleDateChange = (date) => {
    setBirthDate(date);
    setValue("birthDate", date);
  };

  const onSubmit = async (data) => {
    console.log(data);
    data.birthDate = birthDate;

    const response = await fetch(
      `https://assignment-12-server-raufur-web-10-0934.vercel.app/biodatas/email/${user.email}`
    );

    if (response.ok) {
      // User already has a biodata, perform PATCH request
      const userBiodata = await response.json();
      const patchResponse = await fetch(
        `https://assignment-12-server-raufur-web-10-0934.vercel.app/biodata/${userBiodata._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (patchResponse.ok) {
        toast.success("Biodata updated successfully!");
      } else {
        toast.error("Failed to update biodata");
      }
    } else {
      // No existing biodata, perform POST request to create new
      const postResponse = await fetch(
        "https://assignment-12-server-raufur-web-10-0934.vercel.app/biodatas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (postResponse.ok) {
        toast.success("Biodata saved successfully!");
      } else {
        toast.error("Failed to save biodata");
      }
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-4 lg:px-8 bg-base-100">
      <div>
        <h1 className="lg:text-3xl text-2xl text-center font-bold mb-6 mt-4">
          Edit Your Biodata
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 1st row */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* Name */}
          <div className="form-control w-full">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Name*
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter your name"
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            />
          </div>

          {/* Photo URL */}
          <div className="form-control w-full">
            <label className="block mb-2 text-sm font-medium text-text1">
              Photo URL*
            </label>
            <input
              {...register("photoURL", { required: true })}
              type="url"
              // defaultValue={photoURL}
              placeholder="Enter photo URL"
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            />
          </div>
        </div>

        {/* 2nd row */}
        <div className="flex flex-col md:flex-row gap-5 my-6">
          {/* Date of Birth */}
          <div className="form-control w-full">
            <label className="block mb-2 w-full text-sm font-medium text-text1 dark:text-white">
              Date of Birth* (age must be 18)
            </label>
            <DatePicker
              selected={birthDate} // Use the state value
              onChange={handleDateChange} // Handle date changes
              placeholderText="Select your birthdate"
              dateFormat="dd-MM-yyyy"
              maxDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              } // Restrict to 18 years
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            />
          </div>

          {/* Biodata Type */}
          <div className="form-control w-full">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Biodata Type*
            </label>
            <select
              {...register("biodataType", { required: true })}
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* 3rd row */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* Height */}
          <div className="form-control w-full">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Height*
            </label>
            <select
              {...register("height", { required: true })}
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            >
              <option value="">Select</option>
              {heights.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          {/* Weight */}
          <div className="form-control w-full">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Weight*
            </label>
            <select
              {...register("weight", { required: true })}
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            >
              <option value="">Select</option>
              {weights.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Remaining Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {/* Age */}
          <div className="form-control">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Age*
            </label>
            <input
              {...register("age", { required: true })}
              type="number"
              placeholder="Enter your age"
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            />
          </div>

          {/* Occupation */}
          <div className="form-control">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Occupation*
            </label>
            <select
              {...register("occupation", { required: true })}
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            >
              <option value="">Select</option>
              {occupations.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          {/* Race */}
          <div className="form-control w-full">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Race (Skin Color)*
            </label>
            <select
              {...register("race", { required: true })}
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Skin Color
              </option>
              <option value="fair">Fair</option>
              <option value="medium">Medium</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Fathers Name */}
          <div className="form-control">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Father's Name
            </label>
            <input
              {...register("fathersName", { required: true })}
              type="text"
              placeholder="Enter father's name"
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            />
          </div>

          {/* Mothers Name */}
          <div className="form-control">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Mother's Name
            </label>
            <input
              {...register("mothersName", { required: true })}
              type="text"
              placeholder="Enter mother's name"
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            />
          </div>

          {/* Permanent Division */}
          <div className="form-control">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Permanent Division*
            </label>
            <select
              {...register("permanentDivision", { required: true })}
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            >
              <option value="">Select</option>
              {divisions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          {/* Permanent Division */}
          <div className="form-control">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Present Division*
            </label>
            <select
              {...register("presentDivision", { required: true })}
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            >
              <option value="">Select</option>
              {divisions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Expected Partner req info */}
          {/* Expected Age */}
          <div className="form-control">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Expected Partner Age*
            </label>
            <input
              {...register("partnerAge", { required: true })}
              type="number"
              placeholder="Enter your age"
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            />
          </div>

          {/* Expected Height */}
          <div className="form-control w-full">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Height*
            </label>
            <select
              {...register("partnerHeight", { required: true })}
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            >
              <option value="">Select</option>
              {heights.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          {/* Expected Weight */}
          <div className="form-control w-full">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Weight*
            </label>
            <select
              {...register("partnerWeight", { required: true })}
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            >
              <option value="">Select</option>
              {weights.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Email*
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              value={user.email}
              placeholder="Enter your email"
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              disabled
            />
          </div>
          {/* Mobile */}
          <div className="form-control">
            <label className="block mb-2 text-sm font-medium text-text1 dark:text-white">
              Mobile Number*
            </label>
            <input
              {...register("mobile", { required: true })}
              type="tel"
              placeholder="Enter your mobile number"
              className="bg-neutral border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-[#E32636]"
          >
            Update Biodata
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBiodata;
