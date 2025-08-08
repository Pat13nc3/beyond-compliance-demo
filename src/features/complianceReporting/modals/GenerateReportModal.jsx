// src/features/complianceReporting/modals/GenerateReportModal.jsx

import React, { useState, useEffect } from 'react';
import { X, FileText, Sparkles, Info, LoaderCircle, Lightbulb } from 'lucide-react';
import { mockTemplates } from '../../../data/mockData';

const GenerateReportModal = ({ onClose, onProcessReport, triggerAIAnalysis }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [reportName, setReportName] = useState('');
  const [regulator, setRegulator] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  useEffect(() => {
    if (selectedTemplate && !isProcessed) {
      setIsProcessing(true);
      const timer = setTimeout(() => {
        setReportName(`${selectedTemplate.name} - ${new Date().toLocaleDateString()}`);
        setRegulator('CBN');
        setIsProcessing(false);
        setIsProcessed(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [selectedTemplate, isProcessed]);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setIsProcessed(false);
  };

  const handleConfirm = () => {
    onProcessReport({
      name: reportName,
      template: selectedTemplate,
      regulator: regulator,
      status: 'Draft',
    });
  };

  const handleAIAssistClick = () => {
    if (triggerAIAnalysis) {
      triggerAIAnalysis({
        reportName: reportName || 'Untitled Report',
        templateId: selectedTemplate?.id,
        templateName: selectedTemplate?.name,
        regulator: regulator,
        status: 'Drafting',
      }, 'ReportDraft');
    }
  };

  const isFormInvalid = !selectedTemplate || !reportName || !regulator;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
      <div className="theme-bg-card rounded-xl shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b theme-border-color">
          <h2 className="text-xl font-bold theme-text-primary">AI-Powered Report Generation</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <X size={20} className="theme-text-secondary" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold theme-text-primary mb-2">Select a Template</h3>
            <div className="space-y-2">
                {mockTemplates.map((template) => (
                <button
                    key={template.id}
                    onClick={() => handleSelectTemplate(template)}
                    disabled={isProcessing}
                    className={`w-full text-left flex items-start p-3 border rounded-lg transition-all disabled:cursor-wait
                    ${selectedTemplate?.id === template.id
                        ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-300'
                        : 'theme-bg-card border theme-border-color hover:bg-gray-100 dark:hover:bg-gray-700'}`
                    }
                >
                    <div className="bg-blue-100 p-2 rounded-md mr-3">
                        <FileText size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="font-bold theme-text-primary">{template.name}</p>
                        <p className="text-sm theme-text-secondary">{template.description}</p>
                    </div>
                </button>
                ))}
            </div>
          </div>

          {isProcessing ? (
            <div className="flex flex-col items-center justify-center text-center p-4 h-36">
                <LoaderCircle className="w-10 h-10 mb-3 text-blue-500 animate-spin" />
                <p className="text-sm theme-text-secondary font-semibold">AI is preparing your draft...</p>
            </div>
          ) : selectedTemplate && (
            <div className="space-y-4 animate-fade-in">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                    <p className="text-sm text-blue-700 flex items-center">
                        <Info size={16} className="mr-2"/> The AI has prepared the following draft. Please verify and confirm.
                    </p>
                </div>
                <div>
                    <label htmlFor="generate-reportName-ai" className="block text-sm font-medium theme-text-primary mb-1">Report Name</label>
                    <input
                        type="text"
                        id="generate-reportName-ai"
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                        className="w-full px-3 py-2 border theme-border-color rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 theme-text-primary bg-gray-100 dark:bg-gray-800"
                    />
                </div>
                <div>
                    <label htmlFor="generate-regulator-ai" className="block text-sm font-medium theme-text-primary mb-1">Regulator</label>
                    <select
                        id="generate-regulator-ai"
                        value={regulator}
                        onChange={(e) => setRegulator(e.target.value)}
                        className="w-full px-3 py-2 border theme-border-color rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 theme-text-primary"
                    >
                        <option value="">Select Regulator</option>
                        <option value="CBN">Central Bank of Nigeria (CBN)</option>
                        <option value="CMA">Capital Markets Authority (CMA)</option>
                        <option value="NDIC">Nigeria Deposit Insurance Corporation (NDIC)</option>
                        <option value="SARB">South African Reserve Bank (SARB)</option>
                    </select>
                </div>
                <div className="text-right">
                    <button
                        onClick={handleAIAssistClick}
                        disabled={isProcessing || !selectedTemplate || !reportName || !regulator}
                        className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center ml-auto text-sm"
                    >
                        <Lightbulb size={16} className="mr-2"/> Get AI Insights
                    </button>
                </div>
            </div>
          )}
        </div>

        <div className="flex justify-end p-4 bg-gray-100 dark:bg-gray-900 border-t theme-border-color rounded-b-xl">
            <button onClick={onClose} className="bg-white dark:bg-gray-800 border theme-border-color theme-text-primary font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-2">
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