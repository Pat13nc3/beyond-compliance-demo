import React, { useState } from 'react';
import { Users, ShieldCheck, Settings, Plus, MoreVertical, Search, Edit, Trash2 } from 'lucide-react';
import InviteUserModal from '../components/modals/InviteUserModal.jsx';
import EditUserModal from '../components/modals/EditUserModal.jsx';
import ActionMenu from '../components/ui/ActionMenu.jsx';
// --- NEW: Import the RulesEngine component ---
import RulesEngine from '../components/manage/RulesEngine.jsx';

const initialUsers = [
    { id: 1, name: 'Kene Gold', email: 'kene@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Adeyemi Adenusi', email: 'adeyemi@example.com', role: 'Compliance Officer', status: 'Active' },
    { id: 3, name: 'Patience O.', email: 'patience@example.com', role: 'Editor', status: 'Active' },
    { id: 4, name: 'John Doe', email: 'john.d@example.com', role: 'Viewer', status: 'Inactive' },
];

const initialRoles = [
    { id: 'Admin', description: 'Full access to all modules and settings.', permissions: 32 },
    { id: 'Compliance Officer', description: 'Can manage reports, evidence, and risk assessments.', permissions: 24 },
    { id: 'Editor', description: 'Can create and edit drafts, but cannot submit.', permissions: 15 },
    { id: 'Viewer', description: 'Read-only access to dashboards and reports.', permissions: 8 },
];

const UserManagement = ({ users, onInviteClick, onEditUser, onDeleteUser }) => {
    const [openMenuId, setOpenMenuId] = useState(null);

    return (
        <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#c0933e]">User List</h3>
                <button onClick={onInviteClick} className="bg-blue-600 text-white font-bold py-2 px-3 rounded-md hover:bg-blue-500 flex items-center text-sm">
                    <Plus size={16} className="mr-2"/> Invite New User
                </button>
            </div>
            <table className="min-w-full">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-sm font-medium uppercase">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium uppercase">Role</th>
                        <th className="text-left py-3 px-4 text-sm font-medium uppercase">Status</th>
                        <th className="text-right py-3 px-4 text-sm font-medium uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800">
                            <td className="py-4 px-4">
                                <p className="font-bold">{user.name}</p>
                                <p className="text-xs text-gray-400">{user.email}</p>
                            </td>
                            <td className="py-4 px-4">{user.role}</td>
                            <td className="py-4 px-4">
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${user.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                                <div className="relative inline-block">
                                    <button onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)} className="p-2 rounded-md hover:bg-gray-700">
                                        <MoreVertical size={18} />
                                    </button>
                                    {openMenuId === user.id && (
                                        <ActionMenu
                                            onClose={() => setOpenMenuId(null)}
                                            items={[
                                                { label: 'Edit', icon: <Edit size={14} />, onClick: () => onEditUser(user) },
                                                { label: 'Delete', icon: <Trash2 size={14} />, onClick: () => onDeleteUser(user.id), isDestructive: true },
                                            ]}
                                        />
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const RoleManagement = ({ roles }) => (
     <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white mt-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#c0933e]">Role Permissions</h3>
            <button className="bg-blue-600 text-white font-bold py-2 px-3 rounded-md hover:bg-blue-500 flex items-center text-sm">
                <Plus size={16} className="mr-2"/> Create New Role
            </button>
        </div>
        <div className="space-y-3">
            {roles.map(role => (
                <div key={role.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                    <div>
                        <p className="font-bold">{role.id}</p>
                        <p className="text-sm text-gray-400">{role.description}</p>
                    </div>
                    <div className="text-right">
                         <p className="font-semibold">{role.permissions} Permissions</p>
                         <a href="#" className="text-xs text-blue-400 hover:underline">View/Edit</a>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Manage = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState(initialUsers);
    const [roles, setRoles] = useState(initialRoles);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    const handleInviteUser = ({ email, role }) => {
        const newUser = { id: users.length + 1, name: 'Invited User', email, role, status: 'Inactive' };
        setUsers([newUser, ...users]);
    };

    const handleEditUser = (user) => {
        setUserToEdit(user);
        setIsEditModalOpen(true);
    };

    const handleSaveUser = (userId, updatedData) => {
        setUsers(currentUsers => currentUsers.map(user => 
            user.id === userId ? { ...user, ...updatedData } : user
        ));
    };
    
    const handleDeleteUser = (userId) => {
        setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
    };

    return (
        <>
            <div className="space-y-6 animate-fade-in">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Manage Platform</h2>
                    <p className="text-gray-500">Control users, roles, integrations, and system settings.</p>
                </div>
                
                <div className="flex border-b border-gray-300">
                    <button onClick={() => setActiveTab('users')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}><Users size={20} className="mr-2"/> Users & Roles</button>
                    <button onClick={() => setActiveTab('settings')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'settings' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}><Settings size={20} className="mr-2"/> Platform Settings</button>
                </div>

                {activeTab === 'users' && (
                    <div>
                        <UserManagement 
                            users={users} 
                            onInviteClick={() => setIsInviteModalOpen(true)}
                            onEditUser={handleEditUser}
                            onDeleteUser={handleDeleteUser}
                        />
                        <RoleManagement roles={roles} />
                    </div>
                )}
                {/* --- UPDATED: The RulesEngine is now displayed here --- */}
                {activeTab === 'settings' && (
                    <RulesEngine />
                )}
            </div>

            {isInviteModalOpen && <InviteUserModal roles={roles} onClose={() => setIsInviteModalOpen(false)} onInvite={handleInviteUser} />}
            {isEditModalOpen && <EditUserModal user={userToEdit} roles={roles} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveUser} />}
        </>
    );
};

export default Manage;
