// src/features/aiAgent/components/AIAgentInsights.jsx

import React, { useState } from 'react';
import { Lightbulb, Search, ChevronLeft, ChevronRight, BarChart2, AlertTriangle, Bot, Eye } from 'lucide-react';

const AIAgentInsights = ({ insights, onViewInsight }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const uniqueInsightTypes = ['All', ...new Set(insights.map(insight => insight.type))];

    const filteredInsights = insights.filter(insight =>
        (filterType === 'All' || insight.type === filterType) &&
        (insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         insight.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredInsights.length / itemsPerPage);
    const paginatedInsights = filteredInsights.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Recommendation': return <Lightbulb size={16} className="mr-1 text-yellow-300" />;
            case 'Risk Analysis': return <BarChart2 size={16} className="mr-1 text-red-300" />;
            case 'Alert': return <AlertTriangle size={16} className="mr-1 text-orange-300" />;
            case 'Digital Asset Alert': return <Bot size={16} className="mr-1 text-blue-300" />;
            default: return null;
        }
    };

    return (
        <div className="theme-bg-card p-6 rounded-lg shadow-md theme-text-primary h-full flex flex-col">
            <h3 className="text-[20px] leading-[28px] font-semibold theme-text-highlight-color mb-4 flex items-center">
                <Lightbulb size={24} className="mr-3 theme-text-secondary" /> AI Generated Insights
            </h3>

            <div className="mb-4 flex flex-wrap items-center gap-4">
                <div className="relative w-full max-w-sm flex-grow">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 theme-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search insights..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2 border theme-border-color rounded-md bg-gray-100 dark:bg-gray-800 theme-text-primary focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex-shrink-0">
                    <select
                        value={filterType}
                        onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
                        className="p-2 border theme-border-color rounded-md bg-gray-100 dark:bg-gray-800 theme-text-primary focus:ring-blue-500 focus:border-blue-500"
                    >
                        {uniqueInsightTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
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
                                Title
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
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y theme-border-color theme-bg-card">
                        {paginatedInsights.length > 0 ? (
                            paginatedInsights.map((insight, index) => (
                                <tr key={insight.id} className="transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium theme-text-primary flex items-center">
                                        {getTypeIcon(insight.type)}
                                        {insight.type}
                                    </td>
                                    <td className="px-6 py-4 whitespace-normal font-semibold text-sm theme-text-primary">
                                        {insight.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-normal text-sm theme-text-secondary max-w-xs overflow-hidden text-ellipsis">
                                        {insight.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-secondary">
                                        {insight.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            insight.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                                            insight.status === 'Acknowledged' ? 'bg-blue-100 text-blue-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {insight.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => onViewInsight(insight)}
                                            className="text-blue-500 hover:text-blue-700"
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-sm theme-text-secondary">
                                    No insights found.
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

export default AIAgentInsights;