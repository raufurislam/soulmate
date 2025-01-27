import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ViewBiodata = () => {
  const { user } = useAuth();
  const [biodata, setBiodata] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Fetch the user's biodata
    fetch(`http://localhost:5000/biodatas/email/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBiodata(data);
      })
      .catch((error) => {
        console.error("Error fetching biodata:", error);
      });
  }, [user.email]);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const handleMakePremium = async () => {
    try {
      const response = await axiosSecure.patch(`/users`, {
        role: "requestedPremium", // role to be updated
        biodataId: biodata?.biodataId, // Send the biodataId as well
      });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your request for premium has been sent!",
      });
      refetch();
    } catch (error) {
      console.error("Error sending premium request:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="px-4 lg:px-32 py-6">
      <div className="max-w-screen-xl shadow-lg mx-auto bg-white rounded-2xl border p-6">
        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div>
            <img
              className="w-40 h-40 rounded-full object-cover"
              src={
                biodata?.photoURL ||
                "https://static.vecteezy.com/system/resources/previews/007/407/994/non_2x/monochrome-icon-people-icon-design-user-icon-in-flat-style-vector.jpg"
              }
              alt="Profile"
            />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              {biodata?.name || "Name N/A"}
            </h1>
            <p className="text-gray-600 font-semibold">
              {biodata?.occupation || "Occupation N/A"}
            </p>
            <p className="text-gray-600 font-semibold">
              {biodata?.presentDivision || "Present Division N/A"}
            </p>
          </div>
        </div>

        {/* Personal Information Section */}
        <h2 className="text-xl font-bold mt-6 mb-4">Personal Information</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <small className="text-gray-600">Biodata Type</small>
            <h3 className="font-semibold">{biodata?.biodataType || "N/A"}</h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-gray-600">Permanent Division</small>
            <h3 className="font-semibold">
              {biodata?.permanentDivision || "N/A"}
            </h3>
          </div>
          <div>
            <small className="text-gray-600">Father's Name</small>
            <h3 className="font-semibold">{biodata?.fathersName || "N/A"}</h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-gray-600">Mother's Name</small>
            <h3 className="font-semibold">{biodata?.mothersName || "N/A"}</h3>
          </div>

          <div>
            <small className="text-gray-600">Date of Birth</small>
            <h3 className="font-semibold">
              {biodata?.birthDate
                ? new Date(biodata?.birthDate).toLocaleDateString()
                : "N/A"}
            </h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-gray-600">Age</small>
            <h3 className="font-semibold">{biodata?.age || "N/A"}</h3>
          </div>
          <div>
            <small className="text-gray-600">Height</small>
            <h3 className="font-semibold">{biodata?.height || "N/A"}</h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-gray-600">Weight</small>
            <h3 className="font-semibold">{biodata?.weight || "N/A"}</h3>
          </div>
          <div>
            <small className="text-gray-600">Race (Skin Color)</small>
            <h3 className="font-semibold">{biodata?.race || "N/A"}</h3>
          </div>
        </div>

        {/* Partner Information Section */}
        <h2 className="text-xl font-bold mt-6 mb-4">
          Expected Partner Information
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <small className="text-gray-600">Expected Partner Age</small>
            <h3 className="font-semibold">{biodata?.partnerAge || "N/A"}</h3>
          </div>
          <div>
            <small className="text-gray-600">Expected Partner Height</small>
            <h3 className="font-semibold">{biodata?.partnerHeight || "N/A"}</h3>
          </div>
          <div className="md:col-span-2">
            <small className="text-gray-600">Expected Partner Weight</small>
            <h3 className="font-semibold">{biodata?.partnerWeight || "N/A"}</h3>
          </div>
        </div>

        {/* Contact Information Section */}
        <h2 className="text-xl font-bold mt-6 mb-4">Contact Information</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <small className="text-gray-600">Email</small>
            <h3 className="font-semibold">{biodata?.email || "N/A"}</h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-gray-600">Mobile Number</small>
            <h3 className="font-semibold">{biodata?.mobile || "N/A"}</h3>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="mt-6 flex gap-4">
          {biodata?.role === "premium" ? (
            <button
              className="px-6 py-3 bg-gray-400 text-white rounded-lg"
              disabled
            >
              Already Premium
            </button>
          ) : biodata?.role === "requestPremium" ? (
            <button
              className="px-6 py-3 bg-yellow-400 text-white rounded-lg"
              disabled
            >
              Premium Request Sent
            </button>
          ) : (
            <button
              onClick={handleMakePremium}
              className="px-6 py-3 bg-[#ED5A6A] text-white rounded-lg hover:bg-[#d64a5b]"
            >
              Make Premium
            </button>
          )}
          <Link
            to="/dashboard/editBiodata"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Edit Biodata
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewBiodata;
