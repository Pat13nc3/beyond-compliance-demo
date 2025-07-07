import React, { useState } from 'react';
import { X, UploadCloud } from 'lucide-react';

const UploadExistingReportModal = ({ onClose, onUpload }) => {
    const [file, setFile] = useState(null);
    const [reportName, setReportName] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setReportName(e.target.files[0].name);
        }
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        // Pass the file information back to the parent
        onUpload({ name: reportName, file: file });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg text-gray-800">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <h2 className="text-2xl font-bold">Upload Existing Report</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200"><X size={24} /></button>
                </div>
                <div className="space-y-4 mt-6">
                    <div>
                        <label htmlFor="report-name" className="block text-sm font-medium text-gray-700 mb-1">Report Name</label>
                        <input
                            type="text"
                            id="report-name"
                            value={reportName}
                            onChange={(e) => setReportName(e.target.value)}
                            placeholder="e.g., Q3 AML Filing"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Report File</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">{file ? file.name : "PDF, DOCX up to 10MB"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t">
                    <button onClick={onClose} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 mr-3">Cancel</button>
                    <button onClick={handleUpload} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500">Upload & Proceed to File</button>
                </div>
            </div>
        </div>
    );
};

export default UploadExistingReportModal;