// src/features/dataManagement/components/DetailedRecordsTable.jsx

import React, { useState, useEffect } from 'react';
import RecordDetailsModal from '../modals/RecordDetailsModal.jsx';
import {
    CheckCircle,
    AlertTriangle,
    Clock,
    Search,
    Filter,
    ArrowUp,
    ArrowDown,
} from 'lucide-react';

/**
 * generateDummyData Function
 *
 * This function creates an array of dummy data records for demonstration purposes.
 * It includes various types (KYC, User, Payment) with different sources, statuses,
 * and detailed information for drill-down.
 * In a real application, this data would be fetched from a backend API or Firestore.
 */
const generateDummyData = () => {
    const data = [];
    const types = ['KYC', 'User', 'Payment'];
    const kycStatuses = ['Approved', 'Pending', 'Rejected'];
    const paymentSources = ['Stripe', 'Visa', 'Mastercard'];
    const userActions = ['Login', 'Logout', 'Profile Update', 'Password Reset'];
    const internalSources = ['Internal', 'Manual']; // Sources for KYC and User data

    for (let i = 0; i < 200; i++) { // Generate more data for better testing
        const type = types[Math.floor(Math.random() * types.length)];
        const date = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)); // Up to 1 year old
        let description = '';
        let value = '';
        let status = '';
        let source = '';
        let details = {};

        if (type === 'KYC') {
            const customerId = `CUST-${Math.floor(1000 + Math.random() * 9000)}`;
            description = `KYC check for ${customerId}`;
            value = 'N/A';
            status = kycStatuses[Math.floor(Math.random() * kycStatuses.length)];
            source = internalSources[Math.floor(Math.random() * internalSources.length)];
            details = {
                customerId: customerId,
                applicantName: `Applicant ${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`,
                documentType: Math.random() > 0.5 ? 'Passport' : 'National ID',
                submissionDate: new Date(date.getTime() - Math.floor(Math.random() * 86400000)).toLocaleDateString(),
                reviewer: `Reviewer ${Math.floor(Math.random() * 10)}`,
                riskScore: (Math.random() * 100).toFixed(2),
            };
        } else if (type === 'User') {
            const userId = `USER-${Math.floor(100 + Math.random() * 900)}`;
            const action = userActions[Math.floor(Math.random() * userActions.length)];
            description = `${action} by ${userId}`;
            value = 'N/A';
            status = 'Completed';
            source = internalSources[Math.floor(Math.random() * internalSources.length)];
            details = {
                userId: userId,
                userEmail: `user${i}@example.com`,
                ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                device: Math.random() > 0.5 ? 'Desktop' : 'Mobile',
                browser: Math.random() > 0.5 ? 'Chrome' : 'Firefox',
            };
        } else { // Payment
            const amount = (Math.random() * 1000 + 10).toFixed(2);
            const currency = Math.random() > 0.5 ? 'USD' : 'EUR';
            source = paymentSources[Math.floor(Math.random() * paymentSources.length)];
            description = `Payment of ${amount} ${currency}`;
            value = amount;
            status = Math.random() > 0.1 ? 'Success' : 'Failed';
            details = {
                transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
                merchantName: `Merchant ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
                paymentMethod: source,
                currency: currency,
                fee: (amount * 0.01).toFixed(2),
                customerEmail: `customer${i}@example.com`,
            };
        }

        data.push({
            id: i,
            date: date,
            type: type,
            source: source,
            description: description,
            value: value,
            status: status,
            details: details,
        });
    }
    return data;
};

/**
 * DetailedRecordsTable Component
 *
 * This component displays a detailed log of various data records (KYC, Users, Payments)
 * with filtering capabilities by data type, source, and time aggregation.
 * It also supports drill-down to individual record details via a modal.
 *
 * Props:
 * - initialFilters: An optional object to set initial filter states when the component mounts.
 * e.g., { type: 'KYC', source: 'Internal', period: 'Month' }
 */
const DetailedRecordsTable = ({ initialFilters = {} }) => {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    // Initialize states with initialFilters directly
    const [currentDataTypeFilter, setCurrentDataTypeFilter] = useState(initialFilters.type || 'All');
    const [currentSourceFilter, setCurrentSourceFilter] = useState(initialFilters.source || 'All');
    const [currentTimeFilter, setCurrentTimeFilter] = useState(initialFilters.period || 'All');
    const [selectedRecord, setSelectedRecord] = useState(null); // State for drill-down modal
    const [searchTerm, setSearchTerm] = useState(''); // State for search functionality
    const [sortBy, setSortBy] = useState('date'); // State for sorting
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

    // Load dummy data on component mount
    useEffect(() => {
        setAllData(generateDummyData());
    }, []);

    // NEW: useEffect to update internal filter states when initialFilters prop changes
    useEffect(() => {
        setCurrentDataTypeFilter(initialFilters.type || 'All');
        setCurrentSourceFilter(initialFilters.source || 'All');
        setCurrentTimeFilter(initialFilters.period || 'All');
        setSearchTerm(initialFilters.searchTerm || ''); // Also update search term if part of filters
        // Trigger filter application after states are updated
        // The dependency array of the applyFiltersAndSort useEffect will handle the re-filter
    }, [initialFilters]); // Rerun this effect when initialFilters prop changes

    // Apply filters whenever filter states or allData changes
    useEffect(() => {
        applyFiltersAndSort();
    }, [allData, currentDataTypeFilter, currentSourceFilter, currentTimeFilter, searchTerm, sortBy, sortOrder]);

    /**
     * Applies all active filters and sorting to the data.
     */
    const applyFiltersAndSort = () => {
        let tempFiltered = [...allData];

        // 1. Filter by Data Type
        if (currentDataTypeFilter !== 'All') {
            tempFiltered = tempFiltered.filter(record => record.type === currentDataTypeFilter);
        }

        // 2. Filter by Source
        if (currentSourceFilter !== 'All') {
            tempFiltered = tempFiltered.filter(record => record.source === currentSourceFilter);
        }

        // 3. Filter by Time Aggregation
        const now = new Date();
        if (currentTimeFilter === 'Year') {
            const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
            tempFiltered = tempFiltered.filter(record => record.date >= oneYearAgo);
        } else if (currentTimeFilter === 'Month') {
            const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
            tempFiltered = tempFiltered.filter(record => record.date >= oneMonthAgo);
        } else if (currentTimeFilter === 'Week') {
            const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
            tempFiltered = tempFiltered.filter(record => record.date >= oneWeekAgo);
        }

        // 4. Apply Search Term
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            tempFiltered = tempFiltered.filter(record =>
                Object.values(record).some(value =>
                    String(value).toLowerCase().includes(lowerCaseSearchTerm)
                ) || Object.values(record.details || {}).some(value =>
                    String(value).toLowerCase().includes(lowerCaseSearchTerm)
                )
            );
        }

        // 5. Apply Sorting
        tempFiltered.sort((a, b) => {
            let valA, valB;
            if (sortBy === 'date') {
                valA = a.date.getTime();
                valB = b.date.getTime();
            } else if (sortBy === 'value') {
                valA = parseFloat(a.value) || 0;
                valB = parseFloat(b.value) || 0;
            } else {
                valA = String(a[sortBy]).toLowerCase();
                valB = String(b[sortBy]).toLowerCase();
            }

            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredData(tempFiltered);
    };

    /**
     * Handles sorting when a table header is clicked.
     * @param {string} column - The column to sort by.
     */
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc'); // Default to ascending when changing column
        }
    };

    /**
     * Renders the sort icon next to the column header.
     * @param {string} column - The column identifier.
     * @returns {JSX.Element|null} The sort icon.
     */
    const renderSortIcon = (column) => {
        if (sortBy === column) {
            return sortOrder === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />;
        }
        return null;
    };

    const filterButtonClass = (isActive) =>
        isActive
            ? 'px-6 py-3 bg-[#c0933e] text-[#1e252d] rounded-full shadow-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#c0933e] transition duration-300'
            : 'px-6 py-3 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition duration-300';

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-100 mb-8 text-center">Detailed Data Records</h1>

                {/* Filters Section */}
                <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-inner border border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-4 md:mb-0">Data Filters</h2>
                        <div className="flex flex-wrap gap-4">
                            {/* Data Type Filters */}
                            <button
                                onClick={() => setCurrentDataTypeFilter('All')}
                                className={filterButtonClass(currentDataTypeFilter === 'All')}
                            >
                                All Data
                            </button>
                            <button
                                onClick={() => setCurrentDataTypeFilter('KYC')}
                                className={filterButtonClass(currentDataTypeFilter === 'KYC')}
                            >
                                KYC Transactions
                            </button>
                            <button
                                onClick={() => setCurrentDataTypeFilter('User')}
                                className={filterButtonClass(currentDataTypeFilter === 'User')}
                            >
                                Internal Users
                            </button>
                            <button
                                onClick={() => setCurrentDataTypeFilter('Payment')}
                                className={filterButtonClass(currentDataTypeFilter === 'Payment')}
                            >
                                Payments
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <h3 className="text-xl font-medium text-gray-300 mb-4 md:mb-0">Source Filters</h3>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setCurrentSourceFilter('All')}
                                className={filterButtonClass(currentSourceFilter === 'All')}
                            >
                                All Sources
                            </button>
                            <button
                                onClick={() => setCurrentSourceFilter('Stripe')}
                                className={filterButtonClass(currentSourceFilter === 'Stripe')}
                            >
                                Stripe
                            </button>
                            <button
                                onClick={() => setCurrentSourceFilter('Visa')}
                                className={filterButtonClass(currentSourceFilter === 'Visa')}
                            >
                                Visa
                            </button>
                            <button
                                onClick={() => setCurrentSourceFilter('Mastercard')}
                                className={filterButtonClass(currentSourceFilter === 'Mastercard')}
                            >
                                Mastercard
                            </button>
                            <button
                                onClick={() => setCurrentSourceFilter('Internal')}
                                className={filterButtonClass(currentSourceFilter === 'Internal')}
                            >
                                Internal
                            </button>
                            <button
                                onClick={() => setCurrentSourceFilter('Manual')}
                                className={filterButtonClass(currentSourceFilter === 'Manual')}
                            >
                                Manual
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <h3 className="text-xl font-medium text-gray-300 mb-4 md:mb-0">Time Aggregation</h3>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setCurrentTimeFilter('All')}
                                className={filterButtonClass(currentTimeFilter === 'All')}
                            >
                                All Time
                            </button>
                            <button
                                onClick={() => setCurrentTimeFilter('Year')}
                                className={filterButtonClass(currentTimeFilter === 'Year')}
                            >
                                Last Year
                            </button>
                            <button
                                onClick={() => setCurrentTimeFilter('Month')}
                                className={filterButtonClass(currentTimeFilter === 'Month')}
                            >
                                Last Month
                            </button>
                            <button
                                onClick={() => setCurrentTimeFilter('Week')}
                                className={filterButtonClass(currentTimeFilter === 'Week')}
                                >
                                Last Week
                            </button>
                        </div>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="search" className="sr-only">Search Records</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                id="search"
                                name="search"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                                placeholder="Search records..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Data Display Section */}
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
                    <h2 className="text-3xl font-bold text-gray-100 mb-6">
                        {currentDataTypeFilter !== 'All' ? currentDataTypeFilter + ' ' : 'All '}Data Records
                        <span className="text-gray-400 text-lg ml-2">({filteredData.length} records)</span>
                    </h2>
                    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-700">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white" onClick={() => handleSort('date')}>
                                        <div className="flex items-center">Date {renderSortIcon('date')}</div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white" onClick={() => handleSort('type')}>
                                        <div className="flex items-center">Type {renderSortIcon('type')}</div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white" onClick={() => handleSort('source')}>
                                        <div className="flex items-center">Source {renderSortIcon('source')}</div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white" onClick={() => handleSort('value')}>
                                        <div className="flex items-center">Value {renderSortIcon('value')}</div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white" onClick={() => handleSort('status')}>
                                        <div className="flex items-center">Status {renderSortIcon('status')}</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No records found for the selected filters.</td>
                                    </tr>
                                ) : (
                                    filteredData.map(record => (
                                        <tr key={record.id} className="hover:bg-gray-700 transition duration-150 ease-in-out cursor-pointer" onClick={() => setSelectedRecord(record)}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{record.date.toLocaleDateString()} {record.date.toLocaleTimeString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{record.type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{record.source}</td>
                                            <td className="px-6 py-4 text-sm text-gray-200 truncate max-w-xs">{record.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{record.value}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    record.status === 'Approved' || record.status === 'Success' ? 'bg-green-900 text-green-300' :
                                                    record.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' :
                                                    'bg-red-900 text-red-300'
                                                }`}>
                                                    {record.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Record Details Modal */}
            {selectedRecord && (
                <RecordDetailsModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
            )}
        </div>
    );
};

export default DetailedRecordsTable;