export const validateBooking = (req, res, next) => {
  const { user, bookingDetails, payment } = req.body;

  if (!user || !user.name || !user.email || !user.phone) {
    return res.status(400).json({
      success: false,
      message: 'User details (name, email, phone) are required'
    });
  }

  if (!bookingDetails) {
    return res.status(400).json({
      success: false,
      message: 'Booking details are required'
    });
  }

  next();
};

export const validateFlightSearch = (req, res, next) => {
  const { from, to, date } = req.query;

  if (!from || !to || !date) {
    return res.status(400).json({
      success: false,
      message: 'From, to, and date parameters are required'
    });
  }

  next();
};

export const validateHotelSearch = (req, res, next) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({
      success: false,
      message: 'Location parameter is required'
    });
  }

  next();
};