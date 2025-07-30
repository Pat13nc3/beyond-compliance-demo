// src/features/settings/modals/UserActivityLogModal.jsx

import React from 'react';
// NEW: Import Bell icon here
import { X, Clock, UserCheck, FileText, Lock, Bell } from 'lucide-react'; // Icons for log entries

const mockUserActivityLogs = {
    'user-1': [ // Kene Gold
        { id: 'log-001', timestamp: '2025-07-28 09:30:00', event: 'User Login', details: 'Successful login from IP 192.168.1.10', icon: UserCheck },
        { id: 'log-002', timestamp: '2025-07-28 10:15:20', event: 'Rule Created', details: 'Created rule "High-Value Transaction Alert"', icon: FileText },
        { id: 'log-003', timestamp: '2025-07-28 11:00:00', event: 'Task Assigned', details: 'Assigned "Review New Guidelines" to Jane Smith', icon: UserCheck },
        { id: 'log-004', timestamp: '2025-07-28 17:45:00', event: 'User Logout', details: 'Logged out successfully', icon: Lock },
        { id: 'log-005', timestamp: '2025-07-27 14:00:00', event: 'Policy Updated', details: 'Updated Password Policy settings', icon: Lock },
        { id: 'log-006', timestamp: '2025-07-27 09:00:00', event: 'User Login', details: 'Successful login from IP 192.168.1.10', icon: UserCheck },
        // This log entry uses the Bell icon, which was missing from imports
        { id: 'log-007', timestamp: '2025-07-26 10:30:00', event: 'Alert Toggled', details: 'Deactivated "Sanctioned Crypto Address Block" alert', icon: Bell },
    ],
    'user-2': [ // Jane Smith
        { id: 'log-010', timestamp: '2025-07-28 10:00:00', event: 'User Login', details: 'Successful login from IP 192.168.1.11', icon: UserCheck },
        { id: 'log-011', timestamp: '2025-07-28 10:35:00', event: 'Task Status Change', details: 'Marked "Prepare VASP White Paper draft" as In Progress', icon: Clock },
    ],
};


const UserActivityLogModal = ({ user, onClose }) => {
    const activityLogs = mockUserActivityLogs[user?.id] || [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-2xl text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">Activity Log: {user?.name}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                    {activityLogs.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No activity recorded for this user.</p>
                    ) : (
                        activityLogs.map(log => (
                            <div key={log.id} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-md">
                                {log.icon && <log.icon size={20} className="text-gray-400 mt-0.5" />}
                                <div>
                                    <p className="text-sm font-semibold text-gray-200">{log.event}</p>
                                    <p className="text-xs text-gray-400">{log.details}</p>
                                    <p className="text-xs text-gray-500 mt-1"><Clock size={12} className="inline-block mr-1"/>{log.timestamp}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserActivityLogModal;