// src/features/complianceReporting/modals/ActionChoiceModal.jsx

import React from 'react';
import { X, FilePlus2, Upload } from 'lucide-react';

const ActionChoiceModal = ({ event, onClose, onChoice }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-4 border-b text-center">
          <h2 className="text-xl font-bold text-gray-800">Start: {event.title}</h2>
          <p className="text-sm text-gray-500 mt-1">How would you like to begin this report?</p>
        </div>
        <div className="p-6 space-y-3">
          <button
            onClick={() => onChoice('generate')}
            className="w-full text-left flex items-center p-4 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors"
          >
            <div className="bg-blue-100 p-2 rounded-md mr-4">
                <FilePlus2 className="text-blue-600" />
            </div>
            <div>
                <p className="font-semibold text-gray-800">Generate from Template</p>
                <p className="text-xs text-gray-500">Use an existing report template.</p>
            </div>
          </button>
          <button
            onClick={() => onChoice('upload')}
            className="w-full text-left flex items-center p-4 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors"
          >
            <div className="bg-blue-100 p-2 rounded-md mr-4">
                <Upload className="text-blue-600" />
            </div>
            <div>
                <p className="font-semibold text-gray-800">Upload Existing File</p>
                <p className="text-xs text-gray-500">Upload a pre-prepared document.</p>
            </div>
          </button>
        </div>
        <div className="flex justify-end p-4 bg-gray-50 border-t rounded-b-xl">
          <button onClick={onClose} className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionChoiceModal;
