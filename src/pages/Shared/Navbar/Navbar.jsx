// import React, { useState, useContext } from "react";
// import { Link, NavLink } from "react-router-dom";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../../Providers/AuthProviders";
// import { FiMenu } from "react-icons/fi";
// import useAdmin from "../../../hooks/useAdmin";

// const Navbar = () => {
//   const { user, logOut } = useContext(AuthContext);
//   const [isMenuOpen, setMenuOpen] = useState(false);
//   const [isAdmin] = useAdmin();

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ED5A6A",
//       cancelButtonColor: "#6c757d",
//       confirmButtonText: "Yes, log out",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logOut()
//           .then(() => {
//             Swal.fire(
//               "Logged Out!",
//               "You have been successfully logged out.",
//               "success"
//             );
//           })
//           .catch((error) => {
//             console.error("Logout error:", error);
//             Swal.fire("Error!", "Something went wrong during logout.", "error");
//           });
//       }
//     });
//   };

//   const link = (
//     <ul className="flex flex-col md:flex-row font-medium p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-8 border-gray-100 rounded-lg md:mt-0 md:border-0 bg-white md:bg-transparent lg:flex lg:space-x-8">
//       <li>
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive
//               ? "text-[#ED5A6A] font-semibold border-b-2 border-[#ED5A6A] pb-1"
//               : "text-gray-700 hover:text-[#ED5A6A]"
//           }
//         >
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/biodatas"
//           className={({ isActive }) =>
//             isActive
//               ? "text-[#ED5A6A] font-semibold border-b-2 border-[#ED5A6A] pb-1"
//               : "text-gray-700 hover:text-[#ED5A6A]"
//           }
//         >
//           Biodatas
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/about"
//           className={({ isActive }) =>
//             isActive
//               ? "text-[#ED5A6A] font-semibold border-b-2 border-[#ED5A6A] pb-1"
//               : "text-gray-700 hover:text-[#ED5A6A]"
//           }
//         >
//           About Us
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/contact"
//           className={({ isActive }) =>
//             isActive
//               ? "text-[#ED5A6A] font-semibold border-b-2 border-[#ED5A6A] pb-1"
//               : "text-gray-700 hover:text-[#ED5A6A]"
//           }
//         >
//           Contact Us
//         </NavLink>
//       </li>
//       {user && !isAdmin && (
//         <li>
//           <NavLink
//             to="/dashboard/viewBiodata"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-[#ED5A6A] font-semibold border-b-2 border-[#ED5A6A] pb-1"
//                 : "text-gray-700 hover:text-[#ED5A6A]"
//             }
//           >
//             Dashboard
//           </NavLink>
//         </li>
//       )}
//       {user && isAdmin && (
//         <li>
//           <NavLink
//             to="/dashboard/adminDashboard"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-[#ED5A6A] font-semibold border-b-2 border-[#ED5A6A] pb-1"
//                 : "text-gray-700 hover:text-[#ED5A6A]"
//             }
//           >
//             Dashboard
//           </NavLink>
//         </li>
//       )}
//       <li className="block lg:hidden">
//         {" "}
//         {user && user.email ? (
//           <button onClick={handleLogout} className="text-gray-700">
//             Logout
//           </button>
//         ) : (
//           <NavLink to="/auth/login" className="text-gray-700">
//             Login
//           </NavLink>
//         )}
//       </li>
//       {/* {user && user.email && (
//         <li>
//           <NavLink
//             to="/dashboard/viewBiodata"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-[#ED5A6A] font-semibold border-b-2 border-[#ED5A6A] pb-1"
//                 : "text-gray-700 hover:text-[#ED5A6A]"
//             }
//           >
//             Dashboard
//           </NavLink>
//         </li>
//       )} */}
//     </ul>
//   );

//   return (
//     <nav className="relative z-50">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         {/* Website Logo */}
//         <a href="/" className="flex items-center space-x-3">
//           <img
//             src="https://img.icons8.com/?size=40&id=33124&format=png"
//             className="h-8"
//             alt="Company Logo"
//           />
//           <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//             Soulmate
//           </span>
//         </a>

