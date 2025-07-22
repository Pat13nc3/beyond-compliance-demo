import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Edit, ArrowRight, CheckCircle, AlertTriangle, Info, Download } from 'lucide-react';
import AnalysisResultModal from '../modals/AnalysisResultModal.jsx';
import EditRowModal from '../modals/EditRowModal.jsx';
import { mockUserAccessData, mockTransactionData } from '../../../data/mockData.js'; // UPDATED: Import mock data from shared file


const mockDestinationSchema = [
  {
    id: 'EmployeeID',
    name: 'Employee ID',
    description: 'The unique identifier for the employee.',
    required: true,
    expectedFormat: 'string'
  },
  {
    id: 'EmployeeEmail',
    name: 'Employee Email',
    description: 'The official email address of the employee.',
    required: true,
    expectedFormat: 'email'
  },
  {
    id: 'SystemAccessed',
    name: 'System Accessed',
    description: 'The name of the system being accessed.',
    required: true,
    expectedFormat: 'string'
  },
  {
    id: 'GrantedAccessLevel',
    name: 'Granted Access Level',
    description: 'The permission level granted (e.g., User, Admin, Auditor).',
    required: true,
    allowedValues: ['User', 'Admin', 'Auditor', 'Viewer']
  },
  {
    id: 'LastAccessReviewDate',
    name: 'Last Access Review Date',
    description: 'Date of the last access review.',
    required: false,
    expectedFormat: 'date'
  },
  {
    id: 'AccountStatus',
    name: 'Account Status',
    description: 'Current status of the employee account (Active, Inactive, Suspended).',
    required: true,
    allowedValues: ['Active', 'Inactive', 'Suspended']
  },
  {
    id: 'Department',
    name: 'Department',
    description: 'The department the employee belongs to.',
    required: true,
    expectedFormat: 'string'
  },
  {
    id: 'LastActivityDays',
    name: 'Days Since Last Activity',
    description: 'Number of days since the employee last showed activity in the system.',
    required: false,
    expectedFormat: 'number',
    maxValue: 90 // Example: Policy requires activity within 90 days for IT users
  }
];

/**
 * Helper function to validate email format.
 * @param {string} email - The email string to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Helper function to validate date format (simple check for YYYY-MM-DD).
 * @param {string} dateString - The date string to validate.
 * @returns {boolean} True if the date string is in YYYY-MM-DD format, false otherwise.
 */
const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

/**
 * Workbench Component
 *
 * This component provides an interface for data harmonization and validation.
 * Users can review source data, map it to a destination schema, and run
 * compliance analysis based on a linked indicator's validation rules.
 * It also facilitates remediation of non-compliant rows.
 *
 * Props:
 * - fileData: The file object being analyzed.
 * - activeIndicator: The indicator (KRI/KPI) against which the data is being validated.
 * - onBack: Function to navigate back to the main Data Management view.
 * - onPromote: Function to call when the analyzed file is ready to be promoted to the library.
 * - setToastMessage: Function to display toast notifications for user feedback.
 * - sourceDataForWorkbench: The actual mock data (e.g., mockUserAccessData or mockTransactionData) to be used.
 */
