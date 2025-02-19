import React from "react";
import { FaLightbulb, FaComments, FaSmile } from "react-icons/fa";

const JoinNowCTA = () => {
  const tips = [
    {
      icon: <FaLightbulb className="text-rose-500" size={40} />,
      title: "Effective Communication",
      desc: "Open and honest communication is the key to a strong relationship.",
    },
    {
      icon: <FaComments className="text-rose-500" size={40} />,
      title: "Respect & Understanding",
      desc: "A successful marriage is built on mutual respect and trust.",
    },
    {
      icon: <FaSmile className="text-rose-500" size={40} />,
      title: "Keep the Romance Alive",
      desc: "Surprise each other, go on dates, and keep the spark alive!",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto pt-4 lg:px-2 px-4">
      {/* Heading */}
      <div>
        <h1 className="lg:text-3xl md:text-2xl text-lg font-bold text-center text-text1 md:mb-3 mb-2">
          Marriage Tips & Advice
        </h1>
        <p className="text-center w-4/5 mx-auto text-text2 md:text-xl mb-8">
          Strengthen your relationship with these essential tips.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="p-6 bg-neutral rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center text-center"
          >
            <div className="bg-base-100 p-4 rounded-full mb-4">{tip.icon}</div>
            <h3 className="text-xl font-semibold text-text1">{tip.title}</h3>
            <p className="text-text2 mt-2">{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinNowCTA;
