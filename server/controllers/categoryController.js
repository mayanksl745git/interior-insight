// Default categories for the application
const categories = [
  { id: '1', name: 'Living Room', description: 'Design ideas for living rooms' },
  { id: '2', name: 'Bedroom', description: 'Design ideas for bedrooms' },
  { id: '3', name: 'Kitchen', description: 'Design ideas for kitchens' },
  { id: '4', name: 'Bathroom', description: 'Design ideas for bathrooms' },
  { id: '5', name: 'Office', description: 'Design ideas for home offices' },
  { id: '6', name: 'Dining Room', description: 'Design ideas for dining rooms' }
];

// Initialize categories
export const initializeCategories = async () => {
  console.log('Categories initialized');
  return categories;
};

// Get all categories
export const getCategories = (req, res) => {
  res.json(categories);
};

// Get category by ID
export const getCategoryById = (req, res) => {
  const category = categories.find(c => c.id === req.params.id);
  
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
};