import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useFavourite from "../../hooks/useFavourite";
import { useQuery } from "@tanstack/react-query";

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [biodata, setBiodata] = useState(null);
  const [similarBiodata, setSimilarBiodata] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [favourite, refetch] = useFavourite();

  useEffect(() => {
    fetch(
      `https://assignment-12-server-raufur-web-10-0934.vercel.app/biodatas/${id}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch biodata.");
        }
        return res.json();
      })
      .then((data) => {
        setBiodata(data);
        console.log(data);
        // Fetch similar biodata
        fetch(
          `https://assignment-12-server-raufur-web-10-0934.vercel.app/biodatas?biodataType=${data.biodataType}`
        )
          .then((res) => res.json())
          .then((similarData) =>
            setSimilarBiodata(similarData.filter((item) => item._id !== id))
          )
          .catch(() => setError("Failed to fetch similar biodata."));
      })
      .catch((err) => setError(err.message));
  }, [id]);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      // console.log(res.data);
      return res.data;
    },
  });

  // Get the user's role from the response
  const userRole = users?.role;

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

  const handleAddFavorite = () => {
    const isFavorite = favourite.some(
      (fav) => fav.biodataId === biodata.biodataId
    );

    if (isFavorite) {
      Swal.fire({
        position: "top-center",
        icon: "info",
        title: `${biodata.name} is already in your favorites.`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const favoriteItem = {
      name: biodata.name,
      biodataId: biodata.biodataId,
      permanentDivision: biodata.permanentDivision,
      occupation: biodata.occupation,
      email: user.email,
    };

    axiosSecure.post("/favourites", favoriteItem).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${biodata.name} added to your favorites.`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const handleViewProfile = (profileId) => {
    setShowMore(false); // Reset showMore state
    navigate(`/biodatas/${profileId}`);
  };

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

        {/* Conditionally render Contact Information Section */}
        {userRole === "premium" && (
          <div>
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
          </div>
        )}

        {/* Buttons Section */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => handleAddFavorite()}
            className="px-6 py-3 bg-[#ED5A6A] text-white rounded-lg hover:bg-[#d64a5b]"
          >
            Add to Favourites
          </button>

          <Link
            to={`/dashboard/payment/${biodata.biodataId}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Request Contact Information
          </Link>
        </div>
      </div>

      {/* Show More Section */}
      <div className="mt-8">
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>

        {showMore && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {similarBiodata.slice(0, 3).map((biodata) => (
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
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => handleViewProfile(biodata._id)} // Updated to use handleViewProfile
                    className="text-white bg-[#ED5A6A] hover:bg-[#d64a5b] rounded-full px-5 py-2.5"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
