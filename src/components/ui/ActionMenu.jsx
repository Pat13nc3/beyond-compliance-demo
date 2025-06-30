import React, { useEffect, useRef } from 'react';

const ActionMenu = ({ items, onClose }) => {
    const menuRef = useRef(null);

    // This effect handles closing the menu when the user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div 
            ref={menuRef}
            className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-20"
        >
            <ul className="py-1">
                {items.map((item, index) => (
                    <li key={index}>
                        <button
                            onClick={() => {
                                item.onClick();
                                onClose();
                            }}
                            className={`w-full text-left flex items-center px-4 py-2 text-sm ${item.isDestructive ? 'text-red-400 hover:bg-red-500 hover:text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                        >
                            {item.icon && <span className="mr-3">{item.icon}</span>}
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActionMenu;