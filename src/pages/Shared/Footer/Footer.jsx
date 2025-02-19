const Footer = () => {
  return (
    <footer className="bg-[#252631] text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div>
            <h2 className="text-2xl font-bold text-[#ED5A6A]">Soulmate</h2>
            <p className="mt-4 text-gray-400">
              Find your perfect match and begin a journey of a lifetime with
              Soulmate. We connect hearts and build relationships.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/ED5A6A/facebook--v1.png"
                  alt="Facebook"
                  className="h-6"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/ED5A6A/twitter-squared.png"
                  alt="Twitter"
                  className="h-6"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/ED5A6A/instagram-new.png"
                  alt="Instagram"
                  className="h-6"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/ED5A6A/linkedin.png"
                  alt="LinkedIn"
                  className="h-6"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-[#ED5A6A]">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/biodatas"
                  className="text-gray-400 hover:text-[#ED5A6A]"
                >
                  Biodatas
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-[#ED5A6A]">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-[#ED5A6A]"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-gray-400">
              <li>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:info@soulmate.com"
                  className="hover:text-[#ED5A6A]"
                >
                  info@soulmate.com
                </a>
              </li>
              <li>
                <span className="font-semibold">Phone:</span>{" "}
                <a href="tel:+1234567890" className="hover:text-[#ED5A6A]">
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <span className="font-semibold">Address:</span> 123 Matrimony
                Lane, Love City, 56789
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Soulmate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
