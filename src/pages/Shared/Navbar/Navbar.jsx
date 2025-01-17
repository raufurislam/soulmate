import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProviders";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ED5A6A",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire(
              "Logged Out!",
              "You have been successfully logged out.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Logout error:", error);
            Swal.fire("Error!", "Something went wrong during logout.", "error");
          });
      }
    });
  };

  const link = (
    <div className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#ED5A6A] font-semibold border-b-2 border-[#ED5A6A] pb-1"
              : "text-gray-700 hover:text-[#ED5A6A]"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/biodatas"
          className={({ isActive }) =>
            isActive
              ? "text-[#ED5A6A] font-semibold border-b-2 border-[#ED5A6A] pb-1"
              : "text-gray-700 hover:text-[#ED5A6A]"
          }
        >
          Biodatas
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-[#ED5A6A] font-semibold border-b-2 border-[#ED5A6A] pb-1"
              : "text-gray-700 hover:text-[#ED5A6A]"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-[#ED5A6A] font-semibold border-b-2 border-[#ED5A6A] pb-1"
              : "text-gray-700 hover:text-[#ED5A6A]"
          }
        >
          Contact Us
        </NavLink>
      </li>
      {user && user.email && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-[#ED5A6A] font-semibold border-b-2 border-[#ED5A6A] pb-1"
                : "text-gray-700 hover:text-[#ED5A6A]"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </div>
  );

  return (
    <nav
    // className="bg-white shadow"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Website Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://img.icons8.com/?size=40&id=33124&format=png"
            className="h-8"
            alt="Company Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Soulmate
          </span>
        </a>

        {/* User Actions */}
        <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
          {/* User Profile Image with Hover Tooltip */}
          <div className="relative group">
            {user && user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-16 h-10 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <img
                src="https://img.icons8.com/?size=80&id=ARWy_JjgohtA&format=png"
                alt="Default Avatar"
                className="w-16 h-10 rounded-full object-cover border-2 border-gray-200"
              />
            )}

            {/* Tooltip - Only visible on hover */}
            <div className="absolute hidden group-hover:block bg-gray-900 text-white text-sm rounded-md px-2 py-1 -bottom-8 left-1/2 transform -translate-x-1/2">
              {user?.displayName || "User"}
            </div>
          </div>

          {/* Logout */}
          {user && user.email ? (
            <button
              onClick={handleLogout}
              className="text-white bg-[#ED5A6A] hover:bg-[#d64a5b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/auth/login"
              className="text-white bg-[#ED5A6A] hover:bg-[#d64a5b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Navigation Links */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul>{link}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
