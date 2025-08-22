// src/features/dashboard/components/ComplianceHealthScorecard.jsx

import React, { useState } from 'react'; // Import useState
import { Shield, Book, FileText, Activity, Lightbulb, Link2, UserCheck, Settings, Award, Database } from 'lucide-react';
import KpiCard from './KpiCard.jsx'; // Added .jsx extension
import { kpiData } from '../../../data/mockData.js'; // Added .js extension
import KpiDrilldownModal from '../modals/KpiDrilldownModal.jsx'; // Already has .jsx extension

const ComplianceHealthScorecard = ({ onNavigate }) => {
    const [isKpiDrilldownModalOpen, setIsKpiDrilldownModalOpen] = useState(false);
    const [selectedKpiForDrilldown, setSelectedKpiForDrilldown] = useState(null);

    const handleKpiDrilldown = (kpi) => {
        // Add specific suggested actions and descriptions for each KPI
        let suggestedActions = [];
        let description = "";
        let target = 0;
        let unit = "%";

        switch (kpi.title) {
            case 'Overall Health':
                description = "This score represents the aggregated compliance health of your entire system, reflecting the overall effectiveness of your compliance program.";
                target = 90;
                suggestedActions = [
                    { text: "Review individual KPI/KRI scores for areas needing improvement.", linkToDataManagement: false },
                    { text: "Analyze recent system alerts for critical issues.", linkToDataManagement: false },
                    { text: "Consult the Compliance Frameworks section for policy adherence.", linkToDataManagement: false }
                ];
                break;
            case 'Controls Adherence':
                description = "This score reflects how consistently your organization adheres to its defined compliance controls and internal policies.";
                target = 90;
                suggestedActions = [
                    { text: "Review Control Hotspot Analysis for failing controls.", linkToRulesEngine: true },
                    { text: "Check audit logs for control implementation issues.", linkToDataManagement: true, dataFilters: { type: 'User', source: 'Internal' } },
                    { text: "Update relevant rules in the Rules Engine.", linkToRulesEngine: true }
                ];
                break;
            case 'On-Time Reporting':
                description = "This KPI measures the percentage of regulatory reports submitted by their due dates.";
                target = 100;
                suggestedActions = [
                    { text: "Review past report submissions in Compliance Reporting.", linkToDataManagement: false },
                    { text: "Check upcoming deadlines in the Reporting Calendar.", linkToDataManagement: false },
                    { text: "Ensure data sources for reporting are up-to-date.", linkToDataManagement: true, dataFilters: { type: 'All', source: 'All' } }
                ];
                break;
            default:
                description = "Detailed information for this KPI is not yet available.";
                suggestedActions = [];
                break;
        }

        setSelectedKpiForDrilldown({ ...kpi, description, suggestedActions, target, unit });
        setIsKpiDrilldownModalOpen(true);
    };

    return (
        <div className="theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold theme-text-highlight-color">Compliance Health Scorecard</h2>
                <div className="flex space-x-2">
                    <button onClick={() => onNavigate('DataManagement')} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm">
                        <Database size={16} className="mr-2" /> Data Management
                    </button>
                </div>
            </div>
            <p className="text-sm theme-text-secondary mb-4">A high-level overview of your compliance posture, powered by real-time data and rules engine activity.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {kpiData.map(kpi => (
                    <KpiCard
                        key={kpi.title}
                        title={kpi.title}
                        value={kpi.value}
                        color={kpi.color}
                        icon={kpi.icon}
                        onClick={() => onNavigate('Dashboard')} // Original click behavior
                        onDrilldown={handleKpiDrilldown} // New drilldown behavior
                        kpiData={kpi} // Pass the full KPI object
                    />
                ))}
            </div>

            {/* Render KPI Drilldown Modal */}
            {isKpiDrilldownModalOpen && selectedKpiForDrilldown && (
                <KpiDrilldownModal
                    kpi={selectedKpiForDrilldown}
                    onClose={() => setIsKpiDrilldownModalOpen(false)}
                    onNavigate={onNavigate} // Pass onNavigate for internal links
                />
            )}
        </div>
    );
};

export default ComplianceHealthScorecard;