import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SuccessCounterSection = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch biodata
  const { data: biodatas = [] } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const res = await axiosPublic.get("biodatas");
      return res.data;
    },
  });

  // Fetch marriages
  const { data: marriages = [] } = useQuery({
    queryKey: ["marriage"],
    queryFn: async () => {
      const res = await axiosPublic.get("marriage");
      return res.data;
    },
  });

  // Check if biodatas is an array before applying filter
  const femaleBiodatasCount = Array.isArray(biodatas)
    ? biodatas.filter((biodata) => biodata.biodataType === "Female").length
    : 0;

  const maleBiodatasCount = Array.isArray(biodatas)
    ? biodatas.filter((biodata) => biodata.biodataType === "Male").length
    : 0;

  return (
    <div className="max-w-screen-xl mx-auto pt-4 lg:px-2 px-4">
      {/* Heading */}
      <div>
        <h1 className="lg:text-3xl md:text-2xl text-lg font-bold text-center text-text1 md:mb-3 mb-2">
          Our Growing Matrimony Community
        </h1>
        <p className="text-center w-4/5 mx-auto text-text2 md:text-xl mb-8">
          Discover the strength of our network—where love finds its way!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Biodatas */}
        <div className="bg-green-100 p-5 text-center rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-green-600">Total Biodatas</h2>
          <p className="text-3xl font-semibold text-green-800">
            {Array.isArray(biodatas) ? biodatas.length : 0}
          </p>
        </div>

        {/* Female Biodatas Count */}
        <div className="bg-blue-100 p-5 text-center rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-600">Girls</h2>
          <p className="text-3xl font-semibold text-blue-800">
            {femaleBiodatasCount}
          </p>
        </div>

        {/* Male Biodatas Count */}
        <div className="bg-yellow-100 p-5 text-center rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-yellow-600">Boys</h2>
          <p className="text-3xl font-semibold text-yellow-800">
            {maleBiodatasCount}
          </p>
        </div>

        {/* Placeholder */}
        <div className="bg-red-100 p-5 text-center rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600">Marriages</h2>
          <p className="text-3xl font-semibold text-red-800">
            {Array.isArray(marriages) ? marriages.length : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessCounterSection;
