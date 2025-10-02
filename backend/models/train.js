import mongoose from 'mongoose';

const classInfoSchema = new mongoose.Schema({
  available: {
    type: Boolean,
    default: true
  },
  fare: {
    type: Number,
    required: true,
    min: 0
  },
  seats: {
    type: Number,
    default: 50,
    min: 0
  }
});

const trainSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  from: {
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  to: {
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  departure: {
    type: String,
    required: true
  },
  arrival: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  classes: {
    '1A': classInfoSchema,
    '2A': classInfoSchema,
    '3A': classInfoSchema,
    SL: classInfoSchema,
    CC: classInfoSchema,
    EC: classInfoSchema
  },
  isActive: {
    type: Boolean,
    default: true
  },
  runningDays: [{
    type: String,
    enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  }]
}, {
  timestamps: true
});

// Index for search performance
trainSchema.index({ 'from.code': 1, 'to.code': 1 });
trainSchema.index({ number: 1 });

export default mongoose.model('Train', trainSchema);