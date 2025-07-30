// src/features/settings/index.jsx

import React, { useState } from 'react';
// REMOVED: icons now only used in extracted components are removed here from this file
import { Users, Bell, Shield, Key } from 'lucide-react'; 
// REMOVED: ActionMenu from here as it's only used in UsersAndRolesView now
// import ActionMenu from '../../components/ui/ActionMenu.jsx'; 
import EditUserModal from './modals/EditUserModal.jsx';
import InviteUserModal from './modals/InviteUserModal.jsx';
import CreateAlertModal from './modals/CreateAlertModal.jsx';
import CreateRoleModal from './modals/CreateRoleModal.jsx';
import UserActivityLogModal from './modals/UserActivityLogModal.jsx';
import Toast from '../../components/ui/Toast.jsx';
import SystemConfigView from './components/SystemConfigView.jsx';
import PasswordManagementView from './components/PasswordManagementView.jsx';
// NEW: Import extracted components
import UsersAndRolesView from './components/UsersAndRolesView.jsx';
import NotificationsView from './components/NotificationsView.jsx';

import { mockUsers as initialMockUsers, mockRoles as initialMockRoles, mockAlerts as initialMockAlerts } from '../../data/mockData.js';


// --- MAIN SETTINGS PAGE ---
const Settings = () => {
    const [activeTab, setActiveTab] = useState('users'); // Default to users for initial view after this feature
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [isCreateAlertModalOpen, setIsCreateAlertModalOpen] = useState(false);
    const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
    const [isUserActivityLogModalOpen, setIsUserActivityLogModalOpen] = useState(false);

    const [users, setUsers] = useState(initialMockUsers);
    const [roles, setRoles] = useState(initialMockRoles);
    const [alerts, setAlerts] = useState(initialMockAlerts);

    const [systemConfig, setSystemConfig] = useState({
        defaultCurrency: 'USD',
        dataRetentionDays: 365,
        auditLogRetentionDays: 180,
        enableAiRecommendations: true,
    });

    const [passwordPolicy, setPasswordPolicy] = useState({
        minLength: 12,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: true,
        expirationDays: 90,
        historyCount: 5,
    });


    const [userToEdit, setUserToEdit] = useState(null);
    const [alertToEdit, setAlertToEdit] = useState(null);
    const [roleToEdit, setRoleToEdit] = useState(null);
    const [userForActivityLog, setUserForActivityLog] = useState(null);

    const [toastMessage, setToastMessage] = useState('');

    React.useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    // --- User Management Handlers ---
    const handleInviteUser = (newUser) => {
        setUsers(prevUsers => [...prevUsers, { ...newUser, id: `user-${Date.now()}`, status: 'Active', createdAt: new Date().toISOString().slice(0, 10), twoFactorEnabled: false, title: roles.find(role => role.name === newUser.role)?.description || 'N/A' }]);
        setIsInviteModalOpen(false);
        setToastMessage(`User "${newUser.name}" invited successfully!`);
    };

    const handleSaveUser = (updatedUser) => {
        setUsers(prevUsers => prevUsers.map(user =>
            user.id === updatedUser.id ? { ...updatedUser, status: user.status } : user
        ));
        setIsEditUserModalOpen(false);
        setUserToEdit(null);
        setToastMessage(`User "${updatedUser.name}" updated successfully!`);
    };

    const handleDeactivateUser = (userId, currentStatus) => {
        setUsers(prevUsers => prevUsers.map(user =>
            user.id === userId ? { ...user, status: currentStatus === 'Active' ? 'Inactive' : 'Active' } : user
        ));
        const affectedUser = users.find(user => user.id === userId);
        setToastMessage(`User "${affectedUser.name}" is now ${affectedUser.status === 'Active' ? 'Active' : 'Inactive'}.`);
    };

    const handleEditUserClick = (user) => {
        setUserToEdit(user);
        setIsEditUserModalOpen(true);
    };

    const handleViewUserActivityLog = (user) => {
        setUserForActivityLog(user);
        setIsUserActivityLogModalOpen(true);
        setToastMessage(`Viewing activity log for "${user.name}".`);
    };

    // --- Role Management Handlers ---
    const handleCreateRole = (newRole) => {
        setRoles(prevRoles => [...prevRoles, newRole]);
        setIsCreateRoleModalOpen(false);
        setToastMessage(`Role "${newRole.name}" created successfully!`);
    };

    // --- Notification Management Handlers ---
    const handleCreateAlert = (alertToSave) => {
        if (alertToSave.id) {
            setAlerts(prevAlerts => prevAlerts.map(alert =>
                alert.id === alertToSave.id ? alertToSave : alert
            ));
            setToastMessage(`Alert "${alertToSave.name}" updated successfully!`);
        } else {
            setAlerts(prevAlerts => [...prevAlerts, { ...alertToSave, id: `alert-${Date.now()}`, active: true }]);
            setToastMessage(`Alert "${alertToSave.name}" created successfully!`);
        }
        setIsCreateAlertModalOpen(false);
        setAlertToEdit(null);
    };

    const handleToggleAlertStatus = (alertId, currentStatus) => {
        setAlerts(prevAlerts => prevAlerts.map(alert =>
            alert.id === alertId ? { ...alert, active: !currentStatus } : alert
        ));
        const toggledAlert = alerts.find(alert => alert.id === alertId);
        setToastMessage(`Alert "${toggledAlert.name}" is now ${toggledAlert.active ? 'Active' : 'Inactive'}.`);
    };

    const handleEditAlertClick = (alert) => {
        setAlertToEdit(alert);
        setIsCreateAlertModalOpen(true);
    };

    // --- System Configuration Handler ---
    const handleSaveConfig = (newConfig) => {
        setSystemConfig(newConfig);
        setToastMessage('System configuration saved successfully!');
    };

    // --- Password Management Handler ---
    const handleSavePasswordPolicy = (newPolicy) => {
        setPasswordPolicy(newPolicy);
        setToastMessage('Password policy saved successfully!');
    };


    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-6 animate-fade-in">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-100">Platform Settings</h2>
                        <p className="text-gray-400">Manage user access, roles, and system notifications.</p>
                    </div>
                    <div className="flex border-b border-gray-700">
                        <button onClick={() => setActiveTab('users')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-400' : 'text-gray-400'}`}>
                            <Users size={20} className="mr-2"/> Users & Roles
                        </button>
                        <button onClick={() => setActiveTab('notifications')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'notifications' ? 'border-b-2 border-blue-600 text-blue-400' : 'text-gray-400'}`}>
                            <Bell size={20} className="mr-2"/> Notifications
                        </button>
                        <button onClick={() => setActiveTab('systemConfig')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'systemConfig' ? 'border-b-2 border-blue-600 text-blue-400' : 'text-gray-400'}`}>
                            <Shield size={20} className="mr-2"/> System Configuration
                        </button>
                        <button onClick={() => setActiveTab('passwordManagement')} className={`py-2 px-4 flex items-center text-lg font-semibold ${activeTab === 'passwordManagement' ? 'border-b-2 border-blue-600 text-blue-400' : 'text-gray-400'}`}>
                            <Key size={20} className="mr-2"/> Password Management
                        </button>
                    </div>
                    <div>
                        {activeTab === 'users' && (
                            <UsersAndRolesView
                                users={users}
                                roles={roles}
                                onInvite={() => setIsInviteModalOpen(true)}
                                onEditUser={handleEditUserClick}
                                onDeactivateUser={handleDeactivateUser}
                                onCreateRole={() => setIsCreateRoleModalOpen(true)}
                                onViewUserActivityLog={handleViewUserActivityLog}
                            />
                        )}
                        {activeTab === 'notifications' && (
                            <NotificationsView
                                alerts={alerts}
                                onCreateAlert={() => { setIsCreateAlertModalOpen(true); setAlertToEdit(null); }}
                                onToggleAlertStatus={handleToggleAlertStatus}
                                onEditAlert={handleEditAlertClick}
                            />
                        )}
                        {activeTab === 'systemConfig' && (
                            <SystemConfigView
                                onSaveConfig={handleSaveConfig}
                                initialConfig={systemConfig}
                            />
                        )}
                        {activeTab === 'passwordManagement' && (
                            <PasswordManagementView
                                onSavePolicy={handleSavePasswordPolicy}
                                initialPolicy={passwordPolicy}
                            />
                        )}
                    </div>
                </div>

                {/* Modals */}
                {isInviteModalOpen && (
                    <InviteUserModal
                        onClose={() => setIsInviteModalOpen(false)}
                        onSave={handleInviteUser}
                        roles={roles}
                    />
                )}
                {isEditUserModalOpen && (
                    <EditUserModal
                        user={userToEdit}
                        onClose={() => setIsEditUserModalOpen(false)}
                        onSave={handleSaveUser}
                        roles={roles}
                    />
                )}
                {isCreateAlertModalOpen && (
                    <CreateAlertModal
                        onClose={() => { setIsCreateAlertModalOpen(false); setAlertToEdit(null); }}
                        onSave={handleCreateAlert}
                        initialData={alertToEdit}
                    />
                )}
                {isCreateRoleModalOpen && (
                    <CreateRoleModal
                        onClose={() => setIsCreateRoleModalOpen(false)}
                        onSave={handleCreateRole}
                    />
                )}
                {isUserActivityLogModalOpen && (
                    <UserActivityLogModal
                        user={userForActivityLog}
                        onClose={() => { setIsUserActivityLogModalOpen(false); setUserForActivityLog(null); }}
                    />
                )}

                {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
            </div>
        </div>
    );
};

export default Settings;