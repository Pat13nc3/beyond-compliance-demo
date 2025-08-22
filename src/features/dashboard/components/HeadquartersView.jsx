// src/features/dashboard/components/HeadquartersView.jsx

import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

const HeadquartersView = ({ structure, selectedEntityId, onSelectEntity, jurisdiction, activeProduct }) => {
  if (!structure) return null;

  const getStatus = (status) => (
    status === 'Active'
      ? <span className="flex items-center text-sm text-green-400"><CheckCircle className="h-5 w-5 mr-1" /> Active</span>
      : <span className="flex items-center text-sm text-yellow-400"><Clock className="h-5 w-5 mr-1" /> In Review</span>
  );

  const allEntities = [structure.parent, ...structure.subsidiaries];

  const filteredEntities = allEntities.filter(entity => {
    // Check if the entity matches the selected jurisdiction
    const matchesJurisdiction = jurisdiction === 'Global' || entity.location.includes(jurisdiction);

    // Check if the entity matches the selected product
    const matchesProduct = activeProduct === 'All Products' || entity.products.includes(activeProduct);

    return matchesJurisdiction && matchesProduct;
  });

  return (
    <div className="space-y-3">
      {filteredEntities.length > 0 ? (
        filteredEntities.map((entity) => (
          <div
            key={entity.id}
            className={`p-3 border rounded-lg theme-bg-card-alt cursor-pointer transition-all duration-200 ${
              selectedEntityId === entity.id ? 'border-blue-500 ring-2 ring-blue-300' : 'theme-border-color hover:border-blue-500'
            } ${entity.id !== structure.parent.id ? 'ml-4' : ''}`}
            onClick={() => onSelectEntity(entity.id)}
          >
            <p className="font-bold theme-text-primary">{entity.name}</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm theme-text-secondary">{entity.location}</p>
              {getStatus(entity.status)}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 theme-text-secondary">
          No entities found for the selected filters.
        </div>
      )}
    </div>
  );
};

export default HeadquartersView;