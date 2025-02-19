import React from "react";

const ContactUs = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="text-center bg-neutral py-6 md:py-8 lg:py-12">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-text1">
          Contact Us
        </h1>
        <h3 className="md:text-lg lg:text-xl text-text2 mt-2">
          We're here to help! Reach out to us for any inquiries or support.
        </h3>
      </div>

      <div className="max-w-screen-xl pt-4 lg:px-2 px-4 mx-auto">
        {/* Contact Information */}
        <div className="mt-10">
          <h1 className="lg:text-2xl md:text-xl  text-lg font-bold text-center text-text1 md:mb-3 mb-2">
            Get In Touch
          </h1>
          <p className="text-center text-text2 w-10/12 mx-auto md:text-lg text-sm mb-8">
            Whether you have a question, suggestion, or need support, we’re here
            to assist you. Feel free to contact us using the form below, or
            reach out to us directly through our contact details.
          </p>
        </div>

        {/* Contact Form */}
        <section className="py-8 px-4 bg-neutral rounded-xl">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="flex flex-col justify-center space-y-6">
                <h3 className="text-2xl font-semibold text-text1">
                  Send Us a Message
                </h3>
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-lg text-text2 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border bg-base-100 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-lg text-text2 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border bg-base-100 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-lg text-text2 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      className="w-full px-4 py-3 border bg-base-100 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 focus:outline-none"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              <div className="flex flex-col justify-start space-y-1">
                <h3 className="text-2xl font-semibold text-text1">
                  Our Contact Information
                </h3>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                  <p className="text-text2">support@soulmate.com</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Phone</h4>
                  <p className="text-text2">+1 (800) 123-4567</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Social Media
                  </h4>
                  <div className="flex space-x-6">
                    <a
                      href="https://www.facebook.com"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Facebook
                    </a>
                    <a
                      href="https://www.instagram.com"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.twitter.com"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section (Optional) */}
        <section className="py-16 bg-base-100">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-semibold text-center text-text1">
              Find Us Here
            </h2>
            <div className="mt-6">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=...your-map-link..."
                  width="600"
                  height="450"
                  className="w-full rounded-xl h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-neutral rounded-xl text-white text-center">
          {/* Heading */}
          <div className="">
            <h1 className="lg:text-2xl md:text-xl  text-lg font-bold text-center text-text1 md:mb-3 mb-2">
              We'd Love to Hear From You
            </h1>
            <p className="text-center text-text2 w-10/12 mx-auto md:text-lg text-sm mb-0">
              We'd Love to Hear From You
            </p>
          </div>

          <div className="mt-6">
            <a
              href="/contact"
              className="px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-[#d64a5b]"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
