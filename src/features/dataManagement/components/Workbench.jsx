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
  PlusIcon,
  ArrowLeft
} from 'lucide-react';
import { mockIndustrySchemas, filesPendingAnalysis, mockMappingTemplates } from '../../../data/mockData';
import ConfirmationModal from '../../../components/modals/ConfirmationModal';
import Toast from '../../../components/ui/Toast';

const inferSchemaFromData = (data) => {
  if (!data || data.length === 0) return [];
  return Object.keys(data[0]).map(key => ({ id: key, name: key }));
};

const applyTransformation = (value, transformation) => {
  if (!transformation) return value;

  switch (transformation.type) {
    case 'formatDate':
      try {
        const date = new Date(value);
        if (isNaN(date)) return value;
        const year = String(date.getFullYear());
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        if (transformation.to === 'YYYY-MM-DD') return `${year}-${month}-${day}`;
        return value;
      } catch (e) {
        return value;
      }
    case 'convertToNumber':
      const num = parseFloat(value);
      return isNaN(num) ? value : num;
    case 'toUpperCase':
      return typeof value === 'string' ? value.toUpperCase() : value;
    case 'toLowerCase':
      return typeof value === 'string' ? value.toLowerCase() : value;
    case 'concatenate':
      return Array.isArray(value) ? value.join(transformation.separator || '') : value;
    case 'mapValue':
      return transformation.map[value] || value;
    default:
      return value;
  }
};

