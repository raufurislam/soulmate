import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const DetailsPage = () => {
  const { id } = useParams();
  const [biodata, setBiodata] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/biodatas/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch biodata.");
        }
        return res.json();
      })
      .then((data) => setBiodata(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <div className="max-w-screen-xl p-4 mx-auto text-center text-red-500">
        <h1>{error}</h1>
        <Link to="/biodatas" className="text-blue-500 underline">
          Back to Biodatas
        </Link>
      </div>
    );
  }

  if (!biodata) {
    return (
      <div className="max-w-screen-xl p-4 mx-auto text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-32 py-6">
      <div className="max-w-screen-xl shadow-lg mx-auto bg-white rounded-2xl border p-6">
        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div>
            <img
              className="w-40 h-40 rounded-full object-cover"
              src={
                biodata?.photoURL ||
                "https://static.vecteezy.com/system/resources/previews/007/407/994/non_2x/monochrome-icon-people-icon-design-user-icon-in-flat-style-vector.jpg"
              }
              alt="Profile"
            />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              {biodata?.name || "Name N/A"}
            </h1>
            <p className="text-gray-600 font-semibold">
              {biodata?.occupation || "Occupation N/A"}
            </p>
            <p className="text-gray-600 font-semibold">
              {biodata?.presentDivision || "Present Division N/A"}
            </p>
          </div>
        </div>

        {/* Personal Information Section */}
        <h2 className="text-xl font-bold mt-6 mb-4">Personal Information</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <small className="text-gray-600">Biodata Type</small>
            <h3 className="font-semibold">{biodata?.biodataType || "N/A"}</h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-gray-600">Permanent Division</small>
            <h3 className="font-semibold">
              {biodata?.permanentDivision || "N/A"}
            </h3>
          </div>
          <div>
            <small className="text-gray-600">Father's Name</small>
            <h3 className="font-semibold">{biodata?.fathersName || "N/A"}</h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-gray-600">Mother's Name</small>
            <h3 className="font-semibold">{biodata?.mothersName || "N/A"}</h3>
          </div>

          <div>
            <small className="text-gray-600">Date of Birth</small>
            <h3 className="font-semibold">
              {biodata?.birthDate
                ? new Date(biodata?.birthDate).toLocaleDateString()
                : "N/A"}
            </h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-gray-600">Age</small>
            <h3 className="font-semibold">{biodata?.age || "N/A"}</h3>
          </div>
          <div>
            <small className="text-gray-600">Height</small>
            <h3 className="font-semibold">{biodata?.height || "N/A"}</h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-gray-600">Weight</small>
            <h3 className="font-semibold">{biodata?.weight || "N/A"}</h3>
          </div>
          <div>
            <small className="text-gray-600">Race (Skin Color)</small>
            <h3 className="font-semibold">{biodata?.race || "N/A"}</h3>
          </div>
        </div>

        {/* Partner Information Section */}
        <h2 className="text-xl font-bold mt-6 mb-4">
          Expected Partner Information
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <small className="text-gray-600">Expected Partner Age</small>
            <h3 className="font-semibold">{biodata?.partnerAge || "N/A"}</h3>
          </div>
          <div>
            <small className="text-gray-600">Expected Partner Height</small>
            <h3 className="font-semibold">{biodata?.partnerHeight || "N/A"}</h3>
          </div>
          <div className="md:col-span-2">
            <small className="text-gray-600">Expected Partner Weight</small>
            <h3 className="font-semibold">{biodata?.partnerWeight || "N/A"}</h3>
          </div>
        </div>

        {/* Contact Information Section */}
        <h2 className="text-xl font-bold mt-6 mb-4">Contact Information</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <small className="text-gray-600">Email</small>
            <h3 className="font-semibold">{biodata?.email || "N/A"}</h3>
          </div>
          <div className="lg:col-span-2">
            <small className="text-gray-600">Mobile Number</small>
            <h3 className="font-semibold">{biodata?.mobile || "N/A"}</h3>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 bg-[#ED5A6A] text-white rounded-lg hover:bg-[#d64a5b]">
            Add to Favourites
          </button>
          <Link
            to="/dashboard/editBiodata"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Request Contact Information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
