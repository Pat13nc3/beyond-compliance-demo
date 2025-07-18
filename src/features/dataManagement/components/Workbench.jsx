import React, { useState } from 'react';
import { ArrowLeft, Shield, Edit, ArrowRight } from 'lucide-react';
import AnalysisResultModal from '../modals/AnalysisResultModal.jsx';
import EditRowModal from '../modals/EditRowModal.jsx';

// Mock Data for a User Access Review file
const mockUserAccessData = {
  headers: ['employee_email', 'system_name', 'access_level', 'review_date'],
  rows: [
    ['test.user@example.com', 'Core Banking System', 'User', '2024-07-15'],
    ['another.user@example.com', 'CRM', 'User', '2024-07-16'],
    ['guest.user@example.com', 'Core Banking System', 'Admin', '2024-07-16'], // This will fail validation
    ['admin.user@example.com', 'Salesforce', 'Admin', '2024-07-17'],
    ['auditor.guest@example.com', 'HRIS', 'Admin', '2024-07-18'], // This will also fail
    ['jane.doe@example.com', 'HRIS', 'User', '2024-07-18'],
  ],
};
const mockDestinationSchema = [
  {
    id: 'EmployeeID',
    name: 'EmployeeID',
    description: 'The unique identifier for the employee.',
    required: true,
  },
  {
    id: 'SystemName',
    name: 'SystemName',
    description: 'The name of the system being accessed.',
    required: true,
  },
  {
    id: 'AccessLevel',
    name: 'AccessLevel',
    description: 'The permission level granted.',
    required: true,
  },
  {
    id: 'ReviewDate',
    name: 'ReviewDate',
    description: 'Date of the last access review.',
    required: false,
  },
];

const Workbench = ({ fileData, activeIndicator, onBack, onPromote }) => {
  const [mappings, setMappings] = useState({});
  const [sourceData, setSourceData] = useState(mockUserAccessData);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [problematicRowIds, setProblematicRowIds] = useState(new Set());
  const [editingRow, setEditingRow] = useState(null);
  // New state to track if all initial errors have been resolved
  const [allErrorsResolved, setAllErrorsResolved] = useState(false);

  const handleValidation = () => {
    if (!activeIndicator?.validationRule) {
      alert(
        'No validation rule found for the linked indicator. Please configure the KRI/KPI first.',
      );
      return;
    }

    const { validationRule } = activeIndicator;
    const nonCompliantRows = [];

    sourceData.rows.forEach((rowArray, index) => {
      const rowObject = sourceData.headers.reduce((obj, header, i) => {
        obj[header] = rowArray[i];
        return obj;
      }, {});

      if (validationRule.failsWhen(rowObject)) {
        nonCompliantRows.push({
          rowNumber: index + 1,
          reason: validationRule.description,
          rowData: rowArray,
        });
      }
    });
    
    const result = {
      compliantCount: sourceData.rows.length - nonCompliantRows.length,
      nonCompliantCount: nonCompliantRows.length,
      nonCompliantRows,
    };

    setAnalysisResult(result);
    // If the initial validation is 100% clean, we can promote immediately
    if (result.nonCompliantCount === 0) {
        setAllErrorsResolved(true);
    }
    setIsAnalysisModalOpen(true);
  };

  const handleReviewErrors = (errors) => {
    const errorIds = new Set(errors.map((e) => e.rowNumber));
    setProblematicRowIds(errorIds);
    setIsAnalysisModalOpen(false);
  };

  const handleOpenEditModal = (rowIndex) => {
    setEditingRow({ index: rowIndex, data: sourceData.rows[rowIndex] });
  };

  const handleSaveRow = (updatedData) => {
    const newRows = [...sourceData.rows];
    newRows[editingRow.index] = updatedData;
    setSourceData((prevData) => ({ ...prevData, rows: newRows }));

    const newIds = new Set(problematicRowIds);
    newIds.delete(editingRow.index + 1);
    setProblematicRowIds(newIds);

    // This is the key logic: if the last error was just resolved, update the state
    if (newIds.size === 0) {
        setAllErrorsResolved(true);
    }

    setEditingRow(null);
  };

  const handlePromote = () => {
    // We now check the new state variable for a clear path to promotion
    if (!allErrorsResolved) {
        alert('Please run a validation and resolve all identified issues before promoting.');
        return;
    }
    onPromote();
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <button
        onClick={onBack}
        className="flex items-center text-sm font-semibold text-gray-300 hover:text-white mb-6"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Data Management
      </button>
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-bold">Data Harmonization Workbench</h2>
        <p className="text-gray-400">
          You are validating{' '}
          <span className="text-yellow-400 font-semibold">{fileData.name}</span>{' '}
          against the following indicator:
        </p>
        <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg">
          <p className="font-bold text-yellow-500">{activeIndicator.name}</p>
          <p className="text-sm text-gray-300">
            Rule: "{activeIndicator.validationRule.description}"
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Source Data (Your File)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  {sourceData.headers.map((h) => (
                    <th key={h} className="p-2 bg-gray-700 text-sm font-semibold">
                      {h}
                    </th>
                  ))}
                  <th className="p-2 bg-gray-700 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {sourceData.rows.map((row, index) => {
                  const rowNumber = index + 1;
                  const isProblematic = problematicRowIds.has(rowNumber);
                  return (
                    <tr
                      key={index}
                      className={`border-b border-gray-700 transition-colors duration-300 ${
                        isProblematic
                          ? 'bg-red-900/50'
                          : 'hover:bg-gray-700/50'
                      }`}
                    >
                      {row.map((cell, i) => (
                        <td key={i} className="p-2 text-sm">
                          {cell}
                        </td>
                      ))}
                      <td className="p-2 text-center">
                        {isProblematic && (
                          <button
                            onClick={() => handleOpenEditModal(index)}
                            className="text-xs bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded flex items-center mx-auto"
                          >
                            <Edit size={12} className="mr-1" /> Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">
            Destination Schema (Platform)
          </h3>
          <div className="space-y-4">
            {mockDestinationSchema.map((field) => (
              <div key={field.id} className="bg-gray-700 p-4 rounded-lg">
                <label className="block text-md font-semibold text-gray-100">
                  {field.name}{' '}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <p className="text-xs text-gray-400 mb-2">
                  {field.description}
                </p>
                <select className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-yellow-500 focus:border-yellow-500">
                  <option value="" disabled>
                    Select a source column...
                  </option>
                  {sourceData.headers.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        {/* New Smart Button Logic */}
        {allErrorsResolved ? (
           <button
            onClick={handlePromote}
            className="bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-500 flex items-center"
          >
            Promote to Library <ArrowRight size={18} className="ml-2" />
          </button>
        ) : (
          <button
            onClick={handleValidation}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-500 flex items-center"
          >
            <Shield size={18} className="mr-2" /> Validate & Run Analysis
          </button>
        )}
      </div>
      {isAnalysisModalOpen && (
        <AnalysisResultModal
          result={analysisResult}
          onClose={() => setIsAnalysisModalOpen(false)}
          onPromote={handlePromote}
          onReview={handleReviewErrors}
        />
      )}
      {editingRow && (
        <EditRowModal
          rowData={editingRow.data}
          headers={sourceData.headers}
          onClose={() => setEditingRow(null)}
          onSave={handleSaveRow}
        />
      )}
    </div>
  );
};

export default Workbench;
