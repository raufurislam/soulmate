// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const ApprovedContactRequest = () => {
//   const axiosSecure = useAxiosSecure();

//   // Fetch payments data
//   const { data: payments = [], refetch } = useQuery({
//     queryKey: ["payments"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/payments`);
//       return res.data;
//     },
//   });

//   // Handle approval with SweetAlert2
//   const handleApprovedContactRequest = async (paymentId) => {
//     try {
//       await axiosSecure.patch(`/payments/${paymentId}`, { status: "approved" });
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Payment approved successfully.",
//       });
//       refetch(); // Refresh the data
//     } catch (error) {
//       console.error("Error approving payment:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Failed to approve payment. Please try again.",
//       });
//     }
//   };

//   return (
//     <div className="max-w-screen-xl p-5 mx-auto">
//       <h1 className="text-xl font-bold mb-4">Approved Contact Request</h1>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-200 text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-200 px-4 py-2">Name</th>
//               <th className="border border-gray-200 px-4 py-2">Email</th>
//               <th className="border border-gray-200 px-4 py-2">Biodata Id</th>
//               <th className="border border-gray-200 px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((payment) => (
//               <tr key={payment._id} className="hover:bg-gray-50">
//                 <td className="border border-gray-200 px-4 py-2">
//                   {payment.name || "N/A"}
//                 </td>
//                 <td className="border border-gray-200 px-4 py-2">
//                   {payment.email}
//                 </td>
//                 <td className="border border-gray-200 px-4 py-2">
//                   {payment.biodataId}
//                 </td>
//                 <td className="border border-gray-200 px-4 py-2">
//                   {payment.status === "approved" ? (
//                     <span className="px-4 py-2 bg-green-500 text-white rounded">
//                       Approved
//                     </span>
//                   ) : (
//                     <button
//                       onClick={() => handleApprovedContactRequest(payment._id)}
//                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600"
//                     >
//                       Approve Request
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ApprovedContactRequest;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApprovedContactRequest = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch payments data
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });

  // Handle approval with SweetAlert2
  const handleApprovedContactRequest = async (paymentId) => {
    try {
      await axiosSecure.patch(`/payments/${paymentId}`, { status: "approved" });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Payment approved successfully.",
      });
      refetch(); // Refresh the data
    } catch (error) {
      console.error("Error approving payment:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to approve payment. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
      {/* Page Header */}
      <div className="bg-neutral shadow-lg text-center rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-semibold text-text1">
          Approved Contact Request
        </h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left bg-neutral dark:bg-gray-800 text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-text2 uppercase bg-neutral">
            <tr className="py-2 border-b border-text4">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Biodata Id</th>
              <th className="px-4 py-3">Appreved Request</th>
            </tr>
          </thead>
          <tbody className="text-text1 bg-accent">
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b border-text4 hover:bg-neutral dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-text1 dark:text-white">
                    {payment.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">{payment.email}</td>
                  <td className="px-6 py-4">{payment.biodataId || "N/A"}</td>
                  <td className="px-6 py-4">
                    {payment.status === "approved" ? (
                      <span className="btn btn-sm bg-green-500 hover:bg-green-600 w-full text-white">
                        Approved
                      </span>
                    ) : (
                      <button
                        onClick={() =>
                          handleApprovedContactRequest(payment._id)
                        }
                        className="btn btn-sm bg-blue-500 hover:bg-blue-600 w-full text-white"
                      >
                        Approve Request
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-text1">
                  No payments have been made yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedContactRequest;
