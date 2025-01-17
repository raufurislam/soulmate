import { Helmet } from "react-helmet-async";
import loginImg from "../../../assets/Sign_in_pana.png";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Login successful!");
        navigate(location?.state?.from || "/");
        // navigate("/"); // Redirect to home or dashboard
      })
      .catch((error) => {
        toast.error(error.message || "Failed to log in.");
      });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-28 py-4">
      <Helmet>
        <title>Soulmate | Login</title>
      </Helmet>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl border">
        {/* Image Section */}
        <div className="md:w-1/2 bg-gradient-to-b from-blue-50 to-blue-100 rounded-l-xl h-[520px]">
          <img
            src={loginImg}
            alt="Login"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Login Form */}
        <div className="md:w-1/2 p-10">
          <h2 className="font-semibold text-3xl mb-2">Welcome Back!</h2>
          <p className="text-gray-700 mb-6">Enter your email and password</p>
          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-5 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute top-9 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="text-white bg-[#ED5A6A] hover:bg-[#d64a5b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center"
            >
              Login
            </button>
            <br />
            <br />
          </form>
          <SocialLogin />
          <p className="text-center mt-4 text-gray-700">
            Don't have an account?
            <Link to="/auth/signUp" className="text-green-500 cursor-pointer">
              {" "}
              Sign Up Now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
