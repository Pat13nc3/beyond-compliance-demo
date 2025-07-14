import React from 'react';
import { X } from 'lucide-react';

const ViewUpdateModal = ({ update, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-3xl text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">{update.title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto pr-2">
                    <p className="text-sm text-gray-300 whitespace-pre-wrap">{update.fullText}</p>
                </div>
                <div className="flex justify-end pt-4 mt-4 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewUpdateModal;