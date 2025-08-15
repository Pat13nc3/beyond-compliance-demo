// src/features/riskAssessment/components/BusinessModelView.jsx

import React from 'react';
import { Factory, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react'; // <-- ADDED TrendingDown here
import RiskHeatmap from './RiskHeatmap.jsx';
import RiskDrilldownModal from '../modals/RiskDrilldownModal.jsx';

const BusinessModelView = ({ entities, riskCategories, getRiskColor, getRiskColorHex, getSeverityColor }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedPillar, setSelectedPillar] = React.useState(null);

    const handleOpenModal = (pillar) => {
        setSelectedPillar(pillar);
        setIsModalOpen(true);
    };

    // Placeholder for fetching or calculating risks by business model
    const riskByBusinessModel = [
        { id: 'payments-model', name: 'Payments', riskScore: 85, trend: 'up' },
        { id: 'lending-model', name: 'Lending', riskScore: 70, trend: 'down' },
        { id: 'digital-assets-model', name: 'Digital Assets', riskScore: 92, trend: 'up' },
    ];

    return (
        <div className="space-y-6">
            <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                <h3 className="text-xl font-semibold theme-text-primary mb-4 flex items-center">
                    <Factory size={20} className="mr-2 text-blue-400" /> Risk by Business Model
                </h3>
                <p className="theme-text-secondary text-sm mb-4">
                    This view aggregates and displays risk scores based on the company's business models and product lines.
                </p>
                <div className="space-y-3">
                    {riskByBusinessModel.map(model => (
                        <div key={model.id} className="flex items-center justify-between p-3 theme-bg-card-alt rounded-lg">
                            <div>
                                <p className="font-semibold theme-text-primary">{model.name}</p>
                                <p className="text-xs theme-text-secondary">Overall Risk Score</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className={`font-bold text-lg ${getRiskColor(model.riskScore)}`}>
                                    {Math.round(model.riskScore)}
                                </span>
                                <div className="flex items-center text-xs">
                                    {model.trend === 'up' && <TrendingUp className="h-3 w-3 text-red-400" />}
                                    {model.trend === 'down' && <TrendingDown className="h-3 w-3 text-green-400" />}
                                </div>
                                <button onClick={() => { /* Handle model drilldown */ }} className="text-sm text-blue-500 hover:text-blue-300">
                                    View <span className="ml-1">&gt;</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                <h3 className="text-xl font-semibold theme-text-primary mb-4">Risk Heatmap: Business Model vs. Jurisdiction</h3>
                <RiskHeatmap />
            </div>

            <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                <h3 className="text-xl font-semibold theme-text-primary mb-4">Drill Down on Business Model Risk Metrics</h3>
                <div className="space-y-3">
                    <button onClick={() => handleOpenModal({ name: 'Business Model Risk', id: 'businessModels' })} className="w-full text-left p-4 theme-bg-card-alt rounded-lg flex items-center justify-between hover:bg-gray-700">
                        <div className="flex items-center"><Factory size={20} className="mr-3 text-red-400" /><span className="font-semibold theme-text-primary">View Detailed Business Model Risk Metrics</span></div>
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

export default BusinessModelView;