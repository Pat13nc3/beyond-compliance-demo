// src/onboarding/SignUpForm.jsx

import React, { useState } from 'react';

const SignUpForm = ({ onNext }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ name, email, companyName });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium theme-text-secondary">Full Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 w-full p-2 rounded-md theme-bg-card-alt border theme-border-color theme-text-primary"
                />
            </div>
            <div>
                <label className="block text-sm font-medium theme-text-secondary">Email Address</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 w-full p-2 rounded-md theme-bg-card-alt border theme-border-color theme-text-primary"
                />
            </div>
            <div>
                <label className="block text-sm font-medium theme-text-secondary">Company Name</label>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="mt-1 w-full p-2 rounded-md theme-bg-card-alt border theme-border-color theme-text-primary"
                />
            </div>
            <div className="flex justify-end">
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500">
                    Next
                </button>
            </div>
        </form>
    );
};

export default SignUpForm;
