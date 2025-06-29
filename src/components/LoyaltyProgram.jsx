import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiAward, FiStar, FiGift, FiTrendingUp, FiUsers, FiCrown, 
  FiShield, FiPlane, FiHeart, FiCalendar, FiPercent, FiCheck
} = FiIcons;

const LoyaltyProgram = ({ userId }) => {
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call to fetch member data
    const fetchMemberData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock member data
      const mockMemberData = {
        id: userId || 'user123',
        tier: 'Gold',
        points: 2847,
        nextTierPoints: 5000,
        lifetimePoints: 12450,
        memberSince: '2022-03-15',
        totalBookings: 8,
        totalSpent: 24500,
        benefits: [
          '10% discount on all bookings',
          'Priority customer support',
          'Free room upgrades (when available)',
          'Late checkout',
          'Complimentary breakfast',
          'Airport lounge access'
        ],
        recentActivity: [
          { date: '2024-01-15', action: 'Earned 450 points', details: 'Santorini Package Booking' },
          { date: '2024-01-10', action: 'Redeemed 200 points', details: 'Airport Lounge Access' },
          { date: '2023-12-22', action: 'Earned 380 points', details: 'Swiss Alps Adventure' },
          { date: '2023-11-18', action: 'Tier upgrade to Gold', details: 'Reached 2,500 lifetime points' }
        ],
        availableRewards: [
          { id: 1, name: 'Airport Lounge Day Pass', points: 500, description: 'Access to premium airport lounges worldwide' },
          { id: 2, name: 'Room Upgrade Certificate', points: 750, description: 'Guaranteed room upgrade at participating hotels' },
          { id: 3, name: '$50 Travel Credit', points: 1000, description: 'Credit towards your next booking' },
          { id: 4, name: 'Spa Treatment Voucher', points: 1200, description: 'Complimentary spa treatment at luxury resorts' },
          { id: 5, name: 'Private Transfer', points: 1500, description: 'Airport transfer in premium vehicle' },
          { id: 6, name: '$200 Dining Credit', points: 2000, description: 'Credit for fine dining experiences' }
        ]
      };
      
      setMemberData(mockMemberData);
      setLoading(false);
    };

    fetchMemberData();
  }, [userId]);

  const tiers = [
    {
      name: 'Silver',
      minPoints: 0,
      color: 'gray',
      benefits: ['5% discount', 'Priority support']
    },
    {
      name: 'Gold',
      minPoints: 2500,
      color: 'yellow',
      benefits: ['10% discount', 'Free upgrades', 'Late checkout']
    },
    {
      name: 'Platinum',
      minPoints: 5000,
      color: 'purple',
      benefits: ['15% discount', 'Guaranteed upgrades', 'Concierge service']
    },
    {
      name: 'Diamond',
      minPoints: 10000,
      color: 'blue',
      benefits: ['20% discount', 'Suite upgrades', 'Personal travel advisor']
    }
  ];

  const getProgressPercentage = () => {
    if (!memberData) return 0;
    const currentTier = tiers.find(t => t.name === memberData.tier);
    const currentTierIndex = tiers.findIndex(t => t.name === memberData.tier);
    const nextTier = tiers[currentTierIndex + 1];
    
    if (!nextTier) return 100; // Already at highest tier
    
    const progress = ((memberData.points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const handleRewardRedeem = (reward) => {
    if (memberData.points >= reward.points) {
      // Simulate reward redemption
      setMemberData(prev => ({
        ...prev,
        points: prev.points - reward.points,
        recentActivity: [
          { date: new Date().toISOString().split('T')[0], action: `Redeemed ${reward.points} points`, details: reward.name },
          ...prev.recentActivity
        ]
      }));
      alert(`Successfully redeemed ${reward.name}! Check your email for details.`);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!memberData) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <SafeIcon icon={FiUsers} className="text-4xl text-gray-400 mb-4 mx-auto" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Join Our Loyalty Program</h3>
        <p className="text-gray-600 mb-6">Start earning points and enjoying exclusive benefits today!</p>
        <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Sign Up Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiCrown} className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Loyalty Rewards</h2>
              <p className="text-blue-100">Member since {new Date(memberData.memberSince).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{memberData.points.toLocaleString()}</div>
            <div className="text-blue-100 text-sm">Available Points</div>
          </div>
        </div>

        {/* Tier Status */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiAward} className="text-yellow-400" />
              <span className="font-semibold">{memberData.tier} Member</span>
            </div>
            <div className="text-sm">
              {tiers.findIndex(t => t.name === memberData.tier) < tiers.length - 1 ? (
                <span>
                  {memberData.nextTierPoints - memberData.points} points to {tiers[tiers.findIndex(t => t.name === memberData.tier) + 1]?.name}
                </span>
              ) : (
                <span>Highest tier achieved!</span>
              )}
            </div>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: 'Overview', icon: FiTrendingUp },
            { id: 'rewards', label: 'Rewards', icon: FiGift },
            { id: 'activity', label: 'Activity', icon: FiCalendar },
            { id: 'benefits', label: 'Benefits', icon: FiStar }
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
              <SafeIcon icon={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Bookings', value: memberData.totalBookings, icon: FiPlane },
                { label: 'Total Spent', value: `$${memberData.totalSpent.toLocaleString()}`, icon: FiTrendingUp },
                { label: 'Lifetime Points', value: memberData.lifetimePoints.toLocaleString(), icon: FiAward },
                { label: 'Current Tier', value: memberData.tier, icon: FiCrown }
              ].map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <SafeIcon icon={stat.icon} className="text-2xl text-primary-600 mb-2 mx-auto" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tier Progress */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Tier Progress</h3>
              <div className="flex items-center justify-between">
                {tiers.map((tier, index) => {
                  const isActive = tier.name === memberData.tier;
                  const isPassed = memberData.points >= tier.minPoints;
                  
                  return (
                    <div key={tier.name} className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        isPassed ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                      } ${isActive ? 'ring-4 ring-primary-200' : ''}`}>
                        <SafeIcon icon={FiAward} />
                      </div>
                      <div className="text-sm font-medium text-gray-900">{tier.name}</div>
                      <div className="text-xs text-gray-500">{tier.minPoints}+ pts</div>
                      {index < tiers.length - 1 && (
                        <div className="absolute w-16 h-1 bg-gray-200 mt-6 ml-16">
                          <div className={`h-1 ${isPassed ? 'bg-primary-500' : 'bg-gray-200'}`} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Available Rewards</h3>
              <p className="text-gray-600">Redeem your points for exclusive benefits</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {memberData.availableRewards.map((reward) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <SafeIcon icon={FiGift} className="text-primary-600 text-xl" />
                    <div className="text-lg font-bold text-primary-600">
                      {reward.points} pts
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">{reward.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                  
                  <button
                    onClick={() => handleRewardRedeem(reward)}
                    disabled={memberData.points < reward.points}
                    className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                      memberData.points >= reward.points
                        ? 'bg-primary-500 hover:bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {memberData.points >= reward.points ? 'Redeem' : 'Insufficient Points'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            
            <div className="space-y-3">
              {memberData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiCalendar} className="text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.details}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(activity.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your {memberData.tier} Benefits</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {memberData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <SafeIcon icon={FiCheck} className="text-green-600" />
                  <span className="text-green-800 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Upgrade Benefits Preview */}
            {tiers.findIndex(t => t.name === memberData.tier) < tiers.length - 1 && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Upgrade to {tiers[tiers.findIndex(t => t.name === memberData.tier) + 1]?.name} to unlock:
                </h4>
                <div className="space-y-2">
                  {tiers[tiers.findIndex(t => t.name === memberData.tier) + 1]?.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <SafeIcon icon={FiStar} className="text-purple-600 text-sm" />
                      <span className="text-purple-800">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-purple-700">
                  Only {memberData.nextTierPoints - memberData.points} more points needed!
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyProgram;