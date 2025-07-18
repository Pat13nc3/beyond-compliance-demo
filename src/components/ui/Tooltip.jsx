import React from 'react';

const Tooltip = ({ text, children }) => (
    <div className="relative group flex items-center">
        {children}
        <div className="absolute bottom-full mb-2 w-max px-3 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            {text}
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
);

export default Tooltip;