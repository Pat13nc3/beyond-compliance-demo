// src/features/dataManagement/components/FileAnalysisCard.jsx

import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

const FileAnalysisCard = ({ file, onMap }) => {
    return (
        <div 
            onClick={() => onMap(file)}
            className="bg-gray-800 p-5 rounded-lg shadow-lg text-white border border-dashed border-yellow-500 hover:border-yellow-400 transition-colors cursor-pointer"
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <FileText size={20} className="text-yellow-400 mr-3" />
                    <div>
                        <h4 className="font-bold text-gray-100">{file.name}</h4>
                        <p className="text-xs text-gray-400">Owner: {file.owner} | Source: {file.source}</p>
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