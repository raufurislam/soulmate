import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";

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

      <div className="my-10 text-center">
        <h1 className="text-3xl font-semibold text-center">
          How it works section:
        </h1>
        <p>
          Under the premium membership card, Here you will design how this
          website works. You can do it in your own way. [Visit any matrimony
          website for ideas.]
        </p>
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
        <h1 className="text-3xl font-semibold">Success Story Section:</h1>
        <p>
          Under the Success counter section, You can Show all the marriage
          success stories that the married couple has posted. You can think of
          this section as a review section.{" "}
        </p>
      </div>
    </div>
  );
};

export default Home;
