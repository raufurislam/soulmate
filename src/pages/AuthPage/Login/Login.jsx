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
      })
      .catch((error) => {
        toast.error(error.message || "Failed to log in.");
      });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-28 py-4">
      <Helmet>
        <title>Soulmate | Login</title>
      </Helmet>
      <div className="flex flex-col md:flex-row justify-between items-center bg-neutral rounded-2xl">
        {/* Image Section */}
        <div className="md:w-1/2 bg-gradient-to-b from-blue-50 to-blue-100 rounded-l-xl h-80 md:h-[520px]">
          <img
            src={loginImg}
            alt="Login"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Login Form */}
        <div className="md:w-1/2 w-full p-4 lg:p-10">
          <h2 className="font-semibold text-text1 text-3xl mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-700 mb-6 text-text2">
            Enter your email and password
          </p>
          {/* make a demo credential. when user click this button immidietly login*/}
          {/* admin : "raufur@gmail.com" and "password:753951Bd" */}
          {/* premium : "raufur30@gmail.com" and "password:753951Bd" */}

          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-text2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-accent border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-5 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-text2"
              >
                Your Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-accent border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
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
              className="text-white bg-primary hover:bg-[#E32636] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center"
            >
              Login
            </button>
            <br />
            <br />
          </form>
          <SocialLogin />
          <p className="text-center mt-4 text-text2">
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
