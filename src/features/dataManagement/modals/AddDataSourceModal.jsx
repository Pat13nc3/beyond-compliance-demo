// src/features/dataManagement/modals/AddDataSourceModal.jsx

import React, { useState } from 'react';
import { X, Save, UploadCloud } from 'lucide-react';

const AddDataSourceModal = ({ onAdd, onClose, showToast }) => {
    const [integrationName, setIntegrationName] = useState('');
    const [integrationType, setIntegrationType] = useState('API');
    const [apiFields, setApiFields] = useState({ endpoint: '', key: '' });
    const [sftpFields, setSftpFields] = useState({ host: '', user: '', pass: '' });
    const [dbFields, setDbFields] = useState({ type: 'PostgreSQL', host: '', port: '5432', user: '', pass: '', dbname: '' });
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (!integrationName) setIntegrationName(selectedFile.name);
        }
    };

    const handleSave = () => {
        if (!integrationName.trim()) {
            showToast("Please provide an Integration Name.", 'error');
            return;
        }

        let sourceData = { name: integrationName.trim(), type: integrationType };
        let isValid = true;
        let errorMessage = '';

        switch (integrationType) {
            case 'API':
                if (!apiFields.endpoint.trim() || !apiFields.key.trim()) {
                    errorMessage = "API Endpoint and Key are required.";
                    isValid = false;
                }
                sourceData.credentials = apiFields;
                break;
            case 'SFTP':
                 if (!sftpFields.host.trim() || !sftpFields.user.trim() || !sftpFields.pass.trim()) {
                    errorMessage = "SFTP Host, Username, and Password are required.";
                    isValid = false;
                }
                sourceData.credentials = sftpFields;
                break;
            case 'Database':
                 if (!dbFields.host.trim() || !dbFields.user.trim() || !dbFields.pass.trim() || !dbFields.dbname.trim()) {
                    errorMessage = "Database Host, Username, Password, and Database Name are required.";
                    isValid = false;
                }
                sourceData.credentials = dbFields;
                break;
            case 'File Upload':
                if (!file) {
                    errorMessage = "Please select a file to upload.";
                    isValid = false;
                }
                sourceData.fileInfo = { name: file?.name, size: file?.size };
                break;
            case 'On-chain':
                if (!apiFields.endpoint.trim()) {
                    errorMessage = "Blockchain endpoint is required.";
                    isValid = false;
                }
                sourceData.credentials = apiFields;
                break;
            default:
                errorMessage = "Invalid integration type.";
                isValid = false;
                break;
        }

        if (!isValid) {
            showToast(errorMessage, 'error');
            return;
        }

        onAdd(sourceData);
        onClose();
    };

    const renderFields = () => {
        switch (integrationType) {
            case 'API':
            case 'On-chain':
                return (
                    <div className="space-y-4 animate-fade-in-fast">
                        <div>
                            <label className="block text-sm font-medium theme-text-secondary mb-1">API Endpoint URL</label>
                            <input type="text" value={apiFields.endpoint} onChange={e => setApiFields({...apiFields, endpoint: e.target.value})} placeholder="https://api.example.com/v1/data" className="w-full px-4 py-2 border theme-border-color bg-gray-100 dark:bg-gray-800 rounded-md focus:ring-yellow-500 focus:border-yellow-500 theme-text-primary" />
                        </div>
                        {integrationType === 'API' && (
                            <div>
                                <label className="block text-sm font-medium theme-text-secondary mb-1">API Key</label>
                                <input type="password" value={apiFields.key} onChange={e => setApiFields({...apiFields, key: e.target.value})} placeholder="Paste API Key here" className="w-full px-4 py-2 border theme-border-color bg-gray-100 dark:bg-gray-800 rounded-md focus:ring-yellow-500 focus:border-yellow-500 theme-text-primary" />
                            </div>
                        )}
                    </div>
                );
            case 'SFTP':
                return (
                    <div className="space-y-4 animate-fade-in-fast">
                         <div><label className="block text-sm font-medium theme-text-secondary mb-1">Host</label><input type="text" value={sftpFields.host} onChange={e => setSftpFields({...sftpFields, host: e.target.value})} placeholder="sftp.example.com" className="w-full px-4 py-2 border theme-border-color bg-gray-100 dark:bg-gray-800 rounded-md focus:ring-yellow-500 focus:border-yellow-500 theme-text-primary" /></div>
                         <div><label className="block text-sm font-medium theme-text-secondary mb-1">Username</label><input type="text" value={sftpFields.user} onChange={e => setSftpFields({...sftpFields, user: e.target.value})} placeholder="sftp-user" className="w-full px-4 py-2 border theme-border-color bg-gray-100 dark:bg-gray-800 rounded-md focus:ring-yellow-500 focus:border-yellow-500 theme-text-primary" /></div>
                         <div><label className="block text-sm font-medium theme-text-secondary mb-1">Password</label><input type="password" value={sftpFields.pass} onChange={e => setSftpFields({...sftpFields, pass: e.target.value})} placeholder="••••••••••" className="w-full px-4 py-2 border theme-border-color bg-gray-100 dark:bg-gray-800 rounded-md focus:ring-yellow-500 focus:border-yellow-500 theme-text-primary" /></div>
                    </div>
                );
            case 'Database':
                 return (
                    <div className="space-y-4 animate-fade-in-fast">
                         <div><label className="block text-sm font-medium theme-text-secondary mb-1">Database Type</label><select value={dbFields.type} onChange={e => setDbFields({...dbFields, type: e.target.value})} className="w-full border theme-border-color bg-gray-100 dark:bg-gray-800 rounded-md focus:ring-yellow-500 focus:border-yellow-500 theme-text-primary"><option>PostgreSQL</option><option>MySQL</option><option>SQL Server</option></select></div>
                         <div><label className="block text-sm font-medium theme-text-secondary mb-1">Host</label><input type="text" value={dbFields.host} onChange={e => setDbFields({...dbFields, host: e.target.value})} placeholder="db.example.com" className="w-full px-4 py-2 border theme-border-color bg-gray-100 dark:bg-gray-800 rounded-md focus:ring-yellow-500 focus:border-yellow-500 theme-text-primary" /></div>
                         <div><label className="block text-sm font-medium theme-text-secondary mb-1">Port</label><input type="text" value={dbFields.port} onChange={e => setDbFields({...dbFields, port: e.target.value})} placeholder="5432" className="w-full px-4 py-2 border theme-border-color bg-gray-100 dark:bg-gray-800 rounded-md focus:ring-yellow-500 focus:border-yellow-500 theme-text-primary" /></div>
                         <div><label className="block text-sm font-medium theme-text-secondary mb-1">Username</label><input type="text" value={dbFields.user} onChange={e => setDbFields({...dbFields, user: e.target.value})} placeholder="db-user" className="w-full px-4 py-2 border theme-border-color bg-gray-100 dark:bg-gray-800 rounded-md focus:ring-yellow-500 focus:border-yellow-500 theme-text-primary" /></div>
                         <div><label className="block text-sm font-medium theme-text-secondary mb-1">Password</label><input type="password" value={dbFields.pass} onChange={e => setDbFields({...dbFields, pass: e.target.value})} placeholder="••••••••••" className="w-full px-4 py-2 border theme-border-color bg-gray-100 dark:bg-gray-800 rounded-md focus:ring-yellow-500 focus:border-yellow-500 theme-text-primary" /></div>
                         <div><label className="block text-sm font-medium theme-text-secondary mb-1">Database Name</label><input type="text" value={dbFields.dbname} onChange={e => setDbFields({...dbFields, dbname: e.target.value})} placeholder="compliance_db" className="w-full px-4 py-2 border theme-border-color bg-gray-100 dark:bg-gray-800 rounded-md focus:ring-yellow-500 focus:border-yellow-500 theme-text-primary" /></div>
                    </div>
                );
            case 'File Upload':
                return (
                       <div className="animate-fade-in-fast">
                            <label className="block text-sm font-medium theme-text-secondary mb-2">File</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 theme-border-color border-dashed rounded-md">
                               <div className="space-y-1 text-center"><UploadCloud className="mx-auto h-12 w-12 theme-text-secondary" /><div className="flex text-sm theme-text-secondary"><label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-yellow-500 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300"><span>{file ? file.name : "Select a file"}</span><input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} /></label>{!file && <p className="pl-1">or drag and drop</p>}</div><p className="text-xs theme-text-secondary">CSV, XLSX, JSON up to 50MB</p></div>
                            </div>
                       </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="theme-bg-card border theme-border-color rounded-lg shadow-2xl p-6 w-full max-w-md theme-text-primary">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-blue-600 dark:text-yellow-500">Add New Data Source</h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-700"><X size={24} /></button>
                </div>
                <div className="space-y-4">
                    <div><label className="block text-sm font-medium theme-text-secondary mb-1">Integration Name</label><input type="text" value={integrationName} onChange={e => setIntegrationName(e.target.value)} placeholder="e.g., SmileID KYC" className="w-full border theme-border-color bg-gray-100 dark:bg-gray-800 rounded-md focus:ring-yellow-500 focus:border-yellow-500 theme-text-primary" /></div>
                    <div><label className="block text-sm font-medium theme-text-secondary mb-1">Integration Type</label><select value={integrationType} onChange={e => setIntegrationType(e.target.value)} className="w-full border theme-border-color bg-gray-100 dark:bg-gray-800 rounded-md focus:ring-yellow-500 focus:border-yellow-500 theme-text-primary"><option>API</option><option>SFTP</option><option>Database</option><option>File Upload</option><option>On-chain</option></select></div>
                    {renderFields()}
                </div>
                <div className="flex justify-end space-x-4 pt-6 mt-6 border-t theme-border-color">
                    <button onClick={onClose} className="px-5 py-2 bg-gray-200 dark:bg-gray-600 theme-text-primary font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                    <button onClick={handleSave} className="px-5 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 flex items-center"><Save size={16} className="mr-2" />Save Integration</button>
                </div>
            </div>
        </div>
    );
};

export default AddDataSourceModal;