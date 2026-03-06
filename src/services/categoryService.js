import axios from 'axios';

const API_URL = 'https://interior-insight.onrender.com/api/categories';

// Get all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get category by ID
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    throw error;
  }
};

// Default export for the service
const categoryService = {
  getCategories,
  getCategoryById
};

export default categoryService;
