import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemCard = ({ item, onClaimClick }) => {
  const [claimStatus, setClaimStatus] = useState(null);

  // Fetch claims to check if a claim exists and its status
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/claims/${item._id}`);
        if (res.data.success && res.data.data.length > 0) {
          // Assuming we show the status of the most recent claim or just the fact that it has a claim
          setClaimStatus(res.data.data[0].status);
        }
      } catch (err) {
        console.error('Error fetching claims:', err);
      }
    };
    fetchClaims();
  }, [item._id]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 rounded-2xl p-6 transition-all duration-300 flex flex-col h-full group">
      <div className="flex justify-between items-start mb-4 gap-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 flex-grow leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex-shrink-0
          ${item.type === 'lost' 
            ? 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/50' 
            : 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/50'}`}>
          {item.type}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3 flex-grow">{item.description}</p>
      
      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/80">
        <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-400 dark:text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">Location</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium truncate" title={item.location}>{item.location}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 dark:text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">Date</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">{new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
        
        {claimStatus && (
          <div className={`mb-4 px-3 py-2 rounded-lg text-sm font-medium border
            ${claimStatus === 'accepted' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30' : 
              claimStatus === 'rejected' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30' : 
              'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30'}`}>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-current"></span>
              Status: {claimStatus.charAt(0).toUpperCase() + claimStatus.slice(1)}
            </span>
          </div>
        )}
        
        <button 
          onClick={() => onClaimClick(item)}
          className="w-full px-4 py-2.5 bg-gray-50 hover:bg-blue-50 dark:bg-gray-700/50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white font-semibold rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-200 dark:hover:border-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Claim This Item
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
