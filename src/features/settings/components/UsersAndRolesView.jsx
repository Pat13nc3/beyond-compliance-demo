// src/features/settings/components/UsersAndRolesView.jsx

import React from 'react';
import { Plus, Edit, Trash2, ScrollText } from 'lucide-react';
// CORRECTED PATH: Go up three levels to reach 'src/', then into 'components/ui/'
import ActionMenu from '../../../components/ui/ActionMenu.jsx'; 

const UsersAndRolesView = ({ users, roles, onInvite, onEditUser, onDeactivateUser, onCreateRole, onViewUserActivityLog }) => (
    <div className="space-y-8">
        <div className="theme-bg-card p-6 rounded-lg shadow-md theme-text-primary">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">User List</h3>
                <button onClick={onInvite} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center">
                    <Plus size={20} className="mr-2" /> Invite New User
                </button>
            </div>
            <div className="overflow-x-auto max-h-[700px] overflow-y-auto custom-scrollbar">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b theme-border-color">
                            <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Name</th>
                            <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Title</th>
                            <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Platform Role</th>
                            <th className="text-left py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Status</th>
                            <th className="text-right py-3 px-4 text-sm font-medium uppercase theme-text-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4 theme-text-secondary">No users found. Invite new users to get started.</td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.id} className="border-b theme-border-color hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-4 py-4"><div className="font-medium theme-text-primary">{user.name}</div><div className="text-sm theme-text-secondary">{user.email}</div></td>
                                    <td className="px-4 py-4 theme-text-secondary">{user.title || 'N/A'}</td>
                                    <td className="px-4 py-4 theme-text-secondary">{user.role}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <ActionMenu
                                            items={[
                                                { label: 'Edit User', action: () => onEditUser(user), icon: Edit },
                                                { label: user.status === 'Active' ? 'Deactivate' : 'Activate', action: () => onDeactivateUser(user.id, user.status), icon: user.status === 'Active' ? Trash2 : Plus, color: user.status === 'Active' ? 'text-red-500' : 'text-green-500' },
                                                { label: 'View Activity Log', action: () => onViewUserActivityLog(user), icon: ScrollText }
                                            ]}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="theme-bg-card p-6 rounded-lg shadow-md theme-text-primary">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Role Permissions</h3>
                <button onClick={onCreateRole} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center">
                    <Plus size={20} className="mr-2" /> Create New Role
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {roles.length === 0 ? (
                    <p className="col-span-full text-center py-4 theme-text-secondary">No roles defined yet.</p>
                ) : (
                    roles.map(role => (
                        <div key={role.id} className="border theme-border-color p-4 rounded-lg">
                            <h4 className="font-bold theme-text-primary">{role.name}</h4>
                            <p className="text-sm theme-text-secondary mb-2">{role.description}</p>
                            <a href="#" className="text-sm font-semibold text-blue-400 hover:underline">
                                {Array.isArray(role.permissions) ? role.permissions.join(', ') : role.permissions} Permissions
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
);

export default UsersAndRolesView;