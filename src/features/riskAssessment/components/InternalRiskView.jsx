// src/features/riskAssessment/components/InternalRiskView.jsx

import React, { useState } from 'react';
import { Download, FileText, Info, TrendingUp, TrendingDown, ChevronRight, BarChart, Clock, Award, ArrowLeft, Shield, ClipboardList, CreditCard, Scale, Activity } from 'lucide-react';
import RiskDrilldownModal from '../modals/RiskDrilldownModal.jsx';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart as RechartsBarChart, Bar
} from 'recharts';
import KpiCard from './KpiCard.jsx';
import { mockIndicators } from '../data/mockIndicators.js';
import RiskHeatmap from './RiskHeatmap.jsx';

// We'll hardcode the Innovate Inc. data for this internal view
const innovateIncData = {
    companyName: 'Innovate Inc.',
    type: 'Fintech',
    riskScores: {
        credit: 75,
        liquidity: 60,
        market: 85,
        operational: 70,
        capitalAdequacy: 65,
    },
    // Detailed mock data for each section
    credit: {
        nplRatio: 3.5,
        nplRatioTrendData: [{ name: 'Q3 2024', ratio: 3.8 }, { name: 'Q4 2024', ratio: 3.6 }, { name: 'Q1 2025', ratio: 3.5 }, { name: 'Q2 2025', ratio: 3.5 }],
        sectoralConcentrationData: [{ name: 'Commercial Real Estate', value: 30, color: '#4ade80' }, { name: 'Consumer Lending', value: 45, color: '#3b82f6' }, { name: 'Energy', value: 15, color: '#facc15' }, { name: 'Other', value: 10, color: '#ef4444' }],
    },
    liquidity: {
        lcr: 159.0,
        nsfr: 118.0,
        loanToDepositRatio: 93.0,
        lcrTrendData: [{ name: 'Q3 2024', lcr: 135 }, { name: 'Q4 2024', lcr: 145 }, { name: 'Q1 2025', lcr: 159 }, { name: 'Q2 2025', lcr: 158 }],
        fundingConcentrationData: [{ name: 'Corporate Deposits', value: 55, color: '#4ade80' }, { name: 'Retail Deposits', value: 30, color: '#3b82f6' }, { name: 'Wholesale Funding', value: 15, color: '#facc15' }],
    },
    capitalAdequacy: {
        cet1Ratio: 9.8,
        tier1Ratio: 10.4,
        totalCapitalRatio: 12.0,
        leverageRatio: 4.8,
        stressTestData: [{ name: 'Pre-Stress', value: 12.0 }, { name: 'Post-Stress', value: 8.5 }],
    },
    operational: {
        uptime: 99.93,
        highSeverityFindings: 2,
        failureRate: 0.25,
        reportedFraudData: [{ name: 'Q3 2024', external: 5, internal: 2 }, { name: 'Q4 2024', external: 6, internal: 4 }, { name: 'Q1 2025', external: 3, internal: 1 }, { name: 'Q2 2025', external: 2, internal: 1 }],
        failureRateTrendData: [{ name: 'Jan', rate: 0.35 }, { name: 'Feb', rate: 0.45 }, { name: 'Mar', rate: 0.40 }, { name: 'Apr', rate: 0.28 }, { name: 'May', rate: 0.31 }, { name: 'Jun', rate: 0.25 }],
    },
    market: {
        unhedgedExposure: 'USD/NGN currency fluctuation on international trade finance portfolio.',
        valueAtRisk: 3.0,
        interestRateSensitivity: 14000,
        totalFxExposure: 11.0,
        fxExposureData: [{ name: 'EUR', value: 25, color: '#3b82f6' }, { name: 'GBP', value: 15, color: '#4ade80' }, { name: 'USD', value: 40, color: '#facc15' }, { name: 'Other', value: 20, color: '#ef4444' }],
        assetConcentrationData: [{ name: 'Corp. Bonds', value: 38, color: '#f97316' }, { name: 'Derivatives', value: 12, color: '#ef4444' }, { name: 'Equities', value: 30, color: '#facc15' }, { name: 'Govt. Bonds', value: 20, color: '#3b82f6' }],
    },
};

