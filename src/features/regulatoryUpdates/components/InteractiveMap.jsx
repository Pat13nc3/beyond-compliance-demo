// src/features/regulatoryUpdates/components/InteractiveMap.jsx

import React from 'react';
import { Lightbulb, Newspaper } from 'lucide-react';

// CORRECTED: Use the correct relative path to reach the assets folder
import nairobiSkyline from '../../../assets/nairobi-skyline.jpg';
import johannesburgSkyline from '../../../assets/johannesburg-skyline.jpg';
import accraSkyline from '../../../assets/accra-skyline.jpg';
import lagosSkyline from '../../../assets/lagos-skyline.jpg';
import globalSkyline from '../../../assets/global-skyline.jpg';


const cityData = [
    { name: 'Nairobi', jurisdiction: 'Kenya', image: nairobiSkyline },
    { name: 'Johannesburg', jurisdiction: 'South Africa', image: johannesburgSkyline },
    { name: 'Accra', jurisdiction: 'Ghana', image: accraSkyline },
    { name: 'Lagos', jurisdiction: 'Nigeria', image: lagosSkyline },
    { name: 'Global', jurisdiction: 'Global', image: globalSkyline }, 
];

const InteractiveMap = ({ updates, onJurisdictionClick, activeJurisdiction }) => {
    const getUpdateCount = (jurisdiction) => {
        return updates.filter(u => u.jurisdiction === jurisdiction).length;
    };
    
    return (
        <div className="theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary h-full">
            <h3 className="text-xl font-semibold mb-4">Regulatory Updates Map</h3>
            <p className="text-sm theme-text-secondary mb-4">Click a city to filter updates by jurisdiction.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cityData.map(city => (
                    <button
                        key={city.name}
                        onClick={() => onJurisdictionClick(city.jurisdiction)}
                        className={`relative p-2 rounded-lg flex flex-col items-center justify-end h-40 text-white font-bold transition-all duration-200 hover:scale-105 overflow-hidden
                            ${activeJurisdiction === city.jurisdiction ? 'bg-blue-600 ring-2 ring-blue-300' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                        {/* The actual image is now rendered here */}
                        <img 
                            src={city.image} 
                            alt={`${city.name} skyline`} 
                            className={`absolute inset-0 w-full h-full object-cover opacity-100 ${activeJurisdiction !== city.jurisdiction ? 'grayscale' : ''}`}
                        />
                        <span className="relative z-10 text-lg">{city.name}</span>
                        {getUpdateCount(city.jurisdiction) > 0 && (
                            <span className="absolute top-2 right-2 flex items-center justify-center h-6 w-6 bg-red-500 text-white text-xs rounded-full">
                                {getUpdateCount(city.jurisdiction)}
                            </span>
                        )}
                    </button>
                ))}
            </div>
            <div className="flex justify-center mt-4 space-x-4 text-xs theme-text-secondary">
                 <span className="flex items-center"><Newspaper size={16} className="mr-1 text-white" /> Updates Available</span>
            </div>
        </div>
    );
};

export default InteractiveMap;