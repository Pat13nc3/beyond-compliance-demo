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
            default: return <FileText className="w-6 h-6 theme-text-secondary" />;
        }
    };

    return (
        <div 
            className="flex items-center justify-between theme-bg-card p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={() => onActionClick(action)}
        >
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    {getIcon()}
                </div>
                <div>
                    <h4 className="font-bold theme-text-primary">{title}</h4>
                    <p className="text-sm theme-text-secondary">{description || `Due in ${dueDate}`}</p>
                </div>
            </div>
            {/* The CTA button remains, but the click logic is duplicated for the card */}
            <button
                onClick={(e) => { e.stopPropagation(); onActionClick(action); }}
                className="theme-bg-highlight-color text-black font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
            >
                {cta}
            </button>
        </div>
    );
};

export default ActionItem;