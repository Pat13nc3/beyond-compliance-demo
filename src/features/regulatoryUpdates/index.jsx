// src/features/regulatoryUpdates/index.jsx

import React, { useState, useMemo } from 'react';
import { Newspaper, Eye, PlusCircle, FileText, Link, X, Save, UploadCloud, Loader, Lightbulb, Filter } from 'lucide-react';
import ViewUpdateModal from './modals/ViewUpdateModal.jsx';
import CreateRuleModal from '../manage/modals/CreateRuleModal.jsx';

// Import initial mock data for local state management
import { regulatoryPulseData as initialMockUpdates, mockRegulatorySections as initialMockRegulatorySections } from '../../data/mockData.js';

// NEW: A component to display each actionable update card
const UpdateCard = ({ update, handleViewDetails, handleCreateTask }) => (
    <div key={update.id} className="p-6 border theme-border-color rounded-xl theme-bg-card-alt flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg">
        <div className="flex-1 mb-4 md:mb-0">
            <h4 className="font-bold text-lg theme-text-primary">{update.title}</h4>
            <p className="text-sm theme-text-secondary">
                <span className="font-semibold">{update.source}</span> - Published: {update.publishedDate} | Jurisdiction: <span className="font-semibold">{update.jurisdiction}</span>
            </p>
            <p className="text-sm mt-2 theme-text-primary line-clamp-2">{update.summary}</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button onClick={() => handleViewDetails(update)} className="text-blue-600 flex items-center px-3 py-1 rounded-md hover:bg-blue-100">
                <Eye size={16} className="mr-1"/> View Details
            </button>
            <button onClick={() => handleCreateTask(update)} className="bg-green-600 text-white font-semibold px-3 py-1 rounded-md flex items-center hover:bg-green-500">
                <FileText size={16} className="mr-1"/> Create Task
            </button>
        </div>
    </div>
);


const RegulatoryUpdates = ({ context, onClearContext, onNavigate, triggerAIAnalysis }) => {
    const [updates, setUpdates] = useState(initialMockUpdates);
    const [regulatorySections, setRegulatorySections] = useState(initialMockRegulatorySections);
    const [updateToView, setUpdateToView] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
    // NEW: State for filters
    const [filters, setFilters] = useState({
      regulator: 'All',
      type: 'All',
      status: 'All'
    });

    const handleViewDetails = (update) => {
        setUpdateToView(update);
        setIsViewModalOpen(true);
    };

    const handleCreateTaskFromUpdate = (update) => {
        onNavigate('TaskManagement', {
            initialData: {
                title: `Action: Review "${update.title}"`,
                description: update.summary,
                priority: 'High',
                labels: ['Regulatory Update', update.jurisdiction],
                // Other fields would be populated here
            }
        });
    };

    // NEW: Memoized and filtered updates based on filter state
    const filteredUpdates = useMemo(() => {
        let filtered = updates;
        if (filters.regulator !== 'All') {
            filtered = filtered.filter(update => update.source === filters.regulator);
        }
        if (filters.type !== 'All') {
            filtered = filtered.filter(update => update.type === filters.type);
        }
        if (filters.status !== 'All') {
            // For this mock, we can assume 'status' relates to a task status, but
            // for now, we'll keep it simple or remove it if not relevant to mock data
        }
        return filtered;
    }, [updates, filters]);

    // NEW: Extract unique filter options from the data
    const filterOptions = useMemo(() => {
      const allRegulators = ['All', ...new Set(initialMockUpdates.map(u => u.source))];
      const allTypes = ['All', ...new Set(initialMockUpdates.map(u => u.type))];
      // Note: We'll keep status as a placeholder for now
      return { regulators: allRegulators, types: allTypes, statuses: ['All'] };
    }, [initialMockUpdates]);


    return (
        <div className="p-6 theme-bg-page min-h-screen">
            <div className="space-y-6 animate-fade-in">
                <div>
                    <h2 className="text-3xl font-bold theme-text-primary">Regulatory Updates</h2>
                    <p className="theme-text-secondary">Monitor and manage the lifecycle of evolving regulatory information.</p>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold theme-text-primary">Current Regulatory Updates ({filteredUpdates.length})</h3>
                    {/* The "Assign New Regulation Review" button is now removed as requested */}
                </div>
                
                {/* NEW: Filter Bar */}
                <div className="flex flex-wrap gap-x-6 gap-y-4 items-center p-4 theme-bg-card rounded-lg shadow-md">
                    <div className="flex items-center"><Filter size={18} className="theme-text-secondary mr-2"/><h4 className="font-semibold theme-text-primary">Filter by:</h4></div>
                    <select value={filters.regulator} onChange={(e) => setFilters({...filters, regulator: e.target.value})} className="bg-gray-700 theme-text-primary theme-border-color rounded p-2 text-sm">
                        {filterOptions.regulators.map(reg => <option key={reg} value={reg}>{reg === 'All' ? 'Regulator: All' : reg}</option>)}
                    </select>
                    <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})} className="bg-gray-700 theme-text-primary theme-border-color rounded p-2 text-sm">
                        {filterOptions.types.map(type => <option key={type} value={type}>{type === 'All' ? 'Type: All' : type}</option>)}
                    </select>
                </div>

                <div className="space-y-4">
                    {filteredUpdates.length > 0 ? (
                        filteredUpdates.map(update => (
                            <UpdateCard
                                key={update.id}
                                update={update}
                                handleViewDetails={handleViewDetails}
                                handleCreateTask={handleCreateTaskFromUpdate}
                            />
                        ))
                    ) : (
                        <p className="text-center theme-text-secondary py-8">No updates found for the selected filters.</p>
                    )}
                </div>
            </div>

            {isViewModalOpen && (
                <ViewUpdateModal update={updateToView} onClose={() => setIsViewModalOpen(false)} triggerAIAnalysis={triggerAIAnalysis} />
            )}
        </div>
    );
};

export default RegulatoryUpdates;