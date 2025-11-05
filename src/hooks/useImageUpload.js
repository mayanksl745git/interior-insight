import { useState, useCallback } from 'react';
import { processImageForUpload } from '../utils/imageUpload';

/**
 * Custom hook for handling image uploads with drag and drop support
 * @param {Object} options - Hook configuration options
 * @returns {Object} - Image upload state and handlers
 */
const useImageUpload = (options = {}) => {
  const {
    onUploadSuccess,
    onUploadError,
    maxFiles = 1,
  } = options;

  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  // Reset error state
  const clearError = () => setError(null);

  // Handle file selection
  const handleFiles = useCallback(async (files) => {
    setError(null);
    setIsUploading(true);

    try {
      // Convert FileList to Array and limit number of files
      const fileArray = Array.from(files).slice(0, maxFiles);

      // Process all selected files
      const processedImages = await Promise.all(
        fileArray.map(async (file) => {
          try {
            const processed = await processImageForUpload(file);
            return {
              ...processed,
              id: crypto.randomUUID(),
              preview: URL.createObjectURL(file)
            };
          } catch (error) {
            throw new Error(`Error processing ${file.name}: ${error.message}`);
          }
        })
      );

      setImages(prevImages => {
        // If maxFiles is 1, replace existing images
        if (maxFiles === 1) {
          // Cleanup old preview URLs
          prevImages.forEach(img => URL.revokeObjectURL(img.preview));
          return processedImages;
        }
        // Otherwise append new images up to maxFiles
        const newImages = [...prevImages, ...processedImages]
          .slice(0, maxFiles);
        return newImages;
      });

      onUploadSuccess?.(processedImages);
    } catch (error) {
      setError(error.message);
      onUploadError?.(error);
    } finally {
      setIsUploading(false);
    }
  }, [maxFiles, onUploadSuccess, onUploadError]);

  // Handle file input change
  const handleInputChange = useCallback((event) => {
    handleFiles(event.target.files);
  }, [handleFiles]);

  // Handle drag and drop
  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer.files?.length > 0) {
      handleFiles(event.dataTransfer.files);
    }
  }, [handleFiles]);

  // Handle drag over
  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  // Remove an image by id
  const removeImage = useCallback((imageId) => {
    setImages(prevImages => {
      const imageToRemove = prevImages.find(img => img.id === imageId);
      if (imageToRemove?.preview) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prevImages.filter(img => img.id !== imageId);
    });
  }, []);

  // Cleanup preview URLs on unmount
  useCallback(() => {
    return () => {
      images.forEach(img => {
        if (img.preview) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [images]);

  return {
    images,
    isUploading,
    error,
    clearError,
    handleInputChange,
    handleDrop,
    handleDragOver,
    removeImage
  };
};

export default useImageUpload;