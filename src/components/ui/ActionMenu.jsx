import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';

const ActionMenu = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-full hover:bg-gray-200">
                <MoreHorizontal size={20} className="text-gray-500" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <ul className="py-1">
                        {items.map((item, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => {
                                        item.action();
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left flex items-center px-4 py-2 text-sm ${
                                        item.color || 'text-gray-700'
                                    } hover:bg-gray-100`}
                                >
                                    {/* --- THIS IS THE FIX --- */}
                                    {/* We now correctly render the icon as a component */}
                                    {item.icon && <item.icon className="mr-3 h-4 w-4" />}
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ActionMenu;