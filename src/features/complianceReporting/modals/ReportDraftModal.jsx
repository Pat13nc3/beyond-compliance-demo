import React, { useState } from 'react';
import { X, Save, Send } from 'lucide-react';

const ReportDraftModal = ({ report, onClose, onSave, onFile }) => {
    const [content, setContent] = useState(report.name + " - Draft Content...");

    const handleSave = () => {
        onSave({ ...report, content });
    };

    const handleFile = () => {
        // This now correctly calls the onFile handler from the parent page
        onFile(report);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl text-gray-800 flex flex-col h-[90vh]">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <h2 className="text-2xl font-bold">Edit Draft: {report.name}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200"><X size={24} /></button>
                </div>
                <div className="flex-grow overflow-y-auto">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-full p-4 border rounded-md resize-none"
                    />
                </div>
                <div className="flex justify-end items-center pt-6 mt-6 border-t">
                    <button onClick={handleSave} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 mr-3"><Save size={16} className="mr-2"/> Save Draft</button>
                    <button onClick={handleFile} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500"><Send size={16} className="mr-2"/> File Report</button>
                </div>
            </div>
        </div>
    );
};

export default ReportDraftModal;