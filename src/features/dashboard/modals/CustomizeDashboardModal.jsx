// src/features/dashboard/modals/CustomizeDashboardModal.jsx

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '../components/SortableItem';
import { X } from 'lucide-react';

// The modal now receives the current layout (items) and a function to save changes (onSave).
const CustomizeDashboardModal = ({ items, onSave, onClose }) => {
  // Local state to manage changes within the modal without affecting the live dashboard.
  const [localItems, setLocalItems] = useState(items);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Function to handle the end of a drag event.
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setLocalItems((currentItems) => {
        const oldIndex = currentItems.findIndex((item) => item.id === active.id);
        const newIndex = currentItems.findIndex((item) => item.id === over.id);
        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
  };

  // Function to toggle the visibility of a card.
  const handleVisibilityChange = (id) => {
    setLocalItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  // When the user clicks "Save", we call the onSave prop with the new layout.
  const handleSaveChanges = () => {
    onSave(localItems);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-[#1e252d] text-white rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-[#c0933e]">Customize Dashboard</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
            <p className="text-sm text-gray-400 mb-4">
                Drag and drop to reorder cards. Use the eye icon to toggle visibility.
            </p>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={localItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2">
                        {localItems.map(item => (
                            <SortableItem 
                                key={item.id} 
                                id={item.id} 
                                item={item}
                                onVisibilityChange={handleVisibilityChange}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>

        <div className="flex justify-end p-4 bg-gray-900/50 border-t border-gray-700 rounded-b-xl">
            <button onClick={onClose} className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-500 mr-2">
                Cancel
            </button>
            <button onClick={handleSaveChanges} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500">
                Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeDashboardModal;
