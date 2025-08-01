// src/features/complianceReporting/modals/UploadExistingReportModal.jsx

import React, { useState, useEffect } from 'react';
import { X, UploadCloud, File, Info, Sparkles, LoaderCircle, Lightbulb } from 'lucide-react';
import { mockTemplates } from '../../../data/mockData';

const UploadExistingReportModal = ({ onClose, onProcessReport }) => {
  const [file, setFile] = useState(null);
  const [reportName, setReportName] = useState('');
  const [regulator, setRegulator] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);

  useEffect(() => {
    if (file && !isProcessed) {
      setIsProcessing(true);
      const timer = setTimeout(() => {
        const fileName = file.name;
        let suggestedName = 'Uploaded Report';
        let suggestedRegulator = '';

        if (fileName.includes('ACR')) {
            suggestedName = `Annual Compliance Report (${fileName})`;
            suggestedRegulator = 'CMA';
        } else if (fileName.includes('CBN')) {
            suggestedName = `CBN Report (${fileName})`;
            suggestedRegulator = 'CBN';
        } else if (fileName.includes('AML')) {
            suggestedName = `AML Report (${fileName})`;
            suggestedRegulator = 'CBN';
        } else {
            suggestedRegulator = 'CMA';
        }

        setReportName(suggestedName);
        setRegulator(suggestedRegulator);
        
        setAiInsights({
            summary: `The AI has analyzed your document, "${fileName}". It appears to be a compliance report from ${new Date().getFullYear()}, focusing on AML/CFT regulations.`,
            keyPoints: [
                `Identified regulatory body: ${suggestedRegulator}.`,
                `Extracted report title: "${suggestedName}".`,
                'Detected tabular data and narrative sections typical of a formal report.',
                'Cross-referenced content with recent regulatory updates in the system.'
            ]
        });

        setIsProcessing(false);
        setIsProcessed(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [file, isProcessed]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsProcessed(false);
      setAiInsights(null);
      setReportName('');
      setRegulator('');
    }
  };

  const handleConfirm = () => {
    onProcessReport({
      name: reportName,
      file: file,
      regulator: regulator,
      status: 'Draft',
    });
    // Removed the onClose() call here. The parent component will now handle the modal's state change.
  };

  const isFormInvalid = !file || !reportName || !regulator;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">AI-Powered Report Ingestion</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Step 1: File Upload */}
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file-ai"
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer
                ${isProcessing ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}`
              }
            >
              {isProcessing ? (
                 <div className="flex flex-col items-center justify-center text-center p-4">
                    <LoaderCircle className="w-10 h-10 mb-3 text-blue-500 animate-spin" />
                    <p className="text-sm text-gray-600 font-semibold">AI is analyzing document...</p>
                 </div>
              ) : file ? (
                <div className="flex flex-col items-center justify-center text-center p-4">
                    <File className="w-10 h-10 mb-3 text-blue-500" />
                    <p className="mb-2 text-sm text-gray-700 font-semibold break-all">{file.name}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">The AI will analyze the content.</p>
                </div>
              )}
              <input id="dropzone-file-ai" type="file" className="hidden" onChange={handleFileChange} disabled={isProcessing} />
            </label>
          </div>

          {/* Step 2: AI-Populated Form & Insights (appears after processing) */}
          {isProcessed && (
            <div className="space-y-4 animate-fade-in">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                    <p className="text-sm text-blue-700">
                        The AI has extracted the following details. Please verify and confirm.
                    </p>
                </div>
                <div>
                    <label htmlFor="upload-reportName-ai" className="block text-sm font-medium text-gray-700 mb-1">Report Name</label>
                    <input
                        type="text"
                        id="upload-reportName-ai"
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                </div>
                <div>
                    <label htmlFor="upload-regulator-ai" className="block text-sm font-medium text-gray-700 mb-1">Regulator</label>
                    <select
                        id="upload-regulator-ai"
                        value={regulator}
                        onChange={(e) => setRegulator(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    >
                        <option value="">Select Regulator</option>
                        <option value="CBN">Central Bank of Nigeria (CBN)</option>
                        <option value="CMA">Capital Markets Authority (CMA)</option>
                        <option value="NDIC">Nigeria Deposit Insurance Corporation (NDIC)</option>
                        <option value="SARB">South African Reserve Bank (SARB)</option>
                    </select>
                </div>
                {aiInsights && (
                  <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded-r-lg space-y-2">
                    <h4 className="font-bold text-gray-800">AI Extracted Summary</h4>
                    <p className="text-sm text-gray-600">{aiInsights.summary}</p>
                    {aiInsights.keyPoints && (
                        <ul className="list-disc list-inside text-sm text-gray-600">
                            {aiInsights.keyPoints.map((point, index) => <li key={index}>{point}</li>)}
                        </ul>
                    )}
                  </div>
                )}
            </div>
          )}
        </div>

        <div className="flex justify-end p-4 bg-gray-50 border-t rounded-b-xl">
            <button onClick={onClose} className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 mr-2">
                Cancel
            </button>
            <button 
                onClick={handleConfirm} 
                disabled={isFormInvalid || isProcessing}
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
            >
                <Sparkles size={16} className="mr-2" />
                Confirm and Create Draft
            </button>
        </div>
      </div>
    </div>
  );
};

export default UploadExistingReportModal;
