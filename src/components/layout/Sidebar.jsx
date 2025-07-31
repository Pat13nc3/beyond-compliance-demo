// src/components/layout/Sidebar.jsx

import React from 'react';
// Import all necessary icons
import {
    LayoutDashboard,
    FileText,
    Database,
    Book,
    Shield,
    Award,
    Rss,
    Cpu,
    Settings as SettingsIcon,
    Bot, // AI Agent icon
    Minus // Using Minus for a simple separator, or can be a custom div
} from 'lucide-react';

const NavItem = ({ icon, text, active, onClick, isSidebarOpen, isSeparator = false }) => {
    if (isSeparator) {
        // Render a simple separator line or space
        return (
            <li className="my-4">
                {isSidebarOpen ? (
                    <div className="border-t border-gray-700 mx-4"></div>
                ) : (
                    <div className="border-t border-gray-700 my-2"></div>
                )}
            </li>
        );
    }
    return (
        <li
            onClick={onClick}
            className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors ${
                active ? 'bg-[#c0933e] text-gray-900 font-bold' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
        >
            {icon}
            {isSidebarOpen && <span className="ml-4 transition-opacity duration-300">{text}</span>}
        </li>
    );
};

const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen }) => {
    const navItems = [
        { id: 'Dashboard', icon: <LayoutDashboard size={20} />, text: 'Dashboard' },
        { id: 'ComplianceReporting', icon: <FileText size={20} />, text: 'Compliance Reporting' },
        { id: 'AIAgent', icon: <Bot size={20} />, text: 'AI Agent' }, // Moved AI Agent here
        { id: 'DataManagement', icon: <Database size={20} />, text: 'Data Management' },
        { id: 'Library', icon: <Book size={20} />, text: 'Library' },
        { id: 'RiskAssessment', icon: <Shield size={20} />, text: 'Risk Assessment' },
        { id: 'Licensing', icon: <Award size={20} />, text: 'Licensing' },
        { id: 'RegulatoryUpdates', icon: <Rss size={20} />, text: 'Regulatory Updates' },
        // Visual Separator
        { id: 'separator-1', isSeparator: true },
        { id: 'Manage', icon: <Cpu size={20} />, text: 'Manage' },
        { id: 'Settings', icon: <SettingsIcon size={20} />, text: 'Settings' },
    ];

    return (
        <div
            className={`bg-[#1e252d] flex flex-col transition-all duration-300 ease-in-out ${
                isSidebarOpen ? 'w-64' : 'w-20'
            }`}
        >
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <h1 className={`text-2xl font-bold text-[#c0933e] transition-opacity duration-300 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                    Beyond Compliance
                </h1>
            </div>
            <nav className="flex-1 px-4 py-4">
                <ul>
                    {navItems.map(item => (
                        <NavItem
                            key={item.id}
                            icon={item.icon}
                            text={item.text}
                            active={activeTab === item.id}
                            onClick={() => !item.isSeparator && setActiveTab(item.id)} // Prevent clicking separator
                            isSidebarOpen={isSidebarOpen}
                            isSeparator={item.isSeparator}
                        />
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;