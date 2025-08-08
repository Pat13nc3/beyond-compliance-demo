// src/features/manage/components/PartnerCollaborationView.jsx

import React, { useState, useEffect } from 'react';
import { Plus, Settings, Activity, Users, Share2, Save } from 'lucide-react';

const PartnerCollaborationView = ({ partners, onSavePartnerSettings, setToastMessage, onAddPartner, onEditPartner, onConfigureSharing, onViewSharingActivity }) => {
    // 'partners' state is now managed by the parent (Manage/index.jsx) and passed as a prop.
    // No internal 'useState' for partners here, as it's controlled.

    // Effect for initial settings is not needed here as 'partners' is a direct prop.
    // If you need to re-initialize something based on initialPartnerSettings, keep this.
    // useEffect(() => {
    //     if (initialPartnerSettings.partners) {
    //         // Example: if partners inside this component was managed by useState
    //         // setPartners(initialPartnerSettings.partners);
    //     }
    // }, [initialPartnerSettings]);

    const handleAddPartnerClick = () => {
        onAddPartner(); // Calls the onAddPartner prop from Manage/index.jsx
    };

    const handleConfigureSharingClick = (partner, e) => { // Added 'e' to stop propagation
        e.stopPropagation(); // Prevent the card's onClick from firing
        onConfigureSharing(partner); // Calls the onConfigureSharing prop from Manage/index.jsx
    };

    const handleViewSharingActivityClick = (partner, e) => { // Added 'e' to stop propagation
        e.stopPropagation(); // Prevent the card's onClick from firing
        onViewSharingActivity(partner); // Calls the onViewSharingActivity prop from Manage/index.jsx
    };

    const handleSaveSettings = () => {
        onSavePartnerSettings(); // Calls the onSavePartnerSettings prop from Manage/index.jsx
        // The partners state is managed in the parent, so we just trigger save.
    };

    return (
        <div className="theme-bg-card p-6 rounded-lg shadow-md theme-text-primary space-y-6">
            <h3 className="text-xl font-semibold theme-text-highlight-color mb-4 flex items-center">
                <Users size={24} className="mr-3 theme-text-secondary" /> Partner Collaboration
            </h3>

            <div className="flex justify-end mb-4">
                <button
                    onClick={handleAddPartnerClick} // Correctly triggers the add action in parent
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center text-sm"
                >
                    <Plus size={16} className="mr-2" /> Add New Partner
                </button>
            </div>

            <div className="space-y-4">
                {partners.length === 0 ? (
                    <p className="theme-text-secondary text-center py-8">No partners configured yet. Click "Add New Partner" to get started.</p>
                ) : (
                    partners.map(partner => (
                        <div
                            key={partner.id}
                            className="bg-white dark:bg-gray-700 p-4 rounded-md flex items-center justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            onClick={() => onEditPartner(partner)} // Clicking the card triggers edit
                        >
                            <div>
                                <p className="font-semibold theme-text-primary">{partner.name} <span className="text-sm theme-text-secondary">({partner.type})</span></p>
                                <p className="text-xs theme-text-secondary">Status: {partner.status} | Last Activity: {partner.lastActivity}</p>
                                <p className="text-sm theme-text-secondary mt-1 flex items-center">
                                    <Share2 size={14} className="mr-1 theme-text-secondary" /> Shared Data: {partner.sharedData.length > 0 ? partner.sharedData.join(', ') : 'None'}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={(e) => handleConfigureSharingClick(partner, e)} // Corrected handler, stops propagation
                                    className="p-2 rounded-full theme-text-secondary hover:bg-gray-200 dark:hover:bg-gray-600"
                                    title="Configure Sharing"
                                >
                                    <Settings size={20} />
                                </button>
                                <button
                                    onClick={(e) => handleViewSharingActivityClick(partner, e)} // Corrected handler, stops propagation
                                    className="p-2 rounded-full theme-text-secondary hover:bg-gray-200 dark:hover:bg-gray-600"
                                    title="View Sharing Activity"
                                >
                                    <Activity size={20} />
                                </button>
                                {/* An explicit edit button if needed, which also calls onEditPartner */}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-end pt-4 border-t theme-border-color mt-6">
                <button
                    onClick={handleSaveSettings}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 flex items-center"
                >
                    <Save size={16} className="mr-2"/> Save Partner Settings
                </button>
            </div>
        </div>
    );
};

export default PartnerCollaborationView;