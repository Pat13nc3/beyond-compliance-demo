import React, { useState } from 'react';
// Added Download to the import list
import { X, Save, Download } from 'lucide-react';

const EditItemModal = ({ item, onClose, onSave }) => {
    // Initialize state for both name and status
    const [itemName, setItemName] = useState(item.name);
    const [itemStatus, setItemStatus] = useState(item.status);

    // All possible statuses a user can assign, fulfilling the "document lifecycle" requirement
    const possibleStatuses = ['New', 'Analyzed', 'Archived', 'Draft', 'Published', 'Live', 'Active', 'Submitted'];

    const handleSave = () => {
        // Pass the original item and an object with the new data back to the Library page
        onSave(item, { name: itemName, status: itemStatus });
        onClose();
    };

    // --- NEW: Download Handler ---
    const handleDownload = () => {
        // Create the text content for the file
        const fileContent = `Item Name: ${itemName}\nStatus: ${itemStatus}`;
        // Create a new Blob object
        const blob = new Blob([fileContent], { type: 'text/plain' });
        // Create a temporary URL for the blob
        const url = URL.createObjectURL(blob);
        // Create a temporary anchor element and trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = `${itemName.replace(/ /g, '_')}.txt`; // Create a clean filename
        document.body.appendChild(a);
        a.click();
        // Clean up by removing the temporary element and URL
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">Edit Item</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Item Name</label>
                        <input
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        />
                    </div>
                    {/* --- Status Dropdown --- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                        <select
                            value={itemStatus}
                            onChange={(e) => setItemStatus(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            {possibleStatuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-700">
                    {/* --- NEW: Download Button --- */}
                    <button
                        type="button"
                        onClick={handleDownload}
                        className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center"
                    >
                        <Download size={16} className="mr-2"/> Download
                    </button>
                    <div className="flex items-center space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700">
                            Cancel
                        </button>
                        <button 
                            type="button" 
                            onClick={handleSave} 
                            className="bg-[#c0933e] text-[#1e252d] font-bold py-2 px-4 rounded-md text-sm hover:bg-opacity-90 flex items-center"
                        >
                            <Save size={16} className="mr-2"/> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditItemModal;