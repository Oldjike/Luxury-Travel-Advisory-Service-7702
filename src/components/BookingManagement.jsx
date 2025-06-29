import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiCalendar, FiMapPin, FiUsers, FiClock, FiCheck, FiX, FiEdit, 
  FiDownload, FiMail, FiPhone, FiAlertCircle, FiInfo, FiStar,
  FiPlane, FiHome, FiShield, FiCreditCard, FiRefreshCw
} = FiIcons;

const BookingManagement = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  const fetchBookings = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock booking data
    const mockBookings = [
      {
        id: 'BK1234567',
        status: 'confirmed',
        packageTitle: 'Santorini Luxury Romance',
        destination: 'Santorini, Greece',
        departureDate: '2024-03-15',
        returnDate: '2024-03-22',
        travelers: { adults: 2, children: 0 },
        totalAmount: 4299,
        bookingDate: '2024-01-15',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop',
        itinerary: {
          flights: {
            outbound: 'JFK → ATH, Mar 15, 10:30 AM',
            return: 'ATH → JFK, Mar 22, 6:45 PM'
          },
          hotel: 'Grand Luxury Resort & Spa',
          insurance: 'Comprehensive Protection',
          activities: ['Sunset Yacht Cruise', 'Wine Tasting Tour', 'Private Beach Access']
        },
        documents: [
          { name: 'Booking Confirmation', type: 'PDF', url: '#' },
          { name: 'Flight Tickets', type: 'PDF', url: '#' },
          { name: 'Hotel Voucher', type: 'PDF', url: '#' },
          { name: 'Travel Insurance', type: 'PDF', url: '#' }
        ],
        canModify: true,
        canCancel: true
      },
      {
        id: 'BK1234566',
        status: 'completed',
        packageTitle: 'Swiss Alps Adventure',
        destination: 'Zermatt, Switzerland',
        departureDate: '2023-12-10',
        returnDate: '2023-12-17',
        travelers: { adults: 2, children: 1 },
        totalAmount: 6899,
        bookingDate: '2023-10-15',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        itinerary: {
          flights: {
            outbound: 'LAX → ZUR, Dec 10, 11:00 AM',
            return: 'ZUR → LAX, Dec 17, 3:15 PM'
          },
          hotel: 'Alpine Luxury Lodge',
          insurance: 'Premium Protection Plus',
          activities: ['Matterhorn Helicopter Tour', 'Skiing Lessons', 'Spa Treatment']
        },
        documents: [
          { name: 'Trip Summary', type: 'PDF', url: '#' },
          { name: 'Travel Photos', type: 'ZIP', url: '#' }
        ],
        canModify: false,
        canCancel: false,
        rating: 5,
        review: 'Amazing experience! The helicopter tour was breathtaking and the lodge was perfect.'
      },
      {
        id: 'BK1234565',
        status: 'cancelled',
        packageTitle: 'Japan Cultural Immersion',
        destination: 'Tokyo & Kyoto, Japan',
        departureDate: '2024-02-20',
        returnDate: '2024-03-01',
        travelers: { adults: 2, children: 0 },
        totalAmount: 5799,
        bookingDate: '2023-11-20',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
        cancellationDate: '2024-01-10',
        refundAmount: 4639,
        canModify: false,
        canCancel: false
      }
    ];
    
    setBookings(mockBookings);
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return FiCheck;
      case 'pending': return FiClock;
      case 'completed': return FiStar;
      case 'cancelled': return FiX;
      default: return FiInfo;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    switch (activeTab) {
      case 'upcoming':
        return booking.status === 'confirmed' || booking.status === 'pending';
      case 'completed':
        return booking.status === 'completed';
      case 'cancelled':
        return booking.status === 'cancelled';
      default:
        return true;
    }
  });

  const handleModifyBooking = (bookingId) => {
    // Implement booking modification logic
    alert(`Modify booking ${bookingId} - This would open a modification form`);
  };

  const handleCancelBooking = (bookingId) => {
    // Implement booking cancellation logic
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled', cancellationDate: new Date().toISOString().split('T')[0] }
          : booking
      ));
    }
  };

  const handleDownloadDocument = (document) => {
    // Implement document download
    alert(`Downloading ${document.name}`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">My Bookings</h2>
            <p className="text-blue-100">Manage your travel bookings and documents</p>
          </div>
          <button
            onClick={fetchBookings}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} className="text-xl" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'upcoming', label: 'Upcoming', count: bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length },
            { id: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
            { id: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Bookings List */}
      <div className="p-6">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <SafeIcon icon={FiCalendar} className="text-4xl text-gray-400 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">You don't have any {activeTab} bookings at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={booking.image}
                      alt={booking.packageTitle}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {booking.packageTitle}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiMapPin} />
                          <span>{booking.destination}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiCalendar} />
                          <span>{booking.departureDate} - {booking.returnDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiUsers} />
                          <span>{booking.travelers.adults} Adult{booking.travelers.adults > 1 ? 's' : ''}{booking.travelers.children > 0 ? `, ${booking.travelers.children} Child${booking.travelers.children > 1 ? 'ren' : ''}` : ''}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Booking ID: {booking.id} • Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      <SafeIcon icon={getStatusIcon(booking.status)} className="text-sm" />
                      <span className="capitalize">{booking.status}</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 mt-2">
                      ${booking.totalAmount.toLocaleString()}
                    </div>
                    {booking.refundAmount && (
                      <div className="text-sm text-green-600">
                        Refunded: ${booking.refundAmount.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setSelectedBooking(selectedBooking === booking.id ? null : booking.id)}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      {selectedBooking === booking.id ? 'Hide Details' : 'View Details'}
                    </button>
                    
                    {booking.documents.map((doc, index) => (
                      <button
                        key={index}
                        onClick={() => handleDownloadDocument(doc)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm"
                      >
                        <SafeIcon icon={FiDownload} className="text-xs" />
                        <span>{doc.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    {booking.canModify && (
                      <button
                        onClick={() => handleModifyBooking(booking.id)}
                        className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <SafeIcon icon={FiEdit} className="text-sm" />
                        <span>Modify</span>
                      </button>
                    )}
                    
                    {booking.canCancel && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="flex items-center space-x-1 px-3 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                      >
                        <SafeIcon icon={FiX} className="text-sm" />
                        <span>Cancel</span>
                      </button>
                    )}

                    <button className="flex items-center space-x-1 px-3 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                      <SafeIcon icon={FiPhone} className="text-sm" />
                      <span>Contact Support</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {selectedBooking === booking.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-gray-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Itinerary */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <SafeIcon icon={FiPlane} className="mr-2 text-primary-600" />
                            Travel Details
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-600">Outbound:</span>
                              <div className="font-medium">{booking.itinerary.flights.outbound}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Return:</span>
                              <div className="font-medium">{booking.itinerary.flights.return}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Hotel:</span>
                              <div className="font-medium">{booking.itinerary.hotel}</div>
                            </div>
                            {booking.itinerary.insurance && (
                              <div>
                                <span className="text-gray-600">Insurance:</span>
                                <div className="font-medium">{booking.itinerary.insurance}</div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Activities */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <SafeIcon icon={FiStar} className="mr-2 text-primary-600" />
                            Included Activities
                          </h4>
                          <div className="space-y-1">
                            {booking.itinerary.activities.map((activity, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <SafeIcon icon={FiCheck} className="text-green-500 text-xs" />
                                <span>{activity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Review (for completed bookings) */}
                        {booking.status === 'completed' && booking.rating && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <SafeIcon icon={FiStar} className="mr-2 text-yellow-500" />
                              Your Review
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <SafeIcon
                                    key={i}
                                    icon={FiStar}
                                    className={`text-sm ${i < booking.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-gray-600">{booking.review}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingManagement;