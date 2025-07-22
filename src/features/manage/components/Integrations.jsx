// src/features/manage/Integrations.jsx

import React from 'react';

const Integrations = ({ integrations }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg text-white">
      <h3 className="text-xl font-bold mb-4">Integrations (Placeholder)</h3>
      <p className="text-gray-400">
        This is a placeholder for the Integrations component.
        Integrations from mockData.js: {integrations ? integrations.length : 0} integrations.
      </p>
      {/* You can add basic UI here later if needed */}
    </div>
  );
};

export default Integrations;