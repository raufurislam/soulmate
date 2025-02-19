import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import useAdmin from "../../../hooks/useAdmin";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Swal from "sweetalert2";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const location = useLocation();
  const [isAdmin] = useAdmin();
  const [theme, setTheme] = useState("light");
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 0);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

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
            ? "text-primary font-bold underline-offset-4 underline lg:no-underline lg:border-primary lg:border-b-2"
            : "text-text1 hover:text-primary font-medium"
        }
        onClick={() => setMobileMenuVisible(false)} // Close mobile menu
      >
        Home
      </NavLink>
      <NavLink
        to="/biodatas"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-bold underline-offset-4 underline lg:no-underline lg:border-primary lg:border-b-2"
            : "text-text1 hover:text-primary font-medium"
        }
        onClick={() => setMobileMenuVisible(false)} // Close mobile menu
      >
        Biodatas
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-bold underline-offset-4 underline lg:no-underline lg:border-primary lg:border-b-2"
            : "text-text1 hover:text-primary font-medium"
        }
        onClick={() => setMobileMenuVisible(false)} // Close mobile menu
      >
        About
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-bold underline-offset-4 underline lg:no-underline lg:border-primary lg:border-b-2"
            : "text-text1 hover:text-primary font-medium"
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
              ? "text-primary font-bold underline-offset-4 underline lg:no-underline lg:border-primary lg:border-b-2"
              : "text-text1 hover:text-primary font-medium"
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
              ? "text-primary font-bold underline-offset-4 underline lg:no-underline lg:border-primary lg:border-b-2"
              : "text-text1 hover:text-primary font-medium"
          }
        >
          Dashboard
        </NavLink>
      )}
    </div>
  );

  const profileLinks = (
    <div className="flex flex-col text-left gap-3 px-5 py-2">
      {/* <NavLink
        to="/myItems"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-medium underline-offset-4 underline "
            : "text-slate-700 hover:text-blue-700 font-medium"
        }
      >
        Manage My Item
      </NavLink> */}
      {/* Logout Button (only when logged in) */}
      <button
        onClick={handleLogout}
        className="text-text1 hover:text-primary font-medium text-left"
      >
        Logout{" "}
      </button>
    </div>
  );

  return (
    <div
      className={`fixed top-0 w-full z-50 bg-base-100/80 backdrop-blur-xl transition-all duration-300`}
    >
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
              src="https://img.icons8.com/?size=40&id=33124&format=png"
              alt="Foundify Logo"
              className="w-6 object-cover"
            />
            Soulmate
          </NavLink>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden h-full lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center ml-auto pr-0 relative">
          {/* Toggle theme */}
          <button
            onClick={toggleTheme}
            className=" ml-2 text-primary border-primary rounded-full w-8 h-8 md:w-11 md:h-11  mr-3 border text-xl flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

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
                      className="bg-text1 text-neutral border rounded-full"
                    />
                  ) : (
                    <IoIosArrowDown
                      size={22}
                      className="bg-text1 text-neutral border rounded-full"
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
            <Link
              to="/auth/login"
              className="text-white bg-primary hover:bg-[#d64a5b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
