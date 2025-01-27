import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Use queryClient to refetch data
import Swal from "sweetalert2"; // Import SweetAlert2
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyContactRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient(); // Access React Query's QueryClient
  const [biodatas, setBiodatas] = useState([]); // State to store fetched biodatas

  // Fetch biodatas
  useEffect(() => {
    const fetchBiodatas = async () => {
      try {
        const response = await axiosSecure.get("/biodatas");
        setBiodatas(response.data);
      } catch (error) {
        console.error("Error fetching biodatas:", error);
      }
    };
    fetchBiodatas();
  }, [axiosSecure]);

  // Get biodata by biodataId
  const getBiodataById = (biodataId) => {
    return biodatas.find(
      (biodata) => String(biodata.biodataId) === String(biodataId)
    );
  };

  // Fetch payments using React Query
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  // Handle delete with SweetAlert2 confirmation and success/error feedback
  const handleDelete = async (paymentId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/payments/${paymentId}`);
        Swal.fire("Deleted!", "Payment has been deleted.", "success");
        queryClient.invalidateQueries(["payments"]); // Automatically refetch payments
      } catch (error) {
        console.error("Error deleting payment:", error);
        Swal.fire("Error!", "Failed to delete the payment.", "error");
      }
    }
  };

  return (
    <div className="max-w-screen-xl p-5 mx-auto">
      <h1 className="text-xl font-bold mb-4">My Contact Requests</h1>
      <h2 className="text-lg mb-6">Total Payments: {payments.length}</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Biodata ID</th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
              <th className="border border-gray-200 px-4 py-2">
                Mobile Number
              </th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => {
              const biodata = getBiodataById(payment.biodataId); // Find biodata using biodataId
              return (
                <tr key={payment._id} className="hover:bg-gray-50">
                  {/* Name */}
                  <td className="border border-gray-200 px-4 py-2">
                    {biodata ? biodata.name : "No Name"}
                  </td>

                  {/* Biodata ID */}
                  <td className="border border-gray-200 px-4 py-2">
                    {payment.biodataId}
                  </td>

                  {/* Status */}
                  <td className="border border-gray-200 px-4 py-2">
                    {payment.status || "Pending"}
                  </td>

                  {/* Mobile Number */}
                  <td className="border border-gray-200 px-4 py-2">
                    {payment.status === "approved" && biodata
                      ? biodata.mobile
                      : "Wait for admin approval"}
                  </td>

                  {/* Email */}
                  <td className="border border-gray-200 px-4 py-2">
                    {payment.status === "approved" && biodata
                      ? biodata.email
                      : "Wait for admin approval"}
                  </td>

                  {/* Actions */}
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => handleDelete(payment._id)} // Pass payment ID for delete
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContactRequest;
