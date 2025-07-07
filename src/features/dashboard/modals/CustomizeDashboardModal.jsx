import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

// The modal now receives the current widget visibility state and a function to change it.
const CustomizeDashboardModal = ({ onClose, visibleWidgets, setVisibleWidgets }) => {
    
    const handleToggle = (widgetName) => {
        setVisibleWidgets(prev => ({
            ...prev,
            [widgetName]: !prev[widgetName]
        }));
    };

    const widgets = [
        { id: 'priorityActions', name: 'Priority Actions' },
        { id: 'regulatoryPulse', name: 'Regulatory Pulse' },
        { id: 'healthSnapshot', name: 'Compliance Health Snapshot' },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e] flex items-center">
                        <SlidersHorizontal size={24} className="mr-3"/> Customize Dashboard
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                   <p className="text-gray-300 mb-4">Select the widgets you want to display on your Main Overview dashboard.</p>
                   
                   {widgets.map(widget => (
                       <div key={widget.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                           <label htmlFor={widget.id} className="font-semibold text-white cursor-pointer">{widget.name}</label>
                           <button
                                id={widget.id}
                                onClick={() => handleToggle(widget.id)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${visibleWidgets[widget.id] ? 'bg-[#c0933e]' : 'bg-gray-600'}`}
                            >
                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${visibleWidgets[widget.id] ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                       </div>
                   ))}
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomizeDashboardModal;
