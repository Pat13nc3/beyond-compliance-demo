// src/features/complianceReporting/modals/ActionChoiceModal.jsx

import React from 'react';
import { X, FilePlus2, Upload } from 'lucide-react';

const ActionChoiceModal = ({ event, onClose, onChoice }) => {
  const modalTitle = event ? `Start: ${event.title}` : "Initiate Report Creation";
  const modalDescription = event ? `How would you like to begin this report?` : "Choose how to prepare your report using available data.";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
      <div className="theme-bg-card rounded-xl shadow-2xl w-full max-w-md theme-text-primary">
        <div className="p-4 border-b theme-border-color text-center">
          <h2 className="text-xl font-bold theme-text-primary">{modalTitle}</h2>
          <p className="text-sm theme-text-secondary mt-1">{modalDescription}</p>
        </div>
        <div className="p-6 space-y-3">
          <button
            onClick={() => onChoice('generate')}
            className="w-full text-left flex items-center p-4 theme-bg-card border theme-border-color rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="bg-blue-100 p-2 rounded-md mr-4">
                <FilePlus2 className="text-blue-600" />
            </div>
            <div>
                <p className="font-semibold theme-text-primary">Generate from Template</p>
                <p className="text-xs theme-text-secondary">Use an existing report template.</p>
            </div>
          </button>
          <button
            onClick={() => onChoice('upload')}
            className="w-full text-left flex items-center p-4 theme-bg-card border theme-border-color rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="bg-blue-100 p-2 rounded-md mr-4">
                <Upload className="text-blue-600" />
            </div>
            <div>
                <p className="font-semibold theme-text-primary">Upload Existing File</p>
                <p className="text-xs theme-text-secondary">Upload a pre-prepared document.</p>
            </div>
          </button>
        </div>
        <div className="flex justify-end p-4 theme-bg-card border-t theme-border-color rounded-b-xl">
          <button onClick={onClose} className="bg-gray-100 dark:bg-gray-700 border theme-border-color theme-text-primary font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionChoiceModal;