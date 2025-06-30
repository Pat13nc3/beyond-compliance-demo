import React, { useState } from 'react';
import { X, Save, Trash2, Sparkles } from 'lucide-react';

const ReportDraftModal = ({ report, onSave, onClose }) => {
    // The report content will be managed by this component's state
    const [draftContent, setDraftContent] = useState(report.content);

    const handleSave = () => {
        // Here we would pass the edited content back to the main page
        onSave(report.id, draftContent);
        onClose();
    };

    // A placeholder for a future Gemini-powered "improve" function
    const handleImproveWithAI = () => {
        setDraftContent(draftContent + "\n\n---\n*Improved with AI:* This section has been automatically enhanced for clarity and regulatory tone.");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-4xl text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">Editing Draft: {report.name}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white"><X size={24} /></button>
                </div>

                <div className="flex-grow overflow-y-auto">
                    <textarea
                        className="w-full h-full p-4 bg-gray-800 rounded-md text-gray-300 font-mono focus:ring-[#c0933e] focus:border-[#c0933e]"
                        value={draftContent}
                        onChange={(e) => setDraftContent(e.target.value)}
                    />
                </div>

                <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-700">
                    <div>
                        <button type="button" className="bg-red-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-red-500 flex items-center">
                            <Trash2 size={16} className="mr-2"/> Delete Draft
                        </button>
                    </div>
                    <div className="flex items-center space-x-2">
                         <button type="button" onClick={handleImproveWithAI} className="bg-purple-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-purple-500 flex items-center">
                            <Sparkles size={16} className="mr-2"/> Improve with AI
                        </button>
                        <button type="button" onClick={handleSave} className="bg-[#c0933e] text-[#1e252d] font-bold py-2 px-4 rounded-md text-sm hover:bg-opacity-90 flex items-center">
                            <Save size={16} className="mr-2"/> Save and Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDraftModal;