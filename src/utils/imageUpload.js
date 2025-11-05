// Image upload and processing utilities

// Maximum file size in bytes (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Supported image formats
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Validates image file size and format
 * @param {File} file - The image file to validate
 * @returns {Object} - Validation result with status and message
 */
export const validateImage = (file) => {
  if (!file) {
    return { isValid: false, message: 'Please select an image file.' };
  }

  if (!SUPPORTED_FORMATS.includes(file.type)) {
    return { 
      isValid: false, 
      message: 'Unsupported file format. Please use JPEG, PNG, or WebP images.' 
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { 
      isValid: false, 
      message: 'File size too large. Maximum size is 5MB.' 
    };
  }

  return { isValid: true, message: 'Image is valid.' };
};

/**
 * Converts image file to base64 string
 * @param {File} file - The image file to convert
 * @returns {Promise<string>} - Base64 encoded image string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Compresses an image file
 * @param {File} file - The image file to compress
 * @param {Object} options - Compression options (quality, maxWidth, maxHeight)
 * @returns {Promise<Blob>} - Compressed image blob
 */
export const compressImage = (file, options = {}) => {
  const { 
    quality = 0.8, 
    maxWidth = 1920, 
    maxHeight = 1080 
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(img.src);
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => resolve(blob),
        file.type,
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
  });
};

/**
 * Processes an image file for upload (validates, compresses, converts to base64)
 * @param {File} file - The image file to process
 * @returns {Promise<Object>} - Processed image data
 */
export const processImageForUpload = async (file) => {
  const validation = validateImage(file);
  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  try {
    const compressedImage = await compressImage(file);
    const base64Data = await fileToBase64(compressedImage);
    
    return {
      originalFile: file,
      compressedFile: compressedImage,
      base64Data,
      fileName: file.name,
      fileType: file.type,
      fileSize: compressedImage.size
    };
  } catch (error) {
    throw new Error(`Failed to process image: ${error.message}`);
  }
};