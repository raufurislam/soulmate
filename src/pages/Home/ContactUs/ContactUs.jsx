import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-blue-500 h-96"
        style={{ backgroundImage: 'url("your-image-link-here.jpg")' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white pt-40">
          <h1 className="text-4xl md:text-6xl font-bold">Contact Us</h1>
          <p className="mt-4 text-xl md:text-2xl max-w-2xl mx-auto">
            We're here to help! Reach out to us for any inquiries or support.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Get In Touch
          </h2>
          <p className="mt-6 text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Whether you have a question, suggestion, or need support, we’re here
            to assist you. Feel free to contact us using the form below, or
            reach out to us directly through our contact details.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Send Us a Message
              </h3>
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-lg text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="flex flex-col justify-center space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Our Contact Information
              </h3>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                <p className="text-gray-600">support@soulmate.com</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Phone</h4>
                <p className="text-gray-600">+1 (800) 123-4567</p>
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Find Us Here
          </h2>
          <div className="mt-6">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=...your-map-link..."
                width="600"
                height="450"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-semibold">We'd Love to Hear From You</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          If you have any questions or need assistance, don’t hesitate to reach
          out. We’re always here to help you.
        </p>
        <div className="mt-6">
          <a
            href="/contact"
            className="px-6 py-3 bg-yellow-500 text-gray-800 font-semibold rounded-full hover:bg-yellow-400"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
