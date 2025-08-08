// src/features/settings/modals/CreateRoleModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

// Predefined list of permissions for selection
const availablePermissions = [
    'view_dashboard',
    'manage_users',
    'manage_settings',
    'view_all_data',
    'create_reports',
    'manage_integrations',
    'view_compliance_dashboard',
    'manage_data_sources',
    'view_alerts',
    'investigate_alerts',
    'generate_reports',
    'manage_templates',
    'view_audit_logs',
    'view_evidence_files',
];

const CreateRoleModal = ({ onClose, onSave, initialData = null }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    // State to manage selected permissions (for checkboxes)
    const [selectedPermissions, setSelectedPermissions] = useState(initialData?.permissions || []);

    // Effect to reset form or pre-fill when initialData changes
    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setSelectedPermissions(initialData.permissions || []);
        } else {
            // Reset for new role
            setName('');
            setDescription('');
            setSelectedPermissions([]);
        }
    }, [initialData]);

    const handlePermissionChange = (permission) => {
        setSelectedPermissions(prev =>
            prev.includes(permission)
                ? prev.filter(p => p !== permission) // Remove if already selected
                : [...prev, permission] // Add if not selected
        );
    };

    const handleSave = () => {
        if (!name.trim()) {
            alert('Please enter a role name.');
            return;
        }

        const roleToSave = {
            id: initialData?.id || `role-${Date.now()}`, // Reuse ID for edits, generate new for creation
            name: name.trim(),
            description: description.trim(),
            permissions: selectedPermissions,
        };

        onSave(roleToSave);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-2xl theme-text-primary">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-2xl font-bold theme-text-highlight-color">
                        {initialData?.id ? 'Edit Role' : 'Create New Role'}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Role Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Compliance Officer, Auditor"
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Briefly describe the responsibilities of this role."
                            className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-yellow-500 focus:border-yellow-500 h-20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">Permissions</label>
                        <div className="grid grid-cols-2 gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-md max-h-48 overflow-y-auto custom-scrollbar"> {/* Scrollable permissions list */}
                            {availablePermissions.map(permission => (
                                <div key={permission} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={permission}
                                        checked={selectedPermissions.includes(permission)}
                                        onChange={() => handlePermissionChange(permission)}
                                        className="h-4 w-4 text-blue-600 rounded border-gray-600 focus:ring-blue-500 bg-gray-900"
                                    />
                                    <label htmlFor={permission} className="ml-2 text-sm theme-text-primary cursor-pointer">{permission.replace(/_/g, ' ')}</label> {/* Replace underscores for display */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t theme-border-color">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 text-white mr-2">
                        Cancel
                    </button>
                    <button type="button" onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center">
                        <Save size={16} className="mr-2"/> {initialData?.id ? 'Save Changes' : 'Create Role'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoleModal;