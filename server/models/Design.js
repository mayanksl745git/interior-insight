import mongoose from 'mongoose';

const designSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  roomType: {
    type: String,
    required: true,
    enum: ['living-room', 'bedroom', 'kitchen', 'bathroom', 'office', 'other']
  },
  imageUrl: {
    type: String
  },
  modelUrl: {
    type: String
  },
  furniture: [{
    name: String,
    position: {
      x: Number,
      y: Number,
      z: Number
    },
    rotation: {
      x: Number,
      y: Number,
      z: Number
    }
  }],
  colors: [{
    name: String,
    hex: String,
    usage: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
designSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Design = mongoose.model('Design', designSchema);

export default Design;