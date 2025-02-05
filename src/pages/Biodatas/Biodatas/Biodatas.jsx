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

  const itemsPerPage = 6;

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
    <div className="max-w-screen-xl p-4 mx-auto">
      <Helmet>
        <title>Soulmate | All Biodata</title>
      </Helmet>
      <div className="lg:flex lg:gap-4">
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

        {/* Filters Section for lg */}
        <div className="hidden lg:block lg:w-1/4 bg-red-500 p-4">
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
        </div>

        {/* Biodata Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full">
          {filteredBiodatas.length > 0 ? (
            filteredBiodatas.map((biodata) => (
              <div
                key={biodata._id}
                className="bg-white rounded-xl p-4 shadow-md"
              >
                <img
                  className="w-24 h-24 object-cover rounded-full mx-auto"
                  src={
                    biodata.photoURL ||
                    "https://static.vecteezy.com/system/resources/previews/007/407/994/non_2x/monochrome-icon-people-icon-design-user-icon-in-flat-style-vector.jpg"
                  }
                  alt={biodata.name || "No Name"}
                />
                <h1 className="text-xl font-semibold text-center mt-2">
                  {biodata.name || "Name N/A"}
                </h1>
                <h2 className="text-lg text-center">
                  {biodata.occupation || "Occupation N/A"}
                </h2>
                <div className="mt-4">
                  <p>Id No: {biodata.biodataId || "N/A"}</p>
                  <p>Gender: {biodata.biodataType || "N/A"}</p>
                  <p>Age: {biodata.age || "N/A"}</p>
                  <p>
                    Permanent Division: {biodata.permanentDivision || "N/A"}
                  </p>
                </div>
                <div className="flex justify-center mt-4">
                  <Link
                    to={`/biodatas/${biodata._id}`}
                    className="text-white bg-[#ED5A6A] hover:bg-[#d64a5b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No biodatas found.
            </p>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="max-w-screen-xl mx-auto p-5 flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <button
                onClick={() => handlePagination(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => handlePagination(pageNumber + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === pageNumber + 1
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-500 bg-white"
                  } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {pageNumber + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePagination(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
