// src/features/complianceReporting/modals/ReportDraftModal.jsx

import React from 'react';
import { X, FileText, Send, Save } from 'lucide-react';

// The onFile prop is now onReadyForSubmission
const ReportDraftModal = ({ report, onClose, onReadyForSubmission }) => {
  if (!report) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl h-5/6 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-md mr-3">
              <FileText size={20} className="text-blue-600" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">{report.name}</h2>
                <p className="text-sm text-gray-500">Status: <span className="font-semibold text-yellow-600">{report.status}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-grow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">AI-Generated Draft Content</h3>
          <textarea
            defaultValue={report.content || "No content available for this draft."}
            className="w-full h-full min-h-[400px] p-3 border border-gray-300 rounded-md text-gray-800 bg-gray-50"
          />
        </div>

        <div className="flex justify-end p-4 bg-gray-50 border-t rounded-b-xl">
            <button onClick={onClose} className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 mr-2 flex items-center">
                <Save size={16} className="mr-2" />
                Save Draft
            </button>
            {/* --- UPDATED: This button now marks the report as ready for submission --- */}
            <button 
                onClick={() => onReadyForSubmission(report)} 
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 flex items-center"
            >
                <Send size={16} className="mr-2" />
                Ready for Submission
            </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDraftModal;