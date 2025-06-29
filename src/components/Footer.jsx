import React from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiMail, FiPhone, FiGlobe, FiHeart } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiMapPin} className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold">TSeetaluxuryescape</h3>
                <p className="text-gray-400 text-sm">Luxury Travel Redefined</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Experience the world with Seeta, your AI Travel Advisor with over 40 years of expertise. 
              We create personalized luxury travel experiences that exceed expectations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiGlobe} className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiMail} className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiPhone} className="text-xl" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Luxury Vacations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Flight Booking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hotel Reservations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custom Itineraries</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Group Travel</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="text-sm" />
                <span>1-800-SEETA-AI</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMail} className="text-sm" />
                <span>hello@tseetaluxury.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <SafeIcon icon={FiMapPin} className="text-sm mt-1" />
                <span>Available 24/7<br />Worldwide Service</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 TSeetaluxuryescape. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center space-x-1 mt-2 md:mt-0">
            <span>Made with</span>
            <SafeIcon icon={FiHeart} className="text-red-400" />
            <span>by Seeta AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;