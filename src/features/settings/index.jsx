import React, { useState } from 'react';
import { Users, Bell, Shield, Key, Plus, MoreVertical, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import ActionMenu from '../../components/ui/ActionMenu.jsx';
import EditUserModal from './modals/EditUserModal.jsx';
import InviteUserModal from './modals/InviteUserModal.jsx';
import CreateAlertModal from './modals/CreateAlertModal.jsx';
// --- CORRECTED: We are now importing the data we just added ---
import { mockUsers, mockRoles, mockAlerts } from '../../data/mockData.js';

// --- Users & Roles View ---
const UsersAndRolesView = ({ onInvite, onEditUser }) => (
    <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold">User List</h3><button onClick={onInvite} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center"><Plus size={20} className="mr-2" /> Invite New User</button></div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead><tr className="border-b"><th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Name</th><th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Title</th><th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Platform Role</th><th className="text-left py-3 px-4 text-sm font-medium uppercase text-gray-500">Status</th><th className="text-right py-3 px-4 text-sm font-medium uppercase text-gray-500">Actions</th></tr></thead>
                    <tbody>
                        {mockUsers.map(user => (
                            <tr key={user.id} className="border-b hover:bg-gray-50"><td className="px-4 py-4"><div className="font-medium">{user.name}</div><div className="text-sm text-gray-500">{user.email}</div></td><td className="px-4 py-4 text-gray-600">{user.title}</td><td className="px-4 py-4 text-gray-600">{user.role}</td><td className="px-4 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{user.status}</span></td><td className="px-4 py-4 text-right"><ActionMenu items={[{ label: 'Edit User', action: () => onEditUser(user), icon: Edit }, { label: 'Deactivate', action: () => {}, icon: Trash2 }]}/></td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold">Role Permissions</h3><button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center"><Plus size={20} className="mr-2" /> Create New Role</button></div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockRoles.map(role => (
                    <div key={role.name} className="border p-4 rounded-lg"><h4 className="font-bold">{role.name}</h4><p className="text-sm text-gray-600 mb-2">{role.description}</p><a href="#" className="text-sm font-semibold text-blue-600 hover:underline">{role.permissions} Permissions</a></div>
                ))}
            </div>
        </div>
    </div>
);

// --- Notifications View ---
const NotificationsView = ({ onCreateAlert }) => (
     <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold">System Notifications & Alerts</h3><button onClick={onCreateAlert} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center"><Plus size={20} className="mr-2" /> Create New Alert</button></div>
        <div className="space-y-4">
            {mockAlerts.map(alert => (
                <div key={alert.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div><p className="font-semibold">{alert.name}</p><p className="text-sm text-gray-500">{alert.condition}</p></div>
                    <div className="flex items-center space-x-4"><span className="text-sm text-gray-600">Notify: {alert.notify.join(', ')}</span><button>{alert.active ? <ToggleRight size={24} className="text-green-500"/> : <ToggleLeft size={24} className="text-gray-400"/>}</button></div>
                </div>
            ))}
        </div>
    </div>
);

// --- MAIN SETTINGS PAGE ---
const Settings = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [isCreateAlertModalOpen, setIsCreateAlertModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    const handleEditUserClick = (user) => {
        setUserToEdit(user);
        setIsEditUserModalOpen(true);
    };
    
    return (
        <div className="p-6">
            <div className="space-y-6 animate-fade-in">
                <div><h2 className="text-3xl font-bold text-gray-800">Platform Settings</h2><p className="text-gray-500">Manage user access, roles, and system notifications.</p></div>
                <div className="flex border-b border-gray-300">
                    <button onClick={() => setActiveTab('users')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}><Users size={20} className="mr-2"/> Users & Roles</button>
                    <button onClick={() => setActiveTab('notifications')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'notifications' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}><Bell size={20} className="mr-2"/> Notifications</button>
                </div>
                <div>
                    {activeTab === 'users' && <UsersAndRolesView onInvite={() => setIsInviteModalOpen(true)} onEditUser={handleEditUserClick} />}
                    {activeTab === 'notifications' && <NotificationsView onCreateAlert={() => setIsCreateAlertModalOpen(true)} />}
                </div>
            </div>
            {isInviteModalOpen && <InviteUserModal onClose={() => setIsInviteModalOpen(false)} />}
            {isEditUserModalOpen && <EditUserModal user={userToEdit} onClose={() => setIsEditUserModalOpen(false)} />}
            {isCreateAlertModalOpen && <CreateAlertModal onClose={() => setIsCreateAlertModalOpen(false)} />}
        </div>
    );
};

export default Settings;