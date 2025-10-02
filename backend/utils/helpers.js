import jwt from 'jsonwebtoken';

// Generate JWT Token
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generate random reference number
export const generateReference = (prefix = 'REF') => {
  return prefix + Math.random().toString(36).substring(2, 15).toUpperCase() +
         Date.now().toString(36).toUpperCase();
};

// Format date to readable string
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Calculate total amount for booking
export const calculateTotalAmount = (bookingData) => {
  let total = 0;

  switch (bookingData.bookingType) {
    case 'flight':
      total = bookingData.price * (bookingData.passengers || 1);
      break;
    case 'hotel':
      const nights = Math.ceil(
        (new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / 
        (1000 * 60 * 60 * 24)
      );
      total = bookingData.price * nights * (bookingData.rooms || 1);
      break;
    case 'train':
      total = bookingData.fare * (bookingData.passengers || 1);
      break;
    default:
      total = bookingData.amount || 0;
  }

  return total;
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Indian format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};