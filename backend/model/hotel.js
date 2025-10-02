import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  roomType: {
    type: String,
    enum: ['single', 'double', 'suite', 'deluxe', 'executive'],
    required: true
  },
  image: {
    type: String,
    default: 'https://picsum.photos/800/600'
  },
  amenities: [{
    type: String,
    trim: true
  }],
  availableRooms: {
    type: Number,
    default: 10,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  contact: {
    phone: String,
    email: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'India'
    }
  }
}, {
  timestamps: true
});

// Index for search performance
hotelSchema.index({ location: 'text', name: 'text' });
hotelSchema.index({ location: 1, price: 1 });

export default mongoose.model('Hotel', hotelSchema);