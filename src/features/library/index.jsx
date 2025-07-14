import React, { useState } from 'react';
import {
    BookOpenCheck, FileSignature, Archive, FileClock, FileText,
    Upload, Search, Edit, Trash2
} from 'lucide-react';
import UploadModal from './modals/UploadModal.jsx';
import EditItemModal from './modals/EditItemModal.jsx';
import { mockTemplates } from '../../data/mockData.js';
import ActionMenu from '../../components/ui/ActionMenu.jsx';

// Main Library Component
const Library = ({ context, onNavigate }) => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleEditItem = (item) => {
        setSelectedItem(item);
        setIsEditModalOpen(true);
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

    const knowledgeAssets = [
        { name: 'Regulatory Rulebooks', icon: BookOpenCheck, items: [] },
        { name: 'Templates', icon: FileText, items: mockTemplates },
    ];

    const documentationAssets = [
        { name: 'Internal Policies', icon: FileSignature, items: [] },
        { name: 'Evidence Files', icon: Archive, items: [] },
        { name: 'Submitted Reports', icon: FileClock, items: [] },
    ];

    return (
        <div className="p-6 bg-[#e7f1fe] min-h-screen text-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Library</h2>
                <div className="flex space-x-3">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search in library..." className="bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button onClick={() => setIsUploadModalOpen(true)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 flex items-center">
                        <Upload className="mr-2 h-5 w-5" /> Upload New
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AssetSection
                    title="Compliance Knowledge Assets"
                    categories={knowledgeAssets}
                    onEditItem={handleEditItem}
                    onUseTemplate={handleUseTemplate}
                    isSelectionMode={isSelectionMode}
                />
                <AssetSection
                    title="Compliance Documentations Assets"
                    categories={documentationAssets}
                    onEditItem={handleEditItem}
                    onUseTemplate={null}
                    isSelectionMode={isSelectionMode}
                />
            </div>

            {isUploadModalOpen && <UploadModal onClose={() => setIsUploadModalOpen(false)} />}
            {isEditModalOpen && selectedItem && (
                <EditItemModal item={selectedItem} onClose={() => setIsEditModalOpen(false)} />
            )}
        </div>
    );
};

const AssetSection = ({ title, categories, onEditItem, onUseTemplate, isSelectionMode }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">{title}</h3>
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

const CategoryAccordion = ({ name, icon: Icon, items, onEditItem, onUseTemplate, isSelectionMode }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border border-gray-200 rounded-lg">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
            >
                <div className="flex items-center">
                    <Icon className="mr-3 text-gray-500" size={20} />
                    <span className="font-semibold text-gray-800">{name}</span>
                </div>
                <span className="text-sm text-gray-500 bg-gray-200 rounded-full px-2 py-0.5">{items.length}</span>
            </button>
            {isOpen && (
                <div className="p-4 border-t border-gray-200">
                    <ul className="space-y-2">
                        {items.length > 0 ? items.map(item => (
                            <li key={item.id} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100">
                                <span className="text-sm">{item.name}</span>
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
                        )) : <li className="text-sm text-gray-500">No items in this category.</li>}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Library;