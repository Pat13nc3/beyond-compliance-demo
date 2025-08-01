// src/features/settings/components/OrganizationsView.jsx
import React, { useState } from 'react';
import { Plus, Pencil, Trash2, ShieldCheck, Clock, User, Filter, Building2 } from 'lucide-react';
import { mockPartners, mockPartnerTiers } from '../../../data/mockData'; // Ensure mockPartnerTiers is imported
import AddOrganizationModal from '../modals/AddOrganizationModal';

const statusStyles = {
  'Active': 'bg-green-100 text-green-700',
  'Inactive': 'bg-red-100 text-red-700',
};

const OrganizationsView = ({ organizations, onAddOrganization, onEditOrganization, onDeleteOrganization }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const handleOpenModal = (org = null) => {
    setSelectedOrganization(org);
    setIsModalOpen(true);
  };
  
  return (
    <div className="space-y-8">
      {/* Organizations List Section */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white"> {/* Changed from bg-white */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#c0933e]">Organizations List</h3> {/* Applied yellow accent color */}
          <button
            onClick={() => onAddOrganization()}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 flex items-center transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Add Organization
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left table-auto">
            <thead className="text-gray-400 border-b-2 border-gray-700"> {/* Adjusted text and border color */}
              <tr>
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Representative Email</th> {/* Added new table header */}
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map(org => (
                <tr key={org.id} className="border-b border-gray-700 hover:bg-gray-700"> {/* Adjusted border and hover bg */}
                  <td className="py-3 px-4 font-medium text-gray-200">{org.name}</td> {/* Adjusted text color */}
                  <td className="py-3 px-4 text-sm text-gray-300">{org.type}</td> {/* Adjusted text color */}
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[org.status]}`}>
                      {org.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-300">{org.representativeEmail}</td> {/* Added new table data cell */}
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button onClick={() => onEditOrganization(org)} className="text-blue-400 hover:text-blue-200 transition-colors"> {/* Adjusted text colors */}
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => onDeleteOrganization(org.id)} className="text-red-400 hover:text-red-200 transition-colors"> {/* Adjusted text colors */}
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Partner Tiers Section (Like Roles) */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white"> {/* Changed from bg-white */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#c0933e]">Partner Tiers</h3> {/* Applied yellow accent color */}
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 flex items-center transition-colors">
            <Plus size={16} className="mr-2" />
            Create New Tier
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPartnerTiers.map(tier => (
            <div key={tier.id} className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors"> {/* Adjusted border and hover bg */}
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-200">{tier.name}</h4> {/* Adjusted text color */}
                <button className="text-gray-400 hover:text-gray-200"> {/* Adjusted text colors */}
                  <Pencil size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-400 mb-3">{tier.description}</p> {/* Adjusted text color */}
              <div className="flex items-center text-sm text-gray-400"> {/* Adjusted text color */}
                <Building2 size={14} className="mr-2" />
                {tier.accessLevel}
              </div>
              <div className="mt-4">
                <span className="font-medium text-gray-200">Permissions:</span> {/* Adjusted text color */}
                <ul className="list-disc list-inside text-sm text-gray-400 mt-1 space-y-1"> {/* Adjusted text color */}
                  {tier.permissions.map((perm, index) => (
                    <li key={index} className="flex items-center">
                      <ShieldCheck size={14} className="text-green-500 mr-2" /> {perm}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationsView;