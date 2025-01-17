import React from "react";

const Home = () => {
  return (
    <div>
      <h1>Home Layout</h1>
      <button
        // type="button"
        className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Teal to Lime
      </button>
      <div className="w-16 h-16 rounded-full bg-green-400"></div>
    </div>
  );
};

export default Home;
