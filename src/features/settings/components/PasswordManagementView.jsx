// src/features/settings/components/PasswordManagementView.jsx

import React, { useState, useEffect } from 'react';
import { Save, Lock, History, Clock } from 'lucide-react'; // Added relevant icons

const PasswordManagementView = ({ onSavePolicy, initialPolicy = {} }) => { // onSavePolicy and initialPolicy from parent
    // State for password policy parameters
    const [minLength, setMinLength] = useState(initialPolicy.minLength || 12);
    const [requireUppercase, setRequireUppercase] = useState(initialPolicy.requireUppercase !== undefined ? initialPolicy.requireUppercase : true);
    const [requireLowercase, setRequireLowercase] = useState(initialPolicy.requireLowercase !== undefined ? initialPolicy.requireLowercase : true); // Fixed typo from 'lowercase' to 'requireLowercase'
    const [requireNumbers, setRequireNumbers] = useState(initialPolicy.requireNumbers !== undefined ? initialPolicy.requireNumbers : true);
    const [requireSymbols, setRequireSymbols] = useState(initialPolicy.requireSymbols !== undefined ? initialPolicy.requireSymbols : true);
    const [expirationDays, setExpirationDays] = useState(initialPolicy.expirationDays || 90);
    const [historyCount, setHistoryCount] = useState(initialPolicy.historyCount || 5);

    // Effect to update state if initialPolicy prop changes
    useEffect(() => {
        if (initialPolicy) {
            setMinLength(initialPolicy.minLength || 12);
            setRequireUppercase(initialPolicy.requireUppercase !== undefined ? initialPolicy.requireUppercase : true);
            setRequireLowercase(initialPolicy.requireLowercase !== undefined ? initialPolicy.requireLowercase : true); // Fixed typo from 'lowercase' to 'requireLowercase'
            setRequireNumbers(initialPolicy.requireNumbers !== undefined ? initialPolicy.requireNumbers : true);
            setRequireSymbols(initialPolicy.requireSymbols !== undefined ? initialPolicy.requireSymbols : true);
            setExpirationDays(initialPolicy.expirationDays || 90);
            setHistoryCount(initialPolicy.historyCount || 5);
        }
    }, [initialPolicy]);

    const handleSave = () => {
        // Basic validation
        if (minLength < 8) {
            alert('Minimum password length must be at least 8 characters.');
            return;
        }
        if (expirationDays <= 0) {
            alert('Password expiration days must be a positive number.');
            return;
        }
        if (historyCount < 0) {
            alert('Password history count cannot be negative.');
            return;
        }

        const policyToSave = {
            minLength: parseInt(minLength, 10),
            requireUppercase,
            requireLowercase,
            requireNumbers,
            requireSymbols,
            expirationDays: parseInt(expirationDays, 10),
            historyCount: parseInt(historyCount, 10),
        };

        onSavePolicy(policyToSave); // Call parent's save handler
    };

    return (
        <div className="theme-bg-card p-6 rounded-lg shadow-md theme-text-primary space-y-6">
            <h3 className="text-xl font-semibold theme-text-highlight-color mb-4">Password Policy Settings</h3>

            {/* Complexity Requirements */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium theme-text-primary flex items-center"><Lock size={18} className="mr-2 theme-text-secondary" /> Password Complexity</h4>
                <div>
                    <label htmlFor="minLength" className="block text-sm font-medium theme-text-secondary mb-2">Minimum Length</label>
                    <input
                        type="number"
                        id="minLength"
                        value={minLength}
                        onChange={(e) => setMinLength(e.target.value)}
                        min="8"
                        className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <label htmlFor="uppercase" className="flex items-center text-sm theme-text-secondary">
                        <input type="checkbox" id="uppercase" checked={requireUppercase} onChange={() => setRequireUppercase(!requireUppercase)} className="h-4 w-4 text-blue-600 rounded border-gray-600 focus:ring-blue-500 bg-gray-900" />
                        <span className="ml-2">Require Uppercase (A-Z)</span>
                    </label>
                    <label htmlFor="lowercase" className="flex items-center text-sm theme-text-secondary">
                        <input type="checkbox" id="lowercase" checked={requireLowercase} onChange={() => setRequireLowercase(!requireLowercase)} className="h-4 w-4 text-blue-600 rounded border-gray-600 focus:ring-blue-500 bg-gray-900" />
                        <span className="ml-2">Require Lowercase (a-z)</span>
                    </label>
                    <label htmlFor="numbers" className="flex items-center text-sm theme-text-secondary">
                        <input type="checkbox" id="numbers" checked={requireNumbers} onChange={() => setRequireNumbers(!requireNumbers)} className="h-4 w-4 text-blue-600 rounded border-gray-600 focus:ring-blue-500 bg-gray-900" />
                        <span className="ml-2">Require Numbers (0-9)</span>
                    </label>
                    <label htmlFor="symbols" className="flex items-center text-sm theme-text-secondary">
                        <input type="checkbox" id="symbols" checked={requireSymbols} onChange={() => setRequireSymbols(!requireSymbols)} className="h-4 w-4 text-blue-600 rounded border-gray-600 focus:ring-blue-500 bg-gray-900" />
                        <span className="ml-2">Require Symbols (!@#$%)</span>
                    </label>
                </div>
            </div>

            {/* Expiration & History */}
            <div className="space-y-4 pt-4 border-t theme-border-color">
                <h4 className="text-lg font-medium theme-text-primary flex items-center"><Clock size={18} className="mr-2 theme-text-secondary" /> Expiration Policy</h4>
                <div>
                    <label htmlFor="expirationDays" className="block text-sm font-medium theme-text-secondary mb-2">Password Expiration (Days)</label>
                    <input
                        type="number"
                        id="expirationDays"
                        value={expirationDays}
                        onChange={(e) => setExpirationDays(e.target.value)}
                        min="1"
                        className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs theme-text-secondary">Users will be required to change their password after this period.</p>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t theme-border-color">
                <h4 className="text-lg font-medium theme-text-primary flex items-center"><History size={18} className="mr-2 theme-text-secondary" /> Password History</h4>
                <div>
                    <label htmlFor="historyCount" className="block text-sm font-medium theme-text-secondary mb-2">Remember Last Passwords (Count)</label>
                    <input
                        type="number"
                        id="historyCount"
                        value={historyCount}
                        onChange={(e) => setHistoryCount(e.target.value)}
                        min="0"
                        className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs theme-text-secondary">Users cannot reuse their last N passwords.</p>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t theme-border-color">
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center"
                >
                    <Save size={16} className="mr-2"/> Save Policy
                </button>
            </div>
        </div>
    );
};

export default PasswordManagementView;