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
  const displayedMembers = sortedMembers.slice(0, 8);

  return (
    <div className="max-w-screen-xl pt-4 lg:px-2 px-4 mx-auto">
      {/* Heading */}
      <div>
        <h1 className="lg:text-3xl md:text-2xl text-lg font-bold text-center text-text1 md:mb-3 mb-2">
          Meet Our Exclusive Premium Members
        </h1>
        <p className="text-center text-text2 md:text-xl mb-8">
          Discover verified and committed individuals looking for a meaningful
          connection.
        </p>
      </div>

      {/* Sorting Dropdown */}
      <div className="mb-5 text-center">
        <label className="text-lg font-semibold mr-3">Sort by Age:</label>
        <select
          className="border border-gray-300 bg-neutral rounded-lg px-4 py-2"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      {/* Premium Member Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedMembers.map((member) => (
          <div
            key={member.biodataId}
            className="bg-neutral shadow-md rounded-xl"
          >
            <img
              src={member.photoURL}
              alt={member.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="p-4">
              <div className="flex  justify-between">
                <h2 className="md:text-lg text-sm font-bold text-text1">
                  {member.name}
                </h2>
                <h3
                  className={`font-medium px-3 rounded-lg ${
                    member.biodataType === "Male"
                      ? "bg-green-200 text-text3 text-xs border md:text-sm border-green-500 "
                      : "bg-pink-200 text-text3 text-xs md:text-sm border border-pink-500 "
                  }`}
                >
                  {member.biodataType}
                </h3>
              </div>

              <p className="text-text1 font-medium">{member.occupation}</p>
              <p className="text-text2 mt-2">
                Biodata ID:{" "}
                <span className="font-semibold text-text1">
                  {member.biodataId}
                </span>
              </p>
              <p className="text-text2 mt-1">
                Age:{" "}
                <span className="text-text1 font-semibold">{member.age}</span>
              </p>

              {/* Parmanet division */}
              <p className="text-text2 mt-1">
                Location:{" "}
                <span className="text-text1 font-semibold">
                  {member.permanentDivision}
                </span>
              </p>

              <Link
                to={`/biodatas/${member._id}`}
                className="mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#E32636] inline-block"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumMember;
