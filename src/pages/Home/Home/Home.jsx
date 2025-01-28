import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import SuccessStory from "../SuccessStory/SuccessStory";
import HowItWorksSection from "../HowItWorksSection/HowItWorksSection";
import SuccessCounterSection from "../SuccessCounterSection/SuccessCounterSection";
import PremiumMember from "../PremiumMember/PremiumMember";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Soulmate | Home</title>
      </Helmet>
      <Banner></Banner>
      <div className="my-10">
        <PremiumMember></PremiumMember>
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
