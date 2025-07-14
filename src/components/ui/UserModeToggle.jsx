import React from 'react';
import { Star, Shield } from 'lucide-react';

const UserModeToggle = ({ userMode, setUserMode }) => {
    const isPro = userMode === 'Pro';

    const handleToggle = () => {
        setUserMode(isPro ? 'Lite' : 'Pro');
    };

    return (
        <div className="flex items-center space-x-2">
            <span className={`text-sm font-bold ${!isPro ? 'text-white' : 'text-gray-500'}`}>Lite</span>
            <button
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#c0933e] focus:ring-offset-2 focus:ring-offset-gray-800 ${isPro ? 'bg-[#c0933e]' : 'bg-gray-600'}`}
            >
                <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isPro ? 'translate-x-5' : 'translate-x-0'}`}
                />
            </button>
            <span className={`text-sm font-bold ${isPro ? 'text-[#c0933e]' : 'text-gray-500'}`}>Pro</span>
        </div>
    );
};

export default UserModeToggle;