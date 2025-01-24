import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useBiodatas = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const {
    data: biodatas = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/biodatas?email=${user.email}`);
      return res.data[0];
    },
  });

  return [biodatas, loading, refetch];
};

export default useBiodatas;
