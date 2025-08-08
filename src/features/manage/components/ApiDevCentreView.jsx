// src/features/manage/components/ApiDevCentreView.jsx

import React, { useState, useEffect } from 'react';
import { Save, Key, Plus, Trash2, Globe, Code, Zap, ToggleLeft, ToggleRight, Copy, Edit } from 'lucide-react'; 

const ApiDevCentreView = ({ onSaveApiSettings, initialApiSettings = {}, setToastMessage }) => {
    const [baseUrl, setBaseUrl] = useState(initialApiSettings.baseUrl || 'https://api.beyondcompliance.com/v2');
    const [docsUrl, setDocsUrl] = useState(initialApiSettings.docsUrl || 'https://docs.beyondcompliance.com/api');

    const [apiKeys, setApiKeys] = useState(initialApiSettings.apiKeys || [
        { id: 'key-1', name: 'Primary Integration Key', key: 'sk_live_**********xyz', created: '2025-01-15', lastUsed: '2025-07-28', status: 'Active' },
        { id: 'key-2', name: 'Reporting Service Key', key: 'sk_live_**********abc', created: '2025-03-20', lastUsed: '2025-07-20', status: 'Active' },
        { id: 'key-3', name: 'Test Environment Key', key: 'sk_test_**********123', created: '2025-06-01', lastUsed: '2025-07-01', status: 'Inactive' },
    ]);

    const [webhooks, setWebhooks] = useState(initialApiSettings.webhooks || [
        { id: 'hook-1', name: 'Compliance Event Notifications', url: 'https://webhook.example.com/compliance', events: ['alert.created', 'task.assigned'], status: 'Active' },
        { id: 'hook-2', name: 'KYC Update Listener', url: 'https://partners.com/webhook/kyc', events: ['user.kyc.updated'], status: 'Inactive' },
    ]);

    useEffect(() => {
        if (initialApiSettings) {
            setBaseUrl(initialApiSettings.baseUrl || 'https://api.beyondcompliance.com/v2');
            setDocsUrl(initialApiSettings.docsUrl || 'https://docs.beyondcompliance.com/api');
            setApiKeys(initialApiSettings.apiKeys || []);
            setWebhooks(initialApiSettings.webhooks || []);
        }
    }, [initialApiSettings]);

    const handleGenerateNewKey = () => {
        const newKey = {
            id: `key-${Date.now()}`,
            name: `New API Key ${new Date().toLocaleDateString()}`,
            key: `sk_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`,
            created: new Date().toLocaleDateString(),
            lastUsed: 'Never',
            status: 'Active',
        };
        setApiKeys(prev => [...prev, newKey]);
        setToastMessage('New API Key generated! Please copy it now, as it will not be shown again.');

        navigator.clipboard.writeText(newKey.key)
            .then(() => setToastMessage('New API Key copied to clipboard!'))
            .catch(err => console.error('Could not copy text: ', err));
    };

    const handleCopyKey = (keyText) => {
        navigator.clipboard.writeText(keyText)
            .then(() => setToastMessage('API Key copied to clipboard!'))
            .catch(err => console.error('Could not copy text: ', err));
    };


    const handleRevokeKey = (keyId) => {
        if (window.confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
            setApiKeys(prev => prev.filter(key => key.id !== keyId));
            setToastMessage('API Key revoked.');
        }
    };

    const handleToggleApiKeyStatus = (keyId, currentStatus) => {
        setApiKeys(prevKeys => prevKeys.map(key =>
            key.id === keyId ? { ...key, status: currentStatus === 'Active' ? 'Inactive' : 'Active' } : key
        ));
        const toggledKey = apiKeys.find(key => key.id === keyId);
        setToastMessage(`API Key "${toggledKey.name}" is now ${toggledKey.status === 'Active' ? 'Active' : 'Inactive'}.`);
    };

    const handleEditApiKey = (key) => {
        setToastMessage(`Editing API Key: "${key.name}" (Edit modal coming soon!)`);
    };

    const handleAddWebhook = () => {
        const newWebhook = {
            id: `webhook-${Date.now()}`,
            name: `New Webhook ${new Date().toLocaleDateString()}`,
            url: 'https://',
            events: [],
            status: 'Inactive',
        };
        setWebhooks(prev => [...prev, newWebhook]);
        setToastMessage('New webhook added (configure its details to activate).');
    };

    const handleToggleWebhookStatus = (hookId) => {
        setWebhooks(prev => prev.map(hook => 
            hook.id === hookId ? { ...hook, status: hook.status === 'Active' ? 'Inactive' : 'Active' } : hook
        ));
        const toggledHook = webhooks.find(hook => hook.id === hookId);
        setToastMessage(`Webhook "${toggledHook.name}" is now ${toggledHook.status === 'Active' ? 'Active' : 'Inactive'}.`);
    };

    const handleEditWebhook = (hook) => {
        setToastMessage(`Editing Webhook: "${hook.name}" (Edit modal coming soon!)`);
    };

    const handleSaveSettings = () => {
        const settingsToSave = {
            baseUrl,
            docsUrl,
            apiKeys,
            webhooks,
        };
        onSaveApiSettings(settingsToSave);
    };

    return (
        <div className="theme-bg-card p-6 rounded-lg shadow-md theme-text-primary space-y-6 flex-1 flex flex-col h-full"> 
            <h3 className="text-xl font-semibold theme-text-highlight-color mb-4 flex items-center">
                <Code size={24} className="mr-3 theme-text-secondary" /> API & Developer Centre
            </h3>

            {/* General API Information */}
            <div className="space-y-4 pb-6 border-b theme-border-color">
                <h4 className="text-lg font-medium theme-text-primary flex items-center"><Globe size={18} className="mr-2 theme-text-secondary" /> General API Settings</h4>
                <div>
                    <label htmlFor="baseUrl" className="block text-sm font-medium theme-text-secondary mb-2">API Base URL</label>
                    <input
                        type="text"
                        id="baseUrl"
                        name="baseUrl"
                        value={baseUrl}
                        onChange={(e) => setBaseUrl(e.target.value)}
                        className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-blue-500 focus:border-blue-500"
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="docsUrl" className="block text-sm font-medium theme-text-secondary mb-2">API Documentation</label>
                    <a href={docsUrl} target="_blank" rel="noopener noreferrer" className="block w-full p-2 border theme-border-color rounded-md theme-bg-card text-blue-400 hover:underline">
                        {docsUrl}
                    </a>
                </div>
            </div>

            {/* API Key Management */}
            <div className="space-y-4 pb-6 border-b theme-border-color">
                <h4 className="text-lg font-medium theme-text-primary flex items-center"><Key size={18} className="mr-2 theme-text-secondary" /> API Keys</h4>
                <button
                    onClick={handleGenerateNewKey}
                    className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-500 flex items-center text-sm"
                >
                    <Plus size={16} className="mr-2" /> Generate New Key
                </button>
                <div className="mt-4 space-y-3">
                    {apiKeys.length === 0 ? (
                        <p className="theme-text-secondary">No API keys generated yet.</p>
                    ) : (
                        apiKeys.map(key => (
                            <div key={key.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md flex items-center justify-between">
                                <div>
                                    <p className="font-semibold theme-text-primary">{key.name}</p>
                                    <p className="text-sm theme-text-secondary">
                                        {key.key.substring(0, 10)}...{key.key.substring(key.key.length - 3)}
                                        <button
                                            onClick={() => handleCopyKey(key.key)}
                                            className="ml-2 p-1 rounded-md theme-text-secondary hover:bg-gray-200 dark:hover:bg-gray-600"
                                            title="Copy API Key"
                                        >
                                            <Copy size={14} />
                                        </button>
                                    </p>
                                    <p className="text-xs theme-text-secondary">Created: {key.created} | Last Used: {key.lastUsed} | Status: {key.status}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleToggleApiKeyStatus(key.id, key.status)}
                                        className="p-1 rounded-full theme-text-secondary hover:bg-gray-200 dark:hover:bg-gray-600"
                                        title={key.status === 'Active' ? 'Deactivate API Key' : 'Activate API Key'}
                                    >
                                        {key.status === 'Active' ? <ToggleLeft size={20} /> : <ToggleRight size={20} />}
                                        <span className="sr-only">{key.status === 'Active' ? 'Deactivate' : 'Activate'} {key.name}</span>
                                    </button>
                                    <button
                                        onClick={() => handleEditApiKey(key)}
                                        className="p-1 rounded-full theme-text-secondary hover:bg-gray-200 dark:hover:bg-gray-600"
                                        title="Edit API Key"
                                    >
                                        <Edit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleRevokeKey(key.id)}
                                        className="text-red-400 hover:text-red-300 p-1 rounded-full"
                                        title="Revoke Key"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Webhook Management */}
            <div className="space-y-4 pb-6 border-b theme-border-color">
                <h4 className="text-lg font-medium theme-text-primary flex items-center"><Zap size={18} className="mr-2 theme-text-secondary" /> Webhooks</h4>
                <button
                    onClick={handleAddWebhook}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm"
                >
                    <Plus size={16} className="mr-2" /> Add New Webhook
                </button>
                <div className="mt-4 space-y-3">
                    {webhooks.length === 0 ? (
                        <p className="theme-text-secondary">No webhooks configured yet.</p>
                    ) : (
                        webhooks.map(hook => (
                            <div key={hook.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md flex items-center justify-between">
                                <div>
                                    <label htmlFor={`webhook-name-${hook.id}`} className="font-semibold theme-text-primary sr-only">Webhook Name</label>
                                    <p className="font-semibold theme-text-primary">
                                        {hook.name}
                                    </p>
                                    <label htmlFor={`webhook-url-${hook.id}`} className="text-sm theme-text-secondary sr-only">Webhook URL</label>
                                    <p className="text-sm theme-text-secondary line-clamp-1">{hook.url}</p>
                                    <label htmlFor={`webhook-events-${hook.id}`} className="text-xs theme-text-secondary sr-only">Webhook Events</label>
                                    <p className="text-xs theme-text-secondary">Events: {Array.isArray(hook.events) ? hook.events.join(', ') : hook.events} | Status: {hook.status}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleToggleWebhookStatus(hook.id)}
                                        className="p-1 rounded-full theme-text-secondary hover:bg-gray-200 dark:hover:bg-gray-600"
                                        title={hook.status === 'Active' ? 'Deactivate Webhook' : 'Activate Webhook'}
                                    >
                                        {hook.status === 'Active' ? <ToggleLeft size={20} /> : <ToggleRight size={20} />}
                                        <span className="sr-only">{hook.status === 'Active' ? 'Deactivate' : 'Activate'} {hook.name}</span>
                                    </button>
                                    <button
                                        onClick={() => handleEditWebhook(hook)}
                                        className="p-1 rounded-full theme-text-secondary hover:bg-gray-200 dark:hover:bg-gray-600"
                                        title="Edit Webhook"
                                    >
                                        <Edit size={20} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t theme-border-color mt-6">
                <button
                    onClick={handleSaveSettings}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center"
                >
                    <Save size={16} className="mr-2"/> Save API Settings
                </button>
            </div>
        </div>
    );
};

export default ApiDevCentreView;