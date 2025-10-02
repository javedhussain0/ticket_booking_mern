import Booking from '../models/Booking.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Determine booking type
    let bookingType = 'general';
    if (bookingData.flightNumber) bookingType = 'flight';
    else if (bookingData.hotelName || bookingData.hotel) bookingType = 'hotel';
    else if (bookingData.trainNumber) bookingType = 'train';

    // Calculate amount based on booking type
    const amount = calculateBookingAmount(bookingData);

    const booking = new Booking({
      bookingType,
      user: {
        name: bookingData.passenger?.name || bookingData.guest?.name || 'Customer',
        email: bookingData.passenger?.email || bookingData.guest?.email || 'customer@example.com',
        phone: bookingData.passenger?.phone || bookingData.guest?.phone || '0000000000'
      },
      bookingDetails: bookingData,
      payment: {
        amount: amount,
        status: 'completed',
        method: bookingData.payment?.method || 'card',
        transactionId: generateTransactionId()
      }
    });

    const savedBooking = await booking.save();
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        booking: savedBooking
      }
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, type } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};
    if (type) {
      filter.bookingType = type;
    }

    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(filter);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: { booking }
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
};

// Get booking by reference
export const getBookingByReference = async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingReference: req.params.reference });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: { booking }
    });
  } catch (error) {
    console.error('Get booking by reference error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: { booking }
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking status',
      error: error.message
    });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'cancelled',
        'payment.status': 'refunded'
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: { booking }
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message
    });
  }
};

// Helper functions
const calculateBookingAmount = (bookingData) => {
  if (bookingData.flightNumber) {
    return bookingData.price || bookingData.fare || 0;
  } else if (bookingData.hotel || bookingData.hotelName) {
    return bookingData.total || bookingData.price || 0;
  } else if (bookingData.trainNumber) {
    return bookingData.fare || bookingData.price || 0;
  }
  return bookingData.amount || 0;
};

const generateTransactionId = () => {
  return 'TXN' + Math.random().toString(36).substring(2, 15).toUpperCase() +
         Date.now().toString(36).toUpperCase();
};