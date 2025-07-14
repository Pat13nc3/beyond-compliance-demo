import React from 'react';
import { Menu, Globe } from 'lucide-react';
import UserModeToggle from '../ui/UserModeToggle.jsx';

// --- UPDATED: The component now receives and uses the jurisdiction state ---
const Header = ({ activeTab, setIsSidebarOpen, userMode, setUserMode, activeJurisdiction, setActiveJurisdiction }) => {
  
  const jurisdictions = ['Global', 'Nigeria', 'Kenya', 'Ghana', 'South Africa'];

  return (
    <header className="flex items-center justify-between p-4 bg-[#1e252d] text-white sticky top-0 z-10 border-b border-gray-700">
      <div className="flex items-center">
        <button onClick={() => setIsSidebarOpen(prevState => !prevState)} className="p-2 text-gray-300 hover:text-white">
          <Menu size={24} />
        </button>
        <h2 className="text-xl md:text-2xl font-semibold ml-4">{activeTab}</h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Globe size={18} className="text-gray-400 mr-2" />
          <select
            className="bg-gray-800 text-white border-none rounded p-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-label="Select Jurisdiction"
            // The value is now controlled by the state from App.jsx
            value={activeJurisdiction}
            // The onChange handler now updates the global state
            onChange={(e) => setActiveJurisdiction(e.target.value)}
          >
            {jurisdictions.map(j => (
              <option key={j} value={j}>{j}</option>
            ))}
          </select>
        </div>
        
        <UserModeToggle userMode={userMode} setUserMode={setUserMode} />
      </div>
    </header>
  );
}

export default Header;