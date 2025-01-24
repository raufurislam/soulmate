import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Biodatas = () => {
  const [biodatas, setBiodatas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/biodatas")
      .then((res) => res.json())
      .then((data) => setBiodatas(data))
      .catch((error) => console.error("Error fetching biodatas:", error));
  }, []);

  return (
    <div className="max-w-screen-xl p-4 mx-auto">
      <div className="lg:flex lg:gap-4">
        <div className="lg:w-1/4 bg-red-500 p-4 hidden lg:block">
          <h3 className="text-white font-semibold">Menu (Visible on LG)</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
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
