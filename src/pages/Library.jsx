import React, { useState } from 'react';
import {
    Upload, Search, MoreVertical, Sparkles, LoaderCircle,
    BookOpenCheck, FileText, BarChart3, Folder, Archive, FileClock, FileSignature,
    Edit, Trash2
} from 'lucide-react';
import UploadModal from '../components/modals/UploadModal.jsx';
import { initialLibraryStructure } from '../data/mockData.js';
import ActionMenu from '../components/ui/ActionMenu.jsx';
// CORRECTED: The import path now correctly points to the modals folder.
import EditItemModal from '../components/modals/EditItemModal.jsx';

const IconRenderer = ({ iconName }) => {
    const icons = {
        BookOpenCheck, FileText, BarChart3, Folder, Archive, FileClock, FileSignature
    };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent /> : <FileText />;
};

const statusColors = {
    'New': 'bg-blue-500', 'Analyzed': 'bg-green-500', 'Archived': 'bg-gray-500',
    'Draft': 'bg-yellow-500', 'Published': 'bg-purple-500', 'Live': 'bg-teal-500',
    'Active': 'bg-indigo-500', 'Submitted': 'bg-cyan-500',
};

const Library = () => {
    const [libraryData, setLibraryData] = useState(initialLibraryStructure);
    const [activeCategoryName, setActiveCategoryName] = useState('Regulatory Rulebooks');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [analyzingItemId, setAnalyzingItemId] = useState(null);
    const [openMenuName, setOpenMenuName] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);

    let activeContent = [];
    for (const group of libraryData) {
        const foundCategory = group.categories.find(cat => cat.name === activeCategoryName);
        if (foundCategory) {
            activeContent = foundCategory.content;
            break;
        }
    }
    
    const handleUpload = ({ category, file }) => {
       setLibraryData(currentData =>
            currentData.map(group => ({
                ...group,
                categories: group.categories.map(cat => {
                    if (cat.name === category) {
                        const newContent = { name: file.name, status: 'New' };
                        return { ...cat, count: cat.count + 1, content: [newContent, ...cat.content] };
                    }
                    return cat;
                })
            }))
        );
    };
    
    const handleAnalyze = (itemToAnalyze) => {
        setAnalyzingItemId(itemToAnalyze.name);
        setTimeout(() => {
            setLibraryData(currentData =>
                currentData.map(group => ({
                    ...group,
                    categories: group.categories.map(cat => ({
                        ...cat,
                        content: cat.content.map(item => {
                            if (item.name === itemToAnalyze.name) {
                                return { ...item, status: 'Analyzed' };
                            }
                            return item;
                        }),
                    })),
                }))
            );
            setAnalyzingItemId(null);
        }, 2000);
    };

    const handleEdit = (item) => {
        setItemToEdit(item);
        setIsEditModalOpen(true);
    };

    const handleSaveItem = (originalItem, updatedData) => {
        setLibraryData(currentData =>
            currentData.map(group => ({
                ...group,
                categories: group.categories.map(cat => ({
                    ...cat,
                    content: cat.content.map(item => {
                        if (item.name === originalItem.name) {
                            return { ...item, ...updatedData };
                        }
                        return item;
                    }),
                })),
            }))
        );
    };

    const handleDelete = (itemToDelete) => {
        setLibraryData(currentData =>
            currentData.map(group => ({
                ...group,
                categories: group.categories.map(cat => {
                    const itemExists = cat.content.some(item => item.name === itemToDelete.name);
                    if (itemExists) {
                        return {
                            ...cat,
                            content: cat.content.filter(item => item.name !== itemToDelete.name),
                            count: cat.count - 1,
                        };
                    }
                    return cat;
                })
            }))
        );
    };

    const allCategories = libraryData.flatMap(group => group.categories);

    return (
        <>
            <div className="flex animate-fade-in h-full">
                <div className="w-1/4 bg-[#1e252d] rounded-l-xl p-6 flex flex-col">
                    {libraryData.map(group => (
                        <div key={group.heading} className="mb-6">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">{group.heading}</h3>
                            <div className="space-y-2">
                                {group.categories.map(category => (
                                    <button 
                                        key={category.name}
                                        onClick={() => setActiveCategoryName(category.name)}
                                        className={`w-full text-left flex justify-between items-center p-3 rounded-lg transition-colors ${activeCategoryName === category.name ? 'bg-[#c0933e] text-[#1e252d] font-bold' : 'text-gray-300 hover:bg-gray-700'}`}
                                    >
                                        <div className="flex items-center">
                                            <span className="mr-3"><IconRenderer iconName={category.icon} /></span>
                                            {category.name}
                                        </div>
                                        <span className="text-sm font-light">{category.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-3/4 bg-gray-800 rounded-r-xl p-6 text-white">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                        <h3 className="text-2xl font-bold">{activeCategoryName}</h3>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                                <input type="text" placeholder={`Search in ${activeCategoryName}...`} className="bg-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-[#c0933e] focus:border-[#c0933e]"/>
                            </div>
                            <button onClick={() => setIsUploadModalOpen(true)} className="bg-[#c0933e] text-[#1e252d] font-bold py-2 px-4 rounded-md hover:bg-opacity-90 flex items-center">
                                <Upload size={16} className="mr-2"/> Upload New
                            </button>
                        </div>
                    </div>

                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="text-left py-3 px-4 text-sm font-medium uppercase">Name</th>
                                <th className="text-left py-3 px-4 text-sm font-medium uppercase">Status</th>
                                <th className="text-right py-3 px-4 text-sm font-medium uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeContent.map((item, index) => (
                                <tr key={index} className="border-b border-gray-800 hover:bg-gray-900">
                                    <td className="py-3 px-4 font-semibold">{item.name}</td>
                                    <td className="py-3 px-4">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${statusColors[item.status] || 'bg-gray-600'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        {item.status === 'New' && (
                                             <button onClick={() => handleAnalyze(item)} className="bg-purple-600 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-purple-500 transition-colors flex items-center ml-auto disabled:opacity-50" disabled={analyzingItemId === item.name}>
                                                {analyzingItemId === item.name ? <LoaderCircle size={14} className="mr-1.5 animate-spin"/> : <Sparkles size={14} className="mr-1.5"/>}
                                                {analyzingItemId === item.name ? 'Analyzing...' : 'Analyze'}
                                            </button>
                                        )}
                                        {item.status !== 'New' && (
                                            <div className="relative inline-block">
                                                <button onClick={() => setOpenMenuName(openMenuName === item.name ? null : item.name)} className="p-2 rounded-md hover:bg-gray-700">
                                                    <MoreVertical size={18} />
                                                </button>
                                                {openMenuName === item.name && (
                                                    <ActionMenu
                                                        onClose={() => setOpenMenuName(null)}
                                                        items={[
                                                            { label: 'Edit', icon: <Edit size={14} />, onClick: () => handleEdit(item) },
                                                            { label: 'Delete', icon: <Trash2 size={14} />, onClick: () => handleDelete(item), isDestructive: true },
                                                        ]}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isUploadModalOpen && (
                <UploadModal 
                    categories={allCategories} 
                    onClose={() => setIsUploadModalOpen(false)}
                    onUpload={handleUpload}
                />
            )}
            {isEditModalOpen && (
                <EditItemModal 
                    item={itemToEdit}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSaveItem}
                />
            )}
        </>
    );
};

export default Library;
