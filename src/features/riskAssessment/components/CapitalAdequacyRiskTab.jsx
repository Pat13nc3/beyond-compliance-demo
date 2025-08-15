// src/features/riskAssessment/components/CapitalAdequacyRiskTab.jsx

import React from 'react';
import { TrendingUp, TrendingDown, ChevronRight, Shield, Clock, ArrowLeft, FileText, Download, Info } from 'lucide-react';
import RiskDrilldownModal from '../modals/RiskDrilldownModal.jsx';
import RiskBarChart from './RiskBarChart.jsx';
import { mockIndicators } from '../data/mockIndicators.js';
import KpiCard from './KpiCard.jsx';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { mockAlerts } from '../data/riskData.js'; // This is the new import path


const CapitalAdequacyRiskTab = ({ entities, riskCategories, getRiskColor, getRiskColorHex, getSeverityColor, selectedEntity, setSelectedEntity }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedPillar, setSelectedPillar] = React.useState(null);

    const handleOpenModal = (pillar) => {
        setSelectedPillar(pillar);
        setIsModalOpen(true);
    };

    const capitalAdequacyRiskIndicators = mockIndicators.filter(i => i.category === 'Capital Adequacy');
    const capitalAdequacyRiskEntities = entities.filter(e => e.riskScores.capitalAdequacy);
    const topCapitalAdequacyRisks = [...capitalAdequacyRiskEntities].sort((a, b) => b.riskScores.capitalAdequacy - a.riskScores.capitalAdequacy).slice(0, 5);

    // Placeholder data for the detailed view
    const detailedCapitalAdequacyData = {
        cet1Ratio: 9.8,
        tier1Ratio: 10.4,
        totalCapitalRatio: 12.0,
        leverageRatio: 4.8,
        stressTestData: [
            { name: 'Pre-Stress', value: 12.0 },
            { name: 'Post-Stress', value: 8.5 }
        ],
        regulatoryMinimum: 6.0
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
                            Capital Adequacy Score: 
                            <span className={`ml-2 text-xl ${getRiskColor(selectedEntity.riskScores.capitalAdequacy)}`}>
                                {Math.round(selectedEntity.riskScores.capitalAdequacy)}
                            </span>
                         </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                        <p className="text-xs theme-text-secondary mb-1">CET1 Ratio <Info size={12} className="inline-block"/></p>
                        <p className={`text-4xl font-bold ${detailedCapitalAdequacyData.cet1Ratio < 7 ? 'text-red-400' : 'text-green-400'}`}>{detailedCapitalAdequacyData.cet1Ratio}%</p>
                    </div>
                    <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                        <p className="text-xs theme-text-secondary mb-1">Tier 1 Ratio <Info size={12} className="inline-block"/></p>
                        <p className={`text-4xl font-bold ${detailedCapitalAdequacyData.tier1Ratio < 8.5 ? 'text-red-400' : 'text-green-400'}`}>{detailedCapitalAdequacyData.tier1Ratio}%</p>
                    </div>
                    <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                        <p className="text-xs theme-text-secondary mb-1">Total Capital Ratio <Info size={12} className="inline-block"/></p>
                        <p className={`text-4xl font-bold ${detailedCapitalAdequacyData.totalCapitalRatio < 10.5 ? 'text-red-400' : 'text-green-400'}`}>{detailedCapitalAdequacyData.totalCapitalRatio}%</p>
                    </div>
                    <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                        <p className="text-xs theme-text-secondary mb-1">Leverage Ratio <Info size={12} className="inline-block"/></p>
                        <p className={`text-4xl font-bold ${detailedCapitalAdequacyData.leverageRatio < 3 ? 'text-red-400' : 'text-green-400'}`}>{detailedCapitalAdequacyData.leverageRatio}%</p>
                    </div>
                </div>

                <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                    <h4 className="font-semibold theme-text-primary mb-4">Capital Stress Test Result</h4>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={detailedCapitalAdequacyData.stressTestData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 15]}/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#3b82f6" name="Pre-Stress" />
                                <Line type="monotone" dataKey="value" stroke="#ef4444" name="Post-Stress" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                    <h3 className="text-xl font-semibold theme-text-primary mb-4 flex items-center">
                        <Shield size={20} className="mr-2 text-blue-400" /> Top Capital Adequacy Risk Exposures
                    </h3>
                    <p className="theme-text-secondary text-sm mb-4">
                        Entities with the highest capital adequacy risk scores based on our internal models.
                    </p>
                    <div className="space-y-3">
                        {topCapitalAdequacyRisks.map(entity => (
                            <div key={entity.entityId} onClick={() => setSelectedEntity(entity)} className="flex items-center justify-between p-3 theme-bg-card-alt rounded-lg cursor-pointer hover:bg-gray-700">
                                <div>
                                    <p className="font-semibold theme-text-primary">{entity.companyName}</p>
                                    <p className="text-xs theme-text-secondary">{entity.type}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className={`font-bold text-lg ${getRiskColor(entity.riskScores.capitalAdequacy)}`}>
                                        {Math.round(entity.riskScores.capitalAdequacy)}
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
                        <Clock size={20} className="mr-2 text-yellow-400" /> Recent Capital Adequacy Risk Alerts
                    </h3>
                    <div className="space-y-3">
                        {mockAlerts.filter(a => a.type === 'Capital').slice(0, 2).map(alert => (
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
                <h3 className="text-xl font-semibold theme-text-primary mb-4">Capital Adequacy Risk by Product/Jurisdiction</h3>
                <RiskBarChart />
            </div>
            
            <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                <h3 className="text-xl font-semibold theme-text-primary mb-4">Drill Down on Capital Adequacy Risk Metrics</h3>
                <div className="space-y-3">
                    <button onClick={() => handleOpenModal({ name: 'Capital Adequacy Risk', id: 'capitalAdequacy' })} className="w-full text-left p-4 theme-bg-card-alt rounded-lg flex items-center justify-between hover:bg-gray-700">
                        <div className="flex items-center"><Shield size={20} className="mr-3 text-red-400" /><span className="font-semibold theme-text-primary">View Detailed Capital Adequacy Risk Metrics</span></div>
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

export default CapitalAdequacyRiskTab;