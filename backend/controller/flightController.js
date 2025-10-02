import Flight from '../models/Flight.js';

// Search flights
export const searchFlights = async (req, res) => {
  try {
    const { from, to, date, passengers = 1 } = req.query;

    if (!from || !to || !date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide from, to, and date parameters'
      });
    }

    const searchDate = new Date(date);
    const nextDay = new Date(searchDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const flights = await Flight.find({
      'from.code': from.toUpperCase(),
      'to.code': to.toUpperCase(),
      'departure.date': {
        $gte: searchDate,
        $lt: nextDay
      },
      isActive: true,
      availableSeats: { $gte: parseInt(passengers) }
    }).sort({ 'departure.time': 1 });

    res.json({
      success: true,
      data: {
        flights,
        search: {
          from,
          to,
          date,
          passengers: parseInt(passengers)
        }
      }
    });
  } catch (error) {
    console.error('Search flights error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching flights',
      error: error.message
    });
  }
};

// Get flight by ID
export const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    
    if (!flight) {
      return res.status(404).json({
        success: false,
        message: 'Flight not found'
      });
    }

    res.json({
      success: true,
      data: { flight }
    });
  } catch (error) {
    console.error('Get flight error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching flight',
      error: error.message
    });
  }
};

// Get flight by number
export const getFlightByNumber = async (req, res) => {
  try {
    const flight = await Flight.findOne({ number: req.params.number.toUpperCase() });
    
    if (!flight) {
      return res.status(404).json({
        success: false,
        message: 'Flight not found'
      });
    }

    res.json({
      success: true,
      data: { flight }
    });
  } catch (error) {
    console.error('Get flight by number error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching flight',
      error: error.message
    });
  }
};

// Create flight (admin)
export const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Flight created successfully',
      data: { flight }
    });
  } catch (error) {
    console.error('Create flight error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating flight',
      error: error.message
    });
  }
};

// Update flight (admin)
export const updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: 'Flight not found'
      });
    }

    res.json({
      success: true,
      message: 'Flight updated successfully',
      data: { flight }
    });
  } catch (error) {
    console.error('Update flight error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating flight',
      error: error.message
    });
  }
};