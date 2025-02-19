// import React from "react";
// import Swal from "sweetalert2";
// import useFavourite from "../../../hooks/useFavourite";

// const MyFavouritesPage = () => {
//   const [favourites, refetch] = useFavourite();

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(
//           `https://assignment-12-server-raufur-web-10-0934.vercel.app/favourites/${id}`,
//           {
//             method: "DELETE",
//           }
//         )
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.deletedCount > 0) {
//               Swal.fire("Deleted!", "The biodata has been removed.", "success");
//               refetch(); // Refresh the favourites list
//             }
//           });
//       }
//     });
//   };

//   return (
//     <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
//       <div className="max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold mb-6">My Favourite Biodatas</h1>
//         {favourites.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse border border-gray-200 text-left">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border border-gray-200 px-4 py-2">Name</th>
//                   <th className="border border-gray-200 px-4 py-2">
//                     Biodata ID
//                   </th>
//                   <th className="border border-gray-200 px-4 py-2">
//                     Permanent Address
//                   </th>
//                   <th className="border border-gray-200 px-4 py-2">
//                     Occupation
//                   </th>
//                   <th className="border border-gray-200 px-4 py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {favourites.map((favourite) => (
//                   <tr key={favourite._id} className="hover:bg-gray-50">
//                     <td className="border border-gray-200 px-4 py-2">
//                       {favourite.name || "N/A"}
//                     </td>
//                     <td className="border border-gray-200 px-4 py-2">
//                       {favourite.biodataId || "N/A"}
//                     </td>
//                     <td className="border border-gray-200 px-4 py-2">
//                       {favourite.permanentDivision || "N/A"}
//                     </td>
//                     <td className="border border-gray-200 px-4 py-2">
//                       {favourite.occupation || "N/A"}
//                     </td>
//                     <td className="border border-gray-200 px-4 py-2">
//                       <button
//                         onClick={() => handleDelete(favourite._id)}
//                         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-gray-600">No favourite biodata found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyFavouritesPage;

import React from "react";
import Swal from "sweetalert2";
import useFavourite from "../../../hooks/useFavourite";

const MyFavouritesPage = () => {
  const [favourites, refetch] = useFavourite();

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://assignment-12-server-raufur-web-10-0934.vercel.app/favourites/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "The biodata has been removed.", "success");
              refetch(); // Refresh the list
            }
          });
      }
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
      {/* Page Header */}
      <div className="bg-neutral shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-semibold text-text1">
          My Favourite Biodatas
        </h1>
      </div>

      {/* If No Data */}
      {favourites.length === 0 ? (
        <div className="bg-neutral shadow-lg rounded-lg p-6 text-center">
          <p className="text-gray-500 text-lg">No favourite biodata found.</p>
        </div>
      ) : (
        // If Data Exists, Show Table
        <div className="bg-neutral shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-neutral text-text2">
                <tr className="border-b border-text4">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Biodata ID</th>
                  <th className="px-4 py-3 font-semibold">Permanent Address</th>
                  <th className="px-4 py-3 font-semibold">Occupation</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {favourites.map((favourite, index) => (
                  <tr
                    key={favourite._id}
                    className={`border-b border-text4 ${
                      index % 2 === 0 ? "bg-accent" : "bg-accent"
                    } hover:bg-neutral transition`}
                  >
                    {/* Name */}
                    <td className="px-4 py-3 text-text1">
                      {favourite.name || "N/A"}
                    </td>

                    {/* Biodata ID */}
                    <td className="px-4 py-3 text-text1">
                      {favourite.biodataId || "N/A"}
                    </td>

                    {/* Permanent Address */}
                    <td className="px-4 py-3 text-text1">
                      {favourite.permanentDivision || "N/A"}
                    </td>

                    {/* Occupation */}
                    <td className="px-4 py-3 text-text1">
                      {favourite.occupation || "N/A"}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(favourite._id)}
                        className="px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFavouritesPage;
