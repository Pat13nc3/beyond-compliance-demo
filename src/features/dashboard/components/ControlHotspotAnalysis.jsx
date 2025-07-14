// src/features/dashboard/components/ControlHotspotAnalysis.jsx

import React from 'react';
import { AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';

const ControlHotspotAnalysis = ({ data }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'At Risk':
        return <AlertTriangle className="h-6 w-6 text-yellow-400" />;
      case 'Failing':
        return <XCircle className="h-6 w-6 text-red-500" />;
      case 'Compliant':
        return <ShieldCheck className="h-6 w-6 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
        case 'At Risk': return 'text-yellow-400';
        case 'Failing': return 'text-red-500';
        default: return 'text-green-500';
    }
  }

  return (
    // UPDATED: Applied dark theme and styling to match other dashboard cards
    <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white h-full">
      {/* UPDATED: Title is now bold and uses the consistent gold color */}
      <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Control Hotspot Analysis</h3>
      
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="flex items-start space-x-4 p-3 bg-gray-800/50 rounded-lg">
            <div className="flex-shrink-0 pt-1">{getStatusIcon(item.status)}</div>
            <div className="flex-grow">
              <p className="font-bold text-gray-100">{item.name} <span className="text-xs text-gray-500 font-mono">{item.id}</span></p>
              <p className="text-sm">
                <span className={`font-semibold ${getStatusColor(item.status)}`}>{item.status}:</span>
                <span className="text-gray-300 ml-1">{item.reason}</span>
              </p>
            </div>
            <button className="self-center bg-gray-600 hover:bg-gray-500 text-white text-xs font-bold py-2 px-3 rounded-md transition-colors whitespace-nowrap">
              {item.cta} &rsaquo;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlHotspotAnalysis;