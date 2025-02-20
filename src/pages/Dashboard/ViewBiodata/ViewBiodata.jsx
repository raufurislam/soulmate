import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { IoLocationOutline } from "react-icons/io5";

const ViewBiodata = () => {
  const { user } = useAuth();
  const [biodata, setBiodata] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Button disabled state
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Fetch the user's biodata
    fetch(
      `https://assignment-12-server-raufur-web-10-0934.vercel.app/biodatas/email/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBiodata(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching biodata:", error);
      });
  }, [user.email]);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });

  // Function to handle Make Premium after confirmation
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

      setIsButtonDisabled(true); // Disable the button after successful patch
      refetch();
    } catch (error) {
      console.error("Error sending premium request:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Update your profile data to request for Premium membership.",
      });
    }
  };

  const openModal = () => {
    setIsModalOpen(true); // Show modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleConfirmMakePremium = () => {
    handleMakePremium(); // Perform the action
    closeModal(); // Close the modal after action
  };

  // Determine role for button rendering
  const userRole = users?.role;

  return (
    <div className="max-w-screen-2xl mx-auto p-4 lg:px-8 ">
      <div className="max-w-screen-xl shadow-lg mx-auto bg-neutral rounded-2xl p-6">
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
            <h1 className="text-2xl lg:text-3xl text-text1 font-bold mb-1">
              {biodata?.name || "Name N/A"}
            </h1>
            <p className="text-text2 font-semibold mb-1">
              {biodata?.occupation || "Occupation N/A"}
            </p>
            <p className="flex items-center gap-2 text-text2 font-semibold">
              <IoLocationOutline />
              {biodata?.presentDivision || "Present Division N/A"}
            </p>
          </div>
        </div>

        {/* Personal Information Section */}
        <h2 className="text-xl font-bold mt-6 mb-4">Personal Information</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <small className="text-text2">Biodata Type</small>
            <h3 className="font-semibold text-text1">
              {biodata?.biodataType || "N/A"}
            </h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-text2">Permanent Division</small>
            <h3 className="font-semibold text-text1">
              {biodata?.permanentDivision || "N/A"}
            </h3>
          </div>
          <div>
            <small className="text-text2">Father's Name</small>
            <h3 className="font-semibold text-text1">
              {biodata?.fathersName || "N/A"}
            </h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-text2">Mother's Name</small>
            <h3 className="font-semibold text-text1">
              {biodata?.mothersName || "N/A"}
            </h3>
          </div>

          <div>
            <small className="text-text2">Date of Birth</small>
            <h3 className="font-semibold text-text1">
              {biodata?.birthDate
                ? new Date(biodata?.birthDate).toLocaleDateString()
                : "N/A"}
            </h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-text2">Age</small>
            <h3 className="font-semibold text-text1">
              {biodata?.age || "N/A"}
            </h3>
          </div>
          <div>
            <small className="text-text2">Height</small>
            <h3 className="font-semibold text-text1">
              {biodata?.height || "N/A"}
            </h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-text2">Weight</small>
            <h3 className="font-semibold text-text1">
              {biodata?.weight || "N/A"}
            </h3>
          </div>
          <div>
            <small className="text-text2">Race (Skin Color)</small>
            <h3 className="font-semibold text-text1">
              {biodata?.race || "N/A"}
            </h3>
          </div>
        </div>

        {/* Partner Information Section */}
        <h2 className="text-xl font-bold mt-6 mb-4">
          Expected Partner Information
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <small className="text-text2">Expected Partner Age</small>
            <h3 className="font-semibold text-text1">
              {biodata?.partnerAge || "N/A"}
            </h3>
          </div>
          <div>
            <small className="text-text2">Expected Partner Height</small>
            <h3 className="font-semibold text-text1">
              {biodata?.partnerHeight || "N/A"}
            </h3>
          </div>
          <div className="md:col-span-2">
            <small className="text-text2">Expected Partner Weight</small>
            <h3 className="font-semibold text-text1">
              {biodata?.partnerWeight || "N/A"}
            </h3>
          </div>
        </div>

        {/* Contact Information Section */}
        <h2 className="text-xl font-bold mt-6 mb-4">Contact Information</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <small className="text-text2">Email</small>
            <h3 className="font-semibold text-text1">
              {biodata?.email || "N/A"}
            </h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-text2">Mobile Number</small>
            <h3 className="font-semibold text-text1">
              {biodata?.mobile || "N/A"}
            </h3>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="mt-6 flex gap-4">
          {/* {biodata?.role === "premium" ? (
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
              onClick={openModal} // Open the modal when clicked
              className="px-6 py-3 bg-[#ED5A6A] text-white rounded-lg hover:bg-[#d64a5b]"
              disabled={isButtonDisabled} // Disable button after patch
            >
              Make Premium
            </button>
          )} */}

          {userRole === "premium" ? (
            <button
              className="px-6 py-3 bg-gray-400 text-white rounded-lg"
              disabled
            >
              Already Premium
            </button>
          ) : userRole === "requestedPremium" ? (
            <button
              className="px-6 py-3 bg-primary  text-gray-300 rounded-lg"
              disabled
            >
              Premium Request Sent
            </button>
          ) : (
            <button
              onClick={openModal}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-[#E32636]"
              disabled={isButtonDisabled}
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

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Make Premium"
        className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 md:w-96 lg:w-96 mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        ariaHideApp={false}
      >
        <h2 className="text-xl font-semibold text-center mb-4">
          Are you sure you want to make your biodata Premium?
        </h2>
        <div className="flex justify-between">
          <button
            onClick={closeModal}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmMakePremium}
            className="px-6 py-2 bg-[#ED5A6A] text-white rounded-lg"
          >
            Yes, Make Premium
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ViewBiodata;
