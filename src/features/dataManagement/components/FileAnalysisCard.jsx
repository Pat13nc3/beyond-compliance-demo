// src/features/dataManagement/components/FileAnalysisCard.jsx

import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

const FileAnalysisCard = ({ file, onMap }) => {
    return (
        <div
            onClick={() => onMap(file)}
            className="theme-bg-card p-5 rounded-lg shadow-lg theme-text-primary border border-dashed border-yellow-500 hover:border-yellow-400 transition-colors cursor-pointer"
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <FileText size={20} className="text-yellow-400 mr-3" />
                    <div>
                        <h4 className="font-bold theme-text-primary">{file.name}</h4>
                        <p className="text-xs theme-text-secondary">Owner: {file.owner} | Source: {file.source}</p>
                    </div>
                </div>
                <div className="flex items-center text-sm font-semibold text-yellow-400">
                    Map Data <ArrowRight size={16} className="ml-2" />
                </div>
            </div>
        </div>
    );
};

export default FileAnalysisCard;