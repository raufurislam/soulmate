// import { useEffect, useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query"; // Use queryClient to refetch data
// import Swal from "sweetalert2"; // Import SweetAlert2
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const MyContactRequest = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient(); // Access React Query's QueryClient
//   const [biodatas, setBiodatas] = useState([]); // State to store fetched biodatas

//   // Fetch biodatas
//   useEffect(() => {
//     const fetchBiodatas = async () => {
//       try {
//         const response = await axiosSecure.get("/biodatas");
//         setBiodatas(response.data);
//       } catch (error) {
//         console.error("Error fetching biodatas:", error);
//       }
//     };
//     fetchBiodatas();
//   }, [axiosSecure]);

//   // Get biodata by biodataId
//   const getBiodataById = (biodataId) => {
//     return biodatas.find(
//       (biodata) => String(biodata.biodataId) === String(biodataId)
//     );
//   };

//   // Fetch payments using React Query
//   const { data: payments = [], refetch } = useQuery({
//     queryKey: ["payments", user.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/payments/${user.email}`);
//       return res.data;
//     },
//   });

//   // Handle delete with SweetAlert2 confirmation and success/error feedback
//   const handleDelete = async (paymentId) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosSecure.delete(`/payments/${paymentId}`);
//         Swal.fire("Deleted!", "Payment has been deleted.", "success");
//         queryClient.invalidateQueries(["payments"]); // Automatically refetch payments
//       } catch (error) {
//         console.error("Error deleting payment:", error);
//         Swal.fire("Error!", "Failed to delete the payment.", "error");
//       }
//     }
//   };

//   return (
//     <div className="max-w-screen-2xl mx-auto p-4 lg:px-8">
//       <h1 className="text-xl font-bold mb-4">My Contact Requests</h1>
//       <h2 className="text-lg mb-6">Total Payments: {payments.length}</h2>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-200 text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-200 px-4 py-2">Name</th>
//               <th className="border border-gray-200 px-4 py-2">Biodata ID</th>
//               <th className="border border-gray-200 px-4 py-2">Status</th>
//               <th className="border border-gray-200 px-4 py-2">
//                 Mobile Number
//               </th>
//               <th className="border border-gray-200 px-4 py-2">Email</th>
//               <th className="border border-gray-200 px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((payment) => {
//               const biodata = getBiodataById(payment.biodataId); // Find biodata using biodataId
//               return (
//                 <tr key={payment._id} className="hover:bg-gray-50">
//                   {/* Name */}
//                   <td className="border border-gray-200 px-4 py-2">
//                     {biodata ? biodata.name : "No Name"}
//                   </td>

//                   {/* Biodata ID */}
//                   <td className="border border-gray-200 px-4 py-2">
//                     {payment.biodataId}
//                   </td>

//                   {/* Status */}
//                   <td className="border border-gray-200 px-4 py-2">
//                     {payment.status || "Pending"}
//                   </td>

//                   {/* Mobile Number */}
//                   <td className="border border-gray-200 px-4 py-2">
//                     {payment.status === "approved" && biodata
//                       ? biodata.mobile
//                       : "Wait for admin approval"}
//                   </td>

//                   {/* Email */}
//                   <td className="border border-gray-200 px-4 py-2">
//                     {payment.status === "approved" && biodata
//                       ? biodata.email
//                       : "Wait for admin approval"}
//                   </td>

//                   {/* Actions */}
//                   <td className="border border-gray-200 px-4 py-2">
//                     <button
//                       onClick={() => handleDelete(payment._id)} // Pass payment ID for delete
//                       className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MyContactRequest;

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyContactRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [biodatas, setBiodatas] = useState([]);

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

  // Handle delete
  const handleDelete = async (paymentId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/payments/${paymentId}`);
        Swal.fire("Deleted!", "Payment has been deleted.", "success");
        queryClient.invalidateQueries(["payments"]);
      } catch (error) {
        console.error("Error deleting payment:", error);
        Swal.fire("Error!", "Failed to delete the payment.", "error");
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
      {/* Header Section */}
      <div className="bg-neutral shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-semibold text-text1 mb-2">
          My Contact Requests
        </h1>
        <p className="text-text2 mt-1">Total Payments: {payments.length}</p>
      </div>

      {/* Show message if no payments */}
      {payments.length === 0 ? (
        <div className="text-center bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-500 text-lg">No contact requests found.</p>
        </div>
      ) : (
        // Show table only if payments exist
        <div className="bg-neutral shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-neutral shadow-sm text-gray-700">
                <tr className="border-b border-text4">
                  <th className="px-4 py-3 text-text2 font-semibold">Name</th>
                  <th className="px-4 py-3 text-text2 font-semibold">
                    Biodata ID
                  </th>
                  <th className="px-4 py-3 text-text2 font-semibold">Status</th>
                  <th className="px-4 py-3 text-text2 font-semibold">
                    Mobile Number
                  </th>
                  <th className="px-4 py-3 text-text2 font-semibold">Email</th>
                  <th className="px-4 py-3 text-text2 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => {
                  const biodata = getBiodataById(payment.biodataId);
                  return (
                    <tr
                      key={payment._id}
                      className={`border-b border-text4 ${
                        index % 2 === 0 ? "bg-accent" : "bg-accent"
                      } hover:bg-neutral transition`}
                    >
                      {/* Name */}
                      <td className="px-4 py-3 text-text1">
                        {biodata ? biodata.name : "No Name"}
                      </td>

                      {/* Biodata ID */}
                      <td className="px-4 py-3 text-text1">
                        {payment.biodataId}
                      </td>

                      {/* Status */}
                      <td
                        className={`px-4 py-3 font-medium ${
                          payment.status === "approved"
                            ? "text-green-500"
                            : "text-yellow-400"
                        }`}
                      >
                        {payment.status || "Pending"}
                      </td>

                      {/* Mobile Number */}
                      <td className="px-4 py-3 text-text1">
                        {payment.status === "approved" && biodata
                          ? biodata.mobile
                          : "Wait for admin approval"}
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3 text-text1">
                        {payment.status === "approved" && biodata
                          ? biodata.email
                          : "Wait for admin approval"}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(payment._id)}
                          className="px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
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
      )}
    </div>
  );
};

export default MyContactRequest;
