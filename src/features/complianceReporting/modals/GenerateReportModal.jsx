import React from 'react';
import { X, Library, Database, CheckCircle } from 'lucide-react';

const GenerateReportModal = ({
    step,
    onNavigateStep,
    onBrowse,
    selectedTemplate,
    selectedSources,
    onSourceToggle,
    onClose,
    onGenerate,
    dataSources // We will pass this in from the parent
}) => {

    const handleGenerate = () => {
        onGenerate({ template: selectedTemplate, sources: selectedSources });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl text-gray-800">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <h2 className="text-2xl font-bold">Generate Compliance Report</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200"><X size={24} /></button>
                </div>

                <div className="p-4 min-h-[300px]">
                    {/* Step 1: Select Template */}
                    {step === 1 && (
                        <div className="text-center flex flex-col items-center justify-center h-full">
                            <Library size={48} className="text-blue-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Step 1: Select a Report Template</h3>
                            <p className="text-gray-500 mb-6">Choose a template from your library to begin.</p>
                            <button onClick={onBrowse} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-500">
                                Browse Template Library
                            </button>
                        </div>
                    )}

                    {/* Step 2: Select Data Sources */}
                    {step === 2 && (
                        <div>
                            <div className="flex items-center text-lg font-semibold mb-4">
                               <Database size={24} className="text-blue-500 mr-3" />
                               <h3>Step 2: Select Data Sources</h3>
                            </div>
                            {selectedTemplate && (
                                <div className="bg-gray-100 p-3 rounded-lg mb-4 flex items-center">
                                    <CheckCircle size={20} className="text-green-500 mr-3" />
                                    <div>
                                        <p className="text-gray-600 text-sm">Template Selected:</p>
                                        <p className="font-bold text-gray-800">{selectedTemplate.name}</p>
                                    </div>
                                </div>
                            )}
                            <p className="text-gray-600 mb-4">Choose the relevant data sources to populate the report.</p>
                            <div className="space-y-2 max-h-48 overflow-y-auto border p-3 rounded-lg">
                                {dataSources.map(source => (
                                    <label key={source.id} className="flex items-center bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-200">
                                        <input
                                            type="checkbox"
                                            checked={selectedSources.includes(source.id)}
                                            onChange={() => onSourceToggle(source.id)}
                                            className="form-checkbox h-5 w-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="ml-3 text-gray-800 font-medium">{source.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Confirm & Generate */}
                    {step === 3 && (
                         <div>
                            <div className="flex items-center text-lg font-semibold mb-4">
                                <CheckCircle size={24} className="text-blue-500 mr-3" />
                                <h3>Step 3: Confirm and Generate</h3>
                            </div>
                            <p className="text-gray-500 mb-4">Review your selections before generating the report draft.</p>
                            <div className="bg-gray-100 p-4 rounded-lg space-y-3">
                                <div>
                                    <p className="font-bold">Template:</p>
                                    <p className="text-gray-700">{selectedTemplate?.name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="font-bold">Data Sources:</p>
                                    <ul className="list-disc list-inside pl-5 text-gray-700">
                                        {selectedSources.length > 0
                                            ? selectedSources.map(id => (
                                                <li key={id}>{dataSources.find(ds => ds.id === id)?.name}</li>
                                            ))
                                            : <li>No data sources selected.</li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer with Navigation */}
                <div className="flex justify-between items-center pt-6 mt-6 border-t">
                    <div>
                        {step > 1 && (
                            <button onClick={() => onNavigateStep(step - 1)} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300">
                                Back
                            </button>
                        )}
                    </div>
                    <div>
                        {step === 2 ? (
                            <button
                                onClick={() => onNavigateStep(step + 1)}
                                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500"
                                disabled={selectedSources.length === 0}
                            >
                                Next
                            </button>
                        ) : step === 3 ? (
                            <button onClick={handleGenerate} className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-500">
                                Confirm & Generate Draft
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateReportModal;