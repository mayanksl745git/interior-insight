import React, { createContext, useContext, useState, useCallback } from 'react';
import styled from 'styled-components';

// Create context
const DragDropContext = createContext(null);

// Styled components
const DraggableContainer = styled.div`
  position: relative;
  cursor: ${props => props.$isDragging ? 'grabbing' : 'grab'};
  user-select: none;
  transform: ${props => props.$isDragging ? 'scale(1.05)' : 'scale(1)'};
  transition: transform 0.2s;
  z-index: ${props => props.$isDragging ? 1000 : 1};
`;

const DropZone = styled.div`
  position: relative;
  min-height: 50px;
  border: ${props => props.$isOver ? '2px dashed #2c5282' : '2px dashed transparent'};
  background: ${props => props.$isOver ? 'rgba(44, 82, 130, 0.1)' : 'transparent'};
  transition: all 0.2s;
`;

// Provider component
export const DragDropProvider = ({ children }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);

  const handleDragStart = useCallback((item) => {
    setDraggedItem(item);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (draggedItem && dropTarget) {
      // Handle the drop operation
      console.log('Dropped', draggedItem, 'onto', dropTarget);
    }
    setDraggedItem(null);
    setDropTarget(null);
  }, [draggedItem, dropTarget]);

  const handleDragEnter = useCallback((target) => {
    setDropTarget(target);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDropTarget(null);
  }, []);

  const value = {
    draggedItem,
    dropTarget,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
    handleDragLeave,
  };

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
};

// Draggable component
export const Draggable = ({ children, item, className }) => {
  const { handleDragStart, handleDragEnd, draggedItem } = useContext(DragDropContext);
  const isDragging = draggedItem === item;

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(item);

    const handleMouseMove = (e) => {
      // Update position
      const el = e.target;
      el.style.position = 'fixed';
      el.style.left = `${e.clientX - el.offsetWidth / 2}px`;
      el.style.top = `${e.clientY - el.offsetHeight / 2}px`;
    };

    const handleMouseUp = () => {
      handleDragEnd();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <DraggableContainer
      className={className}
      onMouseDown={handleMouseDown}
      $isDragging={isDragging}
    >
      {children}
    </DraggableContainer>
  );
};

// Droppable component
export const Droppable = ({ children, target, className }) => {
  const { handleDragEnter, handleDragLeave, dropTarget } = useContext(DragDropContext);
  const isOver = dropTarget === target;

  return (
    <DropZone
      className={className}
      onMouseEnter={() => handleDragEnter(target)}
      onMouseLeave={handleDragLeave}
      $isOver={isOver}
    >
      {children}
    </DropZone>
  );
};

// Custom hook for accessing context
export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
};