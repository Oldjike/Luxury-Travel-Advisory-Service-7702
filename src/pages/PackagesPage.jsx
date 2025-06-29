import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar, FiMapPin, FiCalendar, FiUsers, FiClock, FiCheck, FiHeart, FiPlane, FiCamera, FiWifi, FiCoffee, FiShield } = FiIcons;

const PackagesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', name: 'All Packages', count: 12 },
    { id: 'romantic', name: 'Romantic Escapes', count: 4 },
    { id: 'adventure', name: 'Adventure', count: 3 },
    { id: 'cultural', name: 'Cultural Tours', count: 3 },
    { id: 'wellness', name: 'Wellness Retreats', count: 2 }
  ];

  const packages = [
    {
      id: 1,
      category: 'romantic',
      featured: true,
      title: 'Santorini Luxury Romance',
      location: 'Santorini, Greece',
      duration: '7 Days, 6 Nights',
      price: 4299,
      originalPrice: 5499,
      rating: 4.9,
      reviews: 247,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
      highlights: ['Private villa with infinity pool', 'Sunset yacht cruise', 'Wine tasting tours', 'Couples spa treatments'],
      inclusions: ['Luxury accommodation', 'Daily breakfast', 'Airport transfers', 'Private guide'],
      maxGuests: 2,
      bestFor: 'Honeymoon & Anniversary'
    },
    {
      id: 2,
      category: 'adventure',
      featured: true,
      title: 'Swiss Alps Adventure',
      location: 'Zermatt, Switzerland',
      duration: '8 Days, 7 Nights',
      price: 6899,
      originalPrice: 8299,
      rating: 4.8,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      highlights: ['Matterhorn helicopter tour', 'Luxury mountain lodge', 'Skiing & snowboarding', 'Alpine spa retreat'],
      inclusions: ['5-star mountain resort', 'All meals included', 'Equipment rental', 'Professional guide'],
      maxGuests: 4,
      bestFor: 'Adventure Seekers'
    },
    {
      id: 3,
      category: 'cultural',
      featured: false,
      title: 'Japan Cultural Immersion',
      location: 'Tokyo & Kyoto, Japan',
      duration: '10 Days, 9 Nights',
      price: 5799,
      originalPrice: 7199,
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      highlights: ['Traditional ryokan stay', 'Tea ceremony experience', 'Private temple tours', 'Sushi masterclass'],
      inclusions: ['Luxury hotels & ryokan', 'JR Pass included', 'Cultural experiences', 'English-speaking guide'],
      maxGuests: 6,
      bestFor: 'Culture Enthusiasts'
    },
    {
      id: 4,
      category: 'wellness',
      featured: true,
      title: 'Bali Wellness Retreat',
      location: 'Ubud, Bali',
      duration: '6 Days, 5 Nights',
      price: 3499,
      originalPrice: 4299,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
      highlights: ['Daily yoga sessions', 'Spa treatments', 'Meditation workshops', 'Organic cuisine'],
      inclusions: ['Luxury resort', 'All wellness activities', 'Healthy meals', 'Airport transfers'],
      maxGuests: 2,
      bestFor: 'Wellness & Relaxation'
    },
    {
      id: 5,
      category: 'romantic',
      featured: false,
      title: 'Maldives Paradise',
      location: 'Maldives',
      duration: '5 Days, 4 Nights',
      price: 7299,
      originalPrice: 8999,
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      highlights: ['Overwater villa', 'Private beach access', 'Snorkeling excursions', 'Candlelit dinners'],
      inclusions: ['Water villa accommodation', 'All meals', 'Water sports', 'Seaplane transfers'],
      maxGuests: 2,
      bestFor: 'Ultimate Romance'
    },
    {
      id: 6,
      category: 'adventure',
      featured: false,
      title: 'African Safari Luxury',
      location: 'Serengeti, Tanzania',
      duration: '7 Days, 6 Nights',
      price: 8499,
      originalPrice: 10299,
      rating: 4.8,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
      highlights: ['Big Five game drives', 'Luxury tented camp', 'Hot air balloon safari', 'Maasai village visit'],
      inclusions: ['Luxury safari lodge', 'All meals & drinks', 'Game drives', 'Professional guide'],
      maxGuests: 4,
      bestFor: 'Wildlife Adventure'
    }
  ];

  const filteredPackages = packages.filter(pkg => 
    selectedCategory === 'all' || pkg.category === selectedCategory
  );

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'featured':
      default:
        return b.featured - a.featured;
    }
  });

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
              Luxury <span className="text-luxury-gold">Package Deals</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Curated luxury experiences at exclusive prices
            </p>
            <p className="text-lg text-blue-200 max-w-4xl mx-auto leading-relaxed">
              Discover our handpicked collection of premium travel packages, each designed to deliver 
              extraordinary experiences with exceptional value. From romantic escapes to adventure expeditions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {sortedPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden luxury-card"
                >
                  {/* Package Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    {pkg.featured && (
                      <div className="absolute top-4 left-4 bg-luxury-gold text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <SafeIcon icon={FiHeart} className="text-gray-600 hover:text-red-500 cursor-pointer transition-colors" />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {pkg.bestFor}
                    </div>
                  </div>

                  {/* Package Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">
                        {pkg.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiMapPin} className="text-primary-500" />
                          <span>{pkg.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiClock} className="text-primary-500" />
                          <span>{pkg.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <SafeIcon
                                key={i}
                                icon={FiStar}
                                className={`text-sm ${
                                  i < Math.floor(pkg.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {pkg.rating} ({pkg.reviews} reviews)
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <SafeIcon icon={FiUsers} />
                          <span>Up to {pkg.maxGuests}</span>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Highlights</h4>
                      <ul className="space-y-1">
                        {pkg.highlights.slice(0, 3).map((highlight, i) => (
                          <li key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                            <SafeIcon icon={FiCheck} className="text-green-500 text-xs" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                        {pkg.highlights.length > 3 && (
                          <li className="text-sm text-primary-600 font-medium">
                            +{pkg.highlights.length - 3} more highlights
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Inclusions */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Includes</h4>
                      <div className="flex flex-wrap gap-2">
                        {pkg.inclusions.map((inclusion, i) => (
                          <span
                            key={i}
                            className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-xs"
                          >
                            {inclusion}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gray-900">
                              ${pkg.price.toLocaleString()}
                            </span>
                            <span className="text-lg text-gray-500 line-through">
                              ${pkg.originalPrice.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">per package</p>
                        </div>
                        <div className="text-right">
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                            Save ${(pkg.originalPrice - pkg.price).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                          Book Now
                        </button>
                        <button className="w-full border-2 border-primary-500 text-primary-600 hover:bg-primary-50 py-3 rounded-lg font-semibold transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Why Choose Our Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our <span className="gradient-text">Packages</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every package is carefully crafted with luxury and value in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FiShield,
                title: 'Best Price Guarantee',
                description: 'We match any lower price you find elsewhere'
              },
              {
                icon: FiPlane,
                title: 'Premium Inclusions',
                description: 'Luxury accommodations and exclusive experiences'
              },
              {
                icon: FiCamera,
                title: 'Expert Curation',
                description: 'Handpicked destinations and activities'
              },
              {
                icon: FiCoffee,
                title: '24/7 Support',
                description: 'Round-the-clock assistance during your trip'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={feature.icon} className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let Seeta create a custom luxury package tailored specifically to your preferences and budget.
            </p>
            <a
              href="/chat"
              className="bg-luxury-gold hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <SafeIcon icon={FiPlane} />
              <span>Create Custom Package</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;