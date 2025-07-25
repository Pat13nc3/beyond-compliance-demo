import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

const EditUserModal = ({ user, roles, onClose, onSave }) => {
    // Initialize state with the user's current role and status
    const [selectedRole, setSelectedRole] = useState(user.role);
    const [selectedStatus, setSelectedStatus] = useState(user.status);

    const handleSave = () => {
        // Pass the user's ID and the updated details back to the Manage page
        onSave(user.id, { role: selectedRole, status: selectedStatus });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">Edit User: {user.name}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">User Email</label>
                        <input
                            type="email"
                            value={user.email}
                            disabled // Email is not editable
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-gray-400 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Assign Role</label>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>{role.id}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">User Status</label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-[#c0933e] focus:border-[#c0933e]"
                        >
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 mr-2">
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
    );
};

export default EditUserModal;