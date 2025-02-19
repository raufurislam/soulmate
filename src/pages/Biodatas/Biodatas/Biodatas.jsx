import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Biodatas = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [filteredBiodatas, setFilteredBiodatas] = useState([]);
  const [filters, setFilters] = useState({
    minAge: "",
    maxAge: "",
    biodataType: "",
    division: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const axiosPublic = useAxiosPublic();

  const itemsPerPage = 12;

  const fetchBiodatas = () => {
    const query = new URLSearchParams(filters).toString();
    axiosPublic
      .get(`/biodatas?${query}`)
      .then((res) => {
        setBiodatas(res.data);
        setTotalPages(Math.ceil(res.data.length / itemsPerPage)); // Calculate total pages
      })
      .catch((error) => console.error("Error fetching biodatas:", error));
  };

  useEffect(() => {
    fetchBiodatas();
  }, [filters]); // Run fetch when filters change

  useEffect(() => {
    // Paginate biodatas based on currentPage and itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredBiodatas(biodatas.slice(startIndex, endIndex));
  }, [biodatas, currentPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    setCurrentPage(1); // Reset to the first page when filters are applied
    fetchBiodatas();
    setIsDrawerOpen(false); // Close the drawer after applying filters
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-screen-xl mx-auto pt-4 lg:px-2 px-4">
      <Helmet>
        <title>Soulmate | All Biodata</title>
      </Helmet>

      {/* Filters Section at the top for lg*/}
      <div className="bg-primary hidden lg:block p-4 rounded-xl mb-6">
        <h2 className="text-center font-bold text-xl mb-3 text-white">
          Filter
        </h2>
        <div className="flex justify-between lg:gap-6 gap-4">
          {/* Min Age */}
          <div className="flex flex-col w-full sm:w-1/4">
            <label className="text-white font-medium">Min Age</label>
            <input
              type="number"
              name="minAge"
              value={filters.minAge}
              onChange={handleFilterChange}
              className="w-full mt-2 p-2 bg-neutral border-none rounded-lg"
              placeholder="Min Age"
            />
          </div>
          {/* Max Age */}
          <div className="flex flex-col w-full sm:w-1/4">
            <label className="text-white font-medium">Max Age</label>
            <input
              type="number"
              name="maxAge"
              value={filters.maxAge}
              onChange={handleFilterChange}
              className="w-full mt-2 p-2 bg-neutral border-none rounded-lg"
              placeholder="Max Age"
            />
          </div>
          {/* Biodata Type */}
          <div className="flex flex-col w-full sm:w-1/4">
            <label className="text-white font-medium">Biodata Type</label>
            <select
              name="biodataType"
              value={filters.biodataType}
              onChange={handleFilterChange}
              className="w-full mt-2 p-2 bg-neutral border-none rounded-lg"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          {/* Division */}
          <div className="flex flex-col w-full sm:w-1/4">
            <label className="text-white font-medium">Division</label>
            <select
              name="division"
              value={filters.division}
              onChange={handleFilterChange}
              className="w-full mt-2 p-2 bg-neutral border-none rounded-lg"
            >
              <option value="">All</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Khulna">Khulna</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Barisal">Barisal</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
            </select>
          </div>
          {/* Apply Filters Button
          <div className="flex justify-center sm:justify-start mt-4 sm:mt-0 w-full sm:w-auto">
            <button
              onClick={handleApplyFilters}
              className="bg-white text-red-500 py-2 px-6 rounded-lg font-semibold w-full sm:w-auto"
            >
              Apply Filters
            </button>
          </div> */}
        </div>
      </div>

      {/* Drawer Toggle Button for sm/md */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-red-500 text-white p-2 rounded font-bold w-full"
        >
          Open Filters
        </button>
      </div>

      {/* Drawer for sm/md */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-3/4 sm:w-1/2 bg-red-500 p-4 h-full overflow-y-auto">
            <h3 className="text-white font-semibold">Filters</h3>
            <div className="mt-4">
              <label className="block text-white">Min Age</label>
              <input
                type="number"
                name="minAge"
                value={filters.minAge}
                onChange={handleFilterChange}
                className="w-full mt-2 p-2 rounded"
              />
            </div>
            <div className="mt-4">
              <label className="block text-white">Max Age</label>
              <input
                type="number"
                name="maxAge"
                value={filters.maxAge}
                onChange={handleFilterChange}
                className="w-full mt-2 p-2 rounded"
              />
            </div>
            <div className="mt-4">
              <label className="block text-white">Biodata Type</label>
              <select
                name="biodataType"
                value={filters.biodataType}
                onChange={handleFilterChange}
                className="w-full mt-2 p-2 rounded"
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-white">Division</label>
              <select
                name="division"
                value={filters.division}
                onChange={handleFilterChange}
                className="w-full mt-2 p-2 rounded"
              >
                <option value="">All</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Khulna">Khulna</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Barisal">Barisal</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
              </select>
            </div>
            <button
              onClick={handleApplyFilters}
              className="w-full mt-6 bg-white text-red-500 p-2 rounded font-bold"
            >
              Apply Filters
            </button>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-full mt-2 bg-white text-gray-500 p-2 rounded font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Biodata Cards Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBiodatas.length > 0 ? (
          filteredBiodatas.map((biodata) => (
            <div key={biodata._id} className="bg-neutral rounded-xl shadow-md">
              <img
                className="w-full h-48 object-cover rounded-lg"
                src={
                  biodata.photoURL ||
                  "https://static.vecteezy.com/system/resources/previews/007/407/994/non_2x/monochrome-icon-people-icon-design-user-icon-in-flat-style-vector.jpg"
                }
                alt={biodata.name || "No Name"}
              />
              <div className="p-4">
                {/* ----------------------------- */}
                <div className="flex justify-between">
                  <h2 className="md:text-lg font-bold text-text1">
                    {biodata.name}
                  </h2>
                  <h3
                    className={`font-medium px-3 rounded-lg ${
                      biodata.biodataType === "Male"
                        ? "bg-green-200 text-text3 border border-green-500 "
                        : "bg-pink-200 text-text3 border border-pink-500 "
                    }`}
                  >
                    {biodata.biodataType}
                  </h3>
                </div>
                {/* ----------------------------- */}
                <p className="text-text2 mt-2">
                  Biodata ID:{" "}
                  <span className="font-semibold text-text1">
                    {biodata.biodataId}
                  </span>
                </p>
                <p className="text-text2 mt-1">
                  Age:{" "}
                  <span className="text-text1 font-semibold">
                    {biodata.age}
                  </span>
                </p>

                {/* Parmanet division */}
                <p className="text-text2 mt-1">
                  Location:{" "}
                  <span className="text-text1 font-semibold">
                    {biodata.permanentDivision}
                  </span>
                </p>

                <Link
                  to={`/biodatas/${biodata._id}`}
                  className="mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#E32636] inline-block"
                >
                  View Profile
                </Link>

                {/* ----------------------------- */}
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No biodatas found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="max-w-screen-xl mx-auto p-5 flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <button
                onClick={() => handlePagination(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 leading-tight text-text2 bg-neutral border border-gray-300 rounded-s-lg hover:bg-base-100 hover:text-primary"
              >
                Prev
              </button>
            </li>
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => handlePagination(pageNumber + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === pageNumber + 1
                      ? "text-primary bg-neutral"
                      : "text-text2 bg-neutral"
                  } border border-gray-300 hover:bg-base-100 hover:text-primary`}
                >
                  {pageNumber + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePagination(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-text2 bg-neutral border border-gray-300 rounded-e-lg hover:bg-base-100 hover:text-primary"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Biodatas;
