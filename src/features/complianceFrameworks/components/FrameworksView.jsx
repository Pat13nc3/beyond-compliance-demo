import React, { useMemo } from 'react';
import { Plus, Edit, FileText, UploadCloud, Shield, CheckCheck, Link, Database, Sparkles, Eye, Link2, X, AlertTriangle, Layers, Save, Trash2, ToggleLeft, ToggleRight, Lightbulb, UserCheck, Book, LayoutDashboard } from 'lucide-react';
// Corrected import path to reach mockData.js in the data folder
import { mockFrameworks } from '../../../data/mockData';

const FrameworksView = ({ frameworks, onCreateFramework, onViewFramework, onEditFramework, onLinkFramework, onIngestRegulation }) => {
    // Separate frameworks into two groups based on their source
    const userDefinedFrameworks = frameworks.filter(fw => fw.source === 'User-Defined');
    const aiIngestedFrameworks = frameworks.filter(fw => fw.source === 'AI-Ingested');

    const renderFrameworkCards = (frameworksToRender) => (
        frameworksToRender.map(fw => (
            <div key={fw.id} className="theme-bg-card p-6 rounded-xl shadow-lg border-2 theme-border-color flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold theme-text-primary">{fw.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${fw.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {fw.status}
                        </span>
                    </div>
                    {/* NEW: Display framework source with conditional icons */}
                    <p className="text-sm theme-text-secondary flex items-center">
                        {fw.source === 'AI-Ingested' ?
                            <Lightbulb size={16} className="mr-1 text-purple-400" /> :
                            <FileText size={16} className="mr-1 text-blue-400" />
                        }
                        Source: {fw.source === 'AI-Ingested' ? 'AI Ingested' : 'User-Defined'}
                    </p>
                    <p className="text-sm theme-text-secondary">Total Requirements: {fw.totalRequirements}</p>
                    <p className="text-sm theme-text-secondary">Linked Products: {fw.linkedProducts.join(', ')}</p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t theme-border-color">
                    <button onClick={() => onViewFramework(fw)} className="text-blue-500 hover:text-blue-400 flex items-center text-sm font-medium">
                        <Eye size={16} className="mr-1" /> View Framework
                    </button>
                    <div className="flex space-x-2">
                        <button onClick={() => onEditFramework(fw)} className="text-gray-500 hover:text-gray-400 flex items-center text-sm font-medium">
                            <Edit size={16} className="mr-1" /> Edit
                        </button>
                        <button onClick={() => onLinkFramework(fw)} className="text-purple-500 hover:text-purple-400 flex items-center text-sm font-medium">
                            <Link2 size={16} className="mr-1" /> Link
                        </button>
                    </div>
                </div>
            </div>
        ))
    );

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold theme-text-primary">User-Defined Frameworks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Create New Framework Card */}
                <div
                    className="theme-bg-card p-6 rounded-xl shadow-lg border-2 border-dashed border-gray-500 hover:border-blue-500 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[200px]"
                    onClick={onCreateFramework}
                >
                    <Plus size={32} className="theme-text-secondary" />
                    <span className="mt-4 font-semibold theme-text-primary">Create New Framework</span>
                </div>
                {/* Render User-Defined Frameworks */}
                {userDefinedFrameworks.length > 0 && renderFrameworkCards(userDefinedFrameworks)}
            </div>
            
            {/* NEW: AI Ingested Frameworks Section */}
            {aiIngestedFrameworks.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold theme-text-primary mb-4 flex items-center">
                        <Lightbulb size={20} className="mr-2 text-purple-400" /> AI-Ingested Regulations & Frameworks
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {renderFrameworkCards(aiIngestedFrameworks)}
                    </div>
                </div>
            )}
            
            <div className="mt-8">
                <button onClick={onIngestRegulation} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm">
                    <UploadCloud size={16} className="mr-2" /> Ingest New Regulation
                </button>
            </div>
        </div>
    );
};

export default FrameworksView;