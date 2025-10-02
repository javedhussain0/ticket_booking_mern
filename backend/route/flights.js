import express from 'express';
import {
  searchFlights,
  getFlightById,
  getFlightByNumber,
  createFlight,
  updateFlight
} from '../controller/flightController.js';

const router = express.Router();

router.get('/search', searchFlights);
router.get('/number/:number', getFlightByNumber);
router.get('/:id', getFlightById);
router.post('/', createFlight);
router.put('/:id', updateFlight);

export default router;