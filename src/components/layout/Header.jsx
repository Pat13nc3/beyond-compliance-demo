import React from 'react';
import { Menu } from 'lucide-react';
import UserModeToggle from '../ui/UserModeToggle.jsx'; // Import the new component

// The header now receives the props for the user mode toggle
const Header = ({ activeTab, isSidebarOpen, setIsSidebarOpen, userMode, setUserMode }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-[#2d251e] text-white sticky top-0 z-10">
      <div className="flex items-center">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-300 hover:text-white">
          <Menu size={24} />
        </button>
        <h2 className="text-xl md:text-2xl font-semibold ml-4">{activeTab}</h2>
      </div>
      {/* Render the toggle switch here */}
      <UserModeToggle userMode={userMode} setUserMode={setUserMode} />
    </header>
  );
}

export default Header;
