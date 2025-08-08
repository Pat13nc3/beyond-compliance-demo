// src/features/complianceReporting/modals/ReportDraftModal.jsx

import React, { useState } from 'react';
import { X, FileText, Send, Save, ShieldCheck } from 'lucide-react';

const ReportDraftModal = ({ report, onClose, onReadyForSubmission, triggerAIAnalysis }) => {
  const [editedContent, setEditedContent] = useState(report.content || "");
  const [isAiChecking, setIsAiChecking] = useState(false);

  if (!report) return null;

  const handleComplianceCheck = () => {
    setIsAiChecking(true);
    triggerAIAnalysis({
        reportName: report.name,
        content: editedContent
    }, 'ReportCompliance');
    setTimeout(() => {
        setIsAiChecking(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
      <div className="theme-bg-card rounded-xl shadow-2xl w-full max-w-3xl h-5/6 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b theme-border-color">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-md mr-3">
              <FileText size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold theme-text-primary">{report.name}</h2>
              <p className="text-sm theme-text-secondary">
                Status: <span className="font-semibold text-yellow-600">{report.status}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <X size={20} className="theme-text-secondary" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-grow">
          <h3 className="text-lg font-semibold theme-text-primary mb-2">AI-Generated Draft Content</h3>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-full min-h-[400px] p-3 border theme-border-color rounded-md theme-text-primary bg-gray-100 dark:bg-gray-800 resize-none"
          />
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900 border-t theme-border-color rounded-b-xl">
          <button
            onClick={handleComplianceCheck}
            disabled={isAiChecking || !editedContent}
            className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center text-sm"
          >
            <ShieldCheck size={16} className="mr-2" />
            Run Compliance Check
          </button>

          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="bg-white dark:bg-gray-800 border theme-border-color theme-text-primary font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            >
              <Save size={16} className="mr-2" />
              Save Draft
            </button>
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
    </div>
  );
};

export default ReportDraftModal;