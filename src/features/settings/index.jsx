// src/features/settings/index.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Users, Bell, Shield, Key, Building2, User2, Settings as SettingsIcon } from 'lucide-react';
import UsersAndRolesView from './components/UsersAndRolesView.jsx';
import NotificationsView from './components/NotificationsView.jsx';
import PasswordManagementView from './components/PasswordManagementView.jsx';
import SystemConfigView from './components/SystemConfigView.jsx';
import OrganizationsView from './components/OrganizationsView.jsx';
import EditUserModal from './modals/EditUserModal.jsx';
import InviteUserModal from './modals/InviteUserModal.jsx';
import CreateAlertModal from './modals/CreateAlertModal.jsx';
import CreateRoleModal from './modals/CreateRoleModal.jsx';
import UserActivityLogModal from './modals/UserActivityLogModal.jsx';
import AddOrganizationModal from './modals/AddOrganizationModal.jsx';
import Toast from '../../components/ui/Toast.jsx';

import { mockUsers as initialMockUsers, mockRoles as initialMockRoles, mockPartners as initialMockPartners } from '../../data/mockData.js';
import { mockAlerts as initialMockAlerts } from '../riskAssessment/data/riskData.js';

// --- MAIN SETTINGS PAGE ---
const Settings = ({ context, onCleanContext }) => { // Receive context and onCleanContext
  const [activeTab, setActiveTab] = useState('users-roles');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isCreateAlertModalOpen, setIsCreateAlertModalOpen] = useState(false);
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [isAddOrganizationModalOpen, setIsAddOrganizationModalOpen] = useState(false);
  const [isUserActivityLogModalOpen, setIsUserActivityLogModalOpen] = useState(false);

  const [users, setUsers] = useState(initialMockUsers);
  const [roles, setRoles] = useState(initialMockRoles);
  const [alerts, setAlerts] = useState(initialMockAlerts);
  const [organizations, setOrganizations] = useState(initialMockPartners);

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
  const [organizationToEdit, setOrganizationToEdit] = useState(null);
  const [userForActivityLog, setUserForActivityLog] = useState(null);

  const [toastMessage, setToastMessage] = useState('');

  // Effect to handle context for opening modals
  useEffect(() => {
    if (context) {
      if (context.openModal === 'inviteUser') {
        setActiveTab('users-roles'); // Ensure correct tab is active
        setIsInviteModalOpen(true);
      }
      // Clean the context after it's been used
      if (onCleanContext) {
        onCleanContext();
      }
    }
  }, [context, onCleanContext]);

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

  // --- Organization Management Handlers ---
  const handleAddOrganization = (newOrg) => {
    setOrganizations(prev => [...prev, { ...newOrg, id: `org-${Date.now()}` }]);
    setIsAddOrganizationModalOpen(false);
    setToastMessage(`Organization "${newOrg.name}" added successfully! An invitation has been sent to ${newOrg.representativeEmail}.`);
  };

  const handleEditOrganization = (updatedOrg) => {
    setOrganizations(prev => prev.map(org => org.id === updatedOrg.id ? updatedOrg : org));
    setIsAddOrganizationModalOpen(false);
    setOrganizationToEdit(null);
    setToastMessage(`Organization "${updatedOrg.name}" updated successfully!`);
  };

  const handleDeleteOrganization = (orgId) => {
    if (window.confirm('Are you sure you want to delete this organization?')) {
      setOrganizations(prev => prev.filter(org => org.id !== orgId));
      setToastMessage('Organization deleted successfully!');
    }
  };

  const handleSendInvite = (organization) => {
    setToastMessage(`Invitation sent to ${organization.representativeEmail} for organization "${organization.name}".`);
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

  // Define the navigation items
  const navItems = useMemo(() => [
    { id: 'users-roles', name: 'Users & Roles', icon: Users },
    { id: 'organizations', name: 'Organizations', icon: Building2 },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'password-mgmt', name: 'Password Management', icon: Key },
    { id: 'system-config', name: 'System Configuration', icon: SettingsIcon },
  ], []);

  const renderContent = () => {
    switch (activeTab) {
      case 'users-roles':
        return (
          <UsersAndRolesView
            users={users}
            roles={roles}
            onInvite={() => setIsInviteModalOpen(true)}
            onEditUser={handleEditUserClick}
            onDeactivateUser={handleDeactivateUser}
            onCreateRole={() => setIsCreateRoleModalOpen(true)}
            onViewUserActivityLog={handleViewUserActivityLog}
          />
        );
      case 'organizations':
        return (
          <OrganizationsView
            organizations={organizations}
            onAddOrganization={() => { setOrganizationToEdit(null); setIsAddOrganizationModalOpen(true); }}
            onEditOrganization={(org) => { setOrganizationToEdit(org); setIsAddOrganizationModalOpen(true); }}
            onDeleteOrganization={handleDeleteOrganization}
            onSendInvite={handleSendInvite}
          />
        );
      case 'notifications':
        return (
          <NotificationsView
            alerts={alerts}
            onCreateAlert={() => { setIsCreateAlertModalOpen(true); setAlertToEdit(null); }}
            onToggleAlertStatus={handleToggleAlertStatus}
            onEditAlert={handleEditAlertClick}
          />
        );
      case 'password-mgmt':
        return (
          <PasswordManagementView
            onSavePolicy={handleSavePasswordPolicy}
            initialPolicy={passwordPolicy}
          />
        );
      case 'system-config':
        return (
          <SystemConfigView
            onSaveConfig={handleSaveConfig}
            initialConfig={systemConfig}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in theme-bg-page min-h-screen">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold theme-text-primary">Settings</h1>
          <p className="theme-text-secondary">Manage your system configurations, users, and organizational partners.</p>
        </div>
      </div>
      <div className="flex theme-bg-card rounded-xl shadow-lg overflow-hidden">
        <nav className="flex-none w-64 p-6 border-r theme-border-color space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors
                  ${activeTab === item.id ? 'bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-yellow-400 font-semibold' : 'theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              {React.createElement(item.icon, { size: 20, className: 'mr-3' })}
              {item.name}
            </button>
          ))}
        </nav>
        <div className="flex-grow p-6">
          {renderContent()}
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
      {isAddOrganizationModalOpen && (
        <AddOrganizationModal
          onClose={() => { setIsAddOrganizationModalOpen(false); setOrganizationToEdit(null); }}
          onSave={organizationToEdit ? handleEditOrganization : handleAddOrganization}
          organization={organizationToEdit}
        />
      )}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
    </div>
  );
};

export default Settings;
