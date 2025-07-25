import React, { useState, useEffect } from 'react';
import {
    BookOpenCheck, FileSignature, Archive, FileClock, FileText,
    Upload, Search, Edit, Trash2, ChevronDown, ChevronUp
} from 'lucide-react';
import { mockTemplates } from '../../data/mockData.js';
import ActionMenu from '../../components/ui/ActionMenu.jsx';
import UploadModal from './modals/UploadModal.jsx';
import EditItemModal from './modals/EditItemModal.jsx';

// Accordion component for displaying categories
const CategoryAccordion = ({ name, icon: Icon, items, onEditItem, isSelectionMode, onUseTemplate }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border border-gray-700 rounded-lg"> 
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 bg-gray-800 hover:bg-gray-700"
            >
                <div className="flex items-center">
                    <Icon className="mr-3 text-gray-400" size={20} /> 
                    <span className="font-semibold text-white">{name}</span> 
                </div>
                <div className="flex items-center">
                    <span className="text-sm text-gray-300 bg-gray-600 rounded-full px-2 py-0.5">{items.length}</span>
                    {isOpen ? <ChevronUp size={20} className="ml-4 text-gray-400"/> : <ChevronDown size={20} className="ml-4 text-gray-400"/>}
                </div>
            </button>
            {isOpen && (
                <div className="p-4 border-t border-gray-700">
                    <ul className="space-y-2">
                        {items.length > 0 ? items.map(item => (
                            <li key={item.id} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-700">
                                <span className="text-sm text-gray-200">{item.name}</span>
                                <div className="flex items-center space-x-2">
                                    {isSelectionMode && name === 'Templates' ? (
                                        <button onClick={() => onUseTemplate(item)} className="bg-blue-600 text-white font-bold py-1 px-3 rounded-md hover:bg-blue-500 text-xs">
                                            Use Template
                                        </button>
                                    ) : (
                                        <ActionMenu
                                            items={[
                                                { label: "Edit Details", action: () => onEditItem(item), icon: Edit },
                                                { label: "Delete", action: () => alert("Delete: " + item.name), icon: Trash2, color: "text-red-500" }
                                            ]}
                                        />
                                    )}
                                </div>
                            </li>
                        )) : <li className="text-sm text-gray-500 italic">No items in this category.</li>} 
                    </ul>
                </div>
            )}
        </div>
    );
};

// Section component for grouping asset categories
const AssetSection = ({ title, categories, onEditItem, onUseTemplate, isSelectionMode }) => {
    return (
        <div className="bg-[#1e252d] rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">{title}</h3> 
            <div className="space-y-4">
                {categories.map(category => (
                    <CategoryAccordion
                        key={category.name}
                        name={category.name}
                        icon={category.icon}
                        items={category.items}
                        onEditItem={onEditItem}
                        onUseTemplate={onUseTemplate}
                        isSelectionMode={isSelectionMode}
                    />
                ))}
            </div>
        </div>
    );
};

// Main Library Component, now receiving 'evidence' prop
const Library = ({ context, onNavigate, evidence }) => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // --- STATE MANAGEMENT FOR LIBRARY DATA ---
    // The library's structure is now held in state to be dynamic.
    const [assets, setAssets] = useState({
        knowledgeAssets: [
            { name: 'Regulatory Rulebooks', icon: BookOpenCheck, items: [] },
            { name: 'Templates', icon: FileText, items: mockTemplates },
        ],
        documentationAssets: [
            { name: 'Internal Policies', icon: FileSignature, items: [] },
            { name: 'Evidence Files', icon: Archive, items: [] }, // Starts empty
            { name: 'Submitted Reports', icon: FileClock, items: [] },
        ],
    });

    // --- DYNAMIC EVIDENCE INJECTION ---
    // This effect updates the "Evidence Files" category whenever the 'evidence' prop from App.jsx changes.
    useEffect(() => {
        if (evidence) {
            setAssets(currentAssets => ({
                ...currentAssets,
                documentationAssets: currentAssets.documentationAssets.map(category => {
                    if (category.name === 'Evidence Files') {
                        return { ...category, items: evidence };
                    }
                    return category;
                })
            }));
        }
    }, [evidence]);

    const handleEditItem = (item) => {
        setSelectedItem(item);
        setIsEditModalOpen(true);
    };

    const handleSaveItem = (originalItem, updatedData) => {
        // This function now correctly updates the state
        const updateItems = (items) => items.map(item => 
            item.id === originalItem.id ? { ...item, ...updatedData } : item
        );

        setAssets(currentAssets => ({
            knowledgeAssets: currentAssets.knowledgeAssets.map(cat => ({...cat, items: updateItems(cat.items)})),
            documentationAssets: currentAssets.documentationAssets.map(cat => ({...cat, items: updateItems(cat.items)})),
        }));
        setIsEditModalOpen(false);
    };
    
    const handleUpload = ({ category: categoryName, file }) => {
        const newItem = { id: `item-${Date.now()}`, name: file.name, status: 'New' };

        const updateCategory = (categories) => categories.map(cat => {
            if (cat.name === categoryName) {
                return { ...cat, items: [newItem, ...cat.items] };
            }
            return cat;
        });

        setAssets(currentAssets => ({
            knowledgeAssets: updateCategory(currentAssets.knowledgeAssets),
            documentationAssets: updateCategory(currentAssets.documentationAssets),
        }));
    };

    const handleUseTemplate = (template) => {
        if (onNavigate) {
            onNavigate('ComplianceReporting', {
                action: 'generateReport',
                template: template,
            });
        }
    };

    const isSelectionMode = context?.action === 'selectTemplate';
    const allCategories = [...assets.knowledgeAssets, ...assets.documentationAssets];

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Library</h2>
                <div className="flex space-x-3">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search in library..." className="bg-gray-800 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <button onClick={() => setIsUploadModalOpen(true)} className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-400 flex items-center">
                        <Upload className="mr-2 h-5 w-5" /> Upload New
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AssetSection
                    title="Compliance Knowledge Assets"
                    categories={assets.knowledgeAssets}
                    onEditItem={handleEditItem}
                    onUseTemplate={handleUseTemplate}
                    isSelectionMode={isSelectionMode}
                />
                <AssetSection
                    title="Compliance Documentations Assets"
                    categories={assets.documentationAssets}
                    onEditItem={handleEditItem}
                    onUseTemplate={null}
                    isSelectionMode={isSelectionMode}
                />
            </div>

            {isUploadModalOpen && <UploadModal categories={allCategories} onClose={() => setIsUploadModalOpen(false)} onUpload={handleUpload} />}
            {isEditModalOpen && selectedItem && (
                <EditItemModal item={selectedItem} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveItem} />
            )}
        </div>
    );
};

export default Library;