// UPDATED: Added sourceDataForWorkbench to props
const Workbench = ({ fileData, activeIndicator, onBack, onPromote, setToastMessage, sourceDataForWorkbench }) => {
  // UPDATED: Initialize sourceData state with the passed prop
  const [sourceData, setSourceData] = useState(sourceDataForWorkbench);

  // UPDATED: Adjust mappings based on the new dynamic sourceData
  const [mappings, setMappings] = useState(
    mockDestinationSchema.reduce((acc, field) => {
      // Attempt to pre-map based on exact header name match (case-insensitive)
      const matchedHeader = sourceDataForWorkbench.headers.find( // Use sourceDataForWorkbench here
        h => h.toLowerCase() === field.name.toLowerCase().replace(/ /g, '_') || // e.g., "Employee ID" -> "employee_id"
             h.toLowerCase() === field.id.toLowerCase()
      );
      if (matchedHeader) {
        acc[field.id] = matchedHeader;
      }
      return acc;
    }, {})
  );
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [problematicRowIds, setProblematicRowIds] = useState(new Set());
  const [editingRow, setEditingRow] = useState(null);
  const [allErrorsResolved, setAllErrorsResolved] = useState(false);
  const [dataQualityMetrics, setDataQualityMetrics] = useState({}); // New state for data quality

  // Define a comprehensive default validation rule (used if activeIndicator.validationRule is missing)
  // NOTE: This default is for user access data. If a transaction file is loaded without a specific indicator,
  // it might not validate as expected. This is handled by passing activeIndicator.validationRule.
  const defaultValidationRule = {
    description: "Comprehensive user access review: Checks for invalid emails, inappropriate access levels, inactive user access, outdated activity, missing departments, and duplicate employee IDs.",
    rules: [
      {
        field: 'employee_email',
        check: (value) => value && isValidEmail(value),
        errorMessage: (value) => `Invalid or missing email format for '${value}'. This affects user identification and notification compliance.`,
      },
      {
        field: 'access_level',
        check: (value, rowObject) => !(value === 'Admin' && rowObject.employee_email?.includes('guest')),
        errorMessage: (rowObject) => `Unauthorized 'Admin' access for 'guest' user (${rowObject.employee_email}). This is a critical security and compliance violation.`,
      },
      {
        field: 'status',
        check: (value, rowObject) => !(value === 'Inactive' && (rowObject.access_level === 'Admin' || rowObject.access_level === 'User' || rowObject.access_level === 'Viewer')),
        errorMessage: (rowObject) => `Inactive user (${rowObject.employee_email}) still has active access (${rowObject.access_level}). This poses a significant security risk and violates access control policies.`,
      },
      {
        field: 'last_login_date',
        check: (value) => value && isValidDate(value),
        errorMessage: (value) => `Invalid date format for 'last_login_date' (${value}). Accurate timestamps are crucial for audit trails and activity monitoring.`,
      },
      {
        field: 'department',
        check: (value) => value && value.trim() !== '',
        errorMessage: "Missing department information. This impacts organizational structure and role-based access compliance.",
      },
      {
        field: 'last_activity_days',
        check: (value, rowObject) => {
            const days = parseInt(value, 10);
            // Rule: IT department users must have activity within 90 days
            if (rowObject.department === 'IT' && days > 90) return false;
            return true;
        },
        errorMessage: (rowObject) => `IT department user (${rowObject.employee_email}) has not been active for over 90 days (${rowObject.last_activity_days} days). This indicates potential stale access and requires review for security compliance.`,
      },
    ],
  };

  // Function to calculate data quality metrics
  const calculateDataQuality = (data, headers, rules) => {
    const metrics = {};
    const totalRows = data.length;

    headers.forEach((header, colIndex) => {
      let completenessCount = 0;
      let formatValidCount = 0;
      let uniqueCount = new Set();

      data.forEach(rowArray => {
        const value = rowArray[colIndex];
        if (value !== null && value !== undefined && String(value).trim() !== '') {
          completenessCount++;
          uniqueCount.add(value);
        }

        // Find relevant schema field based on the header or id
        const schemaField = mockDestinationSchema.find(field =>
            field.name.toLowerCase().replace(/ /g, '_') === header.toLowerCase() ||
            field.id.toLowerCase() === header.toLowerCase()
        );

        if (schemaField) {
            if (schemaField.expectedFormat === 'email' && isValidEmail(value)) formatValidCount++;
            else if (schemaField.expectedFormat === 'date' && isValidDate(value)) formatValidCount++;
            else if (schemaField.expectedFormat === 'number' && !isNaN(parseFloat(value))) formatValidCount++;
            // Add other format checks as needed
        }
      });

      metrics[header] = {
        completeness: totalRows > 0 ? ((completenessCount / totalRows) * 100).toFixed(2) : 0,
        uniqueness: totalRows > 0 ? ((uniqueCount.size / totalRows) * 100).toFixed(2) : 0,
        formatValidity: totalRows > 0 ? ((formatValidCount / totalRows) * 100).toFixed(2) : 0,
      };
    });
    return metrics;
  };

  // Recalculate data quality metrics whenever sourceData changes
  useEffect(() => {
    // UPDATED: Pass sourceData.headers to calculateDataQuality
    setDataQualityMetrics(calculateDataQuality(sourceData.rows, sourceData.headers, activeIndicator.validationRule.rules || defaultValidationRule.rules));
  }, [sourceData, activeIndicator.validationRule.rules, defaultValidationRule.rules]);


  const handleValidation = () => {
    // Ensure validationRule is always an object with a 'rules' array
    const validationRule = activeIndicator?.validationRule || defaultValidationRule;
    if (!validationRule || !Array.isArray(validationRule.rules)) {
      setToastMessage(
        'Validation rules are not properly configured for this indicator. Please check the indicator definition.',
      );
      return;
    }

    const currentNonCompliantRows = []; // Use a new array for current validation run
    const employeeIdOccurrences = {}; // To track occurrences for uniqueness check

    sourceData.rows.forEach((rowArray, index) => {
      const rowObject = sourceData.headers.reduce((obj, header, i) => {
        obj[header] = rowArray[i];
        return obj;
      }, {});

      let rowCompliant = true;
      let reasons = [];

      // Uniqueness check for employee_id (only if 'employee_id' header exists in current data)
      if (sourceData.headers.includes('employee_id')) {
          const employeeId = rowObject.employee_id;
          if (employeeId) { // Only check if employee_id exists
              if (employeeIdOccurrences[employeeId]) {
                  employeeIdOccurrences[employeeId].push(index + 1);
                  rowCompliant = false;
                  reasons.push('Duplicate employee ID found. Unique identifiers are critical for data integrity and accurate reporting.');
              } else {
                  employeeIdOccurrences[employeeId] = [index + 1];
              }
          }
      }


      // Check each rule individually to get specific reasons
      validationRule.rules.forEach((rule) => {
        // Ensure the field exists in the current rowObject before checking
        if (Object.prototype.hasOwnProperty.call(rowObject, rule.field)) {
            if (!rule.check(rowObject[rule.field], rowObject)) {
              rowCompliant = false;
              const msg = typeof rule.errorMessage === 'function'
                ? rule.errorMessage(rule.field === 'last_login_date' || rule.field === 'employee_email' || rule.field === 'last_activity_days' ? rowObject[rule.field] : rowObject)
                : rule.errorMessage;
              reasons.push(msg);
            }
        }
      });

      if (!rowCompliant) {
        currentNonCompliantRows.push({ // Push to the new array
          rowNumber: index + 1,
          reason: reasons.join('; '),
          rowData: rowArray,
        });
      }
    });

    // After iterating all rows, if any employee_id had more than one occurrence, add errors for all of them
    if (sourceData.headers.includes('employee_id')) { // Only run if 'employee_id' header exists
        Object.keys(employeeIdOccurrences).forEach(id => {
            if (employeeIdOccurrences[id].length > 1) {
                employeeIdOccurrences[id].forEach(rowNum => {
                    // Ensure we don't add duplicate error messages if already caught by another rule
                    if (!currentNonCompliantRows.some(r => r.rowNumber === rowNum && r.reason.includes('Duplicate employee ID'))) {
                        currentNonCompliantRows.push({
                            rowNumber: rowNum,
                            reason: 'Duplicate employee ID found. Unique identifiers are critical for data integrity and accurate reporting.',
                            rowData: sourceData.rows[rowNum - 1]
                        });
                    }
                });
            }
        });
    }

    // Sort nonCompliantRows by rowNumber to ensure consistent display
    currentNonCompliantRows.sort((a, b) => a.rowNumber - b.rowNumber);
    
    const result = {
      compliantCount: sourceData.rows.length - currentNonCompliantRows.length,
      nonCompliantCount: currentNonCompliantRows.length,
      nonCompliantRows: currentNonCompliantRows, // Pass the newly calculated non-compliant rows
    };

    setAnalysisResult(result);
    if (result.nonCompliantCount === 0) {
        setAllErrorsResolved(true);
        setToastMessage('Analysis complete: All records are compliant!');
        setIsAnalysisModalOpen(false); // Close modal automatically if all resolved
    } else {
        setAllErrorsResolved(false); // Ensure this is false if there are still errors
        setToastMessage(`Analysis complete: ${result.nonCompliantCount} non-compliant records found. Review required.`);
        setIsAnalysisModalOpen(true); // Open modal if there are errors
    }
  };

  const handleReviewErrors = (errors) => {
    // This function is called when "Isolate & Review Errors" is clicked in AnalysisResultModal
    // The problematicRowIds state is already set by handleValidation, so we just close the modal
    setIsAnalysisModalOpen(false);
  };

  const handleOpenEditModal = (rowIndex) => {
    setEditingRow({ index: rowIndex, data: sourceData.rows[rowIndex] });
  };

  const handleSaveRow = (updatedData) => {
    // 1. Update the sourceData with the new row
    setSourceData(prevSourceData => {
      const newRows = [...prevSourceData.rows];
      newRows[editingRow.index] = updatedData;
      return { ...prevSourceData, rows: newRows };
    });

    setEditingRow(null); // Close the modal
    
    // The useEffect below will now reliably re-run handleValidation
    // after sourceData state has been updated.
    setToastMessage('Changes saved. Re-validating data...');
  };

  // Effect to re-run validation whenever sourceData changes (after a save)
  // This useEffect will now also handle the initial validation after component mounts
  // if the initial data is problematic.
  useEffect(() => {
    // Only run validation if sourceData has changed from its initial state
    // OR if there are currently problematic rows (meaning we are in a remediation cycle).
    // This prevents unnecessary re-runs on every render if data is already clean.
    // UPDATED: Adjust comparison to use sourceDataForWorkbench for initial state comparison
    const isInitialLoad = JSON.stringify(sourceData.rows) === JSON.stringify(sourceDataForWorkbench.rows) && problematicRowIds.size === 0 && !analysisResult;

    if (!isInitialLoad || (isInitialLoad && problematicRowIds.size === 0)) { // Run on initial load if no errors, or always if data changed/errors exist
        handleValidation();
    }
  }, [sourceData, sourceDataForWorkbench]); // Dependency array: re-run when sourceData or initial sourceDataForWorkbench changes


  const handlePromote = () => {
    if (!allErrorsResolved) {
        setToastMessage('Please run a validation and resolve all identified issues before promoting.');
        return;
    }
    onPromote(); // This will trigger the promotion logic in DataManagement/index.jsx
    setToastMessage('Data promoted to library successfully!');
  };

  // Function to download data as CSV
  const handleDownloadData = () => {
    const headers = sourceData.headers.join(',');
    const rows = sourceData.rows.map(row => row.join(',')).join('\n');
    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${fileData.name.replace('.xlsx', '')}_cleaned.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMessage('Cleaned data downloaded successfully!');
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
            {/* UPDATED: Ensure description is taken from activeIndicator's validationRule */}
            Rule: "{activeIndicator.validationRule?.description || "No specific rule description provided."}"
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Source Data (Your File)</h3>
          {/* Data Quality Metrics Summary - Enhanced Visuals */}
          <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
              {/* Completeness Metric - Use a generic first header for display */}
              <div className="bg-gray-700 p-3 rounded-md flex flex-col items-center justify-center relative group">
                  <span className="text-gray-300 text-xs mb-1">Completeness</span>
                  <span className={`font-bold text-lg ${parseFloat(dataQualityMetrics[sourceData.headers[0]]?.completeness) >= 95 ? 'text-green-400' : parseFloat(dataQualityMetrics[sourceData.headers[0]]?.completeness) >= 80 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {dataQualityMetrics[sourceData.headers[0]]?.completeness || 'N/A'}%
                  </span>
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-gray-200 text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
                      Percentage of non-empty values in key columns.
                  </div>
              </div>
              {/* Uniqueness Metric - Use a generic first header for display */}
              <div className="bg-gray-700 p-3 rounded-md flex flex-col items-center justify-center relative group">
                  <span className="text-gray-300 text-xs mb-1">Uniqueness (ID)</span>
                  <span className={`font-bold text-lg ${parseFloat(dataQualityMetrics[sourceData.headers[0]]?.uniqueness) >= 95 ? 'text-green-400' : parseFloat(dataQualityMetrics[sourceData.headers[0]]?.uniqueness) >= 80 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {dataQualityMetrics[sourceData.headers[0]]?.uniqueness || 'N/A'}%
                  </span>
                   <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-gray-200 text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
                      Percentage of unique values in the first column. Duplicates indicate data integrity issues.
                  </div>
              </div>
              {/* Format Validity Metric - Use a generic second header for display, assuming it's an email/date for demo */}
              <div className="bg-gray-700 p-3 rounded-md flex flex-col items-center justify-center relative group">
                  <span className="text-gray-300 text-xs mb-1">Format Validity</span>
                  <span className={`font-bold text-lg ${parseFloat(dataQualityMetrics[sourceData.headers[1]]?.formatValidity) >= 95 ? 'text-green-400' : parseFloat(dataQualityMetrics[sourceData.headers[1]]?.formatValidity) >= 80 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {dataQualityMetrics[sourceData.headers[1]]?.formatValidity || 'N/A'}%
                  </span>
                   <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-gray-200 text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
                      Percentage of values matching expected data formats (e.g., valid emails or dates).
                  </div>
              </div>
          </div>
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
          {/* UPDATED: Simplified mockDestinationSchema to be more generic or dynamic later if needed.
              For now, it still reflects user access fields, which might not be ideal for transaction data.
              A more robust solution would involve dynamically generating the schema or selecting from pre-defined schemas based on file type.
              However, the prompt focuses on getting the data into the workbench.
          */}
          <div className="space-y-4">
            {mockDestinationSchema.map((field) => (
              <div key={field.id} className="bg-gray-700 p-4 rounded-lg">
                <label className="block text-md font-semibold text-gray-100">
                  {field.name}{' '}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <p className="text-xs text-gray-400 mb-2">
                  {field.description}
                  {field.expectedFormat && (
                      <span className="ml-2 text-gray-500">
                          (Format: {field.expectedFormat}{field.allowedValues ? `, Values: ${field.allowedValues.join(', ')}` : ''}{field.maxValue ? `, Max: ${field.maxValue}` : ''})
                      </span>
                  )}
                </p>
                <select
                  className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-yellow-500 focus:border-yellow-500"
                  value={mappings[field.id] || ''}
                  onChange={(e) => setMappings({ ...mappings, [field.id]: e.target.value })}
                >
                  <option value="" disabled>
                    Select a source column...
                  </option>
                  {sourceData.headers.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                {/* Visual feedback for mapping */}
                {mappings[field.id] && (
                  <div className="mt-2 flex items-center text-sm text-green-400">
                    <CheckCircle size={14} className="mr-1" /> Mapped to "{mappings[field.id]}"
                  </div>
                )}
                {!mappings[field.id] && field.required && (
                  <div className="mt-2 flex items-center text-sm text-red-400">
                    <AlertTriangle size={14} className="mr-1" /> Required field not mapped.
                  </div>
                )}
                {/* New: Optional fields not mapped */}
                {!mappings[field.id] && !field.required && (
                  <div className="mt-2 flex items-center text-sm text-gray-400">
                    <Info size={14} className="mr-1" /> Optional field not mapped.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end space-x-4"> {/* Added space-x-4 for button spacing */}
        {allErrorsResolved && (
            <button
                onClick={handleDownloadData}
                className="bg-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-500 flex items-center"
            >
                <Download size={18} className="mr-2" /> Download Cleaned Data
            </button>
        )}
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