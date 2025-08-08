// src/features/aiAgent/components/AIAgentActivityLog.jsx

import React, { useState } from 'react';
import { Activity, Search, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const AIAgentActivityLog = ({ activities }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredActivities = activities.filter(activity =>
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
    const paginatedActivities = filteredActivities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const getStatusIndicator = (status) => {
        switch (status) {
            case 'Completed': return <CheckCircle size={16} className="text-green-500 mr-1" />;
            case 'In Progress': return <Clock size={16} className="text-blue-500 mr-1" />;
            case 'Alert': return <AlertTriangle size={16} className="text-orange-500 mr-1" />;
            default: return null;
        }
    };

    return (
        <div className="theme-bg-card p-6 rounded-lg shadow-md theme-text-primary h-full flex flex-col">
            <h3 className="text-[20px] leading-[28px] font-semibold theme-text-highlight-color mb-4 flex items-center">
                <Activity size={24} className="mr-3 theme-text-secondary" /> Recent AI Activities & Logs
            </h3>

            <div className="mb-4 flex items-center">
                <div className="relative w-full max-w-md">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 theme-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search activities..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2 border theme-border-color rounded-md bg-gray-100 dark:bg-gray-800 theme-text-primary focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="flex-grow overflow-x-auto">
                <table className="min-w-full divide-y theme-border-color">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y theme-border-color theme-bg-card">
                        {paginatedActivities.length > 0 ? (
                            paginatedActivities.map((activity) => (
                                <tr key={activity.id} className="transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium theme-text-primary">
                                        {activity.type}
                                    </td>
                                    <td className="px-6 py-4 whitespace-normal text-sm theme-text-primary">
                                        {activity.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-primary">
                                        {activity.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-primary flex items-center">
                                        {getStatusIndicator(activity.status)}
                                        {activity.status}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-sm theme-text-secondary">
                                    No activities found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-2 px-4 rounded-md text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={16} className="mr-2" /> Previous
                    </button>
                    <span className="text-sm theme-text-secondary">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-2 px-4 rounded-md text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next <ChevronRight size={16} className="ml-2" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AIAgentActivityLog;