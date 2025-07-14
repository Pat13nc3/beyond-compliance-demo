// src/features/dashboard/components/SortableItem.jsx

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff } from 'lucide-react';

// This is a generic, draggable item component for our customization modal.
export function SortableItem({ id, item, onVisibilityChange }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
      <div className="flex items-center">
        {/* Drag Handle */}
        <button 
          {...attributes} 
          {...listeners}
          className="p-2 cursor-grab active:cursor-grabbing touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical className="text-gray-400" />
        </button>
        <span className="text-white font-medium">{item.name}</span>
      </div>
      
      {/* Visibility Toggle Button */}
      <button 
        onClick={() => onVisibilityChange(id)}
        className="p-2 rounded-md hover:bg-gray-600"
        aria-label={item.visible ? "Hide item" : "Show item"}
      >
        {item.visible ? <Eye className="text-green-400" /> : <EyeOff className="text-gray-500" />}
      </button>
    </div>
  );
}