//         {/* User Actions */}
//         <div className="flex items-center md:order-2 space-x-3 relative">
//           {/* Profile Picture */}
//           <div className="relative group">
//             {user?.photoURL ? (
//               <img
//                 src={user.photoURL}
//                 alt="Profile"
//                 className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
//               />
//             ) : (
//               <img
//                 src="https://img.icons8.com/?size=80&id=ARWy_JjgohtA&format=png"
//                 alt="Default Avatar"
//                 className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
//               />
//             )}
//             {/* Tooltip */}
//             <div className="absolute hidden group-hover:block bg-gray-900 text-white text-sm rounded-md px-2 py-1 -bottom-8 left-1/2 transform -translate-x-1/2">
//               {user?.displayName || "User"}
//             </div>
//           </div>

//           {/* Logout/Login Button */}
//           {user && user.email ? (
//             <button
//               onClick={handleLogout}
//               className="hidden lg:block text-white bg-[#ED5A6A] hover:bg-[#d64a5b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5"
//             >
//               Logout
//             </button>
//           ) : (
//             <NavLink
//               to="/auth/login"
//               className="hidden lg:block text-white bg-[#ED5A6A] hover:bg-[#d64a5b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5"
//             >
//               Login
//             </NavLink>
//           )}

//           {/* Menu Icon */}
//           <button
//             onClick={() => setMenuOpen(!isMenuOpen)}
//             className="text-gray-700 dark:text-white hover:text-[#ED5A6A] focus:outline-none lg:hidden"
//           >
//             <FiMenu size={24} />
//           </button>
//         </div>

//         {/* Dropdown Menu (Small Screens) */}
//         <div
//           className={`absolute right-4 top-16 bg-white shadow-lg rounded-lg p-4 lg:hidden ${
//             isMenuOpen ? "block" : "hidden"
//           }`}
//           style={{ minWidth: "200px" }}
//         >
//           {link}
//         </div>

