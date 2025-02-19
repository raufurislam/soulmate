import React from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";

const AboutUs = () => {
  const { user } = useAuth();

  return (
    <div className="">
      <Helmet>
        <title>Soulmate | About Us</title>
      </Helmet>
      {/* Hero Section */}
      <div className="text-center bg-neutral py-6 md:py-8 lg:py-12">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-text1">
          About Us
        </h1>
        <h3 className="md:text-lg lg:text-xl text-text2 mt-2">
          Discover who we are and why we are passionate about bringing people
          together.
        </h3>
      </div>

      <div className="max-w-screen-xl pt-4 lg:px-2 px-4 mx-auto">
        {/* Heading */}
        <div className="mt-10">
          <h1 className="lg:text-2xl md:text-xl  text-lg font-bold text-center text-text1 md:mb-3 mb-2">
            Our Mission
          </h1>
          <p className="text-center text-text2 w-10/12 mx-auto md:text-lg text-sm mb-8">
            At Soulmate, we believe in creating meaningful connections that last
            a lifetime. Our platform is designed to help individuals find their
            perfect match through shared values, trust, and understanding. We
            are committed to building a supportive and empowering community
            where people can explore their journey to love.
          </p>
        </div>

        <section className="">
          <div className="">
            {/* Team Section " */}
            {/* Heading */}
            <div className="mt-10">
              <h1 className="lg:text-2xl md:text-xl  text-lg font-bold text-center text-text1 md:mb-3 mb-2">
                Meet the Team
              </h1>
              <p className="text-center text-text2 w-10/12 mx-auto md:text-lg text-sm">
                With a shared vision, we are committed to delivering the best.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {/* Team Member 1 */}
              <div className="bg-neutral p-6 rounded-lg shadow-md">
                <img
                  src="https://i.ibb.co.com/RNPS0xG/IMG-20240107-215349-956.jpg"
                  alt="Team Member 1"
                  className="w-24 h-24 mx-auto rounded-full object-cover"
                />
                <h3 className="text-2xl font-semibold text-center text-text1 mt-4">
                  Raufur Islam
                </h3>
                <p className="text-center text-text2 mt-2">Founder</p>
                <p className="mt-4 text-text2 text-center">
                  Raufur is passionate about fostering connections and helping
                  individuals find their true soulmate. With over a decade of
                  experience in relationship counseling, he believes in the
                  power of love and understanding.
                </p>
              </div>
              {/* Team Member 2 */}
              <div className="bg-neutral p-6 rounded-lg shadow-md">
                <img
                  src="https://t4.ftcdn.net/jpg/09/35/84/03/360_F_935840397_7miN8MVzz8BMEKPsOdqPKd0JTHZygNfv.jpg"
                  alt="Team Member 2"
                  className="w-24 h-24 mx-auto rounded-full object-cover"
                />
                <h3 className="text-2xl font-semibold text-center text-text1 mt-4">
                  Jane Smith
                </h3>
                <p className="text-center text-text2 mt-2">Co-Founder</p>
                <p className="mt-4 text-text2 text-center">
                  Jane is dedicated to helping individuals discover the perfect
                  match for long-term, meaningful relationships. She brings a
                  deep understanding of human connections and strives to make
                  Soulmate a welcoming space for all.
                </p>
              </div>
              {/* Team Member 3 */}
              <div className="bg-neutral p-6 rounded-lg shadow-md">
                <img
                  src="https://tiermaker.com/images/chart/chart/male-animated-cartoon-characters-912009/transparent-hiro-big-hero-6-37747465-427-378pngcrdownload.png"
                  alt="Team Member 3"
                  className="w-24 h-24 mx-auto bg-blue-300 rounded-full object-cover"
                />
                <h3 className="text-2xl font-semibold text-center text-text1 mt-4">
                  Emily Johnson
                </h3>
                <p className="text-center text-text2 mt-2">Marketing Lead</p>
                <p className="mt-4 text-text2 text-center">
                  Emily is passionate about bringing awareness to the platform
                  and connecting people to their soulmates. With her expertise
                  in marketing and outreach, she ensures Soulmate is always a
                  click away for those in search of lasting love.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        {/* Heading */}
        <div className="mt-10">
          <h1 className="lg:text-2xl md:text-xl  text-lg font-bold text-center text-text1 md:mb-3 mb-2">
            Our Vision
          </h1>
          <p className="text-center text-text2 w-10/12 mx-auto md:text-lg text-sm mb-0">
            We envision a world where love transcends boundaries, where
            individuals are free to embrace their unique stories and connect
            with like-minded souls. Our goal is to create a platform that not
            only helps people find love but also fosters meaningful friendships
            and supportive relationships.
          </p>
        </div>

        {/* Call to Action */}
        {!user && (
          <section className="py-16 bg-neutral mt-12 rounded-xl text-text1 text-center">
            {/* Heading */}
            <div className="">
              <h1 className="lg:text-2xl md:text-xl  text-lg font-bold text-center text-text1 md:mb-3 mb-2">
                Join Us on the Journey to Love
              </h1>
              <p className="text-center text-text2 w-10/12 mx-auto md:text-lg text-sm mb-0">
                Whether you're looking for your soulmate or simply want to be a
                part of a supportive community, we invite you to join us today.
                Together, we can help you find your perfect match.
              </p>
            </div>

            <div className="mt-6">
              <a
                href="/auth/signUp"
                className="px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-[#d64a5b]"
              >
                Get Started
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
