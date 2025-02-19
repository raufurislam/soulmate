import { Helmet } from "react-helmet-async";
import signUpImg from "../../../assets/Sign_up.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import { AuthContext } from "../../../Providers/AuthProviders";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a number."
      );
      return;
    }

    setError(""); // Clear any previous errors

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        // Update user profile with name and photo
        return updateUserProfile({
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          // create user entry in the database
          const userInfo = {
            name,
            email,
            role: "user",
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              toast.success("Registration successful!");
              navigate(location?.state?.from || "/");
            }
          });
        });
      })
      .catch((signUpError) => {
        console.error(signUpError);
        toast.error(
          signUpError.message || "Registration failed. Please try again."
        );
      });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-28 py-4">
      <Helmet>
        <title>Soulmate | Sign Up</title>
      </Helmet>
      <div className="flex flex-col md:flex-row justify-between items-center bg-neutral rounded-2xl">
        {/* Image Section */}
        <div className="md:w-1/2 bg-gradient-to-b from-blue-50 to-blue-100 rounded-l-xl h-96 lg:h-[700px]">
          <img
            src={signUpImg}
            alt="Login"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Sign Up Form */}
        <div className="md:w-1/2 w-full p-4 lg:px-10 lg:py-0">
          <h2 className="font-semibold text-text1 text-3xl mb-2">Sign Up!</h2>
          <p className="text-text1 mb-6">
            Please fill the form for Registration
          </p>
          <form onSubmit={handleSignUp}>
            {/* Name */}
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-text2"
              >
                Your Name*
              </label>
              <input
                type="text"
                id="name"
                className="bg-accent border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-text2"
              >
                Your Email*
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

            {/* Photo URL */}
            <div className="mb-5">
              <label
                htmlFor="photo"
                className="block mb-2 text-sm font-medium text-text2"
              >
                Photo URL*
              </label>
              <input
                type="url"
                id="photo"
                className="bg-accent border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="Photo URL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-5 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-text2"
              >
                Your Password*
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-accent border border-text4 text-text2 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(""); // Clear error when typing
                }}
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
              {error && <small className="text-red-600">{error}</small>}
            </div>

            <button
              type="submit"
              className="text-white bg-primary hover:bg-[#E32636] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center"
            >
              Sign Up
            </button>
            <br />
            <br />
            <SocialLogin />
          </form>
          <p className="text-center mt-4 text-text1">
            Already have an account?
            <Link to="/auth/login" className="text-green-500 cursor-pointer">
              {" "}
              Sign In Now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
