// src/features/dashboard/modals/FraudDrilldownModal.jsx

import React from 'react';
import { X } from 'lucide-react';

const FraudDrilldownModal = ({ dayData, onClose }) => {
    if (!dayData) return null;

    // Calculate success rate separately for clarity and to avoid syntax issues
    const successRate = ((dayData.prevented / (dayData.attempted + dayData.prevented)) * 100 || 0).toFixed(1);

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative border border-gray-700">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors"
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>
                <h3 className="text-2xl font-bold text-[#c0933e] mb-4 border-b border-gray-700 pb-2">
                    Fraud Details for {dayData.day} ({dayData.fullDate})
                </h3>

                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                    <div>
                        <p className="text-lg font-semibold text-red-400">Attempted Fraud: {dayData.attempted}</p>
                        <p className="text-lg font-semibold text-blue-400">Prevented Fraud: {dayData.prevented}</p>
                    </div>
                    <div>
                        <p className="text-sm">Total Events: {dayData.details.length}</p>
                        {/* Use the pre-calculated successRate variable */}
                        <p className="text-sm">Success Rate: {successRate}%</p>
                    </div>
                </div>

                <h4 className="text-xl font-semibold text-gray-200 mb-3">Individual Fraud Events:</h4>
                {dayData.details.length > 0 ? (
                    <div className="space-y-3">
                        {dayData.details.map((event, index) => (
                            <div key={event.id} className="bg-gray-700 p-3 rounded-md border border-gray-600 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-white">{event.description}</p>
                                    <p className="text-sm text-gray-400">Type: {event.type} | Date: {event.date} | Status: {event.status}</p>
                                </div>
                                <span className={`font-bold text-lg ${event.type === 'Attempted' ? 'text-red-300' : 'text-blue-300'}`}>
                                    ${parseFloat(event.amount).toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No detailed events for this day.</p>
                )}
            </div>
        </div>
    );
};

export default FraudDrilldownModal;