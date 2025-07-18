import React, { useState } from 'react';
import { X, Save, UploadCloud } from 'lucide-react';

const AddDataSourceModal = ({ onAdd, onClose }) => {
    // General state
    const [integrationName, setIntegrationName] = useState('');
    const [integrationType, setIntegrationType] = useState('API');

    // State for all possible connection fields
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
        if (!integrationName) {
            alert("Please provide an Integration Name.");
            return;
        }

        let sourceData = { name: integrationName, type: integrationType };
        
        switch (integrationType) {
            case 'API':
                if (!apiFields.endpoint || !apiFields.key) {
                    alert("API Endpoint and Key are required.");
                    return;
                }
                sourceData.credentials = apiFields;
                break;
            case 'SFTP':
                 if (!sftpFields.host || !sftpFields.user || !sftpFields.pass) {
                    alert("SFTP Host, Username, and Password are required.");
                    return;
                }
                sourceData.credentials = sftpFields;
                break;
            case 'Database':
                 if (!dbFields.host || !dbFields.user || !dbFields.pass || !dbFields.dbname) {
                    alert("Database Host, Username, Password, and Database Name are required.");
                    return;
                }
                sourceData.credentials = dbFields;
                break;
            case 'File Upload':
                if (!file) {
                    alert("Please select a file to upload.");
                    return;
                }
                sourceData.fileInfo = { name: file.name, size: file.size };
                break;
            default:
                alert("Invalid integration type.");
                return;
        }
        
        onAdd(sourceData);
    };

    const renderFields = () => {
        switch (integrationType) {
            case 'API':
                return (
                    <div className="space-y-4 animate-fade-in-fast">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">API Endpoint URL</label>
                            <input type="text" value={apiFields.endpoint} onChange={e => setApiFields({...apiFields, endpoint: e.target.value})} placeholder="https://api.example.com/v1/data" className="w-full pl-4 pr-4 py-2 border-gray-600 bg-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">API Key</label>
                            <input type="password" value={apiFields.key} onChange={e => setApiFields({...apiFields, key: e.target.value})} placeholder="Paste API Key here" className="w-full pl-4 pr-4 py-2 border-gray-600 bg-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500" />
                        </div>
                    </div>
                );
            case 'SFTP':
                return (
                    <div className="space-y-4 animate-fade-in-fast">
                         <div><label className="block text-sm font-medium text-gray-300 mb-1">Host</label><input type="text" value={sftpFields.host} onChange={e => setSftpFields({...sftpFields, host: e.target.value})} placeholder="sftp.example.com" className="w-full pl-4 pr-4 py-2 border-gray-600 bg-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500" /></div>
                         <div><label className="block text-sm font-medium text-gray-300 mb-1">Username</label><input type="text" value={sftpFields.user} onChange={e => setSftpFields({...sftpFields, user: e.target.value})} placeholder="sftp-user" className="w-full pl-4 pr-4 py-2 border-gray-600 bg-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500" /></div>
                         <div><label className="block text-sm font-medium text-gray-300 mb-1">Password</label><input type="password" value={sftpFields.pass} onChange={e => setSftpFields({...sftpFields, pass: e.target.value})} placeholder="••••••••••" className="w-full pl-4 pr-4 py-2 border-gray-600 bg-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500" /></div>
                    </div>
                );
            case 'Database':
                 return (
                    <div className="space-y-4 animate-fade-in-fast">
                         <div><label className="block text-sm font-medium text-gray-300 mb-1">Database Type</label><select value={dbFields.type} onChange={e => setDbFields({...dbFields, type: e.target.value})} className="w-full border-gray-600 bg-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500"><option>PostgreSQL</option><option>MySQL</option><option>SQL Server</option></select></div>
                         <div><label className="block text-sm font-medium text-gray-300 mb-1">Host</label><input type="text" value={dbFields.host} onChange={e => setDbFields({...dbFields, host: e.target.value})} placeholder="db.example.com" className="w-full pl-4 pr-4 py-2 border-gray-600 bg-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500" /></div>
                         <div><label className="block text-sm font-medium text-gray-300 mb-1">Port</label><input type="text" value={dbFields.port} onChange={e => setDbFields({...dbFields, port: e.target.value})} placeholder="5432" className="w-full pl-4 pr-4 py-2 border-gray-600 bg-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500" /></div>
                         <div><label className="block text-sm font-medium text-gray-300 mb-1">Username</label><input type="text" value={dbFields.user} onChange={e => setDbFields({...dbFields, user: e.target.value})} placeholder="db-user" className="w-full pl-4 pr-4 py-2 border-gray-600 bg-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500" /></div>
                         <div><label className="block text-sm font-medium text-gray-300 mb-1">Password</label><input type="password" value={dbFields.pass} onChange={e => setDbFields({...dbFields, pass: e.target.value})} placeholder="••••••••••" className="w-full pl-4 pr-4 py-2 border-gray-600 bg-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500" /></div>
                         <div><label className="block text-sm font-medium text-gray-300 mb-1">Database Name</label><input type="text" value={dbFields.dbname} onChange={e => setDbFields({...dbFields, dbname: e.target.value})} placeholder="compliance_db" className="w-full pl-4 pr-4 py-2 border-gray-600 bg-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500" /></div>
                    </div>
                );
            case 'File Upload':
                return (
                       <div className="animate-fade-in-fast">
                            <label className="block text-sm font-medium text-gray-300 mb-2">File</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                               <div className="space-y-1 text-center"><UploadCloud className="mx-auto h-12 w-12 text-gray-500" /><div className="flex text-sm text-gray-400"><label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-yellow-400 hover:text-yellow-300"><span>{file ? file.name : "Select a file"}</span><input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} /></label>{!file && <p className="pl-1">or drag and drop</p>}</div><p className="text-xs text-gray-500">CSV, XLSX, JSON up to 50MB</p></div>
                            </div>
                       </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6 w-full max-w-md text-white">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-yellow-500">Add New Data Source</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700"><X size={24} /></button>
                </div>
                <div className="space-y-4">
                    <div><label className="block text-sm font-medium text-gray-300 mb-1">Integration Name</label><input type="text" value={integrationName} onChange={e => setIntegrationName(e.target.value)} placeholder="e.g., SmileID KYC" className="w-full border-gray-600 bg-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500" /></div>
                    <div><label className="block text-sm font-medium text-gray-300 mb-1">Integration Type</label><select value={integrationType} onChange={e => setIntegrationType(e.target.value)} className="w-full border-gray-600 bg-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500"><option>API</option><option>SFTP</option><option>Database</option><option>File Upload</option></select></div>
                    {renderFields()}
                </div>
                <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-700">
                    <button onClick={onClose} className="px-5 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500">Cancel</button>
                    <button onClick={handleSave} className="px-5 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 flex items-center"><Save size={16} className="mr-2" />Save Integration</button>
                </div>
            </div>
        </div>
    );
};

export default AddDataSourceModal;