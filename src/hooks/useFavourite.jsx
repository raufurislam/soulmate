import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useFavourite = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: favourite = [] } = useQuery({
    queryKey: ["favourites", user?.email], // Change queryKey to match the plural route
    queryFn: async () => {
      const res = await axiosSecure.get(`/favourites?email=${user.email}`); // Correct route
      return res.data;
    },
  });
  return [favourite, refetch];
};

export default useFavourite;
