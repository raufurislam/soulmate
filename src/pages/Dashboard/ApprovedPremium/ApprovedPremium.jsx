import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ApprovedPremium = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handlePremiumAccept = async (userId) => {
    try {
      const response = await axiosSecure.patch(`/users/role/${userId}`, {
        role: "premium",
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User has been successfully upgraded to premium!",
          confirmButtonColor: "#3085d6",
        });
        refetch();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: response.data.message || "Something went wrong.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error approving premium request:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to approve the request. Please try again later.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const requestedPremiumUsers = Array.isArray(users)
    ? users.filter((user) => user.role === "requestedPremium")
    : [];

  return (
    <div className="max-w-screen-xl mx-auto p-5">
      <h1 className="text-xl font-bold mb-4">Requested for Premium User</h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Biodata Id</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requestedPremiumUsers.length > 0 ? (
              requestedPremiumUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border border-gray-200 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {user.biodataId || "N/A"}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => handlePremiumAccept(user._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Approve Request
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-200 px-4 py-2 text-center text-gray-500"
                >
                  No users have requested premium.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedPremium;
