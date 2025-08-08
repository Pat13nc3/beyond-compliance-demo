// src/features/dashboard/components/ControlHotspotAnalysis.jsx

import React from 'react';
import { AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';

const ControlHotspotAnalysis = ({ data, onActionClick }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'At Risk':
        return <AlertTriangle className="h-6 w-6 text-yellow-400" />;
      case 'Failing':
        return <XCircle className="h-6 w-6 theme-text-danger-color" />; // Using theme-text-danger-color
      case 'Compliant':
        return <ShieldCheck className="h-6 w-6 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
        case 'At Risk': return 'text-yellow-400';
        case 'Failing': return 'theme-text-danger-color'; // Using theme-text-danger-color
        default: return 'text-green-500';
    }
  }

  return (
    <div className="theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary h-full">
      <h3 className="text-xl font-semibold mb-4 theme-text-highlight-color">Control Hotspot Analysis</h3>

      <div className="space-y-4">
        {data.map((item) => (
          // Individual hotspot item background - This comment is now correctly placed outside the JSX element or within curly braces if inside.
          <div key={item.id} className="flex items-start space-x-4 p-3 theme-bg-card-alt rounded-lg"> {/* Changed bg-gray-800/50 to theme-bg-card-alt */}
            <div className="flex-shrink-0 pt-1">{getStatusIcon(item.status)}</div>
            <div className="flex-grow">
              <p className="font-bold theme-text-primary">{item.name} <span className="text-xs theme-text-secondary font-mono">{item.id}</span></p>
              <p className="text-sm">
                <span className={`font-semibold ${getStatusColor(item.status)}`}>{item.status}:</span>
                <span className="theme-text-primary ml-1">{item.reason}</span>
              </p>
            </div>
            <button
              onClick={() => {
                console.log("Button in ControlHotspotAnalysis clicked for:", item.id);
                onActionClick(item);
              }}
              className="self-center bg-gray-600 hover:bg-gray-500 text-white text-xs font-bold py-2 px-3 rounded-md transition-colors whitespace-nowrap"
            >
              {item.cta} &rsaquo;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlHotspotAnalysis;
