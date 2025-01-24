import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProviders";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setMenuOpen] = useState(false);

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
    <ul className="flex flex-col md:flex-row font-medium p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-8 border-gray-100 rounded-lg md:mt-0 md:border-0 bg-white md:bg-transparent lg:flex lg:space-x-8">
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
            to="/dashboard/viewBiodata"
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
    </ul>
  );

  return (
    <nav className="relative z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Website Logo */}
        <a href="/" className="flex items-center space-x-3">
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
        <div className="flex items-center md:order-2 space-x-3 relative">
          {/* Profile Picture */}
          <div className="relative group">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <img
                src="https://img.icons8.com/?size=80&id=ARWy_JjgohtA&format=png"
                alt="Default Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
              />
            )}
            {/* Tooltip */}
            <div className="absolute hidden group-hover:block bg-gray-900 text-white text-sm rounded-md px-2 py-1 -bottom-8 left-1/2 transform -translate-x-1/2">
              {user?.displayName || "User"}
            </div>
          </div>

          {/* Logout/Login Button */}
          {user && user.email ? (
            <button
              onClick={handleLogout}
              className="hidden lg:block text-white bg-[#ED5A6A] hover:bg-[#d64a5b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/auth/login"
              className="hidden lg:block text-white bg-[#ED5A6A] hover:bg-[#d64a5b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5"
            >
              Login
            </NavLink>
          )}

          {/* Menu Icon */}
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="text-gray-700 dark:text-white hover:text-[#ED5A6A] focus:outline-none lg:hidden"
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* Dropdown Menu (Small Screens) */}
        <div
          className={`absolute right-4 top-16 bg-white shadow-lg rounded-lg p-4 lg:hidden ${
            isMenuOpen ? "block" : "hidden"
          }`}
          style={{ minWidth: "200px" }}
        >
          {link}
        </div>

        {/* Inline Menu (Large Screens) */}
        <div className="hidden lg:flex lg:items-center lg:space-x-8 lg:order-1">
          {link}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
