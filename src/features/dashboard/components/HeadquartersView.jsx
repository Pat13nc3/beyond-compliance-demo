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
    <div className="theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary h-full">
      <h2 className="text-xl font-semibold mb-4 theme-text-highlight-color">Corporate Structure</h2>
      <div className="space-y-3">
        {/* Main parent company card background */}
        <div className="p-3 border theme-border-color rounded-lg theme-bg-card-alt"> {/* Changed bg-gray-800/50 to theme-bg-card-alt */}
            <p className="font-bold theme-text-primary">{structure.parent.name}</p>
            <div className="flex justify-between items-center mt-1">
                <p className="text-sm theme-text-secondary">{structure.parent.location}</p>
                {getStatus(structure.parent.status)}
            </div>
        </div>
        <div className="space-y-2 pt-2">
          {structure.subsidiaries.map((sub) => (
            // Subsidiary card background
            <div key={sub.id} className="p-3 border theme-border-color rounded-lg ml-4 theme-bg-card-alt"> {/* Changed bg-gray-800/30 to theme-bg-card-alt */}
              <p className="font-semibold theme-text-primary">{sub.name}</p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm theme-text-secondary">{sub.location}</p>
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
