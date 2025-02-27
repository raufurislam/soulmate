import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import useAdmin from "../../../hooks/useAdmin";
import { TbUser, TbUserEdit } from "react-icons/tb";
import { RiContactsBook2Line, RiHome9Line } from "react-icons/ri";
import { LuBookHeart, LuContact, LuLayoutDashboard } from "react-icons/lu";
import { GiBigDiamondRing } from "react-icons/gi";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  MdOutlineAddIcCall,
  MdOutlineManageAccounts,
  MdOutlineWorkspacePremium,
} from "react-icons/md";
import FooterDashboard from "../../Shared/Footer/FooterDashboard";
import { IoInformationCircleOutline } from "react-icons/io5";

const Dashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [theme, setTheme] = useState("light");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const location = useLocation();

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
            navigate("/");
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

  const profileLinks = (
    <div className="flex flex-col text-left gap-3 px-5 py-2">
      {/* Check if user exists before displaying their info */}
      {user ? (
        <>
          <div className="text-text1 font-medium">
            <p>{user.displayName || "User"}</p>
            <p className="text-sm text-text2">{user.email}</p>
          </div>

          <div className="border w-full"></div>

          <button
            onClick={handleLogout}
            className="text-text1 hover:text-primary font-medium text-left"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p> // Or a different loading state
      )}
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-[#252631] text-white p-5 space-y-6 z-50 transition-transform lg:transform-none ${
          isMenuOpen ? "transform-none" : "transform -translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://img.icons8.com/?size=40&id=33124&format=png"
              className="h-8"
              alt="Company Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Soulmate
            </span>
          </Link>
          <button className="lg:hidden" onClick={() => setMenuOpen(false)}>
            <AiOutlineClose size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <div className="pt-6">
            <p className="text-[#F1F1F1] font-bold ">Dashboard</p>
          </div>
          {isAdmin ? (
            <>
              <NavLink
                to="/dashboard/adminDashboard"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 transition ${
                    isActive
                      ? "text-primary font-bold border-primary border-b-2 w-fit"
                      : "text-[#F1F1F1] hover:text-primary font-medium"
                  }`
                }
              >
                <LuLayoutDashboard />
                Admin Dashboard
              </NavLink>
              <NavLink
                to="/dashboard/manage"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 transition ${
                    isActive
                      ? "text-primary font-bold border-primary border-b-2 w-fit"
                      : "text-[#F1F1F1] hover:text-primary font-medium"
                  }`
                }
              >
                <MdOutlineManageAccounts />
                Manage Users
              </NavLink>
              <NavLink
                to="/dashboard/approvedPremium"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 transition ${
                    isActive
                      ? "text-primary font-bold border-primary border-b-2 w-fit"
                      : "text-[#F1F1F1] hover:text-primary font-medium"
                  }`
                }
              >
                <MdOutlineWorkspacePremium />
                Premium Request
              </NavLink>
              <NavLink
                to="/dashboard/approvedContactRequest"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 transition ${
                    isActive
                      ? "text-primary font-bold border-primary border-b-2 w-fit"
                      : "text-[#F1F1F1] hover:text-primary font-medium"
                  }`
                }
              >
                <LuContact />
                Contact Request
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard/viewBiodata"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 transition ${
                    isActive
                      ? "text-primary font-bold border-primary border-b-2 w-fit"
                      : "text-[#F1F1F1] hover:text-primary font-medium"
                  }`
                }
              >
                <TbUser />
                View Biodata
              </NavLink>

              <NavLink
                to="/dashboard/editBiodata"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 transition ${
                    isActive
                      ? "text-primary font-bold border-primary border-b-2 w-fit"
                      : "text-[#F1F1F1] hover:text-primary font-medium"
                  }`
                }
              >
                <TbUserEdit />
                Edit Biodata
              </NavLink>
              <NavLink
                to="/dashboard/myContact"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 transition ${
                    isActive
                      ? "text-primary font-bold border-primary border-b-2 w-fit"
                      : "text-[#F1F1F1] hover:text-primary font-medium"
                  }`
                }
              >
                <RiContactsBook2Line />
                My Contact
              </NavLink>
              <NavLink
                to="/dashboard/favourites"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 transition ${
                    isActive
                      ? "text-primary font-bold border-primary border-b-2 w-fit"
                      : "text-[#F1F1F1] hover:text-primary font-medium"
                  }`
                }
              >
                <LuBookHeart />
                Favourites
              </NavLink>
              <NavLink
                to="/dashboard/married"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 transition ${
                    isActive
                      ? "text-primary font-bold border-primary border-b-2 w-fit"
                      : "text-[#F1F1F1] hover:text-primary font-medium"
                  }`
                }
              >
                <GiBigDiamondRing />
                Got Married
              </NavLink>
            </>
          )}

          {/* <div className="border border-text2 w-full"></div> */}
          <div className="pt-6">
            <p className="text-[#F1F1F1] font-bold ">Main</p>
          </div>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 transition ${
                isActive
                  ? "text-primary font-bold border-primary border-b-2 w-fit"
                  : "text-[#F1F1F1] hover:text-primary font-medium"
              }`
            }
          >
            <RiHome9Line />
            Back to Home
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 transition ${
                isActive
                  ? "text-primary font-bold border-primary border-b-2 w-fit"
                  : "text-[#F1F1F1] hover:text-primary font-medium"
              }`
            }
          >
            <IoInformationCircleOutline />
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 transition ${
                isActive
                  ? "text-primary font-bold border-primary border-b-2 w-fit"
                  : "text-[#F1F1F1] hover:text-primary font-medium"
              }`
            }
          >
            <MdOutlineAddIcCall />
            Contact Us
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 overflow-hidden">
        {/* Top Navbar */}
        <nav className="px-6 py-4 shadow-md flex justify-between items-center bg-base-100 backdrop-blur-xl sticky w-full top-0 z-40">
          <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
            <FiMenu size={24} />
          </button>
          <h2 className="text-xl font-bold hidden lg:block">Dashboard</h2>
          <Link to="/" className="lg:hidden flex items-center space-x-3">
            <img
              src="https://img.icons8.com/?size=40&id=33124&format=png"
              className="h-8"
              alt="Company Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Soulmate
            </span>
          </Link>
          <div className="flex items-center">
            {/* Toggle theme */}
            <button
              onClick={toggleTheme}
              className=" ml-2 text-primary border-primary rounded-full w-8 h-8 md:w-11 md:h-11  mr-3 border text-xl flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

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
                      className="bg-text1 text-neutral rounded-full"
                    />
                  )}
                </span>
              </div>
              {dropdownVisible && (
                <div className="absolute right-0 md:top-12 top-10 mt-2 bg-neutral shadow-md rounded p-2 z-20 w-52">
                  {profileLinks}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-0 pb-10 overflow-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
