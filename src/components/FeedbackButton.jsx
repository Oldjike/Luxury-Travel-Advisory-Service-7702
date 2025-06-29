import React, { useState } from 'react';
import { FeedbackWorkflow } from '@questlabs/react-sdk';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import questConfig from '../config/questConfig';

const { FiChevronLeft } = FiIcons;

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const EventTracking = () => {
    // Track feedback button click event
    console.log('Feedback button clicked');
  };

  const getUserId = () => {
    // Try to get user ID from localStorage first, fallback to config
    return localStorage.getItem('userId') || questConfig.USER_ID;
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        onClick={() => {
          EventTracking();
          setIsOpen((prev) => !prev);
        }}
        style={{ 
          background: questConfig.PRIMARY_COLOR,
          zIndex: 9999
        }}
        className="flex gap-1 rounded-t-md rounded-b-none justify-end items-center px-3 text-14 leading-5 font-semibold py-2 text-white fixed top-[calc(50%-20px)] -right-10 rotate-[270deg] transition-all h-9 hover:shadow-lg hover:scale-105"
        aria-label="Open Feedback"
      >
        <div className={`w-fit h-fit rotate-90 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <SafeIcon icon={FiChevronLeft} className="text-white text-sm" />
        </div>
        <p className="text-white text-sm font-medium leading-none">Feedback</p>
      </button>

      {/* Feedback Workflow Component */}
      {isOpen && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-md w-full mx-4">
            <FeedbackWorkflow
              uniqueUserId={getUserId()}
              questId={questConfig.QUEST_FEEDBACK_QUESTID}
              isOpen={isOpen}
              accent={questConfig.PRIMARY_COLOR}
              onClose={() => setIsOpen(false)}
              style={{
                borderRadius: '16px',
                maxWidth: '400px',
                width: '100%'
              }}
            >
              <FeedbackWorkflow.ThankYou />
            </FeedbackWorkflow>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;