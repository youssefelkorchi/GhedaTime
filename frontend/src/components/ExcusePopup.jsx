import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function ExcusePopup({ excuse, onClose }) {
  useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg p-4 max-w-md animate-float-medium z-50">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <span className="text-2xl mr-2">😅</span>
          <h3 className="font-bold text-yellow-800">Your Excuse:</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-2 text-yellow-700 italic">"{excuse}"</p>
      <div className="mt-3 text-xs text-gray-500">Powered by Excuse Generator 3000™</div>
    </div>
  );
}

export default ExcusePopup;