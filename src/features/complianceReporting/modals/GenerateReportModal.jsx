// src/features/complianceReporting/modals/GenerateReportModal.jsx

import React, { useState, useEffect } from 'react';
import { X, FileText, Sparkles, Info, LoaderCircle } from 'lucide-react';
import { mockTemplates } from '../../../data/mockData';

const GenerateReportModal = ({ onClose, onProcessReport }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [reportName, setReportName] = useState('');
  const [regulator, setRegulator] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  // This effect simulates the AI processing the template selection
  useEffect(() => {
    if (selectedTemplate && !isProcessed) {
      setIsProcessing(true);
      // Simulate AI analysis delay
      const timer = setTimeout(() => {
        // AI "suggests" data based on the template
        setReportName(`${selectedTemplate.name} - ${new Date().toLocaleDateString()}`);
        // A real AI would determine this from context, we'll simulate it
        setRegulator('CBN'); 
        setIsProcessing(false);
        setIsProcessed(true);
      }, 1500); // 1.5-second delay

      return () => clearTimeout(timer);
    }
  }, [selectedTemplate, isProcessed]);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setIsProcessed(false); // Reset processing state if a new template is chosen
  };

  const handleConfirm = () => {
    onProcessReport({
      name: reportName,
      template: selectedTemplate,
      regulator: regulator,
      status: 'Draft',
    });
  };

  const isFormInvalid = !selectedTemplate || !reportName || !regulator;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">AI-Powered Report Generation</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Step 1: Template Selection */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Select a Template</h3>
            <div className="space-y-2">
                {mockTemplates.map((template) => (
                <button
                    key={template.id}
                    onClick={() => handleSelectTemplate(template)}
                    disabled={isProcessing}
                    className={`w-full text-left flex items-start p-3 border rounded-lg transition-all disabled:cursor-wait
                    ${selectedTemplate?.id === template.id 
                        ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-300' 
                        : 'bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400'}`
                    }
                >
                    <div className="bg-blue-100 p-2 rounded-md mr-3">
                        <FileText size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">{template.name}</p>
                        <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                </button>
                ))}
            </div>
          </div>

          {/* Step 2: AI Processing & Confirmation Form */}
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center text-center p-4 h-36">
                <LoaderCircle className="w-10 h-10 mb-3 text-blue-500 animate-spin" />
                <p className="text-sm text-gray-600 font-semibold">AI is preparing your draft...</p>
            </div>
          ) : isProcessed && (
            <div className="space-y-4 animate-fade-in">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                    <p className="text-sm text-blue-700">
                        The AI has prepared the following draft. Please verify and confirm.
                    </p>
                </div>
                <div>
                    <label htmlFor="generate-reportName-ai" className="block text-sm font-medium text-gray-700 mb-1">Report Name</label>
                    <input
                        type="text"
                        id="generate-reportName-ai"
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                </div>
                <div>
                    <label htmlFor="generate-regulator-ai" className="block text-sm font-medium text-gray-700 mb-1">Regulator</label>
                    <select
                        id="generate-regulator-ai"
                        value={regulator}
                        onChange={(e) => setRegulator(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    >
                        <option value="CBN">Central Bank of Nigeria (CBN)</option>
                        <option value="CMA">Capital Markets Authority (CMA)</option>
                        <option value="NDIC">Nigeria Deposit Insurance Corporation (NDIC)</option>
                        <option value="SARB">South African Reserve Bank (SARB)</option>
                    </select>
                </div>
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

export default GenerateReportModal;