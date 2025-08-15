// src/features/riskAssessment/components/OperationalRiskTab.jsx

import React from 'react';
import { TrendingUp, TrendingDown, ChevronRight, Activity, Zap, ArrowLeft, FileText, Download, Info } from 'lucide-react';
import RiskDrilldownModal from '../modals/RiskDrilldownModal.jsx';
import RiskBarChart from './RiskBarChart.jsx';
import { mockIndicators } from '../data/mockIndicators.js';
import KpiCard from './KpiCard.jsx';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { mockAlerts } from '../data/riskData.js'; // This is the new import path


const OperationalRiskTab = ({ entities, riskCategories, getRiskColor, getRiskColorHex, getSeverityColor, selectedEntity, setSelectedEntity }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedPillar, setSelectedPillar] = React.useState(null);

    const handleOpenModal = (pillar) => {
        setSelectedPillar(pillar);
        setIsModalOpen(true);
    };

    // Placeholder data for the detailed view
    const detailedOperationalData = {
        uptime: 99.93,
        highSeverityFindings: 2,
        failureRate: 0.25,
        reportedFraudData: [
            { name: 'Q3 2024', external: 5, internal: 2 },
            { name: 'Q4 2024', external: 6, internal: 4 },
            { name: 'Q1 2025', external: 3, internal: 1 },
            { name: 'Q2 2025', external: 2, internal: 1 }
        ],
        failureRateTrendData: [
            { name: 'Jan', rate: 0.35 },
            { name: 'Feb', rate: 0.45 },
            { name: 'Mar', rate: 0.40 },
            { name: 'Apr', rate: 0.28 },
            { name: 'May', rate: 0.31 },
            { name: 'Jun', rate: 0.25 }
        ]
    };
    
    if (selectedEntity) {
        return (
            <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                    <button onClick={() => setSelectedEntity(null)} className="flex items-center text-blue-500 hover:text-blue-300">
                        <ArrowLeft size={20} className="mr-2" /> Back to all entities
                    </button>
                    <button className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600">
                        <Download size={20} className="mr-2" /> Export PDF
                    </button>
                </div>
                <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                    <div className="flex justify-between items-center mb-4">
                         <div className="flex items-center">
                            <h3 className="text-2xl font-bold theme-text-primary">{selectedEntity.companyName}</h3>
                            <span className="ml-3 px-3 py-1 bg-gray-700 text-white text-sm rounded-full">{selectedEntity.type}</span>
                         </div>
                         <div className="text-sm font-semibold theme-text-primary flex items-center">
                            Operational Risk Score: 
                            <span className={`ml-2 text-xl ${getRiskColor(selectedEntity.riskScores.operational)}`}>
                                {Math.round(selectedEntity.riskScores.operational)}
                            </span>
                         </div>
                    </div>
                     <p className="theme-text-secondary text-sm flex items-start"><FileText size={16} className="mr-2 flex-shrink-0 mt-1"/>
                        <span className="text-sm text-yellow-400 font-semibold mr-2">Key Takeaways & Exam Findings</span> Internal audit identified two high-risk control deficiencies in the wire transfer process. Management's remediation plan has been submitted and is currently under review.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                        <p className="text-xs theme-text-secondary mb-1">Core System Uptime <Info size={12} className="inline-block"/></p>
                        <p className={`text-4xl font-bold text-green-400`}>{detailedOperationalData.uptime}%</p>
                        <p className="text-xs theme-text-secondary">Peer avg 99.85%</p>
                    </div>
                    <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                        <p className="text-xs theme-text-secondary mb-1">High-Severity Audit Findings <Info size={12} className="inline-block"/></p>
                        <p className={`text-4xl font-bold ${detailedOperationalData.highSeverityFindings > 1 ? 'text-red-400' : 'text-green-400'}`}>{detailedOperationalData.highSeverityFindings}</p>
                    </div>
                    <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                        <p className="text-xs theme-text-secondary mb-1">Transaction Failure Rate <Info size={12} className="inline-block"/></p>
                        <p className={`text-4xl font-bold ${detailedOperationalData.failureRate > 0.3 ? 'text-red-400' : 'text-green-400'}`}>{detailedOperationalData.failureRate}%</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                        <h4 className="font-semibold theme-text-primary mb-4">Reported Fraud Incidents (Quarterly)</h4>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={detailedOperationalData.reportedFraudData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="external" fill="#facc15" name="External" />
                                    <Bar dataKey="internal" fill="#ef4444" name="Internal" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                        <h4 className="font-semibold theme-text-primary mb-4">Transaction Failure Rate Trend</h4>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={detailedOperationalData.failureRateTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="rate" stroke="#3b82f6" name="Failure Rate" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    const operationalRiskEntities = entities.filter(e => e.riskScores.operational);
    const topOperationalRisks = [...operationalRiskEntities].sort((a, b) => b.riskScores.operational - a.riskScores.operational).slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                    <h3 className="text-xl font-semibold theme-text-primary mb-4 flex items-center">
                        <Activity size={20} className="mr-2 text-blue-400" /> Top Operational Risk Exposures
                    </h3>
                    <p className="theme-text-secondary text-sm mb-4">
                        Entities with the highest operational risk scores based on our internal models.
                    </p>
                    <div className="space-y-3">
                        {topOperationalRisks.map(entity => (
                            <div key={entity.entityId} onClick={() => setSelectedEntity(entity)} className="flex items-center justify-between p-3 theme-bg-card-alt rounded-lg cursor-pointer hover:bg-gray-700">
                                <div>
                                    <p className="font-semibold theme-text-primary">{entity.companyName}</p>
                                    <p className="text-xs theme-text-secondary">{entity.type}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className={`font-bold text-lg ${getRiskColor(entity.riskScores.operational)}`}>
                                        {Math.round(entity.riskScores.operational)}
                                    </span>
                                    <button className="text-sm text-blue-500 hover:text-blue-300">
                                        View <span className="ml-1">&gt;</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                    <h3 className="text-xl font-semibold theme-text-primary mb-4 flex items-center">
                        <Zap size={20} className="mr-2 text-yellow-400" /> Recent Operational Risk Events
                    </h3>
                    <div className="space-y-3">
                        {mockAlerts.filter(a => a.type === 'Operational').slice(0, 2).map(alert => (
                            <div key={alert.id} className="p-3 theme-bg-card-alt rounded-lg border-l-4 border-yellow-500">
                                <p className="font-semibold theme-text-primary">{alert.name}</p>
                                <p className="text-sm theme-text-secondary">{alert.details}</p>
                                <span className={`text-xs font-semibold ${getSeverityColor(alert.severity)}`}>{alert.severity}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                <h3 className="text-xl font-semibold theme-text-primary mb-4">Operational Risk by Product/Jurisdiction</h3>
                <RiskBarChart />
            </div>
            
            <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                <h3 className="text-xl font-semibold theme-text-primary mb-4">Drill Down on Operational Risk Metrics</h3>
                <div className="space-y-3">
                    <button onClick={() => handleOpenModal({ name: 'Operational Risk', id: 'operational' })} className="w-full text-left p-4 theme-bg-card-alt rounded-lg flex items-center justify-between hover:bg-gray-700">
                        <div className="flex items-center"><Activity size={20} className="mr-3 text-red-400" /><span className="font-semibold theme-text-primary">View Detailed Operational Risk Metrics</span></div>
                        <ChevronRight size={20} className="theme-text-secondary" />
                    </button>
                </div>
            </div>
            
            {isModalOpen && selectedPillar && (
                <RiskDrilldownModal riskPillar={selectedPillar} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

export default OperationalRiskTab;