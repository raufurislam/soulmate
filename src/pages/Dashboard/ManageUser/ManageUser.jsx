import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState(""); // Track search input

  // Fetch all users or filtered users based on the search query
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", searchQuery],
    queryFn: async () => {
      const query = searchQuery
        ? `/users/search?name=${searchQuery}`
        : "/users";
      const res = await axiosSecure.get(query);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!searchQuery || searchQuery === "", // Ensure query is only run when searchQuery is set
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update searchQuery when user types
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handlePremiumAccept = async (userId) => {
    try {
      const response = await axiosSecure.patch(`/users/role/${userId}`, {
        role: "premium",
      });

      if (response.data.success) {
        alert("User has been successfully upgraded to premium!");
        refetch(); // Refresh data after updating the role
      } else {
        alert(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error approving premium request:", error);
      alert("Failed to approve the request. Please try again later.");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-center font-bold text-2xl">Manage User</h1>
      {/* Search form */}
      <form className="max-w-md mx-auto mt-4">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange} // Handle search input change
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search user by username"
            required
          />
        </div>
      </form>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right mt-8 py-3 bg-stone-200 text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Make Admin
              </th>
              <th scope="col" className="px-6 py-3">
                Make Premium
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-stone-200 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="text-white bg-[#ED5A6A] hover:bg-[#d64a5b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs w-auto px-5 py-2.5 text-center"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "admin" ? (
                      <button
                        disabled
                        className="text-gray-400 bg-gray-200 cursor-not-allowed font-medium rounded-full text-xs w-auto px-5 py-2.5"
                      >
                        Make Premium
                      </button>
                    ) : user.role === "premium" ? (
                      "Premium"
                    ) : user.role === "requestedPremium" ? (
                      <button
                        onClick={() => handlePremiumAccept(user._id)}
                        className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs w-auto px-5 py-2.5"
                      >
                        Make Premium
                      </button>
                    ) : (
                      "User"
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
