// src/features/riskAssessment/components/LiquidityRiskTab.jsx

import React from 'react';
import { TrendingUp, TrendingDown, ChevronRight, Scale, Activity, ArrowLeft, FileText, Download, Info } from 'lucide-react';
import RiskDrilldownModal from '../modals/RiskDrilldownModal.jsx';
import RiskBarChart from './RiskBarChart.jsx';
import { mockIndicators } from '../data/mockIndicators.js';
import KpiCard from './KpiCard.jsx';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { mockAlerts } from '../data/riskData.js'; // This is the new import path


const LiquidityRiskTab = ({ entities, riskCategories, getRiskColor, getRiskColorHex, getSeverityColor, selectedEntity, setSelectedEntity }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedPillar, setSelectedPillar] = React.useState(null);

    const handleOpenModal = (pillar) => {
        setSelectedPillar(pillar);
        setIsModalOpen(true);
    };

    // Placeholder data for the detailed view
    const detailedLiquidityData = {
        lcr: 159.0,
        nsfr: 118.0,
        loanToDepositRatio: 93.0,
        lcrTrendData: [
            { name: 'Q3 2024', lcr: 135 },
            { name: 'Q4 2024', lcr: 145 },
            { name: 'Q1 2025', lcr: 159 },
            { name: 'Q2 2025', lcr: 158 }
        ],
        nsfrTrendData: [
            { name: 'Q3 2024', nsfr: 105 },
            { name: 'Q4 2024', nsfr: 110 },
            { name: 'Q1 2025', nsfr: 118 },
            { name: 'Q2 2025', nsfr: 117 }
        ],
        fundingConcentrationData: [
            { name: 'Corporate Deposits', value: 55, color: '#4ade80' },
            { name: 'Retail Deposits', value: 30, color: '#3b82f6' },
            { name: 'Wholesale Funding', value: 15, color: '#facc15' }
        ],
        cashToTotalAssetsTrend: [
            { name: 'Q3 2024', cash: 9.5 },
            { name: 'Q4 2024', cash: 11.2 },
            { name: 'Q1 2025', cash: 8.8 },
            { name: 'Q2 2025', cash: 9.9 }
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
                            Liquidity Risk Score: 
                            <span className={`ml-2 text-xl ${getRiskColor(selectedEntity.riskScores.liquidity)}`}>
                                {Math.round(selectedEntity.riskScores.liquidity)}
                            </span>
                         </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                        <p className="text-xs theme-text-secondary mb-1">LCR <Info size={12} className="inline-block"/></p>
                        <p className={`text-4xl font-bold ${detailedLiquidityData.lcr < 100 ? 'text-red-400' : 'text-green-400'}`}>{detailedLiquidityData.lcr}%</p>
                    </div>
                    <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                        <p className="text-xs theme-text-secondary mb-1">NSFR <Info size={12} className="inline-block"/></p>
                        <p className={`text-4xl font-bold ${detailedLiquidityData.nsfr < 100 ? 'text-red-400' : 'text-green-400'}`}>{detailedLiquidityData.nsfr}%</p>
                    </div>
                    <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                        <p className="text-xs theme-text-secondary mb-1">Loan-to-Deposit Ratio <Info size={12} className="inline-block"/></p>
                        <p className={`text-4xl font-bold ${detailedLiquidityData.loanToDepositRatio > 100 ? 'text-red-400' : 'text-green-400'}`}>{detailedLiquidityData.loanToDepositRatio}%</p>
                    </div>
                    <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                        <p className="text-xs theme-text-secondary mb-1">Capital Adequacy Ratio (CAR) <Info size={12} className="inline-block"/></p>
                        <p className={`text-4xl font-bold text-green-400`}>{detailedLiquidityData.capitalAdequacyRatio}%</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                        <h4 className="font-semibold theme-text-primary mb-4">LCR & NSFR Trends</h4>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={detailedLiquidityData.lcrTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[80, 160]}/>
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="lcr" stroke="#3b82f6" name="LCR" />
                                    <Line type="monotone" dataKey="nsfr" stroke="#4ade80" name="NSFR" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                        <h4 className="font-semibold theme-text-primary mb-4">Funding Concentration</h4>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie dataKey="value" data={detailedLiquidityData.fundingConcentrationData} innerRadius={40} outerRadius={60} fill="#82ca9d" paddingAngle={5}>
                                        {detailedLiquidityData.fundingConcentrationData.map((entry, index) => (
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
                
                <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                    <h4 className="font-semibold theme-text-primary mb-4">Cash to Total Assets Trend</h4>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={detailedLiquidityData.cashToTotalAssetsTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="cash" fill="#60a5fa" name="Cash %" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }
    
    // Default high-level view for all entities
    const liquidityRiskEntities = entities.filter(e => e.riskScores.liquidity);
    const topLiquidityRisks = [...liquidityRiskEntities].sort((a, b) => b.riskScores.liquidity - a.riskScores.liquidity).slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                    <h3 className="text-xl font-semibold theme-text-primary mb-4 flex items-center">
                        <Scale size={20} className="mr-2 text-blue-400" /> Top Liquidity Risk Exposures
                    </h3>
                    <p className="theme-text-secondary text-sm mb-4">
                        Entities with the highest liquidity risk scores based on our internal models.
                    </p>
                    <div className="space-y-3">
                        {topLiquidityRisks.map(entity => (
                            <div key={entity.entityId} onClick={() => setSelectedEntity(entity)} className="flex items-center justify-between p-3 theme-bg-card-alt rounded-lg cursor-pointer hover:bg-gray-700">
                                <div>
                                    <p className="font-semibold theme-text-primary">{entity.companyName}</p>
                                    <p className="text-xs theme-text-secondary">{entity.type}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className={`font-bold text-lg ${getRiskColor(entity.riskScores.liquidity)}`}>
                                        {Math.round(entity.riskScores.liquidity)}
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
                        <Activity size={20} className="mr-2 text-yellow-400" /> Recent Liquidity Risk Alerts
                    </h3>
                    <div className="space-y-3">
                        {mockAlerts.filter(a => a.type === 'Liquidity').slice(0, 2).map(alert => (
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
                <h3 className="text-xl font-semibold theme-text-primary mb-4">Liquidity Risk by Product/Jurisdiction</h3>
                <RiskBarChart />
            </div>
            
            <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                <h3 className="text-xl font-semibold theme-text-primary mb-4">Drill Down on Liquidity Risk Metrics</h3>
                <div className="space-y-3">
                    <button onClick={() => handleOpenModal({ name: 'Liquidity Risk', id: 'liquidity' })} className="w-full text-left p-4 theme-bg-card-alt rounded-lg flex items-center justify-between hover:bg-gray-700">
                        <div className="flex items-center"><Scale size={20} className="mr-3 text-red-400" /><span className="font-semibold theme-text-primary">View Detailed Liquidity Risk Metrics</span></div>
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

export default LiquidityRiskTab;