const internalTabs = [
    { id: 'overview', name: 'Overview', icon: ClipboardList },
    { id: 'credit', name: 'Credit Risk', icon: CreditCard },
    { id: 'liquidity', name: 'Liquidity Risk', icon: Scale },
    { id: 'market', name: 'Market Risk', icon: BarChart },
    { id: 'operational', name: 'Operational Risk', icon: Activity },
    { id: 'capitalAdequacy', name: 'Capital Adequacy', icon: Shield },
];

const InternalRiskView = ({ getRiskColor, getRiskColorHex }) => {
    const [activeSubTab, setActiveSubTab] = useState('overview');
    
    // Placeholder data for the detailed view
    const detailedCreditData = innovateIncData.credit;
    const detailedLiquidityData = innovateIncData.liquidity;
    const detailedCapitalAdequacyData = innovateIncData.capitalAdequacy;
    const detailedOperationalData = innovateIncData.operational;
    const detailedMarketData = innovateIncData.market;

    const renderSubTabContent = () => {
        switch (activeSubTab) {
            case 'overview':
                return (
                     <div className="space-y-6">
                        <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                             <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                   <h3 className="text-2xl font-bold theme-text-primary">{innovateIncData.companyName}</h3>
                                   <span className="ml-3 px-3 py-1 bg-gray-700 text-white text-sm rounded-full">{innovateIncData.type}</span>
                                </div>
                                <div className="text-sm font-semibold theme-text-primary flex items-center">
                                   Overall Risk Score: 
                                   <span className={`ml-2 text-xl ${getRiskColor(innovateIncData.riskScores.credit)}`}>
                                       {Math.round(innovateIncData.riskScores.credit)}
                                   </span>
                                </div>
                             </div>
                             <p className="theme-text-secondary text-sm flex items-start">
                                <FileText size={16} className="mr-2 flex-shrink-0 mt-1"/>
                                <span className="text-sm text-yellow-400 font-semibold mr-2">Key Takeaways</span> Innovate Inc. maintains a high credit and operational risk score due to a diversified but young portfolio. Liquidity is strong, and capital adequacy is above regulatory minimums. Key focus areas include monitoring new credit lines and ensuring system uptime.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                                <p className="text-xs theme-text-secondary mb-1">Credit Risk</p>
                                <p className={`text-4xl font-bold ${getRiskColor(innovateIncData.riskScores.credit)}`}>{Math.round(innovateIncData.riskScores.credit)}</p>
                            </div>
                            <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                                <p className="text-xs theme-text-secondary mb-1">Liquidity Risk</p>
                                <p className={`text-4xl font-bold ${getRiskColor(innovateIncData.riskScores.liquidity)}`}>{Math.round(innovateIncData.riskScores.liquidity)}</p>
                            </div>
                            <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                                <p className="text-xs theme-text-secondary mb-1">Market Risk</p>
                                <p className={`text-4xl font-bold ${getRiskColor(innovateIncData.riskScores.market)}`}>{Math.round(innovateIncData.riskScores.market)}</p>
                            </div>
                            <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                                <p className="text-xs theme-text-secondary mb-1">Operational Risk</p>
                                <p className={`text-4xl font-bold ${getRiskColor(innovateIncData.riskScores.operational)}`}>{Math.round(innovateIncData.riskScores.operational)}</p>
                            </div>
                            <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                                <p className="text-xs theme-text-secondary mb-1">Capital Adequacy</p>
                                <p className={`text-4xl font-bold ${getRiskColor(innovateIncData.riskScores.capitalAdequacy)}`}>{Math.round(innovateIncData.riskScores.capitalAdequacy)}</p>
                            </div>
                        </div>
                    </div>
                );
            case 'credit':
                return (
                     <div className="space-y-6">
                        <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                             <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                   <h3 className="text-2xl font-bold theme-text-primary">{innovateIncData.companyName}</h3>
                                   <span className="ml-3 px-3 py-1 bg-gray-700 text-white text-sm rounded-full">{innovateIncData.type}</span>
                                </div>
                                <div className="text-sm font-semibold theme-text-primary flex items-center">
                                   Credit Risk Score: 
                                   <span className={`ml-2 text-xl ${getRiskColor(innovateIncData.riskScores.credit)}`}>
                                       {Math.round(innovateIncData.riskScores.credit)}
                                   </span>
                                </div>
                             </div>
                              <p className="theme-text-secondary text-sm flex items-start">
                                <FileText size={16} className="mr-2 flex-shrink-0 mt-1"/>
                                <span className="text-sm text-yellow-400 font-semibold mr-2">Key Takeaways</span> The entity's credit risk is primarily driven by a high sectoral concentration in Commercial Real Estate and a loan loss coverage ratio below the 100% target. The Non-Performing Loan (NPL) ratio has shown an upward trend in the most recent quarter, warranting closer monitoring. Capital adequacy remains strong and well above regulatory minimums.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                                <p className="text-xs theme-text-secondary mb-1">NPL Ratio <Info size={12} className="inline-block"/></p>
                                <p className={`text-4xl font-bold ${detailedCreditData.nplRatio > 3 ? 'text-red-400' : 'text-green-400'}`}>{detailedCreditData.nplRatio}%</p>
                                <p className="text-xs theme-text-secondary">Peer avg 3.7%</p>
                            </div>
                            <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                                <p className="text-xs theme-text-secondary mb-1">Loan Loss Coverage <Info size={12} className="inline-block"/></p>
                                <p className={`text-4xl font-bold ${detailedCreditData.loanLossCoverage < 100 ? 'text-red-400' : 'text-green-400'}`}>{detailedCreditData.loanLossCoverage}%</p>
                            </div>
                            <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                                <p className="text-xs theme-text-secondary mb-1">Portfolio at Risk ({'>90d'}) <Info size={12} className="inline-block"/></p>
                                <p className={`text-4xl font-bold ${detailedCreditData.portfolioAtRisk > 2.5 ? 'text-red-400' : 'text-green-400'}`}>{detailedCreditData.portfolioAtRisk}%</p>
                                <p className="text-xs theme-text-secondary"><TrendingUp size={12} className="inline-block"/> +0.2% Change</p>
                            </div>
                            <div className="theme-bg-card p-4 rounded-xl text-center flex flex-col justify-center">
                                <p className="text-xs theme-text-secondary mb-1">Capital Adequacy Ratio (CAR) <Info size={12} className="inline-block"/></p>
                                <p className={`text-4xl font-bold text-green-400`}>{detailedCreditData.capitalAdequacyRatio}%</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                                <h4 className="font-semibold theme-text-primary mb-4">NPL Ratio Trend</h4>
                                <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={detailedCreditData.nplRatioTrendData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis domain={[0, 10]} />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="ratio" stroke="#ef4444" name="NPL Ratio" />
                                            <Line type="monotone" dataKey="peerAvg" stroke="#8884d8" name="Peer Avg" />
                                        </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                        <h4 className="font-semibold theme-text-primary mb-4">Sectoral Concentration</h4>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie dataKey="value" data={detailedCreditData.sectoralConcentrationData} innerRadius={40} outerRadius={60} fill="#82ca9d" paddingAngle={5}>
                                        {detailedCreditData.sectoralConcentrationData.map((entry, index) => (
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
            case 'liquidity':
                return (
                     <div className="space-y-6">
                        <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                             <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                   <h3 className="text-2xl font-bold theme-text-primary">{innovateIncData.companyName}</h3>
                                   <span className="ml-3 px-3 py-1 bg-gray-700 text-white text-sm rounded-full">{innovateIncData.type}</span>
                                </div>
                                <div className="text-sm font-semibold theme-text-primary flex items-center">
                                   Liquidity Risk Score: 
                                   <span className={`ml-2 text-xl ${getRiskColor(innovateIncData.riskScores.liquidity)}`}>
                                       {Math.round(innovateIncData.riskScores.liquidity)}
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
                                    <RechartsBarChart data={detailedLiquidityData.cashToTotalAssetsTrend}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="cash" fill="#60a5fa" name="Cash %" />
                                    </RechartsBarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                );
            case 'market':
                return (
                     <div className="space-y-6">
                        <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                             <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                   <h3 className="text-2xl font-bold theme-text-primary">{innovateIncData.companyName}</h3>
                                   <span className="ml-3 px-3 py-1 bg-gray-700 text-white text-sm rounded-full">{innovateIncData.type}</span>
                                </div>
                                <div className="text-sm font-semibold theme-text-primary flex items-center">
                                   Market Risk Score: 
                                   <span className={`ml-2 text-xl ${getRiskColor(innovateIncData.riskScores.market)}`}>
                                       {Math.round(innovateIncData.riskScores.market)}
                                   </span>
                                </div>
                            </div>
                            <p className="theme-text-secondary text-sm flex items-start">
                                <FileText size={16} className="mr-2 flex-shrink-0 mt-1"/>
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
            case 'operational':
                return (
                    <div className="space-y-6">
                        <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                             <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                   <h3 className="text-2xl font-bold theme-text-primary">{innovateIncData.companyName}</h3>
                                   <span className="ml-3 px-3 py-1 bg-gray-700 text-white text-sm rounded-full">{innovateIncData.type}</span>
                                </div>
                                <div className="text-sm font-semibold theme-text-primary flex items-center">
                                   Operational Risk Score: 
                                   <span className={`ml-2 text-xl ${getRiskColor(innovateIncData.riskScores.operational)}`}>
                                       {Math.round(innovateIncData.riskScores.operational)}
                                   </span>
                                </div>
                            </div>
                             <p className="theme-text-secondary text-sm flex items-start">
                                <FileText size={16} className="mr-2 flex-shrink-0 mt-1"/>
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
                                        <RechartsBarChart data={detailedOperationalData.reportedFraudData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="external" fill="#facc15" name="External" />
                                            <Bar dataKey="internal" fill="#ef4444" name="Internal" />
                                        </RechartsBarChart>
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
            case 'capitalAdequacy':
                return (
                     <div className="space-y-6">
                        <div className="theme-bg-card p-6 rounded-xl shadow-lg border theme-border-color">
                            <div className="flex justify-between items-center mb-4">
                               <div className="flex items-center">
                                  <h3 className="text-2xl font-bold theme-text-primary">{innovateIncData.companyName}</h3>
                                  <span className="ml-3 px-3 py-1 bg-gray-700 text-white text-sm rounded-full">{innovateIncData.type}</span>
                               </div>
                               <div className="text-sm font-semibold theme-text-primary flex items-center">
                                  Capital Adequacy Score: 
                                  <span className={`ml-2 text-xl ${getRiskColor(innovateIncData.riskScores.capitalAdequacy)}`}>
                                      {Math.round(innovateIncData.riskScores.capitalAdequacy)}
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
            default:
                return null;
        }
    };
    
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="border-b-2 theme-border-color">
                <nav className="-mb-0.5 flex flex-wrap space-x-4">
                    {internalTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveSubTab(tab.id)}
                            className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                                ${activeSubTab === tab.id
                                ? 'text-theme-accent border-theme-accent'
                                : 'text-theme-text-secondary border-transparent hover:text-theme-text-primary'}`
                            }
                        >
                            <tab.icon size={18} />
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </nav>
            </div>
            {renderSubTabContent()}
        </div>
    );
};

export default InternalRiskView;