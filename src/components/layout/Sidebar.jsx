import React from 'react';
// UPDATED: Changed the icons to reflect the new module separation
import {
    BarChart as BarChartIcon,
    FileText,
    Database,
    Book,
    Shield,
    Award,
    Newspaper,
    Settings,
    Cpu, // New icon for the Manage module
    X
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
    // UPDATED: The navigation items now reflect the new module structure
    const navItems = [
        { name: 'Dashboard', icon: BarChartIcon },
        { name: 'Compliance Reporting', icon: FileText },
        { name: 'Data Management', icon: Database },
        { name: 'Library', icon: Book },
        { name: 'Risk Assessment', icon: Shield },
        { name: 'Licensing', icon: Award },
        { name: 'Regulatory Updates', icon: Newspaper },
        { name: 'Manage', icon: Cpu }, // The strategic core
        { name: 'Settings', icon: Settings }, // User management, etc.
    ];

    return (
        <div className={`fixed inset-y-0 left-0 z-30 bg-[#1e252d] text-white w-64 shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${!isSidebarOpen && 'md:w-20'}`}>
            <div className={`flex items-center justify-between p-4 border-b border-gray-700 ${!isSidebarOpen && 'md:justify-center'}`}>
                <h2 className={`text-2xl font-bold ${!isSidebarOpen && 'md:hidden'}`}>
                    B<span style={{ color: '#ffffff' }}>e</span>yond Co<span style={{ color: '#C0933E' }}>m</span>pliance
                </h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 md:hidden">
                    <X size={24} />
                </button>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <div key={item.name}>
                        <a href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveTab(item.name);
                                if (window.innerWidth < 768) setIsSidebarOpen(false);
                            }}
                            className={`flex items-center p-3 rounded-lg transition-colors ${activeTab === item.name ? 'bg-[#c0933e] text-gray-900 font-bold' : 'hover:bg-gray-700'} ${!isSidebarOpen && 'md:justify-center'}`}
                        >
                            <item.icon size={20} className="flex-shrink-0" />
                            <span className={`ml-4 flex-1 ${!isSidebarOpen && 'md:hidden'}`}>{item.name}</span>
                        </a>
                    </div>
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;
