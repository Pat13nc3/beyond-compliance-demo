// src/features/complianceFrameworks/modals/IngestRegulationModal.jsx
import React, { useState } from 'react';
import { X, UploadCloud, FileText, PlusCircle, Save, Lightbulb, LoaderCircle } from 'lucide-react';
import Toast from '../../../components/ui/Toast';

const IngestRegulationModal = ({ onClose, onSave }) => {
    const [regulationName, setRegulationName] = useState('');
    const [source, setSource] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [jurisdiction, setJurisdiction] = useState('');
    const [summary, setSummary] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);
    const [clauses, setClauses] = useState([{ section: '', description: '' }]);
    const [toastMessage, setToastMessage] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUploadedFile(file);
    };

    const handleAnalyzeWithAI = () => {
        if (!uploadedFile) {
            setToastMessage('Please upload a file first.');
            return;
        }
        setIsAnalyzingAI(true);
        setTimeout(() => {
            setClauses([
                { section: '1.1', description: 'Definition of Virtual Asset Service Provider (VASP).' },
                { section: '2.3', description: 'Licensing requirements for new VASPs.' },
                { section: '5.2', description: 'Reporting obligations for suspicious transactions.' },
            ]);
            setIsAnalyzingAI(false);
            setToastMessage('AI analysis complete! Clauses have been pre-filled.');
        }, 2000);
    };

    const handleAddClause = () => {
        setClauses([...clauses, { section: '', description: '' }]);
    };

    const handleClauseChange = (index, field, value) => {
        const newClauses = [...clauses];
        newClauses[index][field] = value;
        setClauses(newClauses);
    };

    const handleSave = () => {
        if (!regulationName || !source || !publishedDate || !jurisdiction) {
            setToastMessage('Please fill all required fields.');
            return;
        }

        const newRegulation = {
            regulationName,
            source,
            publishedDate,
            jurisdiction,
            summary,
            clauses,
            fileName: uploadedFile?.name || 'N/A'
        };

        onSave(newRegulation);
        onClose();
    };

    const isFormValid = regulationName && source && publishedDate && jurisdiction && clauses.every(c => c.section && c.description);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="theme-bg-card rounded-2xl shadow-2xl p-6 w-full max-w-3xl theme-text-primary">
                <div className="flex justify-between items-center mb-4 border-b theme-border-color pb-3">
                    <h3 className="text-2xl font-bold theme-text-highlight-color">Ingest New Regulation</h3>
                    <button onClick={onClose} className="p-1 rounded-full theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium theme-text-secondary mb-1">Regulation Name*</label>
                            <input type="text" value={regulationName} onChange={(e) => setRegulationName(e.target.value)} placeholder="e.g., VASP Bill 2024" className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium theme-text-secondary mb-1">Issuing Authority (Source)*</label>
                            <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g., CBN, CMA" className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium theme-text-secondary mb-1">Published Date*</label>
                            <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium theme-text-secondary mb-1">Jurisdiction*</label>
                            <input type="text" value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} placeholder="e.g., Nigeria, Kenya" className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium theme-text-secondary mb-1">Summary</label>
                            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Brief summary of the regulation..." className="w-full p-2 border theme-border-color rounded-md theme-bg-card theme-text-primary h-20" />
                        </div>
                    </div>
                    
                    <div className="border border-dashed border-gray-500 dark:border-gray-600 rounded-lg p-4 text-center relative">
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <div className="flex flex-col items-center justify-center h-full">
                            <UploadCloud size={32} className="theme-text-secondary mb-2" />
                            <p className="text-sm theme-text-secondary">Drag & Drop or <span className="text-blue-400 hover:underline">Browse</span> to Upload Regulation Document</p>
                            {uploadedFile && (
                                <p className="text-xs theme-text-secondary mt-1">File selected: <span className="font-semibold theme-text-primary">{uploadedFile.name}</span></p>
                            )}
                        </div>
                        <button
                            onClick={handleAnalyzeWithAI}
                            disabled={!uploadedFile || isAnalyzingAI}
                            className={`mt-4 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center mx-auto ${uploadedFile && !isAnalyzingAI ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                        >
                            {isAnalyzingAI ? (
                                <>
                                    <LoaderCircle size={16} className="mr-2 animate-spin" /> Analyzing with AI...
                                </>
                            ) : (
                                <>
                                    <Lightbulb size={16} className="mr-2" /> Analyze with AI
                                </>
                            )}
                        </button>
                    </div>

                    <div className="mt-6 p-4 theme-bg-card-alt rounded-lg">
                        <h4 className="font-bold mb-3 theme-text-primary flex items-center"><FileText size={16} className="mr-2" /> Compliance Clauses (AI Recommended)</h4>
                        {clauses.map((clause, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <input type="text" value={clause.section} onChange={(e) => handleClauseChange(index, 'section', e.target.value)} placeholder="Section e.g., 3.1" className="w-1/3 p-2 theme-bg-card border theme-border-color rounded-md" />
                                <input type="text" value={clause.description} onChange={(e) => handleClauseChange(index, 'description', e.target.value)} placeholder="Description of clause" className="w-2/3 p-2 theme-bg-card border theme-border-color rounded-md" />
                                {clauses.length > 1 && (
                                    <button onClick={() => setClauses(clauses.filter((_, i) => i !== index))} className="p-1 text-red-400 hover:text-red-300">
                                        <X size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button onClick={handleAddClause} className="mt-2 text-blue-400 hover:text-blue-300 flex items-center text-sm">
                            <PlusCircle size={16} className="mr-1" /> Add Clause Manually
                        </button>
                    </div>
                </div>

                <div className="flex justify-end pt-6 mt-6 border-t theme-border-color">
                    <button onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 text-white mr-2">
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={!isFormValid} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center">
                        <Save size={16} className="mr-2" /> Save Regulation
                    </button>
                </div>
                {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
            </div>
        </div>
    );
};

export default IngestRegulationModal;