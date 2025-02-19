import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import SuccessStory from "../SuccessStory/SuccessStory";
import HowItWorksSection from "../HowItWorksSection/HowItWorksSection";
import SuccessCounterSection from "../SuccessCounterSection/SuccessCounterSection";
import PremiumMember from "../PremiumMember/PremiumMember";
import Faq from "../Faq/Faq";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import JoinNowCTA from "../JoinNowCTA/JoinNowCTA";

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

      <div className="my-10 text-center">
        <WhyChooseUs></WhyChooseUs>
      </div>

      <div className="my-10 text-center">
        <Faq></Faq>
      </div>

      <div className="my-10 text-center">
        <JoinNowCTA></JoinNowCTA>
      </div>
    </div>
  );
};

export default Home;
