import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import TravelForm from '../components/TravelForm';
import ItineraryDisplay from '../components/ItineraryDisplay';

const { FiSend, FiUser, FiMapPin, FiPhone } = FiIcons;

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello and welcome to TSeetaluxuryescape! I'm Seeta, your AI Travel Advisor with over 40 years of travel expertise. I'm here to help you plan the perfect vacation! To get started and deliver personalized recommendations, could I please have your full name, email address, and phone number?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('contact');
  const [userInfo, setUserInfo] = useState({});
  const [travelDetails, setTravelDetails] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content, type = 'user') => {
    const newMessage = {
      id: Date.now(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (response) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(response, 'bot');
    }, 1500 + Math.random() * 1000);
  };

  const handleContactInfo = (message) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
    
    if (emailRegex.test(message) || phoneRegex.test(message) || message.includes('@')) {
      setUserInfo(prev => ({ ...prev, contact: message }));
      setCurrentStep('travel');
      simulateTyping(`Thank you! It's time to map out your next thrilling adventure! Could you share the following details: departure city, destination city, date of departure, date of return, number of adults, number of children (if any), and any preferred airline or resort?`);
      setTimeout(() => setShowForm(true), 2000);
    } else {
      simulateTyping("I need your contact information to get started. Please provide your full name, email address, and phone number so I can assist you better.");
    }
  };

  const handleTravelPlanning = (message) => {
    if (message.toLowerCase().includes('suggestion') || message.toLowerCase().includes('recommend')) {
      simulateTyping("No problem, I'll find some fantastic options for you! Let me search for the best destinations, flights, and accommodations based on popular trends and your preferences.");
      setTimeout(() => {
        simulateTyping("Here are some amazing suggestions: 1) Santorini, Greece - Perfect for romantic getaways, 2) Bali, Indonesia - Great for relaxation and culture, 3) Swiss Alps - Ideal for adventure and luxury. Which one interests you most?");
      }, 3000);
    } else {
      setTravelDetails(prev => ({ ...prev, details: message }));
      simulateTyping("Great! Based on what you've provided, let me create a personalized itinerary for you.");
      setTimeout(() => setShowItinerary(true), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    addMessage(inputValue);
    const message = inputValue.toLowerCase();
    setInputValue('');

    if (currentStep === 'contact') {
      handleContactInfo(inputValue);
    } else if (currentStep === 'travel') {
      handleTravelPlanning(inputValue);
    } else {
      // General conversation
      if (message.includes('human') || message.includes('agent')) {
        simulateTyping("I'd be happy to connect you with one of our human travel advisors! You can reach our support team at 1-800-SEETA-AI or email us at hello@tseetaluxury.com. Is there anything else I can help you with in the meantime?");
      } else if (message.includes('book') || message.includes('booking')) {
        simulateTyping("Excellent! I'll help you with the booking process. Once we finalize your itinerary, I'll send all the details to your email and guide you through the next steps. Would you like to proceed with the current recommendations or make any changes?");
      } else {
        simulateTyping("Thank you for that information! Is there anything specific about your travel plans you'd like me to help you with? I can assist with destinations, accommodations, activities, or any special requirements you might have.");
      }
    }
  };

  const handleFormSubmit = (formData) => {
    setTravelDetails(formData);
    setShowForm(false);
    simulateTyping(`Perfect! I have all your travel details. Let me create a customized itinerary for your trip from ${formData.departureCity} to ${formData.destinationCity} from ${formData.departureDate} to ${formData.returnDate} for ${formData.adults} adult${formData.adults > 1 ? 's' : ''}${formData.children > 0 ? ` and ${formData.children} child${formData.children > 1 ? 'ren' : ''}` : ''}.`);
    setTimeout(() => setShowItinerary(true), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto p-4">
        {/* Chat Header */}
        <div className="bg-white rounded-t-2xl p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiMapPin} className="text-white text-xl" />
            </div>
            <div>
              <h1 className="font-playfair text-2xl font-bold text-gray-900">Chat with Seeta</h1>
              <p className="text-gray-600">Your AI Travel Advisor • Online now</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="bg-white h-96 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {message.type === 'bot' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <SafeIcon icon={FiMapPin} className="text-primary-500 text-sm" />
                      <span className="text-xs font-medium text-primary-600">Seeta</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiMapPin} className="text-primary-500 text-sm" />
                  <span className="text-xs font-medium text-primary-600">Seeta</span>
                </div>
                <div className="typing-indicator mt-2">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Travel Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 p-6 border-t border-gray-200"
            >
              <TravelForm onSubmit={handleFormSubmit} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Itinerary Display */}
        <AnimatePresence>
          {showItinerary && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white p-6 border-t border-gray-200"
            >
              <ItineraryDisplay travelDetails={travelDetails} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-b-2xl p-6 border-t border-gray-200">
          <div className="flex space-x-4">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white p-3 rounded-full transition-colors"
            >
              <SafeIcon icon={FiSend} className="text-lg" />
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              type="button"
              onClick={() => {
                addMessage("I'd like to speak with a human advisor");
                simulateTyping("I'd be happy to connect you with one of our human travel advisors! You can reach our support team at 1-800-SEETA-AI or email us at hello@tseetaluxury.com. Our human advisors are available 24/7 to assist with complex bookings and special requests.");
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
            >
              <SafeIcon icon={FiUser} className="inline mr-2" />
              Speak to Human
            </button>
            <button
              type="button"
              onClick={() => {
                addMessage("I need help with booking");
                simulateTyping("I'll be happy to help you with the booking process! Once we finalize your travel preferences and itinerary, I'll guide you through each step and send all confirmation details to your email. What specific aspect of booking would you like assistance with?");
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
            >
              <SafeIcon icon={FiPhone} className="inline mr-2" />
              Booking Help
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;