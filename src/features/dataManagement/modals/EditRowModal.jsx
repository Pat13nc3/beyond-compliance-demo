import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

/**
 * EditRowModal Component
 *
 * This modal allows users to edit individual rows of data, typically used for
 * remediating non-compliant records identified during data analysis.
 *
 * Props:
 * - rowData: The array of data for the row to be edited.
 * - headers: An array of column headers, used to label the input fields.
 * - onSave: Function to call when changes are saved. Receives the updated row data array.
 * - onClose: Function to call to close the modal.
 */
const EditRowModal = ({ rowData, headers, onSave, onClose }) => {
    const [editedData, setEditedData] = useState([]);

    // Initialize editedData when rowData prop changes
    useEffect(() => {
        if (rowData) {
            setEditedData([...rowData]);
        }
    }, [rowData]);

    // If rowData is null or undefined, don't render the modal
    if (!rowData) return null;

    const handleInputChange = (e, index) => {
        const newData = [...editedData];
        newData[index] = e.target.value;
        setEditedData(newData);
    };

    const handleSaveChanges = () => {
        onSave(editedData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-3xl text-white animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Edit and Remediate Row</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24} /></button>
                </div>
                
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2"> {/* Added max-height and overflow for scrollability */}
                    {headers.map((header, index) => (
                        <div key={index}>
                            <label className="block text-sm font-medium text-gray-300 mb-1">{header}</label>
                            <input 
                                type="text"
                                value={editedData[index] || ''}
                                onChange={(e) => handleInputChange(e, index)}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-yellow-500 focus:border-yellow-500"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-end">
                    <button onClick={handleSaveChanges} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center">
                        <Save size={16} className="mr-2"/> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditRowModal;
