import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content with flexible height */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer at the bottom */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Main;
