// src/features/riskAssessment/index.jsx

import React, { useState, useEffect } from 'react';
import {
    Shield,
    CreditCard,
    BarChart,
    Factory,
    Scale,
    Activity,
    ClipboardList,
    AlertTriangle
} from 'lucide-react';
import { calculateAllEntityRisks, getRiskColor, getSeverityColor } from "./riskUtils.js";
// CORRECTED: Ensure all risk-related data is imported from the new riskData.js file
import { mockEntities, mockLicenses, mockAlerts } from "./data/riskData.js";

// Import all the detailed view components for the internal risk view
import CreditRiskTab from "./components/CreditRiskTab.jsx";
import LiquidityRiskTab from "./components/LiquidityRiskTab.jsx";
import MarketRiskTab from "./components/MarketRiskTab.jsx";
import OperationalRiskTab from "./components/OperationalRiskTab.jsx";
import CapitalAdequacyRiskTab from "./components/CapitalAdequacyRiskTab.jsx";
import BusinessModelView from './components/BusinessModelView.jsx';
import SystemAlertsTab from './components/SystemAlertsTab.jsx';
import OverviewTab from './components/OverviewTab.jsx';

// NEW: This is the dedicated component for Innovate Inc's internal risk view
import InternalRiskView from './components/InternalRiskView.jsx';

const riskCategories = [
    { id: 'internal', name: 'Internal Risk', icon: Factory },
    { id: 'thirdParty', name: 'Third-Party Risk', icon: Shield },
    { id: 'systemAlerts', name: 'System Alerts', icon: AlertTriangle },
];

// NEW: Define sub-tabs for the Third-Party Risk view
const thirdPartySubTabs = [
    { id: 'overview', name: 'Overview', icon: ClipboardList },
    { id: 'credit', name: 'Credit', icon: CreditCard },
    { id: 'liquidity', name: 'Liquidity', icon: Scale },
    { id: 'market', name: 'Market', icon: BarChart },
    { id: 'operational', name: 'Operational', icon: Activity },
    { id: 'capitalAdequacy', name: 'Capital Adequacy', icon: Shield },
    { id: 'businessModels', name: 'Business Models', icon: Factory },
];

const RiskAssessment = () => {
    const [activeTab, setActiveTab] = useState('internal'); // Default to internal risk
    const [entities, setEntities] = useState([]);
    const [alerts, setAlerts] = useState(mockAlerts);

    // We no longer need selectedEntity as the internal view is for Innovate Inc. only
    // const [selectedEntity, setSelectedEntity] = useState(null);
    const [thirdPartySubTab, setThirdPartySubTab] = useState('overview');

    useEffect(() => {
        const enrichedEntities = calculateAllEntityRisks(mockEntities, mockLicenses);
        setEntities(enrichedEntities);
    }, []);

    const getRiskColorHex = (score) => {
        if (score >= 90) return '#9333ea';
        if (score >= 75) return '#ef4444';
        if (score >= 60) return '#f97316';
        if (score >= 40) return '#eab308';
        return '#22c55e';
    };

    const getTabComponent = () => {
        const tabProps = {
            entities,
            alerts,
            getRiskColor,
            getRiskColorHex,
            getSeverityColor,
        };

        switch (activeTab) {
            case 'internal':
                return <InternalRiskView {...tabProps} />;
            case 'thirdParty':
                // Pass props specific to the Third-Party view, including sub-tab state
                const thirdPartyProps = { ...tabProps, activeSubTab: thirdPartySubTab, setActiveSubTab: setThirdPartySubTab };
                switch (thirdPartySubTab) {
                    case 'overview':
                        return <OverviewTab {...thirdPartyProps} />;
                    case 'credit':
                        return <CreditRiskTab {...thirdPartyProps} />;
                    case 'liquidity':
                        return <LiquidityRiskTab {...thirdPartyProps} />;
                    case 'market':
                        return <MarketRiskTab {...thirdPartyProps} />;
                    case 'operational':
                        return <OperationalRiskTab {...thirdPartyProps} />;
                    case 'capitalAdequacy':
                        return <CapitalAdequacyRiskTab {...thirdPartyProps} />;
                    case 'businessModels':
                        return <BusinessModelView {...thirdPartyProps} />;
                    default:
                        return <OverviewTab {...thirdPartyProps} />;
                }
            case 'systemAlerts':
                return <SystemAlertsTab {...tabProps} />;
            default:
                return <InternalRiskView {...tabProps} />;
        }
    };

    return (
        <div className="p-6 theme-bg-page min-h-screen theme-text-primary">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold">Risk Assessment</h2>
                    <p className="text-theme-text-secondary">Comprehensive analysis of all supervised entities.</p>
                </div>
            </div>

            <div className="border-b-2 border-theme-border mb-6">
                <nav className="-mb-0.5 flex flex-wrap space-x-4">
                    {riskCategories.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                // Reset sub-tab to overview when switching main tabs
                                setThirdPartySubTab('overview');
                            }}
                            className={`flex items-center space-x-2 py-3 px-4 rounded-t-lg font-bold text-sm transition-colors duration-200
                                ${activeTab === tab.id
                                ? 'bg-theme-bg-card border-theme-border border-b-0 text-theme-accent'
                                : 'text-theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700'}`
                            }
                        >
                            <tab.icon size={18} />
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* NEW: Sub-tab navigation for Third-Party Risk */}
            {activeTab === 'thirdParty' && (
                <div className="border-b-2 border-theme-border mb-6">
                    <nav className="-mb-0.5 flex flex-wrap space-x-4 ml-8">
                        {thirdPartySubTabs.map((subTab) => (
                            <button
                                key={subTab.id}
                                onClick={() => setThirdPartySubTab(subTab.id)}
                                className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-xs transition-colors duration-200
                                    ${thirdPartySubTab === subTab.id
                                    ? 'text-blue-500 border-blue-500'
                                    : 'text-theme-text-secondary border-transparent hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-theme-text-primary'}` // Added hover styles
                                }
                            >
                                <subTab.icon size={16} />
                                <span>{subTab.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            )}
            {/* END NEW SUB-TAB NAV */}

            {getTabComponent()}
        </div>
    );
};

export default RiskAssessment;