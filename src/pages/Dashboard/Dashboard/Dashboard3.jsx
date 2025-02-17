import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import useAdmin from "../../../hooks/useAdmin";
import { TbUser, TbUserEdit } from "react-icons/tb";
import { RiContactsBook2Line, RiHome9Line } from "react-icons/ri";
import { LuBookHeart } from "react-icons/lu";
import { GiBigDiamondRing } from "react-icons/gi";

const Dashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();

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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64  bg-gray-900 text-white p-5 space-y-6 transition-transform duration-300 transform lg:translate-x-0 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:block lg:static z-50`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between">
          {/* <h1 className="text-xl font-bold">Dashboard</h1> */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://img.icons8.com/?size=40&id=33124&format=png"
              className="h-8"
              alt="Company Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Soulmate
            </span>
          </Link>
          <button className="lg:hidden" onClick={() => setMenuOpen(false)}>
            <AiOutlineClose size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          {isAdmin ? (
            <>
              <NavLink
                to="/dashboard/adminDashboard"
                className="hover:text-[#ED5A6A]"
              >
                Admin Dashboard
              </NavLink>
              <NavLink to="/dashboard/manage" className="hover:text-[#ED5A6A]">
                Manage Users
              </NavLink>
              <NavLink
                to="/dashboard/approvedPremium"
                className="hover:text-[#ED5A6A]"
              >
                Approved Premium
              </NavLink>
              <NavLink
                to="/dashboard/approvedContactRequest"
                className="hover:text-[#ED5A6A]"
              >
                Approved Contact Request
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard/viewBiodata"
                className="hover:text-[#ED5A6A] flex items-center gap-3"
              >
                <TbUser />
                View Biodata
              </NavLink>
              <NavLink
                to="/dashboard/editBiodata"
                className="hover:text-[#ED5A6A] flex items-center gap-3"
              >
                <TbUserEdit />
                Edit Biodata
              </NavLink>
              <NavLink
                to="/dashboard/myContact"
                className="hover:text-[#ED5A6A] flex items-center gap-3"
              >
                <RiContactsBook2Line />
                My Contact
              </NavLink>
              <NavLink
                to="/dashboard/favourites"
                className="hover:text-[#ED5A6A] flex items-center gap-3"
              >
                <LuBookHeart />
                Favourites
              </NavLink>
              <NavLink
                to="/dashboard/married"
                className="hover:text-[#ED5A6A] flex items-center gap-3"
              >
                <GiBigDiamondRing />
                Got Married
              </NavLink>
            </>
          )}

          <NavLink
            to="/"
            className="hover:text-[#ED5A6A] flex items-center gap-3"
          >
            <RiHome9Line />
            Back to Home
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-left hover:text-[#ED5A6A]"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <nav className="p-4 shadow-md flex justify-between items-center bg-white">
          <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
            <FiMenu size={24} />
          </button>
          <h2 className="text-xl font-bold">Dashboard</h2>
          <img
            src={
              user?.photoURL ||
              "https://img.icons8.com/?size=80&id=ARWy_JjgohtA&format=png"
            }
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-200"
          />
        </nav>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
