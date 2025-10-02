import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  airline: {
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
    city: {
      type: String,
      required: true,
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
    city: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  departure: {
    time: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  arrival: {
    time: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    economy: {
      type: Number,
      required: true,
      min: 0
    },
    premium_economy: {
      type: Number,
      required: true,
      min: 0
    },
    business: {
      type: Number,
      required: true,
      min: 0
    },
    first: {
      type: Number,
      required: true,
      min: 0
    }
  },
  stops: {
    type: Number,
    default: 0,
    min: 0
  },
  aircraft: {
    type: String,
    required: true
  },
  availableSeats: {
    type: Number,
    default: 100,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

flightSchema.index({ 'from.code': 1, 'to.code': 1 });
flightSchema.index({ 'departure.date': 1 });

export default mongoose.model('Flight', flightSchema);