import React from 'react';
import { X, Filter, Download, Share2 } from 'lucide-react';

// Import the new analysis component and the other charts
import ControlHotspotAnalysis from "../components/ControlHotspotAnalysis.jsx";
import KycChart from "../components/KycChart.jsx";
import FraudChart from "../components/FraudChart.jsx";

const AnalyticsCenterModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-7xl max-h-[90vh] flex flex-col text-white">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e]">Compliance Analytics Center</h3>
                    <div className="flex items-center space-x-2">
                         <button className="p-2 rounded-md hover:bg-gray-700"><Download size={20} /></button>
                         <button className="p-2 rounded-md hover:bg-gray-700"><Share2 size={20} /></button>
                         <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-700"><X size={24} /></button>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap gap-4 items-center mb-4 p-4 bg-gray-800 rounded-lg">
                    <Filter size={20} className="text-[#c0933e]"/>
                    <h4 className="font-semibold mr-4">Filters:</h4>
                    <div>
                        <label className="text-xs text-gray-400">Jurisdiction</label>
                        <select className="w-full bg-gray-700 border-gray-600 rounded p-1 text-sm"><option>Nigeria</option><option>Kenya</option></select>
                    </div>
                     <div>
                        <label className="text-xs text-gray-400">Regulator</label>
                        <select className="w-full bg-gray-700 border-gray-600 rounded p-1 text-sm"><option>CBN</option><option>ODPC</option></select>
                    </div>
                     <div>
                        <label className="text-xs text-gray-400">License</label>
                        <select className="w-full bg-gray-700 border-gray-600 rounded p-1 text-sm"><option>PSP</option><option>DASP</option></select>
                    </div>
                </div>


                {/* Charts Grid */}
                <div className="flex-grow overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-6 p-2">
                    {/* --- THIS IS THE NEW COMPONENT --- */}
                    <div className="lg:col-span-2 bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-bold mb-4">Control Hotspot Analysis</h4>
                        <ControlHotspotAnalysis />
                    </div>
                    
                    {/* KYC Status Chart */}
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">KYC Status</h4>
                        <div className="h-80"><KycChart /></div>
                    </div>
                    
                    {/* Fraud Chart */}
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Fraud/ML Transactions</h4>
                        <div className="h-80"><FraudChart /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCenterModal;