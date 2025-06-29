import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar, FiAward, FiGlobe, FiUsers, FiHeart, FiTrendingUp, FiShield, FiClock } = FiIcons;

const AboutPage = () => {
  const features = [
    {
      icon: FiStar,
      title: '40+ Years of Expertise',
      description: 'Decades of travel industry knowledge and experience distilled into AI intelligence'
    },
    {
      icon: FiGlobe,
      title: 'Global Reach',
      description: 'Access to destinations worldwide with local insights and authentic experiences'
    },
    {
      icon: FiUsers,
      title: 'Personalized Service',
      description: 'Every recommendation is tailored to your unique preferences and travel style'
    },
    {
      icon: FiShield,
      title: 'Trusted & Secure',
      description: 'Your personal information and bookings are protected with industry-leading security'
    },
    {
      icon: FiClock,
      title: '24/7 Availability',
      description: 'Get travel assistance anytime, anywhere, with instant responses and support'
    },
    {
      icon: FiHeart,
      title: 'Passion for Travel',
      description: 'We live and breathe travel, ensuring every journey is memorable and meaningful'
    }
  ];

  const stats = [
    { number: '40+', label: 'Years Experience', description: 'Four decades of travel expertise' },
    { number: '10,000+', label: 'Happy Travelers', description: 'Satisfied customers worldwide' },
    { number: '150+', label: 'Destinations', description: 'Countries and cities covered' },
    { number: '24/7', label: 'Support', description: 'Round-the-clock assistance' }
  ];

  return (
    <div className="pt-16 font-inter">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
              Meet <span className="text-luxury-gold">Seeta</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Your AI Travel Advisor with 40+ Years of Travel Expertise
            </p>
            <p className="text-lg text-blue-200 max-w-4xl mx-auto leading-relaxed">
              Seeta combines four decades of travel industry wisdom with cutting-edge AI technology 
              to deliver personalized, luxury travel experiences that exceed your expectations. 
              From intimate getaways to grand adventures, Seeta is your trusted companion in creating 
              unforgettable journeys.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-gray-600">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Seeta */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The Story Behind <span className="gradient-text">Seeta</span>
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Seeta was born from a vision to democratize luxury travel expertise. Drawing from 
                  over four decades of collective travel industry experience, Seeta represents the 
                  wisdom of seasoned travel advisors who have crafted thousands of unforgettable journeys.
                </p>
                <p>
                  What makes Seeta unique is the fusion of human expertise with AI precision. Every 
                  recommendation is backed by real-world experience, cultural insights, and a deep 
                  understanding of what makes a trip truly exceptional.
                </p>
                <p>
                  Whether you're seeking a romantic escape, a family adventure, or a solo journey of 
                  discovery, Seeta brings the same level of care and attention that you'd expect from 
                  a personal travel advisor who has been in the industry for decades.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 text-white">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiAward} className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Seeta's Promise</h3>
                    <p className="text-blue-100">Excellence in every journey</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiStar} className="text-luxury-gold" />
                    <span>Personalized recommendations based on your preferences</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiGlobe} className="text-luxury-gold" />
                    <span>Access to exclusive deals and luxury accommodations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiShield} className="text-luxury-gold" />
                    <span>Secure booking process with full support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <SafeIcon icon={FiHeart} className="text-luxury-gold" />
                    <span>Dedicated to creating memories that last a lifetime</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="gradient-text">Seeta</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of human expertise and AI innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="luxury-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
                  <SafeIcon icon={feature.icon} className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              To make luxury travel accessible and personalized for everyone. We believe that every 
              journey should be extraordinary, and every traveler deserves the expertise of a seasoned 
              advisor. Through Seeta, we're bringing decades of travel wisdom to your fingertips, 
              ensuring that your next adventure exceeds your wildest dreams.
            </p>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
                <p className="text-blue-100 mb-6">
                  Let Seeta transform your travel dreams into reality with personalized 
                  recommendations and expert guidance.
                </p>
                <a
                  href="/chat"
                  className="bg-luxury-gold hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-semibold inline-flex items-center space-x-2 transition-all transform hover:scale-105"
                >
                  <SafeIcon icon={FiTrendingUp} />
                  <span>Start Planning Now</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;