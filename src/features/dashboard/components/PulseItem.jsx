import React from 'react';
import { Newspaper, Lightbulb } from 'lucide-react';

const PulseItem = ({ pulse, onClick }) => {
    const icons = {
        UPDATE: <Newspaper size={20} className="text-gray-400" />,
        ANALYSIS: <Lightbulb size={20} className="text-yellow-400" />
    };

    return (
        <button
            onClick={() => onClick(pulse)}
            className="w-full text-left border-b border-gray-700 pb-3 hover:bg-gray-800 p-2 rounded-md transition-colors"
        >
            <div className="flex items-start">
                <div className="mr-3 mt-1">{icons[pulse.type]}</div>
                <div>
                    <p className="font-semibold text-white">{pulse.title}</p>
                    <p className="text-xs text-gray-500">{pulse.source} - {pulse.date}</p>
                </div>
            </div>
        </button>
    );
};

export default PulseItem;