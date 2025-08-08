// src/features/settings/components/NotificationsView.jsx

import React from 'react';
import { Plus, Edit, ToggleLeft, ToggleRight } from 'lucide-react';

const NotificationsView = ({ alerts, onCreateAlert, onToggleAlertStatus, onEditAlert }) => (
    <div className="theme-bg-card p-6 rounded-lg shadow-md theme-text-primary">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">System Notifications & Alerts</h3>
            <button onClick={onCreateAlert} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center">
                <Plus size={20} className="mr-2" /> Create New Alert
            </button>
        </div>
        <div className="space-y-4 max-h-[700px] overflow-y-auto custom-scrollbar pr-2">
            {alerts.length === 0 ? (
                <p className="text-center py-4 theme-text-secondary">No alerts configured yet. Create a new alert to get started.</p>
            ) : (
                alerts.map(alert => (
                    <div key={alert.id} className="flex justify-between items-center p-4 border theme-border-color rounded-lg">
                        <div>
                            <p className="font-semibold theme-text-primary">{alert.name}</p>
                            <p className="text-sm theme-text-secondary">
                                <span className="font-bold">Trigger:</span> {alert.eventType}
                            </p>
                            <p className="text-xs theme-text-secondary line-clamp-1">
                                <span className="font-bold">Message:</span> {alert.messageTemplate}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm theme-text-secondary">Notify: {Array.isArray(alert.notify) ? alert.notify.join(', ') : alert.notify}</span>
                            <button onClick={() => onToggleAlertStatus(alert.id, alert.active)} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-theme-text-primary" title={alert.active ? 'Deactivate Alert' : 'Activate Alert'}>
                                {alert.active ? <ToggleRight size={24} className="text-green-500"/> : <ToggleLeft size={24} className="theme-text-secondary"/>}
                            </button>
                            <button onClick={() => onEditAlert(alert)} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-theme-text-primary" title="Edit Alert">
                                <Edit size={20} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);

export default NotificationsView;