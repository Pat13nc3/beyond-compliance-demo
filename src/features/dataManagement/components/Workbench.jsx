// src/features/dataManagement/components/Workbench.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  InfoIcon,
  SaveIcon,
  FileTextIcon,
  ColumnsIcon,
  ArrowRightIcon,
  SettingsIcon,
  PlusIcon
} from 'lucide-react';
// Corrected import path for mockData.js
import { mockIndustrySchemas, filesPendingAnalysis, mockMappingTemplates } from '../../../data/mockData';
// Corrected import paths for ConfirmationModal and Toast
import ConfirmationModal from '../../../components/modals/ConfirmationModal'; // Changed to default import
import Toast from '../../../components/ui/Toast'; // Changed to default import

// Helper function to infer schema from sample data (first row's keys)
const inferSchemaFromData = (data) => {
  if (!data || data.length === 0) return [];
  return Object.keys(data[0]).map(key => ({ id: key, name: key }));
};

// Helper function to apply transformations
const applyTransformation = (value, transformation) => {
  if (!transformation) return value;

  switch (transformation.type) {
    case 'formatDate':
      // Basic date formatting (requires a more robust date library for full functionality)
      try {
        const date = new Date(value);
        if (isNaN(date)) return value; // Invalid date
        const year = String(date.getFullYear());
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        if (transformation.to === 'YYYY-MM-DD') return `${year}-${month}-${day}`;
        // Add other formats as needed
        return value;
      } catch (e) {
        return value; // Return original if transformation fails
      }
    case 'convertToNumber':
      const num = parseFloat(value);
      return isNaN(num) ? value : num; // FIX: Return num if not NaN, else original value
    case 'toUpperCase':
      return typeof value === 'string' ? value.toUpperCase() : value;
    case 'toLowerCase':
      return typeof value === 'string' ? value.toLowerCase() : value;
    case 'concatenate':
      // For concatenate, value will be an array of source field values
      return Array.isArray(value) ? value.join(transformation.separator || '') : value;
    case 'mapValue':
      return transformation.map[value] || value; // Return mapped value or original
    // Add more transformation types as needed
    default:
      return value;
  }
};

// Helper function to run basic validation based on target schema
const runBasicValidation = (record, targetSchemaFields) => {
  const errors = [];
  // Ensure targetSchemaFields is an array before iterating
  if (!Array.isArray(targetSchemaFields)) {
    console.error("DEBUG: runBasicValidation: targetSchemaFields is NOT an array:", targetSchemaFields);
    return ["Internal error: Schema fields not properly defined for validation."];
  }

  targetSchemaFields.forEach(field => {
    const value = record[field.id];
    // Check required fields
    if (field.required && (value === undefined || value === null || value === '')) {
      errors.push(`'${field.name}' is required.`);
    }
    // Basic type validation (can be expanded)
    if (value !== undefined && value !== null && value !== '') {
      if (field.type === 'number' && isNaN(parseFloat(value))) {
        errors.push(`'${field.name}' should be a number.`);
      }
      if (field.format === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.push(`'${field.name}' has an invalid email format.`);
      }
      if (field.enum && !field.enum.includes(value)) {
        errors.push(`'${field.name}' has an invalid value: '${value}'. Expected one of: ${field.enum.join(', ')}.`);
      }
    }
  });
  return errors;
};


