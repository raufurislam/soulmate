import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyContactRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [biodatas, setBiodatas] = useState([]); // State to store fetched biodatas

  // Fetch biodatas
  useEffect(() => {
    const fetchBiodatas = async () => {
      try {
        const response = await axiosSecure.get("/biodatas");
        console.log("Fetched biodatas:", response.data); // Check biodatas
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

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (paymentId) => {
    console.log("Handle delete for payment ID:", paymentId);
    // Add your delete logic here
  };

  return (
    <div>
      <h1>Total Payments: {payments.length}</h1>

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
                  <td className="border border-gray-200 px-4 py-2">
                    {biodata ? biodata.name : "No Name"}{" "}
                    {/* Show name if biodata exists */}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {payment.biodataId} {/* Show biodataId */}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {payment.status || "Pending"} {/* Show status */}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {biodata ? biodata.mobile : "N/A"}{" "}
                    {/* Show mobile if biodata exists */}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {biodata ? biodata.email : "N/A"}{" "}
                    {/* Show email if biodata exists */}
                  </td>
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
