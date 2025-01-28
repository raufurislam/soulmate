import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useFavourite from "../../hooks/useFavourite";

const DetailsPage = () => {
  const { id } = useParams();
  const [biodata, setBiodata] = useState(null);

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
      console.log(res.data);
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

          {/* only premium member and those who payment for request contact information only can see this section  */}
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
            <button
              onClick={() => handleAddFavorite()}
              className="px-6 py-3 bg-[#ED5A6A] text-white rounded-lg hover:bg-[#d64a5b]"
            >
              Add to Favourites
            </button>
            <Link
              to="/dashboard/payment"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              Request Contact Information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
