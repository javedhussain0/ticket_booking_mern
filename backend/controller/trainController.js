import Train from '../model/Train.js';

// Search trains
export const searchTrains = async (req, res) => {
  try {
    const { from, to, date, classType = 'all' } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: 'Please provide from and to parameters'
      });
    }

    let filter = {
      'from.code': from.toUpperCase(),
      'to.code': to.toUpperCase(),
      isActive: true
    };

    // Class type filter
    if (classType !== 'all') {
      filter[`classes.${classType}.available`] = true;
    }

    const trains = await Train.find(filter).sort({ departure: 1 });

    res.json({
      success: true,
      data: {
        trains,
        search: {
          from,
          to,
          date,
          classType
        }
      }
    });
  } catch (error) {
    console.error('Search trains error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching trains',
      error: error.message
    });
  }
};

// Get train by ID
export const getTrainById = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    
    if (!train) {
      return res.status(404).json({
        success: false,
        message: 'Train not found'
      });
    }

    res.json({
      success: true,
      data: { train }
    });
  } catch (error) {
    console.error('Get train error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching train',
      error: error.message
    });
  }
};

// Get train by number
export const getTrainByNumber = async (req, res) => {
  try {
    const train = await Train.findOne({ number: req.params.number });
    
    if (!train) {
      return res.status(404).json({
        success: false,
        message: 'Train not found'
      });
    }

    res.json({
      success: true,
      data: { train }
    });
  } catch (error) {
    console.error('Get train by number error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching train',
      error: error.message
    });
  }
};

// Create train (admin)
export const createTrain = async (req, res) => {
  try {
    const train = await Train.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Train created successfully',
      data: { train }
    });
  } catch (error) {
    console.error('Create train error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating train',
      error: error.message
    });
  }
};

// Update train (admin)
export const updateTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!train) {
      return res.status(404).json({
        success: false,
        message: 'Train not found'
      });
    }

    res.json({
      success: true,
      message: 'Train updated successfully',
      data: { train }
    });
  } catch (error) {
    console.error('Update train error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating train',
      error: error.message
    });
  }
};