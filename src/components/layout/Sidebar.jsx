// src/components/layout/Sidebar.jsx

import React from 'react';
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
    GanttChart, 
    ChevronLeft, 
    ChevronRight, 
} from 'lucide-react';

const NavItem = ({ icon, text, active, onClick, isSidebarOpen, isSeparator = false }) => {
    if (isSeparator) {
        return (
            <li className="my-4">
                {isSidebarOpen ? (
                    <div className="border-t theme-border-color mx-4"></div>
                ) : (
                    <div className="border-t theme-border-color my-2"></div>
                )}
            </li>
        );
    }
    return (
        <li
            onClick={onClick}
            className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors
                ${active
                    ? 'bg-blue-600 dark:bg-[#c0933e] text-white dark:text-black font-bold'
                    : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
            }
        >
            {icon}
            {isSidebarOpen && <span className="ml-4 transition-opacity duration-300">{text}</span>}
        </li>
    );
};

const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => { 
    const navItems = [
        { id: 'Dashboard', icon: <LayoutDashboard size={20} />, text: 'Dashboard' },
        { id: 'ComplianceReporting', icon: <FileText size={20} />, text: 'Compliance Reporting' },
        { id: 'ComplianceFrameworks', icon: <Shield size={20} />, text: 'Compliance Frameworks' },
        { id: 'TaskManagement', icon: <GanttChart size={20} />, text: 'Task Management' },
        { id: 'DataManagement', icon: <Database size={20} />, text: 'Data Management' },
        { id: 'Library', icon: <Book size={20} />, text: 'Library' },
        { id: 'RiskAssessment', icon: <Shield size={20} />, text: 'Risk Assessment' },
        { id: 'Licensing', icon: <Award size={20} />, text: 'Licensing' },
        { id: 'RegulatoryUpdates', icon: <Rss size={20} />, text: 'Regulatory Updates' },
        { id: 'Manage', icon: <Cpu size={20} />, text: 'Manage' },
        { id: 'Settings', icon: <SettingsIcon size={20} />, text: 'Settings' },
    ];

    return (
        <div
            className={`theme-bg-page flex flex-col transition-all duration-300 ease-in-out ${
                isSidebarOpen ? 'w-[280px]' : 'w-20'
            }`}
        >
            <div className="flex items-center justify-start py-4 pl-4"> 
                <h1
                    className={`text-base font-bold uppercase theme-text-secondary whitespace-nowrap`}
                    style={{ fontFamily: 'var(--sidebar-header-font-family)' }}
                >
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
                            onClick={() => !item.isSeparator && setActiveTab(item.id)}
                            isSidebarOpen={isSidebarOpen}
                            isSeparator={item.isSeparator}
                        />
                    ))}
                </ul>
            </nav>
            <div className="flex-shrink-0 p-4 border-t theme-border-color flex justify-between items-center"> 
                {isSidebarOpen ? (
                    <div className="flex-1"> 
                        <p className="text-sm theme-text-secondary">Powered by</p>
                        <p className="text-2xl font-bold theme-text-primary">EM<span className="theme-text-highlight-color">TECH</span></p>
                    </div>
                ) : (
                    <p className="text-2xl font-bold theme-text-primary">E<span className="theme-text-highlight-color">M</span></p>
                )}
                <button
                    onClick={() => setIsSidebarOpen(prevState => !prevState)}
                    className="w-10 h-10 flex items-center justify-center border theme-border-color theme-bg-card text-gray-800 dark:text-gray-400 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" 
                    aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;