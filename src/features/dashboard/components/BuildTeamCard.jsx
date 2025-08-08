// src/features/dashboard/components/BuildTeamCard.jsx

import React from 'react';
import { UserPlus } from 'lucide-react';

// This component receives a function prop 'onInvite' to handle the button click
const BuildTeamCard = ({ onInvite }) => {
  return (
    <div className="theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary flex flex-col h-full">
      <h2 className="text-xl font-semibold theme-text-highlight-color mb-2">Build Your Compliance Team</h2>
      <p className="theme-text-secondary text-sm mb-4 flex-grow">
        Get the right people on board. Invite legal, risk, and operational stakeholders to collaborate on the platform.
      </p>
      <button 
        onClick={onInvite}
        className="w-full theme-bg-highlight-color text-black font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center"
      >
        <UserPlus size={18} className="mr-2" />
        Invite Team Member
      </button>
    </div>
  );
};

export default BuildTeamCard;