const runBasicValidation = (record, targetSchemaFields) => {
  const errors = [];
  if (!Array.isArray(targetSchemaFields)) {
    console.error("DEBUG: runBasicValidation: targetSchemaFields is NOT an array:", targetSchemaFields);
    return ["Internal error: Schema fields not properly defined for validation."];
  }

  targetSchemaFields.forEach(field => {
    const value = record[field.id];
    if (field.required && (value === undefined || value === null || value === '')) {
      errors.push(`'${field.name}' is required.`);
    }
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


const Workbench = ({ fileId, dataSourceId, isNew, onBack }) => {
  console.log("DEBUG: Workbench component rendered. This log means the latest Workbench.jsx is running.");
  console.log("DEBUG: mockIndustrySchemas (initial load):", mockIndustrySchemas);
  console.log("DEBUG: filesPendingAnalysis (initial load):", filesPendingAnalysis);

  const location = useLocation();
  const navigate = useNavigate();
  console.log("DEBUG: fileId from PROPS:", fileId);
  console.log("DEBUG: dataSourceId from PROPS:", dataSourceId);
  console.log("DEBUG: isNew from PROPS:", isNew);


  const [currentStep, setCurrentStep] = useState(1);
  const [sourceData, setSourceData] = useState([]);
  const [sourceSchema, setSourceSchema] = useState([]);

  const [selectedTargetSchemaId, setSelectedTargetSchemaId] = useState('');

  const [targetSchema, setTargetSchema] = useState(null);
  const [fieldMappings, setFieldMappings] = useState([]);
  const [mappedAndTransformedData, setMappedAndTransformedData] = useState([]);
  const [validationResults, setValidationResults] = useState([]);
  const [nonCompliantRecords, setNonCompliantRecords] = useState([]);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const [isTransformationModalOpen, setIsTransformationModalOpen] = useState(false);
  const [currentMappingIndex, setCurrentMappingIndex] = useState(null);
  const [selectedTransformationType, setSelectedTransformationType] = useState('');
  const [transformationConfig, setTransformationConfig] = useState({});

  useEffect(() => {
    console.log("DEBUG: isSavingTemplate state changed to:", isSavingTemplate);
  }, [isSavingTemplate]);


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

    setSourceData(dataToLoad);
    console.log("DEBUG: sourceData set to:", dataToLoad);
    setSourceSchema(inferredSchema);

  }, [fileId, dataSourceId, isNew]);


  useEffect(() => {
    console.log("DEBUG: useEffect for target schema changes triggered. selectedTargetSchemaId:", selectedTargetSchemaId);
    if (selectedTargetSchemaId) {
      const schema = mockIndustrySchemas.find(s => s.id === selectedTargetSchemaId);
      console.log("DEBUG: Found schema (after find):", schema);
      console.log("DEBUG: Schema fields value:", schema?.fields, "Is Array:", Array.isArray(schema?.fields));
      setTargetSchema(schema);
      console.log("DEBUG: targetSchema set to:", schema);


      let fieldsToMap = [];

      if (schema && typeof schema === 'object' && Array.isArray(schema.fields)) {
        console.log("DEBUG: schema.fields is confirmed an array. Length:", schema.fields.length, "Contents:", schema.fields);
        fieldsToMap = schema.fields;
      } else {
        console.error("DEBUG: CRITICAL: schema or schema.fields is NOT a valid array! Schema:", schema, "Schema.fields:", schema?.fields);
        fieldsToMap = [];
      }

      let initialMappings = [];
      try {
        console.log("DEBUG: Attempting to map fieldsToMap. Type:", typeof fieldsToMap, "Is Array:", Array.isArray(fieldsToMap), "Value:", fieldsToMap);
        initialMappings = fieldsToMap.map(targetField => ({
          sourceField: '',
          targetField: targetField.id,
          transformation: null,
        }));
      } catch (e) {
        console.error("DEBUG: ERROR during initialMappings map operation (caught by try/catch):", e, "fieldsToMap:", fieldsToMap);
        initialMappings = [];
      }

      console.log("DEBUG: initialMappings after map():", initialMappings, "Is Array:", Array.isArray(initialMappings));

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
  }, [selectedTargetSchemaId]);
  
  // FIX: Moved the useCallback hook for applyMappingsAndTransformations to before the useEffect hook that uses it.
  const applyMappingsAndTransformations = useCallback(() => {
    console.log("DEBUG: applyMappingsAndTransformations called.");
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
        if (!mapping || !mapping.targetField) return;

        const targetFieldDef = targetSchema.fields.find(f => f.id === mapping.targetField);
        if (!targetFieldDef) return;

        let sourceValue = null;
        if (mapping.transformation && mapping.transformation.type === 'concatenate' && Array.isArray(mapping.sourceField)) {
          sourceValue = mapping.sourceField.map(sf => sourceRecord[sf]);
        } else if (typeof mapping.sourceField === 'string') {
          sourceValue = sourceRecord[mapping.sourceField];
        }


        let transformedValue = sourceValue;
        if (mapping.transformation) {
          transformedValue = applyTransformation(sourceValue, mapping.transformation);
        }
        newRecord[mapping.targetField] = transformedValue;
      });

      const errors = runBasicValidation(newRecord, targetSchema.fields || []);
      if (errors.length > 0) {
        recordErrors.push({ rowIndex, errors });
      }

      return { transformedRecord: newRecord, errors: recordErrors.length > 0 };
    });

    setMappedAndTransformedData(transformedRecords.map(r => r.transformedRecord));
    const allValidationErrors = transformedRecords.filter(r => r.errors).map((r, index) => ({
      rowIndex: index,
      errors: runBasicValidation(r.transformedRecord, targetSchema.fields || [])
    }));
    setValidationResults(allValidationErrors);
    setNonCompliantRecords(allValidationErrors.map(err => sourceData[err.rowIndex]));

  }, [sourceData, targetSchema, fieldMappings]);


  useEffect(() => {
    console.log("DEBUG: Transformation trigger useEffect. SourceData length:", sourceData.length, "TargetSchema:", targetSchema, "FieldMappings length:", fieldMappings.length);
    if (sourceData.length > 0 && targetSchema && Array.isArray(targetSchema.fields) && fieldMappings.length > 0) {
        console.log("DEBUG: All transformation dependencies met, applying transformations.");
        applyMappingsAndTransformations();
    } else {
        console.log("DEBUG: Transformation dependencies NOT met yet.");
    }
  }, [sourceData, targetSchema, fieldMappings, applyMappingsAndTransformations]);


  const handleFieldMappingChange = (index, sourceField) => {
    console.log("DEBUG: handleFieldMappingChange called for index:", index, "sourceField:", sourceField);
    const newMappings = Array.isArray(fieldMappings) ? [...fieldMappings] : [];
    if (newMappings.length > index) {
        newMappings[index].sourceField = sourceField;
        setFieldMappings(newMappings);
    } else {
        console.error("DEBUG: Index out of bounds for fieldMappings in handleFieldMappingChange:", index, fieldMappings);
    }
  };

  const handleOpenTransformationModal = (index) => {
    console.log("DEBUG: handleOpenTransformationModal called for index:", index);
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
      const newMappings = Array.isArray(fieldMappings) ? [...fieldMappings] : [];

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
        if (selectedTransformationType === 'formatDate') {
          newTransformation.from = transformationConfig.from || '';
          newTransformation.to = transformationConfig.to || 'YYYY-MM-DD';
        } else if (selectedTransformationType === 'mapValue') {
          newTransformation.map = transformationConfig.map || {};
        } else if (selectedTransformationType === 'concatenate') {
            newTransformation.separator = transformationConfig.separator || ' ';
            const targetField = newMappings[currentMappingIndex].targetField;
            const targetFieldDef = targetSchema.fields.find(f => f.id === targetField);
            if (targetFieldDef && targetFieldDef.id === 'fullName' && !Array.isArray(newMappings[currentMappingIndex].sourceField)) {
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
      return;
    }
    if (!targetSchema) {
        showToast('Please select a target schema before saving a template.', 'error');
        return;
    }
    if (!Array.isArray(fieldMappings)) {
        showToast('Internal error: Mapping data is corrupted. Please refresh.', 'error');
        console.error("DEBUG: fieldMappings is not an array when saving template:", fieldMappings);
        return;
    }

    const newTemplate = {
      id: `template_${templateName.toLowerCase().replace(/\s/g, '_')}_${Date.now()}`,
      name: templateName,
      description: templateDescription,
      sourceSchemaExample: sourceSchema.map(s => s.id),
      targetSchemaId: targetSchema.id,
      mappings: fieldMappings.map(m => ({
        sourceField: m.sourceField,
        targetField: m.targetField,
        transformation: m.transformation,
      })),
    };

    console.log('DEBUG: Saving new mapping template:', newTemplate);
    mockMappingTemplates.push(newTemplate);
    showToast('Mapping template saved successfully!', 'success');
    setIsSavingTemplate(false);
    console.log("DEBUG: handleSaveMappingTemplate: isSavingTemplate set to false.");
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
    else if (percentage < 90) return { percentage: percentage.toFixed(2), status: 'Fair' };
    return { percentage: percentage.toFixed(2), status };
  };

  const overallCompliance = getOverallCompliance();

  const renderStep1SelectSchema = () => (
    <div className="p-6 theme-bg-card rounded-lg shadow-xl border theme-border-color">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">Step 1: Select Target Industry Schema</h2>
      <p className="theme-text-secondary mb-6">Choose an industry standard schema to map your source data to. This defines the structure and validation rules for your transformed data.</p>
      <div className="mb-4">
        <label htmlFor="targetSchemaSelect" className="block theme-text-secondary text-sm font-bold mb-2">
          Choose a Schema:
        </label>
        <select
          id="targetSchemaSelect"
          className="shadow appearance-none border theme-border-color rounded w-full py-2 px-3 bg-gray-700 theme-text-primary leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="bg-gray-700 p-4 rounded-md border theme-border-color">
          <h3 className="text-xl font-semibold text-blue-200 mb-2">{targetSchema.name} Details:</h3>
          <p className="theme-text-secondary text-sm mb-2">{targetSchema.description}</p>
          <div className="max-h-48 overflow-y-auto">
            <table className="min-w-full text-sm theme-text-secondary">
              <thead>
                <tr className="bg-gray-600">
                  <th scope="col" className="py-2 px-3 text-left">Field Name</th>
                  <th scope="col" className="py-2 px-3 text-left">Type</th>
                  <th scope="col" className="py-2 px-3 text-left">Required</th>
                  <th scope="col" className="py-2 px-3 text-left">Format</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(targetSchema.fields) ? targetSchema.fields : []).map((field, index) => (
                  <tr key={field.id} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-850'}>
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
          disabled={!selectedTargetSchemaId || sourceData.length === 0}
          className="px-6 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: Map Fields <ArrowRightIcon className="inline-block w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );

  const renderStep2MapFields = () => (
    <div className="p-6 theme-bg-card rounded-lg shadow-xl border theme-border-color">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">Step 2: Map Data Fields & Define Transformations</h2>
      <p className="theme-text-secondary mb-6">Match your source data fields to the selected target schema fields. Optionally, apply transformations to ensure data compatibility and quality.</p>

      <div className="grid grid-cols-3 gap-4 mb-6 theme-text-secondary font-semibold text-lg">
        <div>Source Field</div>
        <div>Target Field</div>
        <div>Transformation</div>
      </div>

      <div className="max-h-[60vh] overflow-y-auto pr-2">
        {Array.isArray(fieldMappings) && fieldMappings.length > 0 ? (
          fieldMappings.map((mapping, index) => (
            <div key={mapping.targetField} className="grid grid-cols-3 gap-4 items-center mb-4 p-3 bg-gray-700 rounded-md border theme-border-color">
              <div>
                {/* Corrected styling for select element and its options */}
                <select
                  className="shadow appearance-none border theme-border-color rounded w-full py-2 px-3 bg-gray-100 dark:bg-gray-800 text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 [&_option]:bg-white dark:[&_option]:bg-gray-800 [&_option]:text-black dark:[&_option]:text-white"
                  value={Array.isArray(mapping.sourceField) ? mapping.sourceField.join(',') : mapping.sourceField}
                  onChange={(e) => {
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
                  {(Array.isArray(sourceSchema) ? sourceSchema : []).map((field) => (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="theme-text-primary">
                {targetSchema?.fields?.find(f => f.id === mapping.targetField)?.name || mapping.targetField}
                {targetSchema?.fields?.find(f => f.id === mapping.targetField)?.required && (
                  <span className="text-red-400 ml-1">*</span>
                )}
              </div>

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
          <p className="theme-text-secondary text-center py-4">No fields to map. Please select a target schema first.</p>
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
          disabled={!selectedTargetSchemaId || !targetSchema || fieldMappings.some(m => !m.sourceField)}
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
      <div className="p-6 theme-bg-card rounded-lg shadow-xl border theme-border-color">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Step 3: Validate & Review Data</h2>
        <p className="theme-text-secondary mb-6">Review the transformed data and address any compliance issues.</p>

        <div className="bg-gray-700 p-4 rounded-md border theme-border-color mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-blue-200">Overall Compliance:</h3>
          <div className={`text-2xl font-bold ${
            overallCompliance.status === 'Good' ? 'text-green-400' :
            overallCompliance.status === 'Fair' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {overallCompliance.percentage}% ({overallCompliance.status})
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-red-300 mb-3">Non-Compliant Records ({nonCompliantRecords.length})</h3>
          {nonCompliantRecords.length === 0 ? (
            <p className="text-green-400">All records are compliant with the selected schema!</p>
          ) : (
            <div className="max-h-64 overflow-y-auto bg-gray-700 p-4 rounded-md border theme-border-color">
              {(Array.isArray(validationResults) ? validationResults : []).map((result, idx) => (
                <div key={idx} className="mb-4 p-3 border border-red-500 rounded-md bg-red-900 bg-opacity-20">
                  <p className="font-bold text-red-200">Row {result.rowIndex + 1}:</p>
                  <ul className="list-disc list-inside text-red-300 text-sm">
                    {(Array.isArray(result.errors) ? result.errors : []).map((error, eIdx) => (
                      <li key={eIdx}>{error}</li>
                    ))}
                  </ul>
                  <pre className="mt-2 text-xs theme-text-secondary overflow-x-auto">
                    {JSON.stringify(sourceData[result.rowIndex], null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-300 mb-3">Sample Transformed Data (First 5 Rows)</h3>
          {mappedAndTransformedData.length === 0 ? (
            <p className="theme-text-secondary">No data to preview yet. Ensure mapping is complete.</p>
          ) : (
            <div className="max-h-64 overflow-y-auto bg-gray-700 p-4 rounded-md border theme-border-color">
              <table className="min-w-full text-sm theme-text-secondary">
                <thead>
                  <tr className="bg-gray-600">
                    {(targetSchema?.fields && Array.isArray(targetSchema.fields) ? targetSchema.fields : []).map(field => (
                      <th key={field.id} className="py-2 px-3 text-left">{field.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(mappedAndTransformedData) ? mappedAndTransformedData : []).slice(0, 5).map((record, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-gray-700' : 'bg-gray-850'}>
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
              navigate('/data-management');
            }}
            className="px-6 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            Promote to Library <ArrowRightIcon className="inline-block w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    );
  };

  const renderTransformationModal = () => {
    const currentMapping = Array.isArray(fieldMappings) && currentMappingIndex !== null ? fieldMappings[currentMappingIndex] : null;
    const targetFieldDef = targetSchema?.fields?.find(f => f.id === currentMapping?.targetField);

    if (!currentMapping) return null;

    return (
      <ConfirmationModal
        isOpen={isTransformationModalOpen}
        onClose={() => {
            console.log("DEBUG: ConfirmationModal onClose called for isTransformationModalOpen. Setting to false.");
            setIsTransformationModalOpen(false);
        }}
        onConfirm={handleSaveTransformation}
        title={`Define Transformation for '${targetFieldDef?.name || ''}'`}
        confirmText="Apply Transformation"
      >
        <div className="p-4">
          <div className="mb-4">
            <label htmlFor="transformType" className="block theme-text-secondary text-sm font-bold mb-2">
              Transformation Type:
            </label>
            <select
              id="transformType"
              className="shadow appearance-none border theme-border-color rounded w-full py-2 px-3 bg-gray-700 theme-text-primary leading-tight focus:outline-none focus:shadow-outline"
              value={selectedTransformationType}
              onChange={(e) => {
                setSelectedTransformationType(e.target.value);
                setTransformationConfig({});
              }}
            >
              <option value="">-- No Transformation --</option>
              <option value="toUpperCase">Convert to Uppercase</option>
              <option value="toLowerCase">Convert to Lowercase</option>
              <option value="convertToNumber">Convert to Number</option>
              <option value="formatDate">Format Date</option>
              <option value="mapValue">Map Values (e.g., 'DR' to 'DEBIT')</option>
              <option value="concatenate">Concatenate Fields</option>
            </select>
          </div>

          {selectedTransformationType === 'formatDate' && (
            <div className="mb-4">
              <label htmlFor="dateFormatFrom" className="block theme-text-secondary text-sm font-bold mb-2">
                Current Date Format (e.g., MM/DD/YYYY):
              </label>
              <input
                type="text"
                id="dateFormatFrom"
                className="shadow appearance-none border theme-border-color rounded w-full py-2 px-3 bg-gray-700 theme-text-primary leading-tight focus:outline-none focus:shadow-outline"
                value={transformationConfig.from || ''}
                onChange={(e) => setTransformationConfig({ ...transformationConfig, from: e.target.value })}
                placeholder="MM/DD/YYYY"
              />
              <label htmlFor="dateFormatTo" className="block theme-text-secondary text-sm font-bold mb-2 mt-2">
                Target Date Format (e.g., YYYY-MM-DD):
              </label>
              <input
                type="text"
                id="dateFormatTo"
                className="shadow appearance-none border theme-border-color rounded w-full py-2 px-3 bg-gray-700 theme-text-primary leading-tight focus:outline-none focus:shadow-outline"
                value={transformationConfig.to || 'YYYY-MM-DD'}
                onChange={(e) => setTransformationConfig({ ...transformationConfig, to: e.target.value })}
                placeholder="YYYY-MM-DD"
              />
            </div>
          )}

          {selectedTransformationType === 'mapValue' && (
            <div className="mb-4">
              <label className="block theme-text-secondary text-sm font-bold mb-2">
                Value Mapping (JSON format: {"{ 'source_val': 'target_val' }"}):
              </label>
              <textarea
                className="shadow appearance-none border theme-border-color rounded w-full py-2 px-3 bg-gray-700 theme-text-primary leading-tight focus:outline-none focus:shadow-outline h-32"
                value={JSON.stringify(transformationConfig.map || {}, null, 2)}
                onChange={(e) => {
                  try {
                    setTransformationConfig({ ...transformationConfig, map: JSON.parse(e.target.value) });
                  } catch (err) {
                    console.error("Invalid JSON for mapValue:", err);
                  }
                }}
                placeholder="{ 'DR': 'DEBIT', 'CR': 'CREDIT' }"
              ></textarea>
            </div>
          )}

          {selectedTransformationType === 'concatenate' && (
            <div className="mb-4">
              <label htmlFor="separator" className="block theme-text-secondary text-sm font-bold mb-2">
                Separator (e.g., space, comma):
              </label>
              <input
                type="text"
                id="separator"
                className="shadow appearance-none border theme-border-color rounded w-full py-2 px-3 bg-gray-700 theme-text-primary leading-tight focus:outline-none focus:shadow-outline"
                value={transformationConfig.separator || ' '}
                onChange={(e) => setTransformationConfig({ ...transformationConfig, separator: e.target.value })}
                placeholder=" "
              />
              <p className="theme-text-secondary text-xs mt-1">
                You will need to select multiple source fields in the mapping step for concatenation.
              </p>
            </div>
          )}

        </div>
      </ConfirmationModal>
    );
  };

  return (
    <div className="p-6 theme-bg-page min-h-screen theme-text-primary font-inter">
      <div className="flex items-center space-x-4 mb-6">
          <button onClick={onBack} className="p-2 rounded-full theme-text-primary hover:bg-gray-200 dark:hover:bg-gray-700">
              <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-blue-400">Data Mapping & Management Workbench</h1>
      </div>

      <div className="flex justify-center items-center space-x-4 mb-8">
        <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-blue-400' : 'theme-text-secondary'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 theme-text-secondary'}`}>1</div>
          <span className="hidden sm:inline">Select Schema</span>
        </div>
        <ArrowRightIcon className={`w-5 h-5 ${currentStep > 1 ? 'text-blue-400' : 'theme-text-secondary'}`} />
        <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-blue-400' : 'theme-text-secondary'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-700 theme-text-secondary'}`}>2</div>
          <span className="hidden sm:inline">Map Fields</span>
        </div>
        <ArrowRightIcon className={`w-5 h-5 ${currentStep > 2 ? 'text-blue-400' : 'theme-text-secondary'}`} />
        <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-blue-400' : 'theme-text-secondary'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-700 theme-text-secondary'}`}>3</div>
          <span className="hidden sm:inline">Validate & Review</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 theme-bg-card p-4 rounded-lg shadow-xl border theme-border-color">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">Source Data Preview</h2>
          {sourceData.length === 0 ? (
            <p className="theme-text-secondary">No source data loaded. Please upload a file or select a data source from the Data Management Hub.</p>
          ) : (
            <div className="max-h-[70vh] overflow-y-auto">
              <table className="min-w-full text-sm theme-text-secondary">
                <thead>
                  <tr className="bg-gray-700">
                    {(Array.isArray(sourceSchema) ? sourceSchema : []).map((field) => (
                      <th key={field.id} className="py-2 px-3 text-left">{field.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(sourceData) ? sourceData : []).slice(0, 10).map((record, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-gray-700' : 'bg-gray-850'}>
                      {(Array.isArray(sourceSchema) ? sourceSchema : []).map((field) => (
                        <td key={field.id} className="py-1 px-3 truncate max-w-[120px]">
                          {record[field.id]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
                  {sourceData.length > 10 && (
                    <p className="theme-text-secondary text-sm mt-2">Showing first 10 of {sourceData.length} records...</p>
                  )}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {currentStep === 1 && renderStep1SelectSchema()}
          {currentStep === 2 && renderStep2MapFields()}
          {currentStep === 3 && renderStep3ValidateReview()}
        </div>
      </div>

      {isSavingTemplate && (
        <ConfirmationModal
          onCancel={() => {
              console.log("DEBUG: ConfirmationModal onCancel called for isSavingTemplate. Setting to false and clearing fields.");
              setIsSavingTemplate(false);
              setTemplateName('');
              setTemplateDescription('');
          }}
          onConfirm={handleSaveMappingTemplate}
          title="Save Mapping Template"
          confirmText="Save Template"
        >
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="templateName" className="block theme-text-secondary text-sm font-bold mb-2">
                Template Name:
              </label>
              <input
                type="text"
                id="templateName"
                className="shadow appearance-none border theme-border-color rounded w-full py-2 px-3 bg-gray-700 theme-text-primary leading-tight focus:outline-none focus:shadow-outline"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g., Financial Transactions Q3 2025"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="templateDescription" className="block text-sm font-medium theme-text-secondary mb-2">
                Description:
              </label>
              <textarea
                id="templateDescription"
                className="shadow appearance-none border theme-border-color rounded w-full py-2 px-3 bg-gray-700 theme-text-primary leading-tight focus:outline-none focus:shadow-outline h-24"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                placeholder="Brief description of this mapping template's purpose."
              ></textarea>
            </div>
          </div>
        </ConfirmationModal>
      )}

      {renderTransformationModal()}

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