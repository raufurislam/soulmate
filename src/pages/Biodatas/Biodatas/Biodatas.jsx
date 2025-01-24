import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Biodatas = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [filters, setFilters] = useState({
    minAge: "",
    maxAge: "",
    biodataType: "",
    division: "",
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const axiosPublic = useAxiosPublic();

  const fetchBiodatas = () => {
    const query = new URLSearchParams(filters).toString();
    axiosPublic
      .get(`/biodatas?${query}`)
      .then((res) => setBiodatas(res.data))
      .catch((error) => console.error("Error fetching biodatas:", error));
  };

  useEffect(() => {
    fetchBiodatas();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    fetchBiodatas();
    setIsDrawerOpen(false); // Close the drawer after applying filters
  };

  return (
    <div className="max-w-screen-xl p-4 mx-auto">
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
          {biodatas.length > 0 ? (
            biodatas.map((biodata) => (
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
    </div>
  );
};

export default Biodatas;
