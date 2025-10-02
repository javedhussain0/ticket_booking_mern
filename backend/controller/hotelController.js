import Hotel from '../model/Hotel.js';

// Search hotels
export const searchHotels = async (req, res) => {
  try {
    const { location, checkIn, checkOut, guests = 1, rooms = 1, minPrice, maxPrice } = req.query;

    if (!location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide location parameter'
      });
    }

    let filter = {
      $or: [
        { location: { $regex: location, $options: 'i' } },
        { 'address.city': { $regex: location, $options: 'i' } }
      ],
      isActive: true,
      availableRooms: { $gte: parseInt(rooms) }
    };

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    const hotels = await Hotel.find(filter).sort({ rating: -1, price: 1 });

    res.json({
      success: true,
      data: {
        hotels,
        search: {
          location,
          checkIn,
          checkOut,
          guests: parseInt(guests),
          rooms: parseInt(rooms)
        }
      }
    });
  } catch (error) {
    console.error('Search hotels error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching hotels',
      error: error.message
    });
  }
};

// Get hotels by location
export const getHotelsByLocation = async (req, res) => {
  try {
    const hotels = await Hotel.find({
      $or: [
        { location: { $regex: req.params.location, $options: 'i' } },
        { 'address.city': { $regex: req.params.location, $options: 'i' } }
      ],
      isActive: true
    }).sort({ rating: -1 });

    res.json({
      success: true,
      data: { hotels }
    });
  } catch (error) {
    console.error('Get hotels by location error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching hotels',
      error: error.message
    });
  }
};

// Get hotel by ID
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    res.json({
      success: true,
      data: { hotel }
    });
  } catch (error) {
    console.error('Get hotel error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching hotel',
      error: error.message
    });
  }
};

// Create hotel (admin)
export const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Hotel created successfully',
      data: { hotel }
    });
  } catch (error) {
    console.error('Create hotel error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating hotel',
      error: error.message
    });
  }
};

// Update hotel (admin)
export const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    res.json({
      success: true,
      message: 'Hotel updated successfully',
      data: { hotel }
    });
  } catch (error) {
    console.error('Update hotel error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating hotel',
      error: error.message
    });
  }
};