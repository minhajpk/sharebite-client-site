import React from "react";
import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Logo from "../assets/Sharebite Logo.png"; // Replace with your actual logo path

const Footer = () => {
  return (
    <footer className=" bg-base-200 text-gray-700 py-12 px-4 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Logo & Description */}
        <div >
          <div className="flex items-center space-x-2 mb-4">
            <img src={Logo} alt="Logo" className="w-10 h-10" />
            <h2 className="text-xl font-bold text-gray-800">ShareBite</h2>
          </div>
          <p className="text-sm text-gray-600">
            ShareBite is a food donation platform helping companies fight hunger. Every order placed contributes meals to those in need, making everyday actions socially impactful.
          </p>
          <div className="flex space-x-4 mt-4 text-yellow-500 text-lg">
            <FaTwitter />
            <FaInstagram />
            <FaFacebookF />
            <FaYoutube />
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:text-center">
          <h4 className="text-lg font-semibold mb-4">Quick links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-500">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-500">Causes</a></li>
            <li><a href="#" className="hover:text-yellow-500 ">Recent Events</a></li>
            <li><a href="#" className="hover:text-yellow-500">Our Team</a></li>
            <li><a href="#" className="hover:text-yellow-500">Latest News</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick links</h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li className="flex items-center space-x-3">
              <FaPhone className="text-yellow-500" />
              <span>+1-206-156-2849</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-yellow-500" />
              <span>info@sharebite.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-yellow-500" />
              <span>California 62639</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h4>
          <p className="text-sm text-gray-600 mb-4">
            Subscribe and stay up to date with our news and upcoming events.
          </p>
          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Enter Email"
              className="input input-bordered w-full"
            />
            <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white">Send</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
