import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96 bg-pink-600"
        style={{ backgroundImage: 'url("your-image-link-here.jpg")' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white pt-40">
          <h1 className="text-4xl md:text-6xl font-bold">About Us</h1>
          <p className="mt-4 text-xl md:text-2xl max-w-2xl mx-auto">
            Discover who we are and why we are passionate about bringing people
            together.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Our Mission
          </h2>
          <p className="mt-6 text-lg text-gray-600 text-center">
            At Soulmate, we believe in creating meaningful connections that last
            a lifetime. Our platform is designed to help individuals find their
            perfect match through shared values, trust, and understanding. We
            are committed to building a supportive and empowering community
            where people can explore their journey to love.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Team Member 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img
                src="team-member1.jpg"
                alt="Team Member 1"
                className="w-24 h-24 mx-auto rounded-full object-cover"
              />
              <h3 className="text-2xl font-semibold text-center text-gray-800 mt-4">
                John Doe
              </h3>
              <p className="text-center text-gray-600 mt-2">Co-Founder</p>
              <p className="mt-4 text-gray-600 text-center">
                John is passionate about fostering connections and helping
                individuals find their true soulmate. With over a decade of
                experience in relationship counseling, he believes in the power
                of love and understanding.
              </p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img
                src="team-member2.jpg"
                alt="Team Member 2"
                className="w-24 h-24 mx-auto rounded-full object-cover"
              />
              <h3 className="text-2xl font-semibold text-center text-gray-800 mt-4">
                Jane Smith
              </h3>
              <p className="text-center text-gray-600 mt-2">Co-Founder</p>
              <p className="mt-4 text-gray-600 text-center">
                Jane is dedicated to helping individuals discover the perfect
                match for long-term, meaningful relationships. She brings a deep
                understanding of human connections and strives to make Soulmate
                a welcoming space for all.
              </p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img
                src="team-member3.jpg"
                alt="Team Member 3"
                className="w-24 h-24 mx-auto rounded-full object-cover"
              />
              <h3 className="text-2xl font-semibold text-center text-gray-800 mt-4">
                Emily Johnson
              </h3>
              <p className="text-center text-gray-600 mt-2">Marketing Lead</p>
              <p className="mt-4 text-gray-600 text-center">
                Emily is passionate about bringing awareness to the platform and
                connecting people to their soulmates. With her expertise in
                marketing and outreach, she ensures Soulmate is always a click
                away for those in search of lasting love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Our Vision
          </h2>
          <p className="mt-6 text-lg text-gray-600 text-center">
            We envision a world where love transcends boundaries, where
            individuals are free to embrace their unique stories and connect
            with like-minded souls. Our goal is to create a platform that not
            only helps people find love but also fosters meaningful friendships
            and supportive relationships.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-semibold">
          Join Us on the Journey to Love
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Whether you're looking for your soulmate or simply want to be a part
          of a supportive community, we invite you to join us today. Together,
          we can help you find your perfect match.
        </p>
        <div className="mt-6">
          <a
            href="/signup"
            className="px-6 py-3 bg-yellow-500 text-gray-800 font-semibold rounded-full hover:bg-yellow-400"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
