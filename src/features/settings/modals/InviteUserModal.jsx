// src/features/settings/modals/InviteUserModal.jsx

import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const InviteUserModal = ({ roles, onClose, onSave }) => {
    const [name, setName] = useState(''); // NEW: Name state
    const [email, setEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState(roles[0]?.name || '');

    const handleSubmit = () => {
        if (!name.trim() || !email || !selectedRole) { // NEW: Validate name
            alert('Please fill out the user name, email address, and select a role.'); // Updated alert message
            return;
        }
        
        const newUser = {
            name: name.trim(), // Use the name from the input field
            email: email,
            role: selectedRole,
        };

        onSave(newUser);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">Invite New User</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    {/* NEW: Name Input Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">User Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Adeyemi Alade"
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        />
                    </div>
                    {/* Existing User Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">User Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g., adeyemi@example.com"
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        />
                    </div>
                    {/* Existing Assign Role Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Assign Role</label>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            {roles.map(role => (
                                <option key={role.id} value={role.name}>{role.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 mr-2">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center"
                    >
                        <Send size={16} className="mr-2"/> Send Invite
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InviteUserModal;