// src/components/ui/ActionMenu.jsx

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MoreHorizontal } from 'lucide-react';

const ActionMenu = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const dropdownRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState('bottom');

    const calculateDropdownPosition = useCallback(() => {
        if (dropdownRef.current && menuRef.current) {
            const buttonRect = menuRef.current.getBoundingClientRect();
            const dropdownHeight = dropdownRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;

            if (buttonRect.bottom + dropdownHeight + 20 > viewportHeight &&
                buttonRect.top > dropdownHeight + 20) {
                setDropdownPosition('top');
            } else {
                setDropdownPosition('bottom');
            }
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        if (isOpen) {
            const timeoutId = setTimeout(() => {
                calculateDropdownPosition();
            }, 0);
            window.addEventListener('resize', calculateDropdownPosition);
            return () => {
                clearTimeout(timeoutId);
                window.removeEventListener('resize', calculateDropdownPosition);
            };
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, calculateDropdownPosition]);

    const handleButtonClick = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <div>
                <button
                    type="button"
                    className="flex items-center text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    onClick={handleButtonClick}
                >
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {isOpen && (
                <div
                    ref={dropdownRef}
                    // Removed comments from within the template literal string
                    className={`absolute w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-700 focus:outline-none z-50 ${
                        dropdownPosition === 'bottom' ? 'origin-top-right right-0 mt-2' : 'origin-bottom-right right-0 mb-2 bottom-full'
                    }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        {items.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    item.action();
                                    setIsOpen(false);
                                }}
                                className={`block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left flex items-center ${item.color || ''}`}
                                role="menuitem"
                                tabIndex="-1"
                                id={`menu-item-${index}`}
                            >
                                {item.icon && <item.icon size={16} className="mr-3" />}
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActionMenu;