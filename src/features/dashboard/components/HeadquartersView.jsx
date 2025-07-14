// src/features/dashboard/components/HeadquartersView.jsx

import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

const HeadquartersView = ({ structure }) => {
  if (!structure) return null;

  const getStatus = (status) => (
    status === 'Active'
      ? <span className="flex items-center text-sm text-green-400"><CheckCircle className="h-5 w-5 mr-1" /> Active</span>
      : <span className="flex items-center text-sm text-yellow-400"><Clock className="h-5 w-5 mr-1" /> In Review</span>
  );

  return (
    // UPDATED: Switched to dark theme to match other components
    <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white h-full">
      <h2 className="text-xl font-semibold text-[#c0933e] mb-4">Corporate Structure</h2>
      <div className="space-y-3">
        {/* Parent Company */}
        <div className="p-3 border border-gray-700 rounded-lg bg-gray-800/50">
            <p className="font-bold text-gray-100">{structure.parent.name}</p>
            <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-400">{structure.parent.location}</p>
                {getStatus(structure.parent.status)}
            </div>
        </div>
        {/* Subsidiaries */}
        <div className="space-y-2 pt-2">
          {structure.subsidiaries.map((sub) => (
            <div key={sub.id} className="p-3 border border-gray-700 rounded-lg ml-4 bg-gray-800/30">
              <p className="font-semibold text-gray-200">{sub.name}</p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-400">{sub.location}</p>
                {getStatus(sub.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeadquartersView;