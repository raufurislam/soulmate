// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Link, useNavigate } from "react-router-dom";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";

// const PremiumMember = () => {
//   const axiosSecure = useAxiosPublic();
//   const navigate = useNavigate();

//   // Fetch users
//   const { data: users = [] } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users");
//       return res.data;
//     },
//   });

//   // Fetch biodatas
//   const { data: biodatas = [] } = useQuery({
//     queryKey: ["biodatas"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/biodatas");
//       return res.data;
//     },
//   });

//   // Filter premium users and find their biodata
//   const premiumMembers =
//     Array.isArray(users) && Array.isArray(biodatas)
//       ? users
//           .filter((user) => user.role === "premium")
//           .map((premiumUser) => {
//             const biodata = biodatas.find(
//               (data) => data.biodataId === premiumUser.biodataId
//             );
//             return biodata ? { ...premiumUser, ...biodata } : null;
//           })
//           .filter(Boolean)
//       : [];

//   return (
//     <div className="max-w-screen-xl p-5 mx-auto">
//       <h1 className="lg:text-3xl text-2xl font-bold text-center mb-8">
//         Premium Members
//       </h1>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {premiumMembers.map((member) => (
//           <div
//             key={member.biodataId}
//             className="bg-white shadow-lg rounded-lg p-5"
//           >
//             <img
//               src={member.photoURL}
//               alt={member.name}
//               className="w-full h-48 object-cover rounded-lg mb-4"
//             />
//             <h2 className="text-xl font-bold text-gray-800">
//               {member.name} ({member.biodataType})
//             </h2>
//             <p className="text-gray-600">
//               <strong>Biodata ID:</strong> {member.biodataId}
//             </p>
//             <p className="text-gray-600">
//               <strong>Permanent Division:</strong> {member.permanentDivision}
//             </p>
//             <p className="text-gray-600">
//               <strong>Age:</strong> {member.age}
//             </p>
//             <p className="text-gray-600">
//               <strong>Occupation:</strong> {member.occupation}
//             </p>
//             <Link
//               to={`/biodatas/${member._id}`}
//               className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//             >
//               View Profile
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PremiumMember;

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const PremiumMember = () => {
  const axiosSecure = useAxiosPublic();

  // State to manage sorting order
  const [sortOrder, setSortOrder] = useState("ascending");

  // Fetch users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Fetch biodatas
  const { data: biodatas = [] } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas");
      return res.data;
    },
  });

  // Filter premium users and find their biodata
  const premiumMembers =
    Array.isArray(users) && Array.isArray(biodatas)
      ? users
          .filter((user) => user.role === "premium")
          .map((premiumUser) => {
            const biodata = biodatas.find(
              (data) => data.biodataId === premiumUser.biodataId
            );
            return biodata ? { ...premiumUser, ...biodata } : null;
          })
          .filter(Boolean)
      : [];

  // Sort premium members based on age and order
  const sortedMembers = [...premiumMembers].sort((a, b) => {
    if (sortOrder === "ascending") {
      return a.age - b.age;
    } else {
      return b.age - a.age;
    }
  });

  // Limit to 6 cards
  const displayedMembers = sortedMembers.slice(0, 6);

  return (
    <div className="max-w-screen-xl p-5 mx-auto">
      <h1 className="lg:text-3xl text-2xl font-bold text-center mb-8">
        Premium Members
      </h1>

      {/* Sorting Dropdown */}
      <div className="mb-5 text-center">
        <label className="text-lg font-semibold mr-3">Sort by Age:</label>
        <select
          className="border border-gray-300 rounded-lg px-4 py-2"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      {/* Premium Member Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedMembers.map((member) => (
          <div
            key={member.biodataId}
            className="bg-white shadow-lg rounded-lg p-5"
          >
            <img
              src={member.photoURL}
              alt={member.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">
              {member.name} ({member.biodataType})
            </h2>
            <p className="text-gray-600">
              <strong>Biodata ID:</strong> {member.biodataId}
            </p>
            <p className="text-gray-600">
              <strong>Permanent Division:</strong> {member.permanentDivision}
            </p>
            <p className="text-gray-600">
              <strong>Age:</strong> {member.age}
            </p>
            <p className="text-gray-600">
              <strong>Occupation:</strong> {member.occupation}
            </p>
            <Link
              to={`/biodatas/${member._id}`}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 inline-block"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumMember;