// MODIFIED LINE: Accept props directly
const Workbench = ({ fileId, dataSourceId, isNew }) => {
  console.log("DEBUG: Workbench component rendered. This log means the latest Workbench.jsx is running.");
  console.log("DEBUG: mockIndustrySchemas (initial load):", mockIndustrySchemas);
  console.log("DEBUG: filesPendingAnalysis (initial load):", filesPendingAnalysis);

  const location = useLocation(); // Keep useLocation for possible future use, but not for initial props
  const navigate = useNavigate();
  // REMOVED LINE: No longer destructuring from location.state
  // const { fileId, dataSourceId, isNew } = location.state || {};
  console.log("DEBUG: fileId from PROPS:", fileId); // Updated log
  console.log("DEBUG: dataSourceId from PROPS:", dataSourceId); // Updated log
  console.log("DEBUG: isNew from PROPS:", isNew); // Updated log


  const [currentStep, setCurrentStep] = useState(1); // 1: Select Schema, 2: Map Fields, 3: Validate & Review
  const [sourceData, setSourceData] = useState([]);
  const [sourceSchema, setSourceSchema] = useState([]); // Inferred from sourceData

  // MODIFIED: Simplest initialization. User will manually select in Step 1.
  const [selectedTargetSchemaId, setSelectedTargetSchemaId] = useState('');

  const [targetSchema, setTargetSchema] = useState(null); // Full schema object
  const [fieldMappings, setFieldMappings] = useState([]); // [{ sourceField: 'col1', targetField: 'target1', transformation: {type: 'toUpperCase'} }]
  const [mappedAndTransformedData, setMappedAndTransformedData] = useState([]);
  const [validationResults, setValidationResults] = useState([]); // Array of { rowIndex, errors: [] }
  const [nonCompliantRecords, setNonCompliantRecords] = useState([]);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false); // Should be false by default
  const [templateName, setTemplateName] = useState('');
  // FIXED LINE: Corrected useState initialization
  const [templateDescription, setTemplateDescription] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  // FIXED LINE: Corrected useState initialization
  const [toastMessage, setToastMessage] = useState('');
  // FIXED LINE: Corrected useState initialization
  const [toastType, setToastType] = useState('success'); // 'success' or 'error'

  // State for transformation modal
  const [isTransformationModalOpen, setIsTransformationModalOpen] = useState(false);
  const [currentMappingIndex, setCurrentMappingIndex] = useState(null);
  // FIXED LINE: Corrected useState initialization
  const [selectedTransformationType, setSelectedTransformationType] = useState('');
  const [transformationConfig, setTransformationConfig] = useState({});

  // Add a useEffect to log isSavingTemplate state changes
  useEffect(() => {
    console.log("DEBUG: isSavingTemplate state changed to:", isSavingTemplate);
  }, [isSavingTemplate]);


  // Load data based on fileId or dataSourceId
  useEffect(() => {
    console.log("DEBUG: useEffect for file/data source loading triggered. fileId:", fileId, "dataSourceId:", dataSourceId, "isNew:", isNew);
    let dataToLoad = [];
    let inferredSchema = [];

    if (fileId) {
      const file = filesPendingAnalysis.find(f => f.id === fileId);
      console.log("DEBUG: Found file for fileId:", fileId, "->", file);
      if (file && file.sampleContent) {
        dataToLoad = file.sampleContent;
        inferredSchema = inferSchemaFromData(file.sampleContent);
        console.log("DEBUG: Data loaded. Sample content length:", dataToLoad.length, "Inferred schema length:", inferredSchema.length);
      } else {
        console.warn("DEBUG: File not found or no sample content for fileId:", fileId, "File object:", file);
      }
    }
    // Add logic here to load data from dataSourceId if applicable (e.g., fetch from API)
    // For now, we'll focus on fileId for simplicity in this example.

    setSourceData(dataToLoad);
    console.log("DEBUG: sourceData set to:", dataToLoad); // NEW LOG: Verify sourceData after setting
    setSourceSchema(inferredSchema);

  }, [fileId, dataSourceId, isNew]); // No change to dependencies here for data loading

  // REMOVED ALL PREVIOUS USEEFFECTS FOR AUTO-SELECTION of selectedTargetSchemaId
  // The user will now manually select in Step 1, or it will be selected if 'isNew' is true and there's a default.

  // Update target schema when selectedTargetSchemaId changes
  useEffect(() => {
    console.log("DEBUG: useEffect for target schema changes triggered. selectedTargetSchemaId:", selectedTargetSchemaId);
    if (selectedTargetSchemaId) {
      const schema = mockIndustrySchemas.find(s => s.id === selectedTargetSchemaId);
      console.log("DEBUG: Found schema (after find):", schema); // This log is KEY!
      console.log("DEBUG: Schema fields value:", schema?.fields, "Is Array:", Array.isArray(schema?.fields)); // NEW LOG FOR DEBUGGING
      setTargetSchema(schema);
      console.log("DEBUG: targetSchema set to:", schema); // NEW LOG: Verify targetSchema after setting


      let fieldsToMap = [];

      // Explicitly check for schema and its fields property being an array
      if (schema && typeof schema === 'object' && Array.isArray(schema.fields)) {
        console.log("DEBUG: schema.fields is confirmed an array. Length:", schema.fields.length, "Contents:", schema.fields);
        fieldsToMap = schema.fields;
      } else {
        console.error("DEBUG: CRITICAL: schema or schema.fields is NOT a valid array! Schema:", schema, "Schema.fields:", schema?.fields);
        // Fallback to an empty array to prevent .map() from failing
        fieldsToMap = [];
      }

      let initialMappings = []; // Initialize as empty array defensively
      try {
        console.log("DEBUG: Attempting to map fieldsToMap. Type:", typeof fieldsToMap, "Is Array:", Array.isArray(fieldsToMap), "Value:", fieldsToMap);
        initialMappings = fieldsToMap.map(targetField => ({ // This is Workbench.jsx:135 (or nearby depending on line breaks)
          sourceField: '', // No source field selected initially
          targetField: targetField.id,
          transformation: null,
        }));
      } catch (e) {
        console.error("DEBUG: ERROR during initialMappings map operation (caught by try/catch):", e, "fieldsToMap:", fieldsToMap);
        initialMappings = []; // Ensure it's an array even if map() throws unexpectedly
      }

      console.log("DEBUG: initialMappings after map():", initialMappings, "Is Array:", Array.isArray(initialMappings));

      // This check should now be redundant if fieldsToMap is always an array,
      // but keeping it for extreme defensive programming.
      if (Array.isArray(initialMappings)) {
          console.log("DEBUG: Initial mappings are confirmed ARRAY. Setting fieldMappings. Length:", initialMappings.length);
          setFieldMappings(initialMappings);
      } else {
          console.error("DEBUG: EXTREME CRITICAL ERROR: initialMappings is NOT an array AFTER map()! This should not happen.", initialMappings);
          setFieldMappings([]);
      }
    } else {
      setTargetSchema(null);
      setFieldMappings([]);
      console.log("DEBUG: No target schema selected, clearing field mappings.");
    }
  }, [selectedTargetSchemaId]); // Dependency is selectedTargetSchemaId

  // Function to apply mappings and transformations
  const applyMappingsAndTransformations = useCallback(() => {
    console.log("DEBUG: applyMappingsAndTransformations called.");
    // FIX: Ensure fieldMappings is an array before attempting to iterate
    if (!Array.isArray(fieldMappings) || !sourceData.length || !targetSchema || !fieldMappings.length) {
      console.warn("DEBUG: Skipping transformations: Missing data or invalid fieldMappings.", { fieldMappings, sourceData, targetSchema });
      setMappedAndTransformedData([]);
      setValidationResults([]);
      setNonCompliantRecords([]);
      return;
    }

    const transformedRecords = sourceData.map((sourceRecord, rowIndex) => {
      const newRecord = {};
      const recordErrors = [];

      fieldMappings.forEach(mapping => {
        // FIX: Defensive check for mapping structure
        if (!mapping || !mapping.targetField) return;

        const targetFieldDef = targetSchema.fields.find(f => f.id === mapping.targetField);
        if (!targetFieldDef) return; // Target field not found in schema

        let sourceValue = null;
        // FIX: Ensure mapping.sourceField is consistent for concatenate
        if (mapping.transformation && mapping.transformation.type === 'concatenate' && Array.isArray(mapping.sourceField)) {
          // For concatenate, gather values from multiple source fields
          sourceValue = mapping.sourceField.map(sf => sourceRecord[sf]);
        } else if (typeof mapping.sourceField === 'string') { // Ensure it's a string for direct lookup
          sourceValue = sourceRecord[mapping.sourceField];
        }


        let transformedValue = sourceValue;
        if (mapping.transformation) {
          transformedValue = applyTransformation(sourceValue, mapping.transformation);
        }
        newRecord[mapping.targetField] = transformedValue;
      });

      // Run validation on the transformed record
      // FIX: Pass targetSchema.fields as an array explicitly
      const errors = runBasicValidation(newRecord, targetSchema.fields || []);
      if (errors.length > 0) {
        recordErrors.push({ rowIndex, errors });
      }

      return { transformedRecord: newRecord, errors: recordErrors.length > 0 };
    });

    setMappedAndTransformedData(transformedRecords.map(r => r.transformedRecord));
    const allValidationErrors = transformedRecords.filter(r => r.errors).map((r, index) => ({
      rowIndex: index, // Original row index
      errors: runBasicValidation(r.transformedRecord, targetSchema.fields || []) // Re-run for clarity
    }));
    setValidationResults(allValidationErrors);
    setNonCompliantRecords(allValidationErrors.map(err => sourceData[err.rowIndex]));

  }, [sourceData, targetSchema, fieldMappings]); // Added fieldMappings to useCallback dependencies

  // NEW useEffect: To trigger transformations ONLY when data is fully ready
  useEffect(() => {
    console.log("DEBUG: Transformation trigger useEffect. SourceData length:", sourceData.length, "TargetSchema:", targetSchema, "FieldMappings length:", fieldMappings.length);
    if (sourceData.length > 0 && targetSchema && Array.isArray(targetSchema.fields) && fieldMappings.length > 0) {
        console.log("DEBUG: All transformation dependencies met, applying transformations.");
        applyMappingsAndTransformations();
    } else {
        console.log("DEBUG: Transformation dependencies NOT met yet.");
    }
  }, [sourceData, targetSchema, fieldMappings, applyMappingsAndTransformations]); // Dependencies for this trigger


  const handleFieldMappingChange = (index, sourceField) => {
    console.log("DEBUG: handleFieldMappingChange called for index:", index, "sourceField:", sourceField);
    // FIX: Ensure fieldMappings is an array before spreading
    const newMappings = Array.isArray(fieldMappings) ? [...fieldMappings] : [];
    if (newMappings.length > index) { // Prevent out-of-bounds access
        newMappings[index].sourceField = sourceField;
        setFieldMappings(newMappings);
    } else {
        console.error("DEBUG: Index out of bounds for fieldMappings in handleFieldMappingChange:", index, fieldMappings);
    }
  };

  const handleOpenTransformationModal = (index) => {
    console.log("DEBUG: handleOpenTransformationModal called for index:", index);
    // FIX: Defensive check before accessing fieldMappings[index]
    if (!Array.isArray(fieldMappings) || fieldMappings.length <= index) {
        console.error("DEBUG: Cannot open transformation modal: fieldMappings is not an array or index is out of bounds.", fieldMappings, index);
        return;
    }
    setCurrentMappingIndex(index);
    const currentTransform = fieldMappings[index].transformation;
    setSelectedTransformationType(currentTransform ? currentTransform.type : '');
    setTransformationConfig(currentTransform ? { ...currentTransform } : {});
    setIsTransformationModalOpen(true);
  };

  const handleSaveTransformation = () => {
    console.log("DEBUG: handleSaveTransformation called.");
    if (currentMappingIndex !== null) {
      // FIX: Ensure fieldMappings is an array before spreading
      const newMappings = Array.isArray(fieldMappings) ? [...fieldMappings] : [];

      // FIX: Check for valid index before attempting to update
      if (newMappings.length <= currentMappingIndex) {
          console.error("DEBUG: Cannot save transformation: currentMappingIndex out of bounds.", currentMappingIndex, newMappings);
          setIsTransformationModalOpen(false);
          setCurrentMappingIndex(null);
          setSelectedTransformationType('');
          setTransformationConfig({});
          return;
      }

      let newTransformation = null;

      if (selectedTransformationType) {
        newTransformation = { type: selectedTransformationType };
        // Add specific config based on type
        if (selectedTransformationType === 'formatDate') {
          newTransformation.from = transformationConfig.from || '';
          newTransformation.to = transformationConfig.to || 'YYYY-MM-DD';
        } else if (selectedTransformationType === 'mapValue') {
          newTransformation.map = transformationConfig.map || {};
        } else if (selectedTransformationType === 'concatenate') {
            newTransformation.separator = transformationConfig.separator || ' ';
            // For concatenate, sourceField might need to be an array
            const targetField = newMappings[currentMappingIndex].targetField;
            const targetFieldDef = targetSchema.fields.find(f => f.id === targetField);
            if (targetFieldDef && targetFieldDef.id === 'fullName' && !Array.isArray(newMappings[currentMappingIndex].sourceField)) {
                // If mapping to fullName and not already an array, prompt user to select multiple source fields
                // For simplicity, we'll just set it to an empty array for now and expect user to select later
                newMappings[currentMappingIndex].sourceField = [];
            }
        }
      }
      newMappings[currentMappingIndex].transformation = newTransformation;
      setFieldMappings(newMappings);
    }
    setIsTransformationModalOpen(false);
    setCurrentMappingIndex(null);
    setSelectedTransformationType('');
    setTransformationConfig({});
  };

  const handleSaveMappingTemplate = () => {
    console.log("DEBUG: handleSaveMappingTemplate called.");
    if (!templateName.trim()) {
      showToast('Template name cannot be empty.', 'error');
      return; // Added this return to prevent further execution if name is empty
    }
    if (!targetSchema) {
        showToast('Please select a target schema before saving a template.', 'error');
        return; // Added this return
    }
    // FIX: Ensure fieldMappings is an array before mapping
    if (!Array.isArray(fieldMappings)) { // Corrected check
        showToast('Internal error: Mapping data is corrupted. Please refresh.', 'error');
        console.error("DEBUG: fieldMappings is not an array when saving template:", fieldMappings);
        return; // Added this return
    }

    const newTemplate = {
      id: `template_${templateName.toLowerCase().replace(/\s/g, '_')}_${Date.now()}`,
      name: templateName,
      description: templateDescription,
      sourceSchemaExample: sourceSchema.map(s => s.id), // Store source field names
      targetSchemaId: targetSchema.id,
      mappings: fieldMappings.map(m => ({
        sourceField: m.sourceField,
        targetField: m.targetField,
        transformation: m.transformation,
      })),
    };

    // In a real app, you'd save this to a backend/database.
    // For now, we'll just log it and show a success message.
    console.log('DEBUG: Saving new mapping template:', newTemplate);
    // Add to mockMappingTemplates (in a real app, this would be persisted)
    mockMappingTemplates.push(newTemplate); // Directly modifying mock data for demo
    showToast('Mapping template saved successfully!', 'success');
    setIsSavingTemplate(false);
    console.log("DEBUG: handleSaveMappingTemplate: isSavingTemplate set to false."); // NEW LOG: Verify modal state change after saving
    setTemplateName('');
    setTemplateDescription('');
  };

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  const getOverallCompliance = () => {
    if (!sourceData.length) return { percentage: 0, status: 'N/A' };
    const compliantCount = sourceData.length - nonCompliantRecords.length;
    const percentage = (compliantCount / sourceData.length) * 100;
    let status = 'Good';
    if (percentage < 70) status = 'Poor';
    else if (percentage < 90) return { percentage: percentage.toFixed(2), status: 'Fair' }; // Fix for fair status
    return { percentage: percentage.toFixed(2), status }; // Default good/compliant if > 90
  };

  const overallCompliance = getOverallCompliance();

  const renderStep1SelectSchema = () => (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">Step 1: Select Target Industry Schema</h2>
      <p className="text-gray-400 mb-6">Choose an industry standard schema to map your source data to. This defines the structure and validation rules for your transformed data.</p>
      <div className="mb-4">
        <label htmlFor="targetSchemaSelect" className="block text-gray-300 text-sm font-bold mb-2">
          Choose a Schema:
        </label>
        <select
          id="targetSchemaSelect"
          className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
          value={selectedTargetSchemaId}
          onChange={(e) => setSelectedTargetSchemaId(e.target.value)}
        >
          <option value="">-- Select a Target Schema --</option>
          {mockIndustrySchemas.map((schema) => (
            <option key={schema.id} value={schema.id}>
              {schema.name}
            </option>
          ))}
        </select>
      </div>
      {targetSchema && (
        <div className="bg-gray-700 p-4 rounded-md border border-gray-600">
          <h3 className="text-xl font-semibold text-blue-200 mb-2">{targetSchema.name} Details:</h3>
          <p className="text-gray-400 text-sm mb-2">{targetSchema.description}</p>
          <div className="max-h-48 overflow-y-auto">
            <table className="min-w-full text-sm text-gray-300">
              <thead>
                <tr className="bg-gray-600">
                  <th scope="col" className="py-2 px-3 text-left">Field Name</th>
                  <th scope="col" className="py-2 px-3 text-left">Type</th>
                  <th scope="col" className="py-2 px-3 text-left">Required</th>
                  <th scope="col" className="py-2 px-3 text-left">Format</th>
                </tr>
              </thead>
              <tbody>
                {/* FIX: Ensure targetSchema.fields is an array before mapping */}
                {(Array.isArray(targetSchema.fields) ? targetSchema.fields : []).map((field, index) => (
                  <tr key={field.id} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-750'}>
                    <td className="py-1 px-3">{field.name}</td>
                    <td className="py-1 px-3">{field.type}</td>
                    <td className="py-1 px-3">{field.required ? 'Yes' : 'No'}</td>
                    <td className="py-1 px-3">{field.format || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setCurrentStep(2)}
          // MODIFIED LINE: Disable "Next" button until sourceData is loaded and schema is selected
          disabled={!selectedTargetSchemaId || sourceData.length === 0}
          className="px-6 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: Map Fields <ArrowRightIcon className="inline-block w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );

  const renderStep2MapFields = () => (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">Step 2: Map Data Fields & Define Transformations</h2>
      <p className="text-gray-400 mb-6">Match your source data fields to the selected target schema fields. Optionally, apply transformations to ensure data compatibility and quality.</p>

      <div className="grid grid-cols-3 gap-4 mb-6 text-gray-300 font-semibold text-lg">
        <div>Source Field</div>
        <div>Target Field</div>
        <div>Transformation</div>
      </div>

      <div className="max-h-[60vh] overflow-y-auto pr-2">
        {/* FIX: Ensure fieldMappings is an array before mapping */}
        {Array.isArray(fieldMappings) && fieldMappings.length > 0 ? (
          fieldMappings.map((mapping, index) => (
            <div key={mapping.targetField} className="grid grid-cols-3 gap-4 items-center mb-4 p-3 bg-gray-700 rounded-md border border-gray-600">
              {/* Source Field Dropdown */}
              <div>
                <select
                  className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-gray-900 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                  value={Array.isArray(mapping.sourceField) ? mapping.sourceField.join(',') : mapping.sourceField}
                  onChange={(e) => {
                    // If transformation is concatenate, allow multiple selection
                    if (mapping.transformation && mapping.transformation.type === 'concatenate') {
                      const options = Array.from(e.target.selectedOptions, option => option.value);
                      handleFieldMappingChange(index, options);
                    } else {
                      handleFieldMappingChange(index, e.target.value);
                    }
                  }}
                  multiple={mapping.transformation && mapping.transformation.type === 'concatenate'}
                >
                  <option value="">-- Select Source --</option>
                  {/* FIX: Ensure sourceSchema is an array before mapping */}
                  {(Array.isArray(sourceSchema) ? sourceSchema : []).map((field) => (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Field Name */}
              <div className="text-gray-200">
                {targetSchema?.fields?.find(f => f.id === mapping.targetField)?.name || mapping.targetField}
                {targetSchema?.fields?.find(f => f.id === mapping.targetField)?.required && (
                  <span className="text-red-400 ml-1">*</span>
                )}
              </div>

              {/* Transformation Button */}
              <div>
                <button
                  onClick={() => handleOpenTransformationModal(index)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    mapping.transformation ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                >
                  <SettingsIcon className="inline-block w-4 h-4 mr-2" />
                  {mapping.transformation ? 'Edit Transformation' : 'Add Transformation'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No fields to map. Please select a target schema first.</p>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-6 py-2 bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
        >
          <ArrowRightIcon className="inline-block w-4 h-4 mr-2 rotate-180" /> Previous
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          disabled={!selectedTargetSchemaId || !targetSchema || fieldMappings.some(m => !m.sourceField)} // Disable if no target schema or some fields are unmapped
          className="px-6 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: Validate & Review <ArrowRightIcon className="inline-block w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );

  const renderStep3ValidateReview = () => {
    const overallCompliance = getOverallCompliance();
    return (
      <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Step 3: Validate & Review Data</h2>
        <p className="text-gray-400 mb-6">Review the transformed data and address any compliance issues.</p>

        {/* Compliance Summary */}
        <div className="bg-gray-700 p-4 rounded-md border border-gray-600 mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-blue-200">Overall Compliance:</h3>
          <div className={`text-2xl font-bold ${
            overallCompliance.status === 'Good' ? 'text-green-400' :
            overallCompliance.status === 'Fair' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {overallCompliance.percentage}% ({overallCompliance.status})
          </div>
        </div>

        {/* Non-Compliant Records */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-red-300 mb-3">Non-Compliant Records ({nonCompliantRecords.length})</h3>
          {nonCompliantRecords.length === 0 ? (
            <p className="text-green-400">All records are compliant with the selected schema!</p>
          ) : (
            <div className="max-h-64 overflow-y-auto bg-gray-700 p-4 rounded-md border border-gray-600">
              {(Array.isArray(validationResults) ? validationResults : []).map((result, idx) => (
                <div key={idx} className="mb-4 p-3 border border-red-500 rounded-md bg-red-900 bg-opacity-20">
                  <p className="font-bold text-red-200">Row {result.rowIndex + 1}:</p>
                  <ul className="list-disc list-inside text-red-300 text-sm">
                    {(Array.isArray(result.errors) ? result.errors : []).map((error, eIdx) => (
                      <li key={eIdx}>{error}</li>
                    ))}
                  </ul>
                  <pre className="mt-2 text-xs text-gray-400 overflow-x-auto">
                    {JSON.stringify(sourceData[result.rowIndex], null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sample Mapped & Transformed Data Preview */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-300 mb-3">Sample Transformed Data (First 5 Rows)</h3>
          {mappedAndTransformedData.length === 0 ? (
            <p className="text-gray-400">No data to preview yet. Ensure mapping is complete.</p>
          ) : (
            <div className="max-h-64 overflow-y-auto bg-gray-700 p-4 rounded-md border border-gray-600">
              <table className="min-w-full text-sm text-gray-300">
                <thead>
                  <tr className="bg-gray-600">
                    {(targetSchema?.fields && Array.isArray(targetSchema.fields) ? targetSchema.fields : []).map(field => (
                      <th key={field.id} className="py-2 px-3 text-left">{field.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(mappedAndTransformedData) ? mappedAndTransformedData : []).slice(0, 5).map((record, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-gray-700' : 'bg-gray-750'}>
                      {(targetSchema?.fields && Array.isArray(targetSchema.fields) ? targetSchema.fields : []).map(field => (
                        <td key={field.id} className="py-1 px-3 truncate max-w-[150px]">
                          {typeof record[field.id] === 'object' ? JSON.stringify(record[field.id]) : String(record[field.id])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setCurrentStep(2)}
            className="px-6 py-2 bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
          >
            <ArrowRightIcon className="inline-block w-4 h-4 mr-2 rotate-180" /> Previous
          </button>
          <button
            onClick={() => setIsSavingTemplate(true)}
            className="px-6 py-2 bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
          >
            <SaveIcon className="inline-block w-4 h-4 mr-2" /> Save Mapping Template
          </button>
          <button
            onClick={() => {
              showToast('Data promoted to Library! (Simulated)', 'success');
              navigate('/data-management'); // Go back to data management hub
            }}
            className="px-6 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            Promote to Library <ArrowRightIcon className="inline-block w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    );
  };

  // Transformation Modal
  const renderTransformationModal = () => {
    // FIX: Defensive checks before accessing properties of currentMapping and targetSchema
    const currentMapping = Array.isArray(fieldMappings) && currentMappingIndex !== null ? fieldMappings[currentMappingIndex] : null;
    const targetFieldDef = targetSchema?.fields?.find(f => f.id === currentMapping?.targetField);

    if (!currentMapping) return null; // Don't render modal if no valid mapping is selected

    return (
      <ConfirmationModal
        isOpen={isTransformationModalOpen}
        onClose={() => {
            console.log("DEBUG: ConfirmationModal onClose called for isTransformationModalOpen. Setting to false.");
            setIsTransformationModalOpen(false); // This should close the transformation modal
        }}
        onConfirm={handleSaveTransformation}
        title={`Define Transformation for '${targetFieldDef?.name || ''}'`}
        confirmText="Apply Transformation"
      >
        <div className="p-4">
          <div className="mb-4">
            <label htmlFor="transformType" className="block text-gray-300 text-sm font-bold mb-2">
              Transformation Type:
            </label>
            <select
              id="transformType"
              className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
              value={selectedTransformationType}
              onChange={(e) => {
                setSelectedTransformationType(e.target.value);
                setTransformationConfig({}); // Reset config when type changes
              }}
            >
              <option value="">-- No Transformation --</option>
              <option value="toUpperCase">Convert to Uppercase</option>
              <option value="toLowerCase">Convert to Lowercase</option>
              <option value="convertToNumber">Convert to Number</option>
              <option value="formatDate">Format Date</option>
              <option value="mapValue">Map Values (e.g., 'DR' to 'DEBIT')</option>
              <option value="concatenate">Concatenate Fields</option>
              {/* Add more transformation options here */}
            </select>
          </div>

          {selectedTransformationType === 'formatDate' && (
            <div className="mb-4">
              <label htmlFor="dateFormatFrom" className="block text-gray-300 text-sm font-bold mb-2">
                Current Date Format (e.g., MM/DD/YYYY):
              </label>
              <input
                type="text"
                id="dateFormatFrom"
                className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                value={transformationConfig.from || ''}
                onChange={(e) => setTransformationConfig({ ...transformationConfig, from: e.target.value })}
                placeholder="MM/DD/YYYY"
              />
              <label htmlFor="dateFormatTo" className="block text-gray-300 text-sm font-bold mb-2 mt-2">
                Target Date Format (e.g., YYYY-MM-DD):
              </label>
              <input
                type="text"
                id="dateFormatTo"
                className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                value={transformationConfig.to || 'YYYY-MM-DD'}
                onChange={(e) => setTransformationConfig({ ...transformationConfig, to: e.target.value })}
                placeholder="YYYY-MM-DD"
              />
            </div>
          )}

          {selectedTransformationType === 'mapValue' && (
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Value Mapping (JSON format: {"{ 'source_val': 'target_val' }"}):
              </label>
              <textarea
                className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline h-32"
                value={JSON.stringify(transformationConfig.map || {}, null, 2)}
                onChange={(e) => {
                  try {
                    setTransformationConfig({ ...transformationConfig, map: JSON.parse(e.target.value) });
                  } catch (err) {
                    // Handle invalid JSON input
                    console.error("Invalid JSON for mapValue:", err);
                  }
                }}
                placeholder="{ 'DR': 'DEBIT', 'CR': 'CREDIT' }"
              ></textarea>
            </div>
          )}

          {selectedTransformationType === 'concatenate' && (
            <div className="mb-4">
              <label htmlFor="separator" className="block text-gray-300 text-sm font-bold mb-2">
                Separator (e.g., space, comma):
              </label>
              <input
                type="text"
                id="separator"
                className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                value={transformationConfig.separator || ' '}
                onChange={(e) => setTransformationConfig({ ...transformationConfig, separator: e.target.value })}
                placeholder=" "
              />
              <p className="text-gray-400 text-xs mt-1">
                You will need to select multiple source fields in the mapping step for concatenation.
              </p>
            </div>
          )}

        </div>
      </ConfirmationModal>
    );
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white font-inter">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Data Mapping & Management Workbench</h1>

      {/* Step Indicator */}
      <div className="flex justify-center items-center space-x-4 mb-8">
        <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-blue-400' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}>1</div>
          <span className="hidden sm:inline">Select Schema</span>
        </div>
        <ArrowRightIcon className={`w-5 h-5 ${currentStep > 1 ? 'text-blue-400' : 'text-gray-500'}`} />
        <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-blue-400' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}>2</div>
          <span className="hidden sm:inline">Map Fields</span>
        </div>
        <ArrowRightIcon className={`w-5 h-5 ${currentStep > 2 ? 'text-blue-400' : 'text-gray-500'}`} />
        <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-blue-400' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}>3</div>
          <span className="hidden sm:inline">Validate & Review</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Source Data Preview */}
        <div className="lg:col-span-1 bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">Source Data Preview</h2>
          {sourceData.length === 0 ? (
            <p className="text-gray-400">No source data loaded. Please upload a file or select a data source from the Data Management Hub.</p>
          ) : (
            <div className="max-h-[70vh] overflow-y-auto">
              <table className="min-w-full text-sm text-gray-300">
                <thead>
                  <tr className="bg-gray-700">
                    {(Array.isArray(sourceSchema) ? sourceSchema : []).map((field) => (
                      <th key={field.id} className="py-2 px-3 text-left">{field.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(sourceData) ? sourceData : []).slice(0, 10).map((record, rIdx) => ( // Show first 10 rows
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-gray-700' : 'bg-gray-850'}>
                      {(Array.isArray(sourceSchema) ? sourceSchema : []).map((field) => (
                        <td key={field.id} className="py-1 px-3 truncate max-w-[120px]">
                          {record[field.id]} {/* THIS IS THE CORRECTED LINE */}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
                  {sourceData.length > 10 && (
                    <p className="text-gray-400 text-sm mt-2">Showing first 10 of {sourceData.length} records...</p>
                  )}
            </div>
          )}
        </div>

        {/* Middle Panel: Dynamic Step Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && renderStep1SelectSchema()}
          {currentStep === 2 && renderStep2MapFields()}
          {currentStep === 3 && renderStep3ValidateReview()}
        </div>
      </div>

      {/* Save Template Modal */}
      {isSavingTemplate && ( // Conditional rendering based on isSavingTemplate state
        <ConfirmationModal
          // Removed isOpen prop as it's not used by ConfirmationModal internally
          onCancel={() => { // Changed from onClose to onCancel
              console.log("DEBUG: ConfirmationModal onCancel called for isSavingTemplate. Setting to false and clearing fields.");
              setIsSavingTemplate(false);
              setTemplateName(''); // Clear name
              setTemplateDescription(''); // Clear description
          }}
          onConfirm={handleSaveMappingTemplate}
          title="Save Mapping Template"
          confirmText="Save Template"
        >
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="templateName" className="block text-gray-300 text-sm font-bold mb-2">
                Template Name:
              </label>
              <input
                type="text"
                id="templateName"
                className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g., Financial Transactions Q3 2025"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="templateDescription" className="block text-sm font-medium text-gray-300 mb-2">
                Description:
              </label>
              <textarea
                id="templateDescription"
                className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline h-24"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                placeholder="Brief description of this mapping template's purpose."
              ></textarea>
            </div>
          </div>
        </ConfirmationModal>
      )}

      {/* Transformation Modal */}
      {renderTransformationModal()}

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
};

export default Workbench;