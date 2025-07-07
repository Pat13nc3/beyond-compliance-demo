import React from 'react';
import { Clock, Edit, ArrowRight } from 'lucide-react';

const ActionItem = ({ action, onActionClick }) => {
    const icons = {
        DEADLINE: <Clock size={20} className="text-red-400" />,
        ACTION: <Edit size={20} className="text-blue-400" />
    };

    const urgencyColors = {
        URGENT: "border-red-500",
        HIGH: "border-yellow-500",
        MEDIUM: "border-blue-500"
    };

    return (
        <div className={`bg-gray-800 p-4 rounded-lg flex items-center justify-between border-l-4 ${urgencyColors[action.urgency]}`}>
            <div className="flex items-center">
                <div className="mr-4">{icons[action.type]}</div>
                <div>
                    <p className="font-bold text-white">{action.title}</p>
                    <p className="text-sm text-gray-400">{action.details}</p>
                </div>
            </div>
            <button
                onClick={() => onActionClick(action)}
                className="bg-[#c0933e] text-[#1e252d] text-sm font-bold py-2 px-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center"
            >
                {action.cta} <ArrowRight size={16} className="ml-2" />
            </button>
        </div>
    );
};

export default ActionItem;