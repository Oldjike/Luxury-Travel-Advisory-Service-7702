import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import TravelInsuranceOptions from './TravelInsuranceOptions';
import LoyaltyProgram from './LoyaltyProgram';
import ProductRecommendations from './ProductRecommendations';

const { 
  FiUser, FiCreditCard, FiCheck, FiLock, FiShield, FiCalendar, 
  FiMapPin, FiUsers, FiClock, FiArrowLeft, FiArrowRight, FiStar,
  FiPhone, FiMail, FiGlobe, FiAlertCircle, FiCheckCircle, FiX,
  FiGift, FiAward, FiTrendingUp, FiPercent, FiPlus
} = FiIcons;

const CheckoutFlow = ({ selectedPackage, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Travel Details
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    specialRequests: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    
    // Billing Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Insurance & Loyalty
    selectedInsurance: null,
    loyaltyNumber: '',
    usePoints: false,
    pointsToRedeem: 0,
    
    // Additional Options
    newsletterSubscription: true,
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [loyaltyMember, setLoyaltyMember] = useState(null);
  const [availablePoints, setAvailablePoints] = useState(0);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const steps = [
    { id: 1, title: 'Personal Info', icon: FiUser },
    { id: 2, title: 'Travel Details', icon: FiCalendar },
    { id: 3, title: 'Insurance & Add-ons', icon: FiShield },
    { id: 4, title: 'Payment', icon: FiCreditCard },
    { id: 5, title: 'Confirmation', icon: FiCheck }
  ];

  // Pricing calculations
  const basePrice = selectedPackage?.price || 0;
  const insurancePrice = formData.selectedInsurance?.price || 0;
  const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
  const subtotal = basePrice + insurancePrice + addOnsTotal;
  const loyaltyDiscount = loyaltyMember ? subtotal * (loyaltyMember.discountRate / 100) : 0;
  const pointsDiscount = formData.usePoints ? (formData.pointsToRedeem * 0.01) : 0;
  const taxes = (subtotal - loyaltyDiscount - pointsDiscount) * 0.12;
  const totalPrice = Math.max(0, subtotal - loyaltyDiscount - pointsDiscount + taxes);

  useEffect(() => {
    // Check for existing loyalty membership
    const checkLoyaltyMembership = () => {
      const memberId = localStorage.getItem('loyaltyMemberId');
      if (memberId) {
        // Simulate API call to get loyalty member data
        setLoyaltyMember({
          id: memberId,
          tier: 'Gold',
          points: 2500,
          discountRate: 10,
          benefits: ['10% discount', 'Priority support', 'Free upgrades']
        });
        setAvailablePoints(2500);
      }
    };

    checkLoyaltyMembership();
  }, []);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        break;

      case 2:
        if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
        if (!formData.returnDate) newErrors.returnDate = 'Return date is required';
        if (new Date(formData.departureDate) >= new Date(formData.returnDate)) {
          newErrors.returnDate = 'Return date must be after departure date';
        }
        break;

      case 4:
        if (!formData.cardNumber.replace(/\s/g, '')) newErrors.cardNumber = 'Card number is required';
        if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv) newErrors.cvv = 'CVV is required';
        if (!formData.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLoyaltyLookup = async (loyaltyNumber) => {
    if (loyaltyNumber) {
      // Simulate API call
      setTimeout(() => {
        setLoyaltyMember({
          id: loyaltyNumber,
          tier: 'Silver',
          points: 1200,
          discountRate: 5,
          benefits: ['5% discount', 'Priority support']
        });
        setAvailablePoints(1200);
      }, 1000);
    }
  };

  const handleInsuranceSelect = (insurance) => {
    setFormData(prev => ({ ...prev, selectedInsurance: insurance }));
  };

  const handleAddOnToggle = (addon) => {
    setSelectedAddOns(prev => {
      const exists = prev.find(item => item.id === addon.id);
      if (exists) {
        return prev.filter(item => item.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Calculate loyalty points earned
      const pointsEarned = Math.floor(totalPrice * 2); // 2 points per dollar
      
      onComplete({
        bookingId: 'BK' + Date.now(),
        package: selectedPackage,
        travelerInfo: formData,
        totalAmount: totalPrice,
        insurance: formData.selectedInsurance,
        addOns: selectedAddOns,
        pointsEarned,
        loyaltyMember
      });
    } catch (error) {
      console.error('Payment failed:', error);
      setErrors({ payment: 'Payment processing failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h3>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Loyalty Program Section */}
            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <SafeIcon icon={FiAward} className="mr-2 text-primary-600" />
                Loyalty Program
              </h4>
              
              {loyaltyMember ? (
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="font-semibold text-amber-800">{loyaltyMember.tier} Member</h5>
                      <p className="text-sm text-amber-600">Member ID: {loyaltyMember.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-amber-800">{availablePoints.toLocaleString()}</p>
                      <p className="text-xs text-amber-600">Available Points</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {loyaltyMember.benefits.map((benefit, index) => (
                      <span key={index} className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {availablePoints >= 100 && (
                    <div className="border-t border-amber-200 pt-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="usePoints"
                          checked={formData.usePoints}
                          onChange={(e) => handleInputChange('usePoints', e.target.checked)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded"
                        />
                        <label htmlFor="usePoints" className="text-sm text-amber-800">
                          Use points for this booking
                        </label>
                      </div>
                      
                      {formData.usePoints && (
                        <div className="mt-3">
                          <label className="block text-sm font-medium text-amber-800 mb-2">
                            Points to redeem (1 point = $0.01)
                          </label>
                          <input
                            type="range"
                            min="0"
                            max={Math.min(availablePoints, totalPrice * 50)}
                            value={formData.pointsToRedeem}
                            onChange={(e) => handleInputChange('pointsToRedeem', parseInt(e.target.value))}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-amber-600 mt-1">
                            <span>0 points</span>
                            <span className="font-medium">
                              {formData.pointsToRedeem} points = ${(formData.pointsToRedeem * 0.01).toFixed(2)} off
                            </span>
                            <span>{Math.min(availablePoints, totalPrice * 50)} points max</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="font-semibold text-gray-900">Join Our Loyalty Program</h5>
                      <p className="text-sm text-gray-600">Earn points and get exclusive benefits</p>
                    </div>
                    <SafeIcon icon={FiGift} className="text-2xl text-primary-600" />
                  </div>
                  
                  <div className="mb-4">
                    <input
                      type="text"
                      value={formData.loyaltyNumber}
                      onChange={(e) => handleInputChange('loyaltyNumber', e.target.value)}
                      onBlur={() => handleLoyaltyLookup(formData.loyaltyNumber)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Enter existing loyalty number (optional)"
                    />
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <p>• Earn 2 points per $1 spent</p>
                    <p>• Get 5% discount as Silver member</p>
                    <p>• Enjoy priority customer support</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Travel Details</h3>
              <p className="text-gray-600">When would you like to travel?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Date *
                </label>
                <input
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => handleInputChange('departureDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.departureDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.departureDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.departureDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date *
                </label>
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => handleInputChange('returnDate', e.target.value)}
                  min={formData.departureDate || new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.returnDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.returnDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.returnDate}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Adults
                </label>
                <select
                  value={formData.adults}
                  onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Children
                </label>
                <select
                  value={formData.children}
                  onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {[0, 1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>
                      {num === 0 ? 'No Children' : `${num} Child${num > 1 ? 'ren' : ''}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests or Dietary Requirements
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Any special requests, dietary requirements, or accessibility needs..."
              />
            </div>

            {/* Show recommendations button */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowRecommendations(!showRecommendations)}
                className="bg-primary-100 hover:bg-primary-200 text-primary-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto"
              >
                <SafeIcon icon={FiTrendingUp} />
                <span>{showRecommendations ? 'Hide' : 'Show'} Personalized Recommendations</span>
              </button>
            </div>

            {showRecommendations && (
              <div className="mt-6">
                <ProductRecommendations
                  userPreferences={{ destination: selectedPackage?.location }}
                  currentLocation={selectedPackage?.location}
                  travelDates={{ departure: formData.departureDate, return: formData.returnDate }}
                  maxRecommendations={4}
                  onProductSelect={(product) => {
                    console.log('Recommended product selected:', product);
                  }}
                />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Travel Protection & Add-ons</h3>
              <p className="text-gray-600">Protect your investment and enhance your experience</p>
            </div>

            {/* Travel Insurance */}
            <TravelInsuranceOptions
              tripCost={basePrice}
              travelers={formData.adults + formData.children}
              selectedInsurance={formData.selectedInsurance}
              onInsuranceSelect={handleInsuranceSelect}
            />

            {/* Additional Add-ons */}
            <div className="border-t pt-8">
              <h4 className="font-semibold text-gray-900 mb-6 flex items-center">
                <SafeIcon icon={FiPlus} className="mr-2 text-primary-600" />
                Enhance Your Experience
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: 'airport-lounge',
                    title: 'Airport Lounge Access',
                    description: 'Access to premium airport lounges worldwide',
                    price: 89,
                    popular: true
                  },
                  {
                    id: 'wifi-package',
                    title: 'International WiFi Package',
                    description: 'Stay connected with unlimited data',
                    price: 45,
                    popular: false
                  },
                  {
                    id: 'concierge-service',
                    title: '24/7 Concierge Service',
                    description: 'Personal assistant for your entire trip',
                    price: 150,
                    popular: true
                  },
                  {
                    id: 'photo-package',
                    title: 'Professional Photo Session',
                    description: 'Capture memories with a professional photographer',
                    price: 299,
                    popular: false
                  }
                ].map((addon) => (
                  <div
                    key={addon.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAddOns.find(item => item.id === addon.id)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAddOnToggle(addon)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">{addon.title}</h5>
                      {addon.popular && (
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{addon.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-600">
                        +${addon.price}
                      </span>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedAddOns.find(item => item.id === addon.id)
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAddOns.find(item => item.id === addon.id) && (
                          <SafeIcon icon={FiCheck} className="text-white text-sm" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Information</h3>
              <p className="text-gray-600">Secure payment processing</p>
              
              <div className="flex justify-center items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2 text-green-600">
                  <SafeIcon icon={FiShield} />
                  <span className="text-sm">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-600">
                  <SafeIcon icon={FiLock} />
                  <span className="text-sm">256-bit Encryption</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{selectedPackage?.title}</span>
                  <span>${basePrice.toFixed(2)}</span>
                </div>
                
                {formData.selectedInsurance && (
                  <div className="flex justify-between">
                    <span>{formData.selectedInsurance.name}</span>
                    <span>${formData.selectedInsurance.price.toFixed(2)}</span>
                  </div>
                )}
                
                {selectedAddOns.map((addon) => (
                  <div key={addon.id} className="flex justify-between">
                    <span>{addon.title}</span>
                    <span>${addon.price.toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {loyaltyDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Loyalty Discount ({loyaltyMember.discountRate}%)</span>
                      <span>-${loyaltyDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {pointsDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Points Redemption</span>
                      <span>-${pointsDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number *
                </label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                  maxLength="19"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1234 5678 9012 3456"
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    maxLength="4"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123"
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.cardholderName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Name on card"
                />
                {errors.cardholderName && (
                  <p className="mt-1 text-sm text-red-600">{errors.cardholderName}</p>
                )}
              </div>
            </div>

            {/* Billing Address */}
            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Billing Address</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123 Main Street"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="New York"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="NY"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="10001"
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.newsletterSubscription}
                  onChange={(e) => handleInputChange('newsletterSubscription', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-700">
                  Subscribe to our newsletter for exclusive deals and travel tips
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I accept the <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a> *
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-sm text-red-600">{errors.termsAccepted}</p>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <SafeIcon icon={FiCheckCircle} className="text-4xl text-green-600" />
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h3>
              <p className="text-xl text-gray-600 mb-6">
                Thank you for choosing TSeetaluxuryescape
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 text-left max-w-md mx-auto">
                <h4 className="font-semibold text-gray-900 mb-4">Booking Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Booking ID:</span>
                    <span className="font-mono">BK{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Package:</span>
                    <span>{selectedPackage?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travelers:</span>
                    <span>{formData.adults} Adult{formData.adults > 1 ? 's' : ''}{formData.children > 0 ? `, ${formData.children} Child${formData.children > 1 ? 'ren' : ''}` : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dates:</span>
                    <span>{formData.departureDate} to {formData.returnDate}</span>
                  </div>
                  {formData.selectedInsurance && (
                    <div className="flex justify-between">
                      <span>Insurance:</span>
                      <span>{formData.selectedInsurance.name}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Paid:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loyalty Points Earned */}
              {loyaltyMember && (
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto mt-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <SafeIcon icon={FiAward} className="text-amber-600" />
                    <span className="font-semibold text-amber-800">Points Earned!</span>
                  </div>
                  <p className="text-amber-700 text-sm">
                    You earned <strong>{Math.floor(totalPrice * 2)} points</strong> from this booking
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                A confirmation email has been sent to <strong>{formData.email}</strong>
              </p>
              <p className="text-gray-600">
                Our travel specialists will contact you within 24 hours to finalize your itinerary.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.print()}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Print Confirmation
              </button>
              <button
                onClick={onClose}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Planning
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Complete Your Booking</h2>
              <p className="text-blue-100">{selectedPackage?.title}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiX} className="text-xl" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id
                      ? 'bg-white text-primary-600'
                      : 'bg-white/20 text-white'
                  }`}>
                    {currentStep > step.id ? (
                      <SafeIcon icon={FiCheck} />
                    ) : (
                      <SafeIcon icon={step.icon} />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-1 mx-2 ${
                      currentStep > step.id ? 'bg-white' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-blue-100">
              {steps.map((step) => (
                <span key={step.id}>{step.title}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              <SafeIcon icon={FiArrowLeft} />
              <span>Back</span>
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Step {currentStep} of {steps.length}
              </p>
              {currentStep === 4 && (
                <p className="text-lg font-bold text-primary-600">
                  Total: ${totalPrice.toFixed(2)}
                </p>
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={isProcessing}
              className="flex items-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white rounded-lg font-semibold transition-colors"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{currentStep === 5 ? 'Complete Booking' : 'Next'}</span>
                  <SafeIcon icon={FiArrowRight} />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutFlow;