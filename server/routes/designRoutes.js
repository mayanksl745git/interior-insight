import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Design from '../models/Design.js';
import User from '../models/User.js';

const router = express.Router();

// @desc    Create a new design
// @route   POST /api/designs
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, description, roomType, imageUrl, modelUrl, furniture, colors } = req.body;

    const design = await Design.create({
      user: req.user._id,
      name,
      description,
      roomType,
      imageUrl,
      modelUrl,
      furniture,
      colors
    });

    // Add design to user's designs array
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { designs: design._id } }
    );

    res.status(201).json(design);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get all designs for a user
// @route   GET /api/designs
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const designs = await Design.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get design by ID
// @route   GET /api/designs/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    // Check if user owns the design
    if (design.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(design);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update design
// @route   PUT /api/designs/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    // Check if user owns the design
    if (design.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedDesign = await Design.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedDesign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete design
// @route   DELETE /api/designs/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    // Check if user owns the design
    if (design.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await design.remove();

    // Remove design from user's designs array
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { designs: design._id } }
    );

    res.json({ message: 'Design removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;