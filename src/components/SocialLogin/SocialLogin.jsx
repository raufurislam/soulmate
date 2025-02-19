import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const axiosPublic = useAxiosPublic();
  const { googleSignIn, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          role: "user",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });

        setUser(result.user);
        toast.success("Google sign-in successful!");
        navigate(location?.state?.from || "/");
      })
      .catch((error) => {
        toast.error(error.message || "Google sign-in failed.");
      });
  };

  return (
    <div>
      <button
        className="flex gap-3 justify-center items-center w-full border-green-500 border hover:bg-gray-200 focus:ring-4 focus:outline-none text-text1 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle size={20} />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
