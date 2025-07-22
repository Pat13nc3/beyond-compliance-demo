import React from 'react';

const Tooltip = ({ children, customClass = "" }) => (
    <div className="relative group flex items-center">
        {children[0]}
        {/* UPDATED: Removed max-w-xl. It will now expand based on content and w-max. */}
        <div className={`absolute top-full mt-2 p-3 text-sm text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 w-max break-words ${customClass}`}>
            {children[1]}
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
);

export default Tooltip;