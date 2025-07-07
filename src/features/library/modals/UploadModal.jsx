import React, { useState } from 'react';
import { X, UploadCloud, FileText } from 'lucide-react';

const UploadModal = ({ categories, onClose, onUpload }) => {
    // Default to the first available category name
    const [selectedCategory, setSelectedCategory] = useState(categories[0]?.name || '');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }
        onUpload({
            category: selectedCategory,
            file: selectedFile,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">Upload New Asset</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">1. Choose Library Category</label>
                        {/* UPDATED: The dropdown now correctly uses the flattened 'categories' array */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            {/* We no longer need to map over groups, as the flattened array is passed in */}
                            {categories.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">2. Select File</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                {selectedFile ? (
                                    <>
                                        <FileText className="mx-auto h-12 w-12 text-green-400" />
                                        <p className="font-semibold text-white">{selectedFile.name}</p>
                                        <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud className="mx-auto h-12 w-12 text-gray-500" />
                                        <div className="flex text-sm text-gray-500">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-[#c0933e] hover:text-amber-400 px-2">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" onChange={handleFileChange} className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-600">PDF, TXT, DOCX up to 10MB</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 mr-2">
                        Cancel
                    </button>
                    <button type="button" onClick={handleUpload} className="bg-[#c0933e] text-[#1e252d] font-bold py-2 px-4 rounded-md text-sm hover:bg-opacity-90 disabled:opacity-50" disabled={!selectedFile}>
                        Start Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
