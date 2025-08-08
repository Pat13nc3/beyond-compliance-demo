// src/features/settings/modals/EditUserModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const EditUserModal = ({ user, roles, onClose, onSave }) => {
    const [name, setName] = useState(user?.name || ''); // NEW: Name state
    const [selectedRole, setSelectedRole] = useState(user?.role || '');
    const [selectedStatus, setSelectedStatus] = useState(user?.status || 'Active');

    useEffect(() => {
        if (user) {
            setName(user.name || ''); // Update name if user prop changes
            setSelectedRole(user.role);
            setSelectedStatus(user.status);
        }
    }, [user]);

    const handleSave = () => {
        if (!name.trim()) { // Validate name field
            alert('Please enter a user name.');
            return;
        }

        const updatedUser = {
            ...user, // Spread all existing user properties
            name: name.trim(), // Use the updated name
            role: selectedRole,
            status: selectedStatus,
            title: roles.find(role => role.name === selectedRole)?.description || user.title
        };
        onSave(updatedUser);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-lg theme-text-primary">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-2xl font-bold theme-text-highlight-color">Edit User: {user?.name}</h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    {/* NEW: Name Input Field */}
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">User Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., John Doe"
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">User Email</label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="w-full p-2 border theme-border-color rounded-md bg-gray-100 dark:bg-gray-900 theme-text-secondary cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Assign Role</label>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"
                        >
                            {roles.map(role => (
                                <option key={role.id} value={role.name}>{role.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">User Status</label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"
                        >
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t theme-border-color">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 text-white mr-2">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center"
                    >
                        <Save size={16} className="mr-2"/> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;