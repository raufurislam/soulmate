import React from "react";
import {
  ShieldCheck,
  Lock,
  HeartHandshake,
  Users,
  ThumbsUp,
  Star,
} from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Verified Profiles",
      icon: <ShieldCheck size={40} className="text-red-500" />,
      description: "We ensure authenticity with profile verification.",
    },
    {
      title: "Privacy & Security",
      icon: <Lock size={40} className="text-blue-500" />,
      description: "Your personal details are kept secure.",
    },
    {
      title: "Success Stories",
      icon: <HeartHandshake size={40} className="text-pink-500" />,
      description: "Thousands have found their soulmate here.",
    },
    {
      title: "Wide Network",
      icon: <Users size={40} className="text-purple-500" />,
      description: "Connect with people from diverse backgrounds.",
    },
    {
      title: "Trusted by Millions",
      icon: <ThumbsUp size={40} className="text-green-500" />,
      description: "Millions trust us to find their perfect match.",
    },
    {
      title: "Premium Matches",
      icon: <Star size={40} className="text-yellow-500" />,
      description: "Get access to exclusive premium matchmaking.",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto pt-4 lg:px-2 px-4">
      {/* Heading */}
      <div>
        <h1 className="lg:text-3xl md:text-2xl text-lg font-bold text-center text-text1 md:mb-3 mb-2">
          Why Choose Us?
        </h1>
        <p className="text-center w-4/5 mx-auto text-text2 md:text-xl mb-8">
          The best place to find your perfect match
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-neutral rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center text-center"
          >
            <div className="bg-base-100 p-4 rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-text1">
              {feature.title}
            </h3>
            <p className="text-text2 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
