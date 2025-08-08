// src/components/layout/Header.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Menu, Globe, Sun, Moon, Search as SearchIcon, ChevronLeft, UserCircle, Settings, LogOut, Palette } from 'lucide-react'; // Import new icons
import UserModeToggle from '../ui/UserModeToggle.jsx';
import { currentUser } from '../../data/mockData'; // Import currentUser mock data

const Header = ({ activeTab, setIsSidebarOpen, isSidebarOpen, activeJurisdiction, setActiveJurisdiction, theme, toggleTheme }) => {
  const jurisdictions = ['Global', 'Nigeria', 'Kenya', 'Ghana', 'South Africa'];
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userButtonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between p-4 theme-bg-card theme-text-primary sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        <button onClick={() => setIsSidebarOpen(prevState => !prevState)} className="p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          {isSidebarOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            {theme === 'dark-mode' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="flex items-center">
          <Globe size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
          <select
            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border-none rounded p-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-label="Select Jurisdiction"
            value={activeJurisdiction}
            onChange={(e) => setActiveJurisdiction(e.target.value)}
          >
            {jurisdictions.map(j => (
              <option key={j} value={j}>{j}</option>
            ))}
          </select>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            ref={userButtonRef}
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="User menu"
          >
            {/* Display user avatar or a generic icon */}
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-8 w-8 rounded-full" />
            ) : (
              <UserCircle size={32} className="text-gray-500 dark:text-gray-300" />
            )}
          </button>

          {isUserDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 theme-bg-card ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <div className="px-4 py-2 text-sm theme-text-primary border-b theme-border-color">
                <p className="font-bold">{currentUser.name}</p>
                <p className="text-xs theme-text-secondary">{currentUser.email}</p>
                <p className="text-xs theme-text-secondary">{currentUser.role}</p>
              </div>
              <div className="py-1">
                <a href="#" className="flex items-center px-4 py-2 text-sm theme-text-primary hover:theme-bg-card-alt" role="menuitem">
                  <UserCircle size={18} className="mr-3 text-gray-500" /> Profile
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm theme-text-primary hover:theme-bg-card-alt" role="menuitem">
                  <Settings size={18} className="mr-3 text-gray-500" /> Account Settings
                </a>
                <button
                  onClick={() => { toggleTheme(); setIsUserDropdownOpen(false); }}
                  className="flex items-center w-full text-left px-4 py-2 text-sm theme-text-primary hover:theme-bg-card-alt"
                  role="menuitem"
                >
                  <Palette size={18} className="mr-3 text-gray-500" /> Theme: {theme === 'dark-mode' ? 'Dark' : 'Light'}
                </button>
              </div>
              <div className="border-t theme-border-color">
                <button
                  onClick={() => { /* Handle sign out logic */ setIsUserDropdownOpen(false); alert('Signed out!'); }}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:theme-bg-card-alt"
                  role="menuitem"
                >
                  <LogOut size={18} className="mr-3 text-red-500" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
