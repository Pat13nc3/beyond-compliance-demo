// src/features/riskAssessment/components/MarketRiskTab.jsx

import React from 'react';
import { TrendingUp, TrendingDown, ChevronRight, BarChart, Clock, ArrowLeft, FileText, Download, Info } from 'lucide-react';
import RiskDrilldownModal from '../modals/RiskDrilldownModal.jsx';
import RiskHeatmap from './RiskHeatmap.jsx';
import { mockIndicators } from '../data/mockIndicators.js';
import KpiCard from './KpiCard.jsx';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { mockAlerts } from '../data/riskData.js'; // This is the new import path


const MarketRiskTab = ({ entities, riskCategories, getRiskColor, getRiskColorHex, getSeverityColor, selectedEntity, setSelectedEntity }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedPillar, setSelectedPillar] = React.useState(null);

    const handleOpenModal = (pillar) => {
        setSelectedPillar(pillar);
        setIsModalOpen(true);
    };

    // Placeholder data for the detailed view
    const detailedMarketData = {
        unhedgedExposure: 'USD/NGN currency fluctuation on international trade finance portfolio.',
        valueAtRisk: 3.0,
        interestRateSensitivity: 14000,
        totalFxExposure: 11.0,
        fxExposureData: [
            { name: 'EUR', value: 25, color: '#3b82f6' },
            { name: 'GBP', value: 15, color: '#4ade80' },
            { name: 'USD', value: 40, color: '#facc15' },
            { name: 'Other', value: 20, color: '#ef4444' }
        ],
        assetConcentrationData: [
            { name: 'Corp. Bonds', value: 38, color: '#f97316' },
            { name: 'Derivatives', value: 12, color: '#ef4444' },
            { name: 'Equities', value: 30, color: '#facc15' },
            { name: 'Govt. Bonds', value: 20, color: '#3b82f6' }
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
                            Market Risk Score: 
                            <span className={`ml-2 text-xl ${getRiskColor(selectedEntity.riskScores.market)}`}>
                                {Math.round(selectedEntity.riskScores.market)}
                            </span>
                         </div>
                    </div>
                     <p className="theme-text-secondary text-sm flex items-start"><FileText size={16} className="mr-2 flex-shrink-0 mt-1"/>
                        <span className="text-sm text-yellow-400 font-semibold mr-2">Largest Unhedged Exposures</span> {detailedMarketData.unhedgedExposure}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                        <p className="text-xs theme-text-secondary mb-1">Value at Risk (VaR) <Info size={12} className="inline-block"/></p>
                        <p className={`text-4xl font-bold text-green-400`}>${detailedMarketData.valueAtRisk}M</p>
                    </div>
                    <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                        <p className="text-xs theme-text-secondary mb-1">Interest Rate Sensitivity (PV01) <Info size={12} className="inline-block"/></p>
                        <p className={`text-4xl font-bold text-green-400`}>${detailedMarketData.interestRateSensitivity.toLocaleString()}</p>
                    </div>
                    <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                        <p className="text-xs theme-text-secondary mb-1">Total FX Exposure <Info size={12} className="inline-block"/></p>
                        <p className={`text-4xl font-bold text-green-400`}>${detailedMarketData.totalFxExposure}M</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                        <h4 className="font-semibold theme-text-primary mb-4">Foreign Exchange (FX) Exposure Breakdown</h4>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie dataKey="value" data={detailedMarketData.fxExposureData} innerRadius={40} outerRadius={60} fill="#82ca9d" paddingAngle={5}>
                                        {detailedMarketData.fxExposureData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                        <h4 className="font-semibold theme-text-primary mb-4">Asset Class Concentration</h4>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie dataKey="value" data={detailedMarketData.assetConcentrationData} innerRadius={40} outerRadius={60} fill="#82ca9d" paddingAngle={5}>
                                        {detailedMarketData.assetConcentrationData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
    
    const marketRiskEntities = entities.filter(e => e.riskScores.market);
    const topMarketRisks = [...marketRiskEntities].sort((a, b) => b.riskScores.market - a.riskScores.market).slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                    <h3 className="text-xl font-semibold theme-text-primary mb-4 flex items-center">
                        <BarChart size={20} className="mr-2 text-blue-400" /> Top Market Risk Exposures
                    </h3>
                    <p className="theme-text-secondary text-sm mb-4">
                        Entities with the highest market risk scores based on our internal models.
                    </p>
                    <div className="space-y-3">
                        {topMarketRisks.map(entity => (
                            <div key={entity.entityId} onClick={() => setSelectedEntity(entity)} className="flex items-center justify-between p-3 theme-bg-card-alt rounded-lg cursor-pointer hover:bg-gray-700">
                                <div>
                                    <p className="font-semibold theme-text-primary">{entity.companyName}</p>
                                    <p className="text-xs theme-text-secondary">{entity.type}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className={`font-bold text-lg ${getRiskColor(entity.riskScores.market)}`}>
                                        {Math.round(entity.riskScores.market)}
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
                        <Clock size={20} className="mr-2 text-yellow-400" /> Recent Market Risk Alerts
                    </h3>
                    <div className="space-y-3">
                        {mockAlerts.filter(a => a.type === 'Market').slice(0, 2).map(alert => (
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
                <h3 className="text-xl font-semibold theme-text-primary mb-4">Market Risk by Product/Jurisdiction</h3>
                <RiskHeatmap />
            </div>
            
            <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                <h3 className="text-xl font-semibold theme-text-primary mb-4">Drill Down on Market Risk Metrics</h3>
                <div className="space-y-3">
                    <button onClick={() => handleOpenModal({ name: 'Market Risk', id: 'market' })} className="w-full text-left p-4 theme-bg-card-alt rounded-lg flex items-center justify-between hover:bg-gray-700">
                        <div className="flex items-center"><BarChart size={20} className="mr-3 text-red-400" /><span className="font-semibold theme-text-primary">View Detailed Market Risk Metrics</span></div>
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

export default MarketRiskTab;