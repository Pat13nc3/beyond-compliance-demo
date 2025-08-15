// src/features/riskAssessment/components/OverviewTab.jsx
import React from 'react';
import { TrendingUp, TrendingDown, ChevronRight, Building, Cpu, Lightbulb } from 'lucide-react';
import AnalysisResultModal from '../modals/AnalysisResultModal.jsx'; // Corrected import path

const MetricCard = ({ title, value, criticalCount, trend, Icon }) => {
    const getTrendColor = (t) => t === 'up' ? 'text-theme-error-text' : t === 'down' ? 'text-theme-success-text' : 'text-theme-text-secondary';
    return (
        <div className="bg-theme-bg p-6 rounded-xl shadow border border-theme-border">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-theme-text-secondary">{title}</p>
                {Icon && <Icon className="h-5 w-5 text-theme-text-secondary" />}
            </div>
            <p className="text-3xl font-bold text-theme-text-primary mt-2">{value}</p>
            <div className="flex items-center justify-between mt-2 text-sm">
                <div className="flex items-center">
                    <span className="font-semibold mr-1 text-theme-text-secondary capitalize">{trend}</span>
                    {trend === 'up' ? <TrendingUp className={`h-4 w-4 ${getTrendColor(trend)}`} /> : <TrendingDown className={`h-4 w-4 ${getTrendColor(trend)}`} />}
                </div>
                <p className="text-theme-error-text font-semibold">{criticalCount} Critical</p>
            </div>
        </div>
    );
};

const OverviewTab = ({ entities, alerts, riskCategories, setActiveTab, setSelectedEntity }) => {
    const [isAiModalOpen, setIsAiModalOpen] = React.useState(false);
    const [aiResult, setAiResult] = React.useState(null);

    const handleAiAnalysis = () => {
        const mockResult = {
            summary: "AI has analyzed systemic risk across all entities. Key findings include a high concentration of credit risk in the Banking sector and a moderate operational risk trend in the Fintech sector.",
            recommendedActions: [
                "Conduct a deep-dive into the top 5 highest-risk entities identified in the Banking sector.",
                "Review and update risk thresholds for Fintech entities in high-growth phases.",
                "Generate a detailed report on cross-sectoral risk dependencies.",
            ],
        };
        setAiResult(mockResult);
        setIsAiModalOpen(true);
    };

    const calculateSectorMetrics = (entitySet) => {
        if (entitySet.length === 0) return { average: 0, critical: 0, trend: 'stable' };
        
        const totalRisk = entitySet.reduce((acc, e) => acc + (e.riskScores.overall || 0), 0);
        const average = Math.round(totalRisk / entitySet.length);
        const critical = entitySet.filter(e => (e.riskScores.overall || 0) >= 85).length;
        
        const upTrends = entitySet.filter(e => e.trend === 'up').length;
        const downTrends = entitySet.filter(e => e.trend === 'down').length;
        const trend = upTrends > downTrends ? 'up' : downTrends > upTrends ? 'down' : 'stable';

        return { average, critical, trend };
    };

    const systemMetrics = calculateSectorMetrics(entities);
    const bankingMetrics = calculateSectorMetrics(entities.filter(e => e.sector === 'Banking'));
    const fintechMetrics = calculateSectorMetrics(entities.filter(e => e.sector === 'Fintech'));

    // FIX: Add check for Array.isArray(riskCategories) to prevent the "not iterable" error
    const topConcerns = (Array.isArray(riskCategories) ? [...riskCategories] : []).sort((a, b) => {
        const avgA = entities.reduce((acc, e) => acc + (e.riskScores[a.id] || 0), 0) / (entities.length || 1);
        const avgB = entities.reduce((acc, e) => acc + (e.riskScores[b.id] || 0), 0) / (entities.length || 1);
        return avgB - avgA;
    }).slice(0, 3);

    const highestRiskEntities = [...entities].sort((a, b) => (b.riskScores.overall || 0) - (a.riskScores.overall || 0)).slice(0, 5);
    const criticalAlerts = alerts.filter(a => a.severity === 'High').slice(0, 4);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Top-Level Health Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricCard title="System-Wide Risk" value={systemMetrics.average} criticalCount={systemMetrics.critical} trend={systemMetrics.trend} />
                        <MetricCard title="Banking Sector" value={bankingMetrics.average} criticalCount={bankingMetrics.critical} trend={bankingMetrics.trend} Icon={Building} />
                        <MetricCard title="Fintech Sector" value={fintechMetrics.average} criticalCount={fintechMetrics.critical} trend={fintechMetrics.trend} Icon={Cpu} />
                    </div>
                    {/* Top System-Wide Concerns */}
                    <div className="bg-theme-bg p-6 rounded-xl shadow border border-theme-border">
                        <h3 className="font-semibold text-theme-text-primary mb-4">Top System-Wide Concerns</h3>
                        <div className="space-y-3">
                            {topConcerns.map(cat => (
                                <div 
                                    key={cat.id} 
                                    onClick={() => setActiveTab(cat.id)} // Assuming setActiveTab is passed down to change main tab
                                    className="flex items-center justify-between p-3 bg-black bg-opacity-20 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" // Added hover styles
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className={`h-5 w-5 text-theme-accent`}></span>
                                        <span className="font-medium text-theme-text-primary">{cat.name} Risk</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-theme-text-secondary" />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* NEW: AI Analysis Button */}
                    <div className="flex justify-center mt-6">
                        <button onClick={handleAiAnalysis} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition flex items-center gap-2">
                            <Lightbulb size={20} /> Run AI Systemic Risk Analysis
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    {/* Highest Risk Entities */}
                    <div className="bg-theme-bg p-6 rounded-xl shadow border border-theme-border">
                        <h3 className="font-semibold text-theme-text-primary mb-4">Highest Risk Entities</h3>
                        <div className="space-y-2">
                            {highestRiskEntities.map(entity => (
                                <div key={entity.entityId} className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-black hover:bg-opacity-20" onClick={() => setSelectedEntity(entity)}>
                                    <div>
                                        <p className="font-medium text-sm text-theme-text-primary">{entity.companyName}</p>
                                        <p className="text-xs text-theme-text-secondary">{entity.type}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-sm text-theme-text-primary">{Math.round(entity.riskScores.overall)}</p>
                                        <div className="flex items-center text-xs justify-end">
                                            {entity.trend === 'up' && <TrendingUp className="h-3 w-3 text-theme-error-text" />}
                                            {entity.trend === 'down' && <TrendingDown className="h-3 w-3 text-theme-success-text" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Recent Critical Alerts */}
                    <div className="bg-theme-bg p-6 rounded-xl shadow border border-theme-border">
                        <h3 className="font-semibold text-theme-text-primary mb-4">Recent Critical Alerts</h3>
                        <div className="space-y-3">
                            {criticalAlerts.map(alert => (
                                <div key={alert.id} className="text-sm p-3 bg-theme-error-bg border-l-4 border-theme-error-border rounded">
                                    <p className="font-semibold text-theme-error-text">{alert.entity}</p>
                                    <p className="text-theme-error-text opacity-90">{alert.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isAiModalOpen && <AnalysisResultModal result={aiResult} onClose={() => setIsAiModalOpen(false)} />}
        </>
    );
};

export default OverviewTab;