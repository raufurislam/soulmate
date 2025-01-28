import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://assignment-12-server-raufur-web-10-0934.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
