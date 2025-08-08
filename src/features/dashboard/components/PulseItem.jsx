// src/features/dashboard/components/PulseItem.jsx

import React from 'react';
import { Newspaper, Lightbulb } from 'lucide-react';

const PulseItem = ({ pulse, onClick }) => {
    if (!pulse) {
        console.warn("PulseItem received an undefined or null 'pulse' prop. Skipping render.");
        return null;
    }

    const icons = {
        UPDATE: <Newspaper size={20} className="theme-text-secondary" />,
        ANALYSIS: <Lightbulb size={20} className="text-yellow-400" />
    };

    return (
        <button
            onClick={() => onClick(pulse)}
            className="w-full text-left border-b theme-border-color pb-3 hover:bg-gray-700 p-2 rounded-md transition-colors"
        >
            <div className="flex items-start">
                <div className="mr-3 mt-1">{icons[pulse.type]}</div>
                <div>
                    <p className="font-semibold theme-text-primary">{pulse.title}</p>
                    <p className="text-xs theme-text-secondary">{pulse.source} - {pulse.date}</p>
                </div>
            </div>
        </button>
    );
};

export default PulseItem;