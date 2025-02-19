// import { useQuery } from "@tanstack/react-query";
// import {
//   FaUsers,
//   FaVenus,
//   FaMars,
//   FaCrown,
//   FaDollarSign,
// } from "react-icons/fa";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";

// const AdminDashboard = () => {
//   const axiosPublic = useAxiosPublic();

//   // Fetch data
//   const { data: biodatas = [] } = useQuery({
//     queryKey: ["biodatas"],
//     queryFn: async () => (await axiosPublic.get("biodatas")).data,
//   });

//   const { data: users = [] } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => (await axiosPublic.get("users")).data,
//   });

//   const { data: payments = [] } = useQuery({
//     queryKey: ["payments"],
//     queryFn: async () => (await axiosPublic.get("payments")).data,
//   });

//   // Data calculations
//   const femaleBiodatasCount = biodatas.filter(
//     (b) => b.biodataType === "Female"
//   ).length;
//   const maleBiodatasCount = biodatas.filter(
//     (b) => b.biodataType === "Male"
//   ).length;
//   const premiumUsersCount = users.filter((u) => u.role === "premium").length;
//   const totalPaymentsPrice = payments.reduce(
//     (sum, p) => sum + (p.price || 0),
//     0
//   );

//   // Stats cards
//   const stats = [
//     {
//       label: "Total Biodatas",
//       value: biodatas.length,
//       color: "bg-green-500",
//       icon: <FaUsers />,
//     },
//     {
//       label: "Girls",
//       value: femaleBiodatasCount,
//       color: "bg-blue-500",
//       icon: <FaVenus />,
//     },
//     {
//       label: "Boys",
//       value: maleBiodatasCount,
//       color: "bg-yellow-500",
//       icon: <FaMars />,
//     },
//     {
//       label: "Premium Users",
//       value: premiumUsersCount,
//       color: "bg-red-500",
//       icon: <FaCrown />,
//     },
//     {
//       label: "Total Revenue",
//       value: `$${totalPaymentsPrice}`,
//       color: "bg-purple-500",
//       icon: <FaDollarSign />,
//     },
//   ];

//   return (
//     <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
//       {/* Page Header */}
//       <div className="bg-neutral shadow-lg text-center rounded-lg p-6 mb-6">
//         <h1 className="text-2xl font-semibold text-text1">Admin Dashboard</h1>
//       </div>
//       <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className={`p-6 text-center rounded-2xl shadow-lg text-white flex flex-col items-center justify-center gap-3 ${stat.color} transform transition-transform hover:scale-105`}
//           >
//             <div className="text-5xl">{stat.icon}</div>
//             <h2 className="text-lg font-semibold">{stat.label}</h2>
//             <p className="text-3xl font-bold">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Charts here */}
//     </div>
//   );
// };

// export default AdminDashboard;

import { useQuery } from "@tanstack/react-query";
import {
  FaUsers,
  FaVenus,
  FaMars,
  FaCrown,
  FaDollarSign,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AdminDashboard = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch data
  const { data: biodatas = [] } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => (await axiosPublic.get("biodatas")).data,
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosPublic.get("users")).data,
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => (await axiosPublic.get("payments")).data,
  });

  // Data calculations
  const femaleBiodatasCount = biodatas.filter(
    (b) => b.biodataType === "Female"
  ).length;
  const maleBiodatasCount = biodatas.filter(
    (b) => b.biodataType === "Male"
  ).length;
  const premiumUsersCount = users.filter((u) => u.role === "premium").length;
  const totalPaymentsPrice = payments.reduce(
    (sum, p) => sum + (p.price || 0),
    0
  );

  // Stats data
  const stats = [
    {
      label: "Total Biodatas",
      value: biodatas.length,
      color: "bg-green-500",
      icon: <FaUsers />,
    },
    {
      label: "Girls",
      value: femaleBiodatasCount,
      color: "bg-blue-500",
      icon: <FaVenus />,
    },
    {
      label: "Boys",
      value: maleBiodatasCount,
      color: "bg-yellow-500",
      icon: <FaMars />,
    },
    {
      label: "Premium Users",
      value: premiumUsersCount,
      color: "bg-red-500",
      icon: <FaCrown />,
    },
    {
      label: "Total Revenue",
      value: totalPaymentsPrice,
      color: "bg-purple-500",
      icon: <FaDollarSign />,
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-8">
      {/* Page Header */}
      <div className="bg-neutral shadow-lg text-center rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-semibold text-text1">Admin Dashboard</h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 text-center rounded-2xl shadow-lg text-white flex flex-col items-center justify-center gap-3 ${stat.color} transform transition-transform hover:scale-105`}
          >
            <div className="text-5xl">{stat.icon}</div>
            <h2 className="text-lg font-semibold">{stat.label}</h2>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-10 bg-neutral shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">
          Statistics Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={stats}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
