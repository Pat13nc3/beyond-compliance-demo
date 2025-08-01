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
    Lightbulb // Import Lightbulb icon for AI Assist button
} from 'lucide-react';

/**
 * generateDummyData Function
 *
 * This function creates an array of dummy data records for demonstration purposes.
 * It includes various types (KYC, User, Payment, AML Alert, Sanctions Check) with different sources, statuses,
 * and detailed information for drill-down.
 * In a real application, this data would be fetched from a backend API or Firestore.
 */
const generateDummyData = () => {
    const data = [];
    const types = ['KYC', 'User', 'Payment', 'AML Alert', 'Sanctions Check'];
    const kycStatuses = ['Approved', 'Pending', 'Rejected'];
    const paymentSources = ['Stripe', 'Visa', 'Mastercard'];
    const userActions = ['Login', 'Logout', 'Profile Update', 'Password Reset'];
    const internalSources = ['Internal', 'Manual'];
    const kycVerificationSources = ['SmileID', 'Onfido', 'Internal'];
    const amlSources = ['TransactionMonitor', 'WatchlistScreen'];

    for (let i = 0; i < 300; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const date = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000));
        let description = '';
        let value = '';
        let status = '';
        let source = '';
        let details = {};

        if (type === 'KYC') {
            const customerId = `CUST-${Math.floor(1000 + Math.random() * 9000)}`;
            status = kycStatuses[Math.floor(Math.random() * kycStatuses.length)];
            source = kycVerificationSources[Math.floor(Math.random() * kycVerificationSources.length)];
            description = `KYC check for ${customerId}`;
            value = 'N/A';
            details = {
                customerId: customerId,
                applicantName: `Applicant ${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`,
                documentType: Math.random() > 0.5 ? 'Passport' : 'National ID',
                submissionDate: new Date(date.getTime() - Math.floor(Math.random() * 86400000)).toLocaleDateString(),
                reviewer: `Reviewer ${Math.floor(Math.random() * 10)}`,
                riskScore: (Math.random() * 100).toFixed(2),
                verificationProvider: source,
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
        } else if (type === 'Payment') {
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
        } else if (type === 'AML Alert') {
            const alertTypes = ['High-Value Transfer', 'Unusual Activity Pattern', 'Sanctioned Entity Interaction Attempt'];
            const alertReason = alertTypes[Math.floor(Math.random() * alertTypes.length)];
            description = `AML Alert: ${alertReason}`;
            value = (Math.random() * 50000 + 10000).toFixed(2);
            status = Math.random() > 0.3 ? 'Flagged' : 'Under Review';
            source = 'TransactionMonitor';
            details = {
                alertId: `AML-${Math.floor(1000 + Math.random() * 9000)}`,
                alertReason: alertReason,
                transactionAmount: value,
                involvedParties: `Party A, Party B`,
                statusHistory: [{ date: new Date().toLocaleDateString(), event: status }],
                assignedTo: Math.random() > 0.5 ? 'AML Team' : 'Compliance Officer',
            };
        } else if (type === 'Sanctions Check') {
            const matchStatuses = ['No Match', 'Potential Match', 'Confirmed Hit'];
            status = matchStatuses[Math.floor(Math.random() * Math.random() * matchStatuses.length)];
            description = `Sanctions Screening Result`;
            value = 'N/A';
            source = 'WatchlistScreen';
            details = {
                screeningId: `SNC-${Math.floor(1000 + Math.random() * 9000)}`,
                entityName: `Entity ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
                matchConfidence: (Math.random() * 100).toFixed(0) + '%',
                watchlistType: Math.random() > 0.5 ? 'OFAC' : 'UNSC',
                resolution: status,
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
 * Props:
 * - initialFilters: An optional object to set initial filter states when the component mounts.
 * - triggerAIAnalysis: Function passed from App.jsx to trigger AI analysis
 */
const DetailedRecordsTable = ({ initialFilters = {}, triggerAIAnalysis }) => {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentDataTypeFilter, setCurrentDataTypeFilter] = useState(initialFilters.type || 'All');
    const [currentSourceFilter, setCurrentSourceFilter] = useState(initialFilters.source || 'All');
    const [currentTimeFilter, setCurrentTimeFilter] = useState(initialFilters.period || 'All');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    // Define filter options for dropdowns
    const dataTypeOptions = ['All', 'KYC', 'User', 'Payment', 'AML Alert', 'Sanctions Check'];
    const sourceOptions = ['All', 'Stripe', 'Visa', 'Mastercard', 'Internal', 'Manual', 'SmileID', 'Onfido', 'TransactionMonitor', 'WatchlistScreen'];


    useEffect(() => {
        setAllData(generateDummyData());
    }, []);

    useEffect(() => {
        setCurrentDataTypeFilter(initialFilters.type || 'All');
        setCurrentSourceFilter(initialFilters.source || 'All');
        setCurrentTimeFilter(initialFilters.period || 'All');
        setSearchTerm(initialFilters.searchTerm || '');
    }, [initialFilters]);

    useEffect(() => {
        applyFiltersAndSort();
    }, [allData, currentDataTypeFilter, currentSourceFilter, currentTimeFilter, searchTerm, sortBy, sortOrder]);

    const applyFiltersAndSort = () => {
        let tempFiltered = [...allData];

        if (currentDataTypeFilter !== 'All') {
            tempFiltered = tempFiltered.filter(record => record.type === currentDataTypeFilter);
        }

        if (currentSourceFilter !== 'All') {
            tempFiltered = tempFiltered.filter(record => record.source === currentSourceFilter);
        }

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

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const renderSortIcon = (column) => {
        if (sortBy === column) {
            return sortOrder === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />;
        }
        return null;
    };

    const handleAnalyzeWithAI = () => {
        if (triggerAIAnalysis) {
            triggerAIAnalysis({
                dataType: currentDataTypeFilter,
                source: currentSourceFilter,
                timePeriod: currentTimeFilter,
                searchTerm: searchTerm,
                recordCount: filteredData.length,
                sampleData: filteredData.slice(0, Math.min(filteredData.length, 5)).map(rec => ({
                    id: rec.id,
                    type: rec.type,
                    description: rec.description,
                    status: rec.status,
                    value: rec.value
                }))
            }, 'DataAnalysis');
        } else {
            console.error("triggerAIAnalysis prop is undefined in DetailedRecordsTable.");
        }
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-100 mb-8 text-center">Detailed Data Records</h1>

                {/* Filters Section */}
                <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-inner border border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-4 md:mb-0">Data Filters</h2>
                        {/* CHANGED: Data Type Filter to Dropdown */}
                        <div className="relative flex items-center"> {/* Added flex and items-center for icon alignment */}
                            <select
                                value={currentDataTypeFilter}
                                onChange={(e) => setCurrentDataTypeFilter(e.target.value)}
                                className="appearance-none bg-gray-700 text-white border border-gray-600 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            >
                                {dataTypeOptions.map(option => (
                                    <option key={option} value={option}>{option === 'All' ? 'All Data Types' : option}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.096 6.924 4.682 8.338z"/></svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <h3 className="text-xl font-medium text-gray-300 mb-4 md:mb-0">Source Filters</h3>
                        {/* CHANGED: Source Filter to Dropdown */}
                        <div className="relative flex items-center"> {/* Added flex and items-center for icon alignment */}
                            <select
                                value={currentSourceFilter}
                                onChange={(e) => setCurrentSourceFilter(e.target.value)}
                                className="appearance-none bg-gray-700 text-white border border-gray-600 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            >
                                {sourceOptions.map(option => (
                                    <option key={option} value={option}>{option === 'All' ? 'All Sources' : option}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.096 6.924 4.682 8.338z"/></svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <h3 className="text-xl font-medium text-gray-300 mb-4 md:mb-0">Time Aggregation</h3>
                        {/* KEPT: Time Aggregation as buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button onClick={() => setCurrentTimeFilter('All')} className={`px-6 py-3 rounded-full shadow-md transition duration-300 ${currentTimeFilter === 'All' ? 'bg-[#c0933e] text-[#1e252d] font-semibold focus:outline-none focus:ring-2 focus:ring-[#c0933e]' : 'bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75'}`}>All Time</button>
                            <button onClick={() => setCurrentTimeFilter('Year')} className={`px-6 py-3 rounded-full shadow-md transition duration-300 ${currentTimeFilter === 'Year' ? 'bg-[#c0933e] text-[#1e252d] font-semibold focus:outline-none focus:ring-2 focus:ring-[#c0933e]' : 'bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75'}`}>Last Year</button>
                            <button onClick={() => setCurrentTimeFilter('Month')} className={`px-6 py-3 rounded-full shadow-md transition duration-300 ${currentTimeFilter === 'Month' ? 'bg-[#c0933e] text-[#1e252d] font-semibold focus:outline-none focus:ring-2 focus:ring-[#c0933e]' : 'bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75'}`}>Last Month</button>
                            <button onClick={() => setCurrentTimeFilter('Week')} className={`px-6 py-3 rounded-full shadow-md transition duration-300 ${currentTimeFilter === 'Week' ? 'bg-[#c0933e] text-[#1e252d] font-semibold focus:outline-none focus:ring-2 focus:ring-[#c0933e]' : 'bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75'}`}>Last Week</button>
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
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-100">
                            {currentDataTypeFilter !== 'All' ? currentDataTypeFilter + ' ' : 'All '}Data Records
                            <span className="text-gray-400 text-lg ml-2">({filteredData.length} records)</span>
                        </h2>
                        {/* Analyze with AI Button */}
                        <button
                            onClick={handleAnalyzeWithAI}
                            disabled={filteredData.length === 0} // Disable if no data to analyze
                            // Removed temporary diagnostic style, assuming it will render correctly now
                            className="bg-purple-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-purple-500 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Lightbulb size={16} className="mr-2"/> Analyze with AI
                        </button>
                    </div>
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
                                                    record.status === 'Approved' || record.status === 'Success' || record.status === 'No Match' ? 'bg-green-900 text-green-300' :
                                                    record.status === 'Pending' || record.status === 'Under Review' || record.status === 'Potential Match' ? 'bg-yellow-900 text-yellow-300' :
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