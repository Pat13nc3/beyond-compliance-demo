import React from 'react';
import { AlertTriangle, XCircle, CheckCircle, ChevronRight } from 'lucide-react';
import { controlHotspotData } from '../../data/mockData';

const ControlHotspotAnalysis = () => {

    const statusStyles = {
        'Failing': { icon: <XCircle className="text-red-500" />, color: 'border-red-500', textColor: 'text-red-400' },
        'At Risk': { icon: <AlertTriangle className="text-yellow-500" />, color: 'border-yellow-500', textColor: 'text-yellow-400' },
        'Compliant': { icon: <CheckCircle className="text-green-500" />, color: 'border-green-500', textColor: 'text-green-400' }
    };

    return (
        <div className="space-y-3">
            {controlHotspotData.map(control => {
                const style = statusStyles[control.status];
                return (
                    <div key={control.id} className={`bg-gray-900 p-4 rounded-lg border-l-4 ${style.color} flex items-center justify-between`}>
                        <div className="flex items-center">
                            <div className="mr-4">{style.icon}</div>
                            <div>
                                <p className="font-bold text-white">{control.name} <span className="text-xs text-gray-500 ml-2">({control.id})</span></p>
                                <p className={`text-sm ${style.textColor}`}>{control.status}: <span className="text-gray-300">{control.reason}</span></p>
                            </div>
                        </div>
                        <button className="bg-[#c0933e] text-[#1e252d] text-sm font-bold py-2 px-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center">
                            {control.cta} <ChevronRight size={16} className="ml-1" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default ControlHotspotAnalysis;