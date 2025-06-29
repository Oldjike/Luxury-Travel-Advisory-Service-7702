import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiCheck, FiX, FiInfo, FiAlertCircle, FiHeart, FiPlane, FiHome } = FiIcons;

const TravelInsuranceOptions = ({ tripCost, travelers, selectedInsurance, onInsuranceSelect }) => {
  const [showDetails, setShowDetails] = useState(null);

  const insuranceOptions = [
    {
      id: 'basic',
      name: 'Basic Protection',
      price: Math.round(tripCost * 0.05),
      coverage: tripCost * 1.0,
      popular: false,
      features: [
        'Trip cancellation up to 100% of trip cost',
        'Trip interruption coverage',
        'Baggage loss/delay coverage up to $1,000',
        'Travel delay coverage up to $500',
        '24/7 travel assistance'
      ],
      benefits: {
        medical: '$25,000',
        evacuation: '$100,000',
        baggage: '$1,000',
        cancellation: '100% of trip cost',
        delay: '$500'
      },
      description: 'Essential coverage for your peace of mind'
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Protection',
      price: Math.round(tripCost * 0.08),
      coverage: tripCost * 1.5,
      popular: true,
      features: [
        'Trip cancellation up to 150% of trip cost',
        'Trip interruption coverage',
        'Medical emergency coverage up to $50,000',
        'Emergency evacuation up to $500,000',
        'Baggage loss/delay coverage up to $2,500',
        'Travel delay coverage up to $1,500',
        'Rental car coverage',
        'Pre-existing medical conditions coverage',
        '24/7 concierge services'
      ],
      benefits: {
        medical: '$50,000',
        evacuation: '$500,000',
        baggage: '$2,500',
        cancellation: '150% of trip cost',
        delay: '$1,500'
      },
      description: 'Our most popular plan with comprehensive coverage'
    },
    {
      id: 'premium',
      name: 'Premium Protection Plus',
      price: Math.round(tripCost * 0.12),
      coverage: tripCost * 2.0,
      popular: false,
      features: [
        'Trip cancellation up to 200% of trip cost',
        'Trip interruption coverage',
        'Medical emergency coverage up to $100,000',
        'Emergency evacuation up to $1,000,000',
        'Baggage loss/delay coverage up to $5,000',
        'Travel delay coverage up to $2,500',
        'Rental car coverage',
        'Pre-existing medical conditions coverage',
        'Cancel for any reason (75% coverage)',
        'Adventure sports coverage',
        'Business equipment coverage',
        '24/7 premium concierge services',
        'Identity theft assistance'
      ],
      benefits: {
        medical: '$100,000',
        evacuation: '$1,000,000',
        baggage: '$5,000',
        cancellation: '200% of trip cost',
        delay: '$2,500'
      },
      description: 'Maximum protection with cancel for any reason coverage'
    }
  ];

  const handleInsuranceSelect = (insurance) => {
    onInsuranceSelect(selectedInsurance?.id === insurance.id ? null : insurance);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center justify-center">
          <SafeIcon icon={FiShield} className="mr-2 text-primary-600" />
          Travel Insurance Options
        </h4>
        <p className="text-sm text-gray-600">
          Protect your investment with comprehensive travel insurance
        </p>
      </div>

      {/* Insurance Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {insuranceOptions.map((option) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all relative ${
              selectedInsurance?.id === option.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleInsuranceSelect(option)}
          >
            {option.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-4">
              <h5 className="font-bold text-gray-900 mb-1">{option.name}</h5>
              <p className="text-sm text-gray-600 mb-3">{option.description}</p>
              <div className="text-2xl font-bold text-primary-600">
                ${option.price}
              </div>
              <p className="text-xs text-gray-500">for {travelers} traveler{travelers > 1 ? 's' : ''}</p>
            </div>

            <div className="space-y-2 mb-4">
              {option.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <SafeIcon icon={FiCheck} className="text-green-500 text-sm mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-700">{feature}</span>
                </div>
              ))}
              {option.features.length > 4 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(showDetails === option.id ? null : option.id);
                  }}
                  className="text-primary-600 text-xs hover:underline"
                >
                  {showDetails === option.id ? 'Show Less' : `+${option.features.length - 4} more features`}
                </button>
              )}
            </div>

            {showDetails === option.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t pt-4 mb-4"
              >
                <h6 className="font-semibold text-gray-900 mb-2">All Features:</h6>
                <div className="space-y-1">
                  {option.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <SafeIcon icon={FiCheck} className="text-green-500 text-sm mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-gray-50 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 mb-2 text-sm">Coverage Limits:</h6>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600">Medical:</span>
                      <span className="font-medium ml-1">{option.benefits.medical}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Evacuation:</span>
                      <span className="font-medium ml-1">{option.benefits.evacuation}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Baggage:</span>
                      <span className="font-medium ml-1">{option.benefits.baggage}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Delay:</span>
                      <span className="font-medium ml-1">{option.benefits.delay}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="text-center">
              <div className={`w-5 h-5 rounded-full border-2 mx-auto flex items-center justify-center ${
                selectedInsurance?.id === option.id
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-gray-300'
              }`}>
                {selectedInsurance?.id === option.id && (
                  <SafeIcon icon={FiCheck} className="text-white text-sm" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Insurance Option */}
      <div className="text-center">
        <button
          onClick={() => onInsuranceSelect(null)}
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
            !selectedInsurance
              ? 'border-gray-400 bg-gray-100 text-gray-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          {!selectedInsurance ? (
            <SafeIcon icon={FiCheck} className="text-gray-700" />
          ) : (
            <SafeIcon icon={FiX} className="text-gray-600" />
          )}
          <span className="text-sm">No insurance needed</span>
        </button>
      </div>

      {/* Insurance Recommendation */}
      {!selectedInsurance && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiAlertCircle} className="text-amber-600 mt-0.5" />
            <div>
              <h6 className="font-semibold text-amber-800 mb-1">Insurance Recommended</h6>
              <p className="text-sm text-amber-700 mb-2">
                Travel insurance protects your investment in case of unexpected events like illness, natural disasters, or trip cancellations.
              </p>
              <p className="text-xs text-amber-600">
                Based on your trip cost of ${tripCost.toLocaleString()}, we recommend the Comprehensive Protection plan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Selected Insurance Summary */}
      {selectedInsurance && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiShield} className="text-green-600" />
              <div>
                <h6 className="font-semibold text-green-800">{selectedInsurance.name}</h6>
                <p className="text-sm text-green-700">
                  Coverage up to ${selectedInsurance.coverage.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-800">
                +${selectedInsurance.price}
              </p>
              <p className="text-xs text-green-600">Added to total</p>
            </div>
          </div>
        </div>
      )}

      {/* Insurance FAQ */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h6 className="font-semibold text-gray-900 mb-3">Frequently Asked Questions</h6>
        <div className="space-y-2 text-sm">
          <details className="group">
            <summary className="cursor-pointer text-gray-700 hover:text-gray-900">
              When should I buy travel insurance?
            </summary>
            <p className="text-gray-600 mt-1 text-xs">
              Purchase travel insurance within 14 days of your initial trip payment to maximize coverage benefits.
            </p>
          </details>
          <details className="group">
            <summary className="cursor-pointer text-gray-700 hover:text-gray-900">
              What is "Cancel for Any Reason" coverage?
            </summary>
            <p className="text-gray-600 mt-1 text-xs">
              This optional coverage allows you to cancel your trip for any reason not covered by standard policies, typically reimbursing 75% of non-refundable trip costs.
            </p>
          </details>
          <details className="group">
            <summary className="cursor-pointer text-gray-700 hover:text-gray-900">
              Are pre-existing medical conditions covered?
            </summary>
            <p className="text-gray-600 mt-1 text-xs">
              Comprehensive and Premium plans include coverage for pre-existing conditions if you purchase insurance within 14 days of your initial trip payment.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default TravelInsuranceOptions;