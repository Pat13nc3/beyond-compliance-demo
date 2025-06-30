import React, { useState } from 'react';
import { Check, Clock, FileText, ArrowLeft, Upload, Link as LinkIcon } from 'lucide-react';
import UploadModal from '../modals/UploadModal.jsx';
// Import the new confirmation modal
import ConfirmationModal from '../modals/ConfirmationModal.jsx';

const initialChecklistItems = [
    { id: 1, text: 'Complete VASP White Paper', type: 'link', linkTo: 'Templates', status: 'pending' },
    { id: 2, text: 'Submit Proof of Company Registration', type: 'upload', status: 'pending' },
    { id: 3, text: 'Provide Director KYC Documents', type: 'upload', status: 'pending' },
    { id: 4, text: 'Submit AML/CFT Policy Document', type: 'link', linkTo: 'Evidence Files', status: 'completed' },
    { id: 5, text: 'Pay Application Fee', type: 'action', status: 'completed' },
];

const statusStyles = {
    'pending': { icon: <Clock size={20} className="text-yellow-500" /> },
    'completed': { icon: <Check size={20} className="text-green-500" /> }
};

const ApplicationProjectView = ({ application, onBack, onNavigate }) => {
    const [checklist, setChecklist] = useState(initialChecklistItems);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedChecklistItem, setSelectedChecklistItem] = useState(null);

    // --- NEW STATE for the confirmation modal ---
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [itemToComplete, setItemToComplete] = useState(null);

    // --- UPDATED: This function now opens the confirmation modal ---
    const handleMarkAsComplete = (item) => {
        setItemToComplete(item);
        setIsConfirmModalOpen(true);
    };

    // --- NEW: This function runs after the user confirms in the modal ---
    const handleConfirmComplete = () => {
        if (itemToComplete) {
            setChecklist(currentItems => 
                currentItems.map(item => 
                    item.id === itemToComplete.id ? { ...item, status: 'completed' } : item
                )
            );
        }
        // Close the modal and reset the state
        setIsConfirmModalOpen(false);
        setItemToComplete(null);
    };

    const handleOpenUploadModal = (item) => {
        setSelectedChecklistItem(item);
        setIsUploadModalOpen(true);
    };

    const handleUploadEvidence = (checklistItemId, file) => {
        console.log(`Uploaded ${file.name} for item ${checklistItemId}`);
        // For now, we'll just mark it as complete after upload
        setChecklist(currentItems => currentItems.map(item => item.id === checklistItemId ? { ...item, status: 'completed' } : item));
    };

    return (
        <>
            <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white animate-fade-in">
                <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
                    <button onClick={onBack} className="mr-4 p-2 rounded-md hover:bg-gray-700"><ArrowLeft size={24} /></button>
                    <div>
                        <h2 className="text-2xl font-bold text-[#c0933e]">Application: {application.name}</h2>
                        <p className="text-gray-400">Jurisdiction: {application.jurisdiction}</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Application Requirements Checklist</h3>
                    <div className="space-y-3">
                        {checklist.map(item => (
                            <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="mr-4">{statusStyles[item.status].icon}</div>
                                    <p className="font-semibold">{item.text}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {item.type === 'link' && (<button onClick={() => onNavigate('Library', item.linkTo)} className="text-xs text-blue-400 hover:underline flex items-center font-semibold"><LinkIcon size={14} className="mr-1.5"/> Go to {item.linkTo}</button>)}
                                    {item.type === 'upload' && item.status === 'pending' && (<button onClick={() => handleOpenUploadModal(item)} className="bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-blue-500 flex items-center"><Upload size={14} className="mr-1.5"/> Upload Evidence</button>)}
                                    {item.status === 'pending' && (<button onClick={() => handleMarkAsComplete(item)} className="bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-green-500">Mark as Complete</button>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isUploadModalOpen && (<UploadModal categories={[{name: 'Evidence Files'}]} onClose={() => setIsUploadModalOpen(false)} onUpload={({file}) => handleUploadEvidence(selectedChecklistItem.id, file)}/>)}
            
            {/* --- RENDER THE CONFIRMATION MODAL --- */}
            {isConfirmModalOpen && (
                <ConfirmationModal 
                    title="Confirm Action"
                    message={`Are you sure you want to mark "${itemToComplete?.text}" as complete? This action cannot be undone.`}
                    onConfirm={handleConfirmComplete}
                    onCancel={() => setIsConfirmModalOpen(false)}
                />
            )}
        </>
    );
};

export default ApplicationProjectView;
