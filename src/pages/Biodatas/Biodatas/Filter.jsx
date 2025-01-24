import React, { useState } from "react";

const Filter = ({ onFilter }) => {
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [biodataType, setBiodataType] = useState("");
  const [permanentDivision, setPermanentDivision] = useState("");

  const handleFilter = () => {
    onFilter({ minAge, maxAge, biodataType, permanentDivision });
  };

  const divisions = [
    "Dhaka",
    "Chittagong",
    "Khulna",
    "Sylhet",
    "Rajshahi",
    "Barisal",
    "Rangpur",
    "Mymensingh",
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Filter Biodatas</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Age Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Age"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Max Age"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Biodata Type</label>
          <select
            value={biodataType}
            onChange={(e) => setBiodataType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Permanent Division
          </label>
          <select
            value={permanentDivision}
            onChange={(e) => setPermanentDivision(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">All</option>
            {divisions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
