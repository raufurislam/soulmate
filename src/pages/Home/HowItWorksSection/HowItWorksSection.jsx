import React from "react";

const HowItWorksSection = () => {
  return (
    <div className="max-w-screen-xl mx-auto pt-4 lg:px-2 px-4 ">
      {/* Heading */}
      <div>
        <h1 className="lg:text-3xl md:text-2xl text-lg font-bold text-center text-text1 md:mb-3 mb-2">
          Your Path to a Perfect Match
        </h1>
        <p className="text-center w-4/5 mx-auto text-text2 md:text-xl mb-8">
          A simple and secure way to find your soulmate in just a few steps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div className="flex flex-col items-center text-center p-6 bg-neutral shadow-md rounded-lg">
          <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">1</span>
          </div>
          <h3 className="text-xl text-text1 font-semibold mb-2">
            Create Your Profile
          </h3>
          <p className="text-text2">
            Start by creating a detailed profile with your personal preferences,
            values, and interests. This helps us match you with compatible
            profiles.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-neutral shadow-md rounded-lg">
          <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">2</span>
          </div>
          <h3 className="text-xl text-text1 font-semibold mb-2">
            Browse Matches
          </h3>
          <p className="text-text2">
            Explore a curated list of potential matches that align with your
            preferences, values, and lifestyle.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-neutral shadow-md rounded-lg">
          <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">3</span>
          </div>
          <h3 className="text-xl text-text1 font-semibold mb-2">
            Connect & Communicate
          </h3>
          <p className="text-text2">
            Once you find a match, start chatting and getting to know each
            other. Use our platform’s communication features to make
            connections.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-neutral shadow-md rounded-lg">
          <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">4</span>
          </div>
          <h3 className="text-xl text-text1 font-semibold mb-2">
            Meet & Get to Know More
          </h3>
          <p className="text-text2">
            Take things offline by meeting your match in person! Our platform
            also offers tools to help plan dates and meetings.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-neutral shadow-md rounded-lg">
          <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">5</span>
          </div>
          <h3 className="text-xl text-text1 font-semibold mb-2">Say 'I Do'</h3>
          <p className="text-text2">
            When you feel ready, take the next step and get engaged! Many of our
            members have found their happily ever after through our platform.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-neutral shadow-md rounded-lg">
          <div className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">6</span>
          </div>
          <h3 className="text-xl text-text1 font-semibold mb-2">
            Celebrate Your Union
          </h3>
          <p className="text-text2">
            After the engagement, you will begin the journey of marriage. Our
            platform will continue to support you along the way!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
