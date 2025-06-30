import React from 'react';
import { X, ShieldCheck, Mail, Send, CheckCircle } from 'lucide-react';

const FilingModal = ({ report, onClose }) => {
    return (
        // The modal backdrop
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            {/* The modal panel */}
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-2xl text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">Smart Filing Process</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white"><X size={24} /></button>
                </div>

                <div className="space-y-6">
                    <p>You are about to file: <span className="font-bold">{report.name}</span></p>

                    {/* Step 1: Validation */}
                    <div className="flex items-start">
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white">
                            <ShieldCheck size={24}/>
                        </div>
                        <div className="ml-4">
                            <h4 className="font-bold">Step 1: AI Validation</h4>
                            <p className="text-sm text-gray-400">The report will be automatically validated against the latest rules for its jurisdiction before filing.</p>
                             <div className="mt-2 text-sm flex items-center text-green-400"><CheckCircle size={16} className="mr-2"/> Validation Engine Ready</div>
                        </div>
                    </div>

                    {/* Step 2: Select Channel */}
                    <div className="flex items-start">
                         <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white">
                            <Send size={24}/>
                        </div>
                         <div className="ml-4">
                            <h4 className="font-bold">Step 2: Choose Filing Channel</h4>
                            <p className="text-sm text-gray-400">Select how you want to submit this report to the regulator.</p>
                            <div className="mt-2 space-y-2">
                                <label className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer">
                                    <input type="radio" name="channel" className="form-radio text-[#c0933e] bg-gray-900"/>
                                    <Mail size={20} className="mx-3" />
                                    <span className="font-semibold">Email to Regulator</span>
                                </label>
                                <label className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer">
                                     <input type="radio" name="channel" className="form-radio text-[#c0933e] bg-gray-900"/>
                                     <Send size={20} className="mx-3" />
                                     <span className="font-semibold">Submit via Beyond Supervision API</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 mr-2">Cancel</button>
                    <button type="button" className="bg-[#c0933e] text-[#1e252d] font-bold py-2 px-4 rounded-md text-sm hover:bg-opacity-90">
                        Initiate Filing
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilingModal;