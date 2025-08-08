// src/features/dataManagement/components/DataFlowDiagram.jsx

import React from 'react';
import { Database, Zap, FileText, ArrowRight, Server, Cloud, Shield, Share, Link2 } from 'lucide-react';

const mockDataFlow = {
    nodes: [
        { id: 'source-stripe', name: 'Stripe Payments API', type: 'API', icon: <Zap size={24} className="text-blue-400" /> },
        { id: 'source-kyc-db', name: 'KYC Database', type: 'Database', icon: <Database size={24} className="text-green-400" /> },
        { id: 'source-hr-file', name: 'HR System (File Upload)', type: 'File', icon: <FileText size={24} className="text-yellow-400" /> },
        { id: 'system-etl', name: 'ETL Process', type: 'Process', icon: <Server size={24} className="text-purple-400" /> },
        { id: 'system-compliance-db', name: 'Compliance Data Lake', type: 'Database', icon: <Cloud size={24} className="text-indigo-400" /> },
        { id: 'system-reporting', name: 'Reporting Engine', type: 'Process', icon: <FileText size={24} className="text-red-400" /> },
        { id: 'system-risk-engine', name: 'Risk Assessment Engine', type: 'Process', icon: <Shield size={24} className="text-orange-400" /> },
        { id: 'external-regulator-suptech', name: 'Regulator Suptech', type: 'External Platform', icon: <Share size={24} className="text-cyan-400" /> },
        { id: 'external-beyond-supervision', name: 'Beyond Supervision', type: 'External Platform', icon: <Link2 size={24} className="text-purple-400" /> },
    ],
    links: [
        { source: 'source-stripe', target: 'system-etl', description: 'Raw Payment Data' },
        { source: 'source-kyc-db', target: 'system-etl', description: 'Customer KYC Records' },
        { source: 'source-hr-file', target: 'system-etl', description: 'Employee Access Data' },
        { source: 'system-etl', target: 'system-compliance-db', description: 'Transformed & Validated Data' },
        { source: 'system-compliance-db', target: 'system-reporting', description: 'Aggregated Data for Reports' },
        { source: 'system-compliance-db', target: 'system-risk-engine', description: 'Data for Risk Analysis' },
        { source: 'system-compliance-db', target: 'external-regulator-suptech', description: 'Direct Data Submission' },
        { source: 'system-compliance-db', target: 'external-beyond-supervision', description: 'Data for Oversight' },
    ]
};

const DataFlowDiagram = ({ onNodeClick }) => {
    return (
        <div className="theme-bg-card p-6 rounded-lg shadow-xl border theme-border-color min-h-[600px] flex flex-col">
            <h3 className="2xl font-bold theme-text-primary mb-6">Data Flow & Lineage Overview</h3>
            <p className="theme-text-secondary mb-6">
                Visualize how data moves through your systems, from source to reporting.
                This helps identify critical data paths and potential compliance touchpoints.
            </p>

            <div className="flex-grow flex items-center justify-center relative">
                <div className="absolute top-1/4 left-10 flex flex-col space-y-8">
                    {mockDataFlow.nodes.filter(node => node.id.startsWith('source')).map(node => (
                        <div
                            key={node.id}
                            className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md flex items-center space-x-3 w-64 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => onNodeClick(node.id, node.name, node.type)}
                        >
                            {node.icon}
                            <div>
                                <p className="font-semibold theme-text-primary">{node.name}</p>
                                <p className="text-xs theme-text-secondary">{node.type} Source</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-8">
                     {mockDataFlow.nodes.filter(node => node.id.startsWith('system-etl')).map(node => (
                        <div
                            key={node.id}
                            className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md flex items-center space-x-3 w-64 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => onNodeClick(node.id, node.name, node.type)}
                        >
                            {node.icon}
                            <div>
                                <p className="font-semibold theme-text-primary">{node.name}</p>
                                <p className="text-xs theme-text-secondary">{node.type}</p>
                            </div>
                        </div>
                    ))}
                    <div
                        className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md flex items-center space-x-3 w-64 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                        onClick={() => onNodeClick(mockDataFlow.nodes.find(n => n.id === 'system-compliance-db').id, mockDataFlow.nodes.find(n => n.id === 'system-compliance-db').name, mockDataFlow.nodes.find(n => n.id === 'system-compliance-db').type)}
                    >
                        {mockDataFlow.nodes.find(n => n.id === 'system-compliance-db').icon}
                        <div>
                            <p className="font-semibold theme-text-primary">{mockDataFlow.nodes.find(n => n.id === 'system-compliance-db').name}</p>
                            <p className="text-xs theme-text-secondary">{mockDataFlow.nodes.find(n => n.id === 'system-compliance-db').type}</p>
                        </div>
                    </div>
                </div>

                <div className="absolute top-[18%] right-10 flex flex-col space-y-6">
                    {mockDataFlow.nodes.filter(node => node.id.startsWith('system-reporting') || node.id.startsWith('system-risk')).map(node => (
                        <div
                            key={node.id}
                            className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md flex items-center space-x-3 w-64 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => onNodeClick(node.id, node.name, node.type)}
                        >
                            {node.icon}
                            <div>
                                <p className="font-semibold theme-text-primary">{node.name}</p>
                                <p className="text-xs theme-text-secondary">{node.type}</p>
                            </div>
                        </div>
                    ))}
                    {mockDataFlow.nodes.filter(node => node.id.startsWith('external-')).map(node => (
                        <div
                            key={node.id}
                            className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md flex items-center space-x-3 w-64 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => onNodeClick(node.id, node.name, node.type)}
                        >
                            {node.icon}
                            <div>
                                <p className="font-semibold theme-text-primary">{node.name}</p>
                                <p className="text-xs theme-text-secondary">{node.type}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[calc(25%+24px)] left-[260px] w-20 h-0.5 bg-gray-300 dark:bg-gray-500 transform -translate-y-1/2"></div>
                    <div className="absolute top-[calc(50%+24px)] left-[260px] w-20 h-0.5 bg-gray-300 dark:bg-gray-500 transform -translate-y-1/2"></div>
                    <div className="absolute top-[calc(75%+24px)] left-[260px] w-20 h-0.5 bg-gray-300 dark:bg-gray-500 transform -translate-y-1/2"></div>

                    <div className="absolute top-[50%] left-[550px] w-20 h-0.5 bg-gray-300 dark:bg-gray-500 transform -translate-y-1/2"></div>

                    <div className="absolute top-[calc(50%-100px)] right-[250px] w-20 h-0.5 bg-gray-300 dark:bg-gray-500 transform -translate-y-1/2"></div>
                    <div className="absolute top-[calc(50%+10px)] right-[250px] w-20 h-0.5 bg-gray-300 dark:bg-gray-500 transform -translate-y-1/2"></div>

                    <div className="absolute top-[calc(50%+120px)] right-[250px] w-20 h-0.5 bg-gray-300 dark:bg-gray-500 transform -translate-y-1/2"></div>
                    <div className="absolute top-[calc(50%+200px)] right-[250px] w-20 h-0.5 bg-gray-300 dark:bg-gray-500 transform -translate-y-1/2"></div>
                </div>
            </div>
            <p className="theme-text-secondary text-sm mt-6 text-center">
                *This is a simplified visual representation. Advanced data flow diagrams would be interactive and dynamically generated.
            </p>
        </div>
    );
};

export default DataFlowDiagram;