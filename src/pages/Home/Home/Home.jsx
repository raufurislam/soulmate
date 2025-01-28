import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import SuccessStory from "../SuccessStory/SuccessStory";
import HowItWorksSection from "../HowItWorksSection/HowItWorksSection";

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

      <div className="my-10 text-center">
        <h1 className="text-3xl font-semibold text-center">
          Success Counter Section:
        </h1>
        <p>
          Under the How it Works section, you can implement a counter section.
          Users will see the total biodata of this website how many girls
          biodata have on the website, how many boys biodata have, and how many
          marriages have been completed through the website.
        </p>
      </div>

      <div className="my-10 text-center">
        <SuccessStory></SuccessStory>
      </div>
    </div>
  );
};

export default Home;
