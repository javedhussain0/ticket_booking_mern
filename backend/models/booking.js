import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingType: {
    type: String,
    required: true,
    enum: ['flight', 'hotel', 'train']
  },
  user: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  bookingDetails: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  payment: {
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'completed'
    },
    method: {
      type: String,
      enum: ['card', 'upi', 'netbanking', 'wallet'],
      default: 'card'
    },
    transactionId: String
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'pending', 'completed'],
    default: 'confirmed'
  },
  bookingReference: {
    type: String,
    unique: true,
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate booking reference before saving
bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  if (!this.bookingReference) {
    const prefix = this.bookingType.substring(0, 1).toUpperCase();
    this.bookingReference = prefix + 'B' + 
      Math.random().toString(36).substring(2, 10).toUpperCase() +
      Date.now().toString(36).toUpperCase();
  }
  next();
});

// Index for better query performance
bookingSchema.index({ bookingReference: 1 });
bookingSchema.index({ 'user.email': 1 });
bookingSchema.index({ createdAt: -1 });

export default mongoose.model('Booking', bookingSchema);