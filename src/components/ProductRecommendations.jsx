import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiStar, FiHeart, FiShoppingCart, FiEye, FiMapPin, FiClock, 
  FiUsers, FiCheck, FiTrendingUp, FiFilter, FiRefreshCw,
  FiPlane, FiCamera, FiUmbrella, FiShield, FiWifi, FiCoffee
} = FiIcons;

const ProductRecommendations = ({ 
  userPreferences = {}, 
  currentLocation = '', 
  travelDates = null,
  onProductSelect = () => {},
  maxRecommendations = 8 
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [favorites, setFavorites] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Recommendations', icon: FiTrendingUp },
    { id: 'accommodations', name: 'Hotels & Resorts', icon: FiMapPin },
    { id: 'flights', name: 'Flights', icon: FiPlane },
    { id: 'activities', name: 'Activities & Tours', icon: FiCamera },
    { id: 'insurance', name: 'Travel Insurance', icon: FiShield },
    { id: 'accessories', name: 'Travel Gear', icon: FiUmbrella }
  ];

  // Mock product data - in real app, this would come from API
  const mockProducts = [
    {
      id: 1,
      category: 'accommodations',
      title: 'Grand Luxury Resort & Spa',
      location: 'Santorini, Greece',
      price: 450,
      originalPrice: 650,
      rating: 4.9,
      reviews: 1247,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      features: ['Ocean View', 'Spa Access', 'Free WiFi', 'Pool'],
      description: 'Luxurious beachfront resort with stunning sunset views and premium amenities.',
      relevanceScore: 95,
      isRecommended: true,
      dealType: 'Limited Time',
      savings: 200,
      availability: 'High'
    },
    {
      id: 2,
      category: 'flights',
      title: 'Emirates Business Class',
      location: 'New York → Dubai → Santorini',
      price: 2850,
      originalPrice: 3200,
      rating: 4.8,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop',
      features: ['Lie-flat Seats', 'Premium Meals', 'Lounge Access', 'Extra Baggage'],
      description: 'Experience luxury in the sky with Emirates award-winning business class service.',
      relevanceScore: 88,
      isRecommended: true,
      dealType: 'Flash Sale',
      savings: 350,
      availability: 'Limited'
    },
    {
      id: 3,
      category: 'activities',
      title: 'Private Sunset Yacht Cruise',
      location: 'Santorini, Greece',
      price: 280,
      originalPrice: 350,
      rating: 4.9,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      features: ['Private Charter', 'Dinner Included', 'Professional Guide', 'Photo Service'],
      description: 'Romantic sunset cruise with dinner and champagne around the beautiful caldera.',
      relevanceScore: 92,
      isRecommended: false,
      dealType: 'Best Seller',
      savings: 70,
      availability: 'High'
    },
    {
      id: 4,
      category: 'insurance',
      title: 'Comprehensive Travel Protection',
      location: 'Global Coverage',
      price: 89,
      originalPrice: 120,
      rating: 4.7,
      reviews: 2341,
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop',
      features: ['Medical Coverage', 'Trip Cancellation', 'Baggage Protection', '24/7 Support'],
      description: 'Complete peace of mind with comprehensive travel insurance coverage.',
      relevanceScore: 75,
      isRecommended: true,
      dealType: 'Recommended',
      savings: 31,
      availability: 'High'
    },
    {
      id: 5,
      category: 'accessories',
      title: 'Premium Travel Luggage Set',
      location: 'Worldwide Shipping',
      price: 299,
      originalPrice: 450,
      rating: 4.6,
      reviews: 1876,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      features: ['Hard Shell', 'TSA Lock', 'Spinner Wheels', '10 Year Warranty'],
      description: 'Durable and stylish luggage set perfect for luxury travel adventures.',
      relevanceScore: 70,
      isRecommended: false,
      dealType: 'Sale',
      savings: 151,
      availability: 'Medium'
    },
    {
      id: 6,
      category: 'accommodations',
      title: 'Boutique Mountain Lodge',
      location: 'Swiss Alps, Switzerland',
      price: 380,
      originalPrice: 520,
      rating: 4.8,
      reviews: 689,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      features: ['Mountain View', 'Ski Access', 'Spa', 'Fine Dining'],
      description: 'Cozy alpine retreat with breathtaking mountain views and luxury amenities.',
      relevanceScore: 85,
      isRecommended: true,
      dealType: 'Early Bird',
      savings: 140,
      availability: 'Low'
    }
  ];

  useEffect(() => {
    // Simulate API call to get personalized recommendations
    const fetchRecommendations = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filter and sort products based on user preferences
      let filteredProducts = mockProducts;
      
      if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
          product.category === selectedCategory
        );
      }
      
      // Sort products
      filteredProducts.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'savings':
            return b.savings - a.savings;
          case 'relevance':
          default:
            return b.relevanceScore - a.relevanceScore;
        }
      });
      
      setRecommendations(filteredProducts.slice(0, maxRecommendations));
      setLoading(false);
    };

    fetchRecommendations();
  }, [selectedCategory, sortBy, userPreferences, maxRecommendations]);

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const handleProductClick = (product) => {
    onProductSelect(product);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-48 bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Seeta's Recommendations</h3>
            <p className="text-blue-100">
              Personalized picks based on your preferences and travel style
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} className="text-xl" />
          </button>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-white text-primary-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <SafeIcon icon={category.icon} className="text-sm" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort Controls */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SafeIcon icon={FiFilter} className="text-gray-500" />
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="relevance">Most Relevant</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="savings">Best Savings</option>
            </select>
          </div>
          <span className="text-sm text-gray-500">
            {recommendations.length} recommendations
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {recommendations.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => handleProductClick(product)}
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isRecommended && (
                      <div className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Seeta's Pick
                      </div>
                    )}
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.dealType === 'Flash Sale' ? 'bg-red-500 text-white' :
                      product.dealType === 'Limited Time' ? 'bg-orange-500 text-white' :
                      product.dealType === 'Best Seller' ? 'bg-green-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {product.dealType}
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                  >
                    <SafeIcon 
                      icon={FiHeart} 
                      className={`text-sm ${
                        favorites.has(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                      }`} 
                    />
                  </button>

                  {/* Availability Indicator */}
                  <div className="absolute bottom-3 right-3">
                    <div className={`w-3 h-3 rounded-full ${
                      product.availability === 'High' ? 'bg-green-400' :
                      product.availability === 'Medium' ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`}></div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {product.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <SafeIcon icon={FiMapPin} className="text-xs mr-1" />
                      <span className="truncate">{product.location}</span>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <SafeIcon
                            key={i}
                            icon={FiStar}
                            className={`text-xs ${
                              i < Math.floor(product.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                      {product.features.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{product.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      {product.savings > 0 && (
                        <div className="text-xs text-green-600 font-medium">
                          Save ${product.savings}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">
                        {product.category === 'accommodations' ? 'per night' :
                         product.category === 'flights' ? 'per person' :
                         product.category === 'activities' ? 'per person' :
                         'total'}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                      className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <SafeIcon icon={FiShoppingCart} className="text-sm" />
                      <span>Select</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle view details
                      }}
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      <SafeIcon icon={FiEye} className="text-sm" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {recommendations.length >= maxRecommendations && (
          <div className="text-center mt-8">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
              Load More Recommendations
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Recommendations powered by Seeta's 40+ years of travel expertise
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Prices and availability subject to change. Book now to secure these deals.
        </p>
      </div>
    </motion.div>
  );
};

export default ProductRecommendations;