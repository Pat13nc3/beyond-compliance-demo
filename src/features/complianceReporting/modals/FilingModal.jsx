// src/features/complianceReporting/modals/FilingModal.jsx

import React, { useState } from 'react';
import { X, ShieldCheck, LoaderCircle, Send, Mail, Server, Zap } from 'lucide-react';

// --- UPDATED: The component now receives an 'onFile' prop ---
const FilingModal = ({ report, onClose, onFile }) => {
  if (!report) return null;

  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setIsValidated(true);
    }, 1500);
  };

  // --- UPDATED: This function now calls the onFile prop ---
  const handleFileReport = () => {
    // This passes the report back up to the main component to be marked as "Filed"
    onFile(report);
  };

  const channels = [
    { id: 'email', name: 'Direct Email to Regulator', icon: Mail },
    { id: 'suptech', name: 'Regulator Suptech Platform', icon: Server },
    { id: 'api', name: 'Beyond Supervision API', icon: Zap },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">File Report: {report.name}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">1. Select Filing Channel</h3>
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`w-full text-left flex items-center p-3 border rounded-lg transition-all
                  ${selectedChannel === channel.id
                    ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-300'
                    : 'bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400'}`
                }
              >
                <channel.icon size={18} className="mr-3 text-gray-600" />
                <span className="font-semibold text-gray-800">{channel.name}</span>
              </button>
            ))}
          </div>

          <div className={`space-y-2 ${!selectedChannel ? 'opacity-50' : ''}`}>
            <h3 className="font-semibold text-gray-700 mb-2">2. Pre-Filing Validation</h3>
            <div className={`flex items-center justify-between p-4 rounded-lg
              ${isValidated ? 'bg-green-50 border border-green-300' : 'bg-blue-50 border border-blue-300'}`
            }>
              <div className="flex items-center">
                <div className={`p-2 rounded-md mr-3 ${isValidated ? 'bg-green-100' : 'bg-blue-100'}`}>
                  <ShieldCheck size={20} className={isValidated ? 'text-green-600' : 'text-blue-600'} />
                </div>
                <div>
                  <p className="font-bold text-gray-800">Ready to Validate</p>
                  <p className="text-sm text-gray-500">Verify content against the rules engine.</p>
                </div>
              </div>
              {isValidated ? (
                 <span className="font-semibold text-green-600">Validated</span>
              ) : (
                <button
                  onClick={handleValidate}
                  disabled={!selectedChannel || isValidating}
                  className="bg-blue-600 text-white font-bold py-2 px-3 rounded-md hover:bg-blue-500 flex items-center text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isValidating ? <LoaderCircle size={16} className="animate-spin mr-2"/> : null}
                  {isValidating ? 'Validating...' : 'Validate Now'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 bg-gray-50 border-t rounded-b-xl">
            <button onClick={onClose} className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 mr-2">
                Cancel
            </button>
            <button 
                onClick={handleFileReport}
                disabled={!isValidated || !selectedChannel}
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
            >
                <Send size={16} className="mr-2" />
                File Report
            </button>
        </div>
      </div>
    </div>
  );
};

export default FilingModal;