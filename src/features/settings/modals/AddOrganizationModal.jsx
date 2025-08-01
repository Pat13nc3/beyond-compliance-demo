// src/features/settings/modals/AddOrganizationModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';

const AddOrganizationModal = ({ onClose, onSave, organization }) => {
  const [formState, setFormState] = useState({
    name: '',
    type: 'Bank Partner',
    representativeEmail: '',
    status: 'Active',
    sharedData: [],
    lastActivity: new Date().toISOString().slice(0, 10),
  });

  const isEditing = !!organization;
  const title = isEditing ? 'Edit Organization' : 'Add New Organization';
  const buttonText = isEditing ? 'Save Changes' : 'Add Organization';

  useEffect(() => {
    if (isEditing) {
      setFormState({
        name: organization.name || '',
        type: organization.type || 'Bank Partner',
        representativeEmail: organization.representativeEmail || '',
        status: organization.status || 'Active',
        sharedData: organization.sharedData || [],
        lastActivity: organization.lastActivity || new Date().toISOString().slice(0, 10),
      });
    } else {
      setFormState({
        name: '',
        type: 'Bank Partner',
        representativeEmail: '',
        status: 'Active',
        sharedData: [],
        lastActivity: new Date().toISOString().slice(0, 10),
      });
    }
  }, [isEditing, organization]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSharedDataChange = (e) => {
    const { value, checked } = e.target;
    setFormState(prev => {
      const newSharedData = checked
        ? [...prev.sharedData, value]
        : prev.sharedData.filter(data => data !== value);
      return { ...prev, sharedData: newSharedData };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formState,
      id: isEditing ? organization.id : `org-${Date.now()}`
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg text-white"> {/* Changed from bg-white */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700"> {/* Added border-gray-700 */}
          <h2 className="text-xl font-bold text-[#c0933e]">{title}</h2> {/* Applied yellow accent color */}
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700"> {/* Adjusted hover bg */}
            <X size={20} className="text-gray-400" /> {/* Adjusted icon color */}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Organization Name</label> {/* Adjusted text color */}
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white" /* Adjusted input style */
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">Organization Type</label> {/* Adjusted text color */}
            <select
              id="type"
              name="type"
              value={formState.type}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white" /* Adjusted select style */
            >
              <option value="Bank Partner">Bank Partner</option>
              <option value="Legal Firm">Legal Firm</option>
              <option value="Auditor">Auditor</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="representativeEmail" className="block text-sm font-medium text-gray-300 mb-1">Representative Email</label> {/* Adjusted text color */}
            <input
              type="email"
              id="representativeEmail"
              name="representativeEmail"
              value={formState.representativeEmail}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white" /* Adjusted input style */
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">Status</label> {/* Adjusted text color */}
            <select
              id="status"
              name="status"
              value={formState.status}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white" /* Adjusted select style */
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Shared Data Permissions</h3> {/* Adjusted text color */}
            <div className="grid grid-cols-2 gap-2 p-3 bg-gray-700 rounded-md max-h-48 overflow-y-auto custom-scrollbar"> {/* Adjusted background and added scrollbar */}
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="sharedData"
                  value="KYC Records (Limited)"
                  checked={formState.sharedData.includes('KYC Records (Limited)')}
                  onChange={handleSharedDataChange}
                  className="rounded text-blue-600 border-gray-600 focus:ring-blue-500 bg-gray-900" /* Adjusted checkbox style */
                />
                <span className="ml-2 text-sm text-gray-300">KYC Records (Limited)</span> {/* Adjusted text color */}
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="sharedData"
                  value="Transaction Data (Filtered)"
                  checked={formState.sharedData.includes('Transaction Data (Filtered)')}
                  onChange={handleSharedDataChange}
                  className="rounded text-blue-600 border-gray-600 focus:ring-blue-500 bg-gray-900" /* Adjusted checkbox style */
                />
                <span className="ml-2 text-sm text-gray-300">Transaction Data (Filtered)</span> {/* Adjusted text color */}
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="sharedData"
                  value="Compliance Reports"
                  checked={formState.sharedData.includes('Compliance Reports')}
                  onChange={handleSharedDataChange}
                  className="rounded text-blue-600 border-gray-600 focus:ring-blue-500 bg-gray-900" /* Adjusted checkbox style */
                />
                <span className="ml-2 text-sm text-gray-300">Compliance Reports</span> {/* Adjusted text color */}
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="sharedData"
                  value="Audit Logs"
                  checked={formState.sharedData.includes('Audit Logs')}
                  onChange={handleSharedDataChange}
                  className="rounded text-blue-600 border-gray-600 focus:ring-blue-500 bg-gray-900" /* Adjusted checkbox style */
                />
                <span className="ml-2 text-sm text-gray-300">Audit Logs</span> {/* Adjusted text color */}
              </label>
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-gray-700"> {/* Adjusted border-t color */}
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 mr-2" /* Adjusted button style */
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#c0933e] text-[#1e252d] font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 flex items-center" /* Adjusted button style */
            >
              {isEditing ? <Save size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrganizationModal;