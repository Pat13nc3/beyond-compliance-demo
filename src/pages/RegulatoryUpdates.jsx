import React, { useState, useEffect } from 'react';
import { Newspaper, Filter, Eye, Sparkles } from 'lucide-react';

const initialUpdates = [
    { id: 1, title: 'New Guidelines for Payment Service Providers', source: 'Central Bank of Nigeria (CBN)', date: '2025-06-20', status: 'Needs Review', summary: 'Updated transaction monitoring and reporting standards for all licensed PSPs...' },
    { id: 2, title: 'ODPC Framework Update', source: 'ODPC', date: '2025-06-18', status: 'Analyzed', summary: 'Introduces new requirements for data residency and user consent for DASP licenses...' },
    { id: 3, title: 'MiCA Implementation Guidance', source: 'European Securities and Markets Authority (ESMA)', date: '2025-06-15', status: 'Needs Review', summary: 'Guidance on the implementation of the Markets in Crypto-Assets (MiCA) regulation...' },
    { id: 4, title: 'FATF Travel Rule Clarification', source: 'Financial Action Task Force (FATF)', date: '2025-06-12', status: 'Archived', summary: 'Further clarification on the application of the Travel Rule to virtual asset service providers...' },
];

const statusStyles = {
    'Needs Review': { color: 'bg-yellow-500', text: 'text-yellow-900' },
    'Analyzed': { color: 'bg-green-500', text: 'text-white' },
    'Archived': { color: 'bg-gray-500', text: 'text-white' }
};

// UPDATED: Now accepts context props to handle navigation
const RegulatoryUpdates = ({ context, onClearContext }) => {
    const [updates, setUpdates] = useState(initialUpdates);
    const [highlightedId, setHighlightedId] = useState(null);

    // This effect runs when the page loads after being navigated to
    useEffect(() => {
        if (context?.selectedUpdateId) {
            setHighlightedId(context.selectedUpdateId);
            // Clear the highlight after a few seconds
            const timer = setTimeout(() => {
                setHighlightedId(null);
                onClearContext(); // Clear the context so it doesn't trigger again
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [context, onClearContext]);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Regulatory Updates</h2>
                <p className="text-gray-500">Monitor and manage the lifecycle of evolving regulatory information.</p>
            </div>

            <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
                     <div className="flex items-center space-x-4">
                        <Filter size={18} className="text-gray-400"/>
                        <select className="bg-gray-800 border-gray-600 rounded p-1 text-sm"><option>All Jurisdictions</option><option>Nigeria</option><option>Kenya</option><option>EU</option></select>
                        <select className="bg-gray-800 border-gray-600 rounded p-1 text-sm"><option>All Statuses</option><option>Needs Review</option><option>Analyzed</option></select>
                    </div>
                </div>

                <div className="space-y-4">
                    {updates.map(update => (
                        // This div will have a highlight style applied conditionally
                        <div 
                            key={update.id} 
                            className={`bg-gray-800 p-4 rounded-lg transition-all duration-500 ${highlightedId === update.id ? 'ring-2 ring-[#c0933e] shadow-lg' : ''}`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusStyles[update.status]?.color} ${statusStyles[update.status]?.text}`}>
                                        {update.status}
                                    </span>
                                    <h3 className="font-bold text-lg mt-2">{update.title}</h3>
                                    <p className="text-xs text-gray-400">{update.source} • Published: {update.date}</p>
                                </div>
                                <div className="flex items-center space-x-2 mt-1">
                                    <button className="bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-blue-500 flex items-center">
                                        <Eye size={14} className="mr-1.5"/> View Details
                                    </button>
                                     <button className="bg-purple-600 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-purple-500 flex items-center">
                                        <Sparkles size={14} className="mr-1.5"/> Analyze
                                    </button>
                                </div>
                            </div>
                             <p className="text-sm text-gray-300 mt-3 pt-3 border-t border-gray-700">{update.summary}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RegulatoryUpdates;
