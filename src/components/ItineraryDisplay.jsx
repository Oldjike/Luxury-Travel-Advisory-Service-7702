import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlane, FiMapPin, FiStar, FiCalendar, FiUsers, FiCheckCircle } = FiIcons;

const ItineraryDisplay = ({ travelDetails }) => {
  // Sample itinerary data - in a real app, this would come from an API
  const itinerary = {
    flights: {
      outbound: {
        airline: "Emirates",
        departure: `${travelDetails.departureCity} (${travelDetails.departureDate})`,
        arrival: `${travelDetails.destinationCity}`,
        time: "10:30 AM - 6:45 PM",
        stops: "1 Stop in Dubai"
      },
      return: {
        airline: "Emirates",
        departure: `${travelDetails.destinationCity} (${travelDetails.returnDate})`,
        arrival: `${travelDetails.departureCity}`,
        time: "8:15 AM - 4:30 PM",
        stops: "1 Stop in Dubai"
      }
    },
    hotel: {
      name: "Grand Luxury Resort & Spa",
      rating: 5,
      location: travelDetails.destinationCity,
      inclusions: ["All meals included", "Spa access", "Airport transfers", "WiFi"]
    },
    activities: [
      "Private city tour with local guide",
      "Sunset dinner cruise",
      "Cultural heritage site visit"
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
          Your Personalized Itinerary
        </h3>
        <p className="text-gray-600">
          Here's what I've curated for your perfect trip
        </p>
      </div>

      {/* Itinerary Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6">
          <h4 className="text-xl font-bold">Trip Summary</h4>
          <p className="text-blue-100">
            {travelDetails.departureCity} → {travelDetails.destinationCity} • {travelDetails.adults} Adult{travelDetails.adults > 1 ? 's' : ''}{travelDetails.children > 0 ? ` • ${travelDetails.children} Child${travelDetails.children > 1 ? 'ren' : ''}` : ''}
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {/* Flights */}
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiPlane} className="text-blue-600" />
              </div>
              <div>
                <h5 className="font-bold text-gray-900">Flights</h5>
                <p className="text-gray-600 text-sm">Round-trip airfare</p>
              </div>
            </div>
            <div className="space-y-3 ml-13">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">Outbound: {itinerary.flights.outbound.airline}</p>
                <p className="text-gray-600">{itinerary.flights.outbound.departure} → {itinerary.flights.outbound.time}</p>
                <p className="text-gray-500 text-sm">{itinerary.flights.outbound.stops}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">Return: {itinerary.flights.return.airline}</p>
                <p className="text-gray-600">{itinerary.flights.return.departure} → {itinerary.flights.return.time}</p>
                <p className="text-gray-500 text-sm">{itinerary.flights.return.stops}</p>
              </div>
            </div>
          </div>

          {/* Hotel */}
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiMapPin} className="text-green-600" />
              </div>
              <div>
                <h5 className="font-bold text-gray-900">Accommodation</h5>
                <p className="text-gray-600 text-sm">Luxury resort stay</p>
              </div>
            </div>
            <div className="ml-13">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <p className="font-medium text-gray-900">{itinerary.hotel.name}</p>
                  <div className="flex">
                    {[...Array(itinerary.hotel.rating)].map((_, i) => (
                      <SafeIcon key={i} icon={FiStar} className="text-yellow-400 text-sm fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{itinerary.hotel.location}</p>
                <div className="space-y-1">
                  {itinerary.hotel.inclusions.map((inclusion, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheckCircle} className="text-green-500 text-sm" />
                      <span className="text-gray-600 text-sm">{inclusion}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiCalendar} className="text-purple-600" />
              </div>
              <div>
                <h5 className="font-bold text-gray-900">Activities</h5>
                <p className="text-gray-600 text-sm">Curated experiences</p>
              </div>
            </div>
            <div className="ml-13">
              <div className="space-y-2">
                {itinerary.activities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <SafeIcon icon={FiCheckCircle} className="text-primary-500 text-sm" />
                    <span className="text-gray-700">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
          Book This Itinerary
        </button>
        <button className="border-2 border-primary-500 text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg font-semibold transition-colors">
          Request Changes
        </button>
        <button className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-colors">
          See More Options
        </button>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 p-6 rounded-2xl text-center">
        <p className="text-blue-800 font-medium mb-2">
          Ready to book or need changes?
        </p>
        <p className="text-blue-700">
          I'll help you with the booking process and send all details to your email. 
          You can also speak with our human advisors at <strong>1-800-SEETA-AI</strong> for additional assistance.
        </p>
      </div>
    </motion.div>
  );
};

export default ItineraryDisplay;