// src/features/onboarding/OnboardingWrapper.jsx

import React, { useState } from 'react';
import SignUpForm from './SignUpForm.jsx';
import ProductSelection from './ProductSelection.jsx';
import FrameworkSelection from './FrameworkSelection.jsx';
import RegulatorySetupWizard from './RegulatorySetupWizard.jsx';
// Corrected import path for mockData.js
import { mockUsers, mockRules } from '../../data/mockData.js'; 

const OnboardingWrapper = ({ onCompleteOnboarding }) => {
    const [step, setStep] = useState(1);
    const [onboardingData, setOnboardingData] = useState({});

    const handleNextStep = (data) => {
        setOnboardingData({ ...onboardingData, ...data });
        setStep(step + 1);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <SignUpForm onNext={handleNextStep} />;
            case 2:
                return <ProductSelection onNext={handleNextStep} />;
            case 3:
                return <FrameworkSelection onNext={handleNextStep} />;
            case 4:
                return (
                    <RegulatorySetupWizard 
                        onComplete={onCompleteOnboarding}
                        onboardingData={onboardingData} 
                        mockUsers={mockUsers}
                        mockRules={mockRules}
                    />
                );
            default:
                return <div>Onboarding Complete!</div>;
        }
    };

    return (
        // Apply theme-bg-page for the background and theme-text-primary for default text color
        <div className="flex items-center justify-center min-h-screen theme-bg-page p-4"> 
            {/* Apply theme-bg-card for the card background and theme-text-primary for default text color */}
            <div className="theme-bg-card rounded-xl shadow-2xl p-8 w-full max-w-xl theme-text-primary">
                <h1 className="text-3xl font-bold theme-text-highlight-color mb-6 text-center">Get Started</h1>
                {renderStep()}
            </div>
        </div>
    );
};

export default OnboardingWrapper;
