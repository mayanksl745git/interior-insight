import React, { useRef } from 'react';
import styled from 'styled-components';
import useImageUpload from '../hooks/useImageUpload';

const UploadContainer = styled.div`
  width: 100%;
  max-width: ${props => props.$maxWidth || '400px'};
  margin: ${props => props.$margin || '0 auto'};
`;

const DropZone = styled.div`
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$isDragging ? '#f0f0f0' : 'transparent'};
  
  &:hover {
    border-color: #666;
    background: #f9f9f9;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const PreviewImage = styled.div`
  position: relative;
  padding-top: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-top: 8px;
  font-size: 14px;
`;

const LoadingSpinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 10px auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ImageUploader = ({
  onUpload,
  onError,
  maxFiles = 1,
  maxWidth,
  margin,
  acceptedTypes = 'image/jpeg,image/png,image/webp',
  dropzoneText = 'Drag and drop images here or click to select',
}) => {
  const fileInputRef = useRef(null);
  
  const {
    images,
    isUploading,
    error,
    clearError,
    handleInputChange,
    handleDrop,
    handleDragOver,
    removeImage
  } = useImageUpload({
    onUploadSuccess: onUpload,
    onUploadError: onError,
    maxFiles
  });

  const handleClick = () => {
    clearError();
    fileInputRef.current?.click();
  };

  return (
    <UploadContainer $maxWidth={maxWidth} $margin={margin}>
      <DropZone
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        $isDragging={false}
      >
        {dropzoneText}
        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          multiple={maxFiles > 1}
          onChange={handleInputChange}
        />
        {isUploading && <LoadingSpinner />}
      </DropZone>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {images.length > 0 && (
        <PreviewContainer>
          {images.map(image => (
            <PreviewImage key={image.id}>
              <img src={image.preview} alt="Preview" />
              <RemoveButton
                onClick={() => removeImage(image.id)}
                aria-label="Remove image"
              >
                ×
              </RemoveButton>
            </PreviewImage>
          ))}
        </PreviewContainer>
      )}
    </UploadContainer>
  );
};

export default ImageUploader;