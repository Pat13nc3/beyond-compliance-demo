import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // The toast will disappear after 3 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-10 right-10 bg-gray-800 text-white py-3 px-5 rounded-lg shadow-2xl flex items-center animate-fade-in-up z-50">
            <CheckCircle size={20} className="text-green-400 mr-3" />
            <span className="font-semibold">{message}</span>
        </div>
    );
};

export default Toast;