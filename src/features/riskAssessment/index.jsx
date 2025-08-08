// src/features/riskAssessment/index.jsx

import React, { useState } from 'react';
import { Shield, TrendingUp, AlertTriangle, Plus, BarChart2, LayoutGrid } from 'lucide-react';
import RiskDrilldownModal from './modals/RiskDrilldownModal.jsx';
import RiskHeatmap from './components/RiskHeatmap.jsx';
import RiskBarChart from './components/RiskBarChart.jsx';
import { heatmapData } from '../../data/mockData.js'; // Assuming risk data is in mockData

const riskData = {
    overallScore: 68,
    breakdown: [
        { name: 'Credit Risk', score: 75, color: 'bg-yellow-500' },
        { name: 'Market Risk', score: 60, color: 'bg-yellow-500' },
        { name: 'Operational Risk', score: 80, color: 'bg-green-500' },
        { name: 'Compliance Risk', score: 55, color: 'bg-red-500' },
    ],
    watchlist: [
        { id: 'WR-001', item: 'Cross-border transaction velocity', reason: 'Exceeded threshold by 15%', level: 'High' },
        { id: 'WR-002', item: 'New user account fraud rate', reason: 'Spike in new account closures', level: 'Medium' },
    ]
};

const getScoreColor = (score) => {
    if (score < 60) return 'text-red-400';
    if (score < 80) return 'text-yellow-400';
    return 'text-green-400';
};

const RiskAssessment = () => {
    const [isDrilldownOpen, setIsDrilldownOpen] = useState(false);
    const [selectedPillar, setSelectedPillar] = useState(null);
    const [chartView, setChartView] = useState('heatmap');

    const handleDrilldown = (pillar) => {
        setSelectedPillar(pillar);
        setIsDrilldownOpen(true);
    };

    return (
        <div className="p-6 theme-bg-page min-h-screen">
            <div className="space-y-6 animate-fade-in">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold theme-text-primary">Internal Risk Dashboard</h2>
                        <p className="theme-text-secondary">Monitor and manage your institution's internal risk profile.</p>
                    </div>
                    <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center">
                        <Plus size={20} className="mr-2"/> New Assessment
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Overall Score and Breakdown */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary text-center">
                            <h3 className="text-lg font-semibold theme-text-secondary mb-2">Overall Risk Score</h3>
                            <p className={`text-7xl font-bold ${getScoreColor(riskData.overallScore)}`}>{riskData.overallScore}</p>
                            <div className="flex items-center justify-center mt-2 text-green-400">
                               <TrendingUp size={20} className="mr-1"/>
                               <span className="text-sm">Trending Up</span>
                            </div>
                        </div>

                        <div className="theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary">
                             <h3 className="text-xl font-semibold mb-4 theme-text-highlight-color">Risk Breakdown</h3>
                             <div className="space-y-4">
                                {riskData.breakdown.map(item => (
                                    <button
                                        key={item.name}
                                        onClick={() => handleDrilldown(item)}
                                        className="w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                                    >
                                        <div className="flex justify-between items-center mb-1 text-sm">
                                            <span className="font-semibold theme-text-primary">{item.name}</span>
                                            <span className={getScoreColor(item.score)}>{item.score} / 100</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                            <div className={item.color} style={{ width: `${item.score}%`, height: '100%', borderRadius: 'inherit'}}></div>
                                        </div>
                                    </button>
                                ))}
                             </div>
                        </div>
                    </div>

                    {/* Right Column: Watchlist and Concentration Chart */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary">
                            <h3 className="text-xl font-semibold mb-4 theme-text-highlight-color">Risk Watchlist</h3>
                            <div className="space-y-3">
                                {riskData.watchlist.map(item => (
                                    <div key={item.id} className="flex items-start theme-bg-card-alt p-4 rounded-lg"> {/* Updated class here */}
                                        <AlertTriangle className={`mr-4 mt-1 ${item.level === 'High' ? 'theme-text-danger-color' : 'text-yellow-500'}`} /> {/* Using theme-text-danger-color */}
                                        <div>
                                            <p className="font-bold theme-text-primary">{item.item}</p>
                                            <p className="text-sm theme-text-secondary">{item.reason}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold theme-text-highlight-color">Risk Concentration</h3>
                                <div className="flex items-center bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
                                    <button onClick={() => setChartView('heatmap')} className={`p-2 rounded-md ${chartView === 'heatmap' ? 'theme-bg-highlight-color text-black dark:text-white' : 'theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700'}`} title="Heatmap View"><LayoutGrid size={16} /></button>
                                    <button onClick={() => setChartView('barchart')} className={`p-2 rounded-md ${chartView === 'barchart' ? 'theme-bg-highlight-color text-black dark:text-white' : 'theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700'}`} title="Bar Chart View"><BarChart2 size={16} /></button>
                                </div>
                            </div>

                             <div className="h-80">
                                {chartView === 'heatmap' ? <RiskHeatmap /> : <RiskBarChart />}
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {isDrilldownOpen && (
                <RiskDrilldownModal
                    riskPillar={selectedPillar}
                    onClose={() => setIsDrilldownOpen(false)}
                />
            )}
        </div>
    );
};

export default RiskAssessment;
