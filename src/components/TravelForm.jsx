import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiCalendar, FiUsers, FiPlane } = FiIcons;

const TravelForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    departureCity: '',
    destinationCity: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    preferences: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-lg"
    >
      <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6 text-center">
        Tell Me About Your Dream Trip
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Departure City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiMapPin} className="inline mr-2" />
              Departure City
            </label>
            <input
              type="text"
              name="departureCity"
              value={formData.departureCity}
              onChange={handleChange}
              placeholder="Where are you traveling from?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          {/* Destination City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiMapPin} className="inline mr-2" />
              Destination City
            </label>
            <input
              type="text"
              name="destinationCity"
              value={formData.destinationCity}
              onChange={handleChange}
              placeholder="Where would you like to go?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiCalendar} className="inline mr-2" />
              Departure Date
            </label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiCalendar} className="inline mr-2" />
              Return Date
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          {/* Adults */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiUsers} className="inline mr-2" />
              Number of Adults
            </label>
            <select
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* Children */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SafeIcon icon={FiUsers} className="inline mr-2" />
              Number of Children
            </label>
            <select
              name="children"
              value={formData.children}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {[0, 1, 2, 3, 4].map(num => (
                <option key={num} value={num}>
                  {num === 0 ? 'No Children' : `${num} Child${num > 1 ? 'ren' : ''}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SafeIcon icon={FiPlane} className="inline mr-2" />
            Preferred Airlines or Hotels (Optional)
          </label>
          <textarea
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="Any specific airlines, hotels, or special requirements?"
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          Create My Itinerary
        </button>
      </form>
    </motion.div>
  );
};

export default TravelForm;