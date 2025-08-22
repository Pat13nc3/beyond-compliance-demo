// src/components/layout/Header.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Menu, Globe, Sun, Moon, Search as SearchIcon, ChevronLeft, UserCircle, Settings, LogOut, Palette, Building } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import UserModeToggle from '../ui/UserModeToggle.jsx';
import { currentUser, mockRegulators, productCategories } from '../../data/mockData.js'; // CORRECTED: Imported mockRegulators instead of jurisdictions

const Header = ({ activeTab, setIsSidebarOpen, isSidebarOpen, userMode, setUserMode, activeJurisdiction, setActiveJurisdiction, activeProduct, setActiveProduct, theme, toggleTheme, isMockMode }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userButtonRef = useRef(null);

  const [companyName, setCompanyName] = useState(currentUser.companyName || 'InterSystems');
  const [companyLogo, setCompanyLogo] = useState('https://placehold.co/32x32/E2E8F0/E2E8F0?text=');

  // NEW: Create a list of jurisdictions from the keys of the mockRegulators object
  const allJurisdictions = Object.keys(mockRegulators);
  const jurisdictions = allJurisdictions.includes('Global') ? allJurisdictions : ['Global', ...allJurisdictions];

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

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignOut = async () => {
    if (isMockMode) {
        console.log("Simulating sign out in mock mode.");
        window.location.reload();
        return;
    }

    try {
        const authInstance = getAuth();
        await signOut(authInstance);
    } catch (error) {
        console.error("Sign out failed", error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 theme-bg-card theme-text-primary sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="company-logo-upload" className="cursor-pointer">
            <img src={companyLogo} alt="Company Logo" className="h-8 w-8 rounded-full object-cover" />
            <input id="company-logo-upload" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="bg-transparent border-none text-lg font-semibold theme-text-primary focus:outline-none w-48"
            aria-label="Company Name"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
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
              <option key={j} value={j} className={activeJurisdiction === j ? 'font-bold' : ''}>
                {j}
              </option>
            ))}
          </select>
        </div>

        {/* NEW PRODUCT DROPDOWN */}
        <div className="flex items-center">
            <Building size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
            <select
                className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border-none rounded p-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                aria-label="Select Product"
                value={activeProduct}
                onChange={(e) => setActiveProduct(e.target.value)}
            >
                {productCategories.map(p => (
                    <option key={p} value={p} className={activeProduct === p ? 'font-bold' : ''}>
                        {p}
                    </option>
                ))}
            </select>
        </div>

        <div className="relative">
          <button
            ref={userButtonRef}
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="User menu"
          >
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
                  <Palette size={18} className="mr-3 text-gray-500" /> Theme: {theme === 'dark' ? 'Dark' : 'Light'}
                </button>
              </div>
              <div className="border-t theme-border-color">
                <button
                  onClick={handleSignOut}
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