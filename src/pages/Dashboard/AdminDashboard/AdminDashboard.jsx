import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AdminDashboard = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch biodata
  const { data: biodatas = [] } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const res = await axiosPublic.get("biodatas");
      // console.log(res.data);
      return res.data;
    },
  });

  // Fetch marriages
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("users");
      // console.log(res.data);
      return res.data;
    },
  });
  // Fetch marriages
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosPublic.get("payments");
      // console.log(res.data);
      return res.data;
    },
  });

  // Check if biodatas is an array before applying filter
  const femaleBiodatasCount = Array.isArray(biodatas)
    ? biodatas.filter((biodata) => biodata.biodataType === "Female").length
    : 0;

  const maleBiodatasCount = Array.isArray(biodatas)
    ? biodatas.filter((biodata) => biodata.biodataType === "Male").length
    : 0;

  // Count premium users
  const premiumUsersCount = Array.isArray(users)
    ? users.filter((user) => user.role === "premium").length
    : 0;

  // Calculate total price of all payments
  const totalPaymentsPrice = Array.isArray(payments)
    ? payments.reduce((sum, payment) => sum + (payment.price || 0), 0)
    : 0;

  return (
    <div className="max-w-screen-xl p-5 mx-auto">
      <h1 className="md:text-3xl text-2xl font-bold text-center mb-5">
        Dash Board
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* 1 */}
        {/* Total Biodatas */}
        <div className="bg-green-100 p-5 text-center rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-green-600">Total Biodatas</h2>
          <p className="text-3xl font-semibold text-green-800">
            {Array.isArray(biodatas) ? biodatas.length : 0}
          </p>
        </div>
        {/* 2 */}
        {/* Female Biodatas Count */}
        <div className="bg-blue-100 p-5 text-center rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-600">Girls</h2>
          <p className="text-3xl font-semibold text-blue-800">
            {femaleBiodatasCount}
          </p>
        </div>
        {/* 3 */}
        {/* Male Biodatas Count */}
        <div className="bg-yellow-100 p-5 text-center rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-yellow-600">Boys</h2>
          <p className="text-3xl font-semibold text-yellow-800">
            {maleBiodatasCount}
          </p>
        </div>
        {/* 4 */}
        {/* Premium Users Count */}
        <div className="bg-red-100 p-5 text-center rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600">Premium Users</h2>
          <p className="text-3xl font-semibold text-red-800">
            {premiumUsersCount}
          </p>
        </div>
        {/* 5 */}
        {/* Total Payments Price */}
        <div className="bg-purple-100 p-5 text-center rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-purple-600">Total Revenue</h2>
          <p className="text-3xl font-semibold text-purple-800">
            {totalPaymentsPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
