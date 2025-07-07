import React from 'react';
import { X, UploadCloud } from 'lucide-react';

const SubmitEvidenceModal = ({ action, onClose, onComplete }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
        <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                <h3 className="text-2xl font-bold text-[#c0933e]">Submit Evidence</h3>
                <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                    <X size={24} />
                </button>
            </div>
            <div className="space-y-4">
                <p>Submitting for: <span className="font-bold">{action.title}</span></p>
                
                {/* File Upload Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Upload File</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <UploadCloud className="mx-auto h-12 w-12 text-gray-500" />
                            <div className="flex text-sm text-gray-500">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-[#c0933e] hover:text-amber-400 px-2">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-600">PDF, PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-300">Add a comment</label>
                    <div className="mt-1">
                        <textarea
                            rows={4}
                            name="comment"
                            id="comment"
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                            defaultValue={''}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end pt-4">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 mr-2">
                        Cancel
                    </button>
                    {/* The onComplete function will be called here to remove the item from the list */}
                    <button type="button" onClick={() => onComplete(action.id)} className="bg-[#c0933e] text-[#1e252d] font-bold py-2 px-4 rounded-md text-sm hover:bg-opacity-90">
                        Submit Evidence
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default SubmitEvidenceModal;