//         {/* Inline Menu (Large Screens) */}
//         <div className="hidden lg:flex lg:items-center lg:space-x-8 lg:order-1">
//           {link}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import { FiMenu } from "react-icons/fi";
import useAdmin from "../../../hooks/useAdmin";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const location = useLocation();
  const [isAdmin] = useAdmin();

  // Close dropdowns on route change
  useEffect(() => {
    setDropdownVisible(false);
    setMobileMenuVisible(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownVisible &&
        !event.target.closest(".profile-dropdown") // Ensures click is outside the dropdown
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownVisible]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire(
          "Logged Out!",
          "You have been successfully logged out.",
          "success"
        );
      }
    });
  };

  const links = (
    <div className="flex flex-col text-left lg:flex-row lg:gap-10 gap-3 px-2 py-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-medium underline-offset-4 underline lg:no-underline lg:border-blue-500 lg:border-b-2"
            : "text-slate-700 hover:text-blue-700 font-medium"
        }
        onClick={() => setMobileMenuVisible(false)} // Close mobile menu
      >
        Home
      </NavLink>
      <NavLink
        to="/biodatas"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-medium underline-offset-4 underline lg:no-underline lg:border-blue-500 lg:border-b-2"
            : "text-slate-700 hover:text-blue-700 font-medium"
        }
        onClick={() => setMobileMenuVisible(false)} // Close mobile menu
      >
        Biodatas
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-medium underline-offset-4 underline lg:no-underline lg:border-blue-500 lg:border-b-2"
            : "text-slate-700 hover:text-blue-700 font-medium"
        }
        onClick={() => setMobileMenuVisible(false)} // Close mobile menu
      >
        About
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-medium underline-offset-4 underline lg:no-underline lg:border-blue-500 lg:border-b-2"
            : "text-slate-700 hover:text-blue-700 font-medium"
        }
        onClick={() => setMobileMenuVisible(false)} // Close mobile menu
      >
        Contact
      </NavLink>

      {user && !isAdmin && (
        <NavLink
          //  ? "text-[#ED5A6A] font-medium underline-offset-4 underline lg:no-underline lg:border-[#ED5A6A] lg:border-b-2"
          //   : "text-slate-700 hover:text-[#ED5A6A] font-medium"
          to="/dashboard/viewBiodata"
          className={({ isActive }) =>
            isActive
              ? "text-[#ED5A6A] font-medium underline-offset-4 underline lg:no-underline lg:border-[#ED5A6A] lg:border-b-2"
              : "text-slate-700 hover:text-[#ED5A6A] font-medium"
          }
        >
          Dashboard
        </NavLink>
      )}
      {user && isAdmin && (
        <NavLink
          to="/dashboard/adminDashboard"
          className={({ isActive }) =>
            isActive
              ? "text-[#ED5A6A] font-medium underline-offset-4 underline lg:no-underline lg:border-[#ED5A6A] lg:border-b-2"
              : "text-slate-700 hover:text-[#ED5A6A] font-medium"
          }
        >
          Dashboard
        </NavLink>
      )}
    </div>
  );

  const profileLinks = (
    <div className="flex flex-col text-left gap-3 px-5 py-2">
      <NavLink
        to="/addItem"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-medium underline-offset-4 underline"
            : "text-slate-700 hover:text-blue-700 font-medium"
        }
      >
        Add Lost And Found
      </NavLink>
      <NavLink
        to="/allRecover"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-medium underline-offset-4 underline"
            : "text-slate-700 hover:text-blue-700 font-medium"
        }
      >
        All Recovered Item
      </NavLink>
      <NavLink
        to="/myItems"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-medium underline-offset-4 underline "
            : "text-slate-700 hover:text-blue-700 font-medium"
        }
      >
        Manage My Item
      </NavLink>
      {/* Logout Button (only when logged in) */}
      <button
        onClick={handleLogout}
        className="text-slate-700 hover:text-blue-700 font-medium text-left"
      >
        Logout{" "}
      </button>
    </div>
  );

  return (
    <div className="fixed top-0 w-full z-50 bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-300">
      <div className="max-w-screen-xl mx-auto navbar lg:px-2 px-4">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost pl-0 lg:hidden"
              onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {mobileMenuVisible && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-44 p-2 shadow z-50"
              >
                {links}
              </ul>
            )}
          </div>
          <NavLink to="/" className="btn btn-ghost text-xl px-0">
            <img
              src="https://i.ibb.co/5Gc9QGB/foundify-03.png"
              alt="Foundify Logo"
              className="w-6 object-cover"
            />
            Foundify
          </NavLink>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden h-full lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center ml-auto pr-0 relative">
          {user && user.email ? (
            <div className="profile-dropdown relative">
              <div
                className="bg-base-200 rounded-full w-8 h-8 md:w-11 md:h-11 flex items-center justify-center cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownVisible(!dropdownVisible);
                }}
              >
                <img
                  src={
                    user.photoURL ||
                    "https://img.icons8.com/?size=80&id=ARWy_JjgohtA&format=png"
                  }
                  alt="Profile"
                  className="object-cover rounded-full w-full h-full"
                />
                <span className="absolute text-neutral -bottom-2 -right-2 text-xs">
                  {dropdownVisible ? (
                    <IoIosArrowUp
                      size={22}
                      className="bg-base-200 border rounded-full"
                    />
                  ) : (
                    <IoIosArrowDown
                      size={22}
                      className="bg-base-200 rounded-full"
                    />
                  )}
                </span>
              </div>
              {dropdownVisible && (
                <div className="absolute right-0 md:top-12 top-10 mt-2 bg-white shadow-md rounded p-2 z-20 w-52">
                  {profileLinks}
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth/login" className="btn btn-neutral btn-sm md:btn-md">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
