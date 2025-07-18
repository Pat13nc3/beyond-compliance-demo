import React from 'react';
import { X, CheckCircle, AlertTriangle, ArrowRight, Edit } from 'lucide-react';

// The onReview prop will now receive the non-compliant rows
const AnalysisResultModal = ({ result, onClose, onPromote, onReview }) => {
    const { compliantCount, nonCompliantCount, nonCompliantRows } = result;
    const canPromote = nonCompliantCount === 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-3xl transform transition-all animate-slide-up">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Analysis Complete</h2>
                    <button onClick={onClose} className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg">
                            <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                            <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-2">{compliantCount}</p>
                            <p className="text-sm font-medium text-green-600 dark:text-green-400">Compliant Records</p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/50 p-4 rounded-lg">
                            <AlertTriangle className="mx-auto h-8 w-8 text-red-500" />
                            <p className="text-2xl font-bold text-red-700 dark:text-red-300 mt-2">{nonCompliantCount}</p>
                            <p className="text-sm font-medium text-red-600 dark:text-red-400">Non-Compliant Records</p>
                        </div>
                    </div>
                    {nonCompliantCount > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Items Requiring Attention</h3>
                            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                {nonCompliantRows.map(item => (
                                    <div key={item.rowNumber} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                                        <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">Row {item.rowNumber}: <span className="text-red-600 dark:text-red-400">{item.reason}</span></p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">Data: {item.rowData.join(', ')}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-8 flex justify-between items-center">
                    {!canPromote ? (
                        <p className="text-sm text-red-600 dark:text-red-400">Fix non-compliant items before promoting.</p>
                    ) : (
                         <p className="text-sm text-green-600 dark:text-green-400">All records are compliant and ready for promotion.</p>
                    )}
                    <div className="flex justify-end space-x-4">
                        {!canPromote && (
                            <button 
                                onClick={() => onReview(nonCompliantRows)} 
                                className="px-6 py-2 border border-yellow-500 text-yellow-500 font-semibold rounded-md flex items-center hover:bg-yellow-500/10"
                            >
                                <Edit size={16} className="mr-2" />
                                Isolate & Review Errors
                            </button>
                        )}
                        <button
                            onClick={onPromote}
                            disabled={!canPromote}
                            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed enabled:hover:bg-blue-500"
                        >
                            Promote to Library <ArrowRight size={16} className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisResultModal;