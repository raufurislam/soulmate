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
    <div className="max-w-screen-xl p-5 mx-auto">
      <h1 className="text-xl font-bold mb-4">Approved Contact Request</h1>

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
            {payments.map((payment) => (
              <tr key={payment._id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">
                  {payment.name || "N/A"}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {payment.email}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {payment.biodataId}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {payment.status === "approved" ? (
                    <span className="px-4 py-2 bg-green-500 text-white rounded">
                      Approved
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApprovedContactRequest(payment._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600"
                    >
                      Approve Request
                    </button>
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

export default ApprovedContactRequest;
