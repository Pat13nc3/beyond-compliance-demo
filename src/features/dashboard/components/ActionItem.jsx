// src/features/dashboard/components/ActionItem.jsx

import React from 'react';
import { Clock, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

const ActionItem = ({ action, onActionClick }) => {
    const { icon, title, description, cta, dueDate } = action;

    const getIcon = () => {
        switch(icon) {
            case 'clock': return <Clock className="w-6 h-6 text-yellow-400" />;
            case 'alert': return <AlertTriangle className="w-6 h-6 text-red-400" />;
            case 'check': return <CheckCircle className="w-6 h-6 text-green-400" />;
            default: return <FileText className="w-6 h-6 text-gray-400" />;
        }
    };

    return (
        <div className="flex items-center justify-between bg-[#2a313a] p-4 rounded-lg hover:bg-[#3a424d] transition-colors">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    {getIcon()}
                </div>
                <div>
                    <h4 className="font-bold text-white">{title}</h4>
                    <p className="text-sm text-gray-400">{description || `Due in ${dueDate}`}</p>
                </div>
            </div>
            <button
                onClick={() => onActionClick(action)}
                className="bg-[#c0933e] text-[#1e252d] font-bold py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors"
            >
                {cta}
            </button>
        </div>
    );
};

export default ActionItem;