import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import SuccessStory from "../SuccessStory/SuccessStory";
import HowItWorksSection from "../HowItWorksSection/HowItWorksSection";
import SuccessCounterSection from "../SuccessCounterSection/SuccessCounterSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Soulmate | Home</title>
      </Helmet>
      <Banner></Banner>
      <div className="my-10 text-center">
        <h1 className="text-3xl font-semibold text-center">
          Six premium member profile
        </h1>
        <p></p>
      </div>

      <div className="my-10">
        <HowItWorksSection></HowItWorksSection>
      </div>

      <div className="my-10">
        <SuccessCounterSection></SuccessCounterSection>
      </div>

      <div className="my-10 text-center">
        <SuccessStory></SuccessStory>
      </div>
    </div>
  );
};

export default Home;
