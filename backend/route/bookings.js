import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  getBookingByReference,
  updateBookingStatus,
  cancelBooking
} from '../controller/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/:id', getBookingById);
router.get('/reference/:reference', getBookingByReference);
router.patch('/:id/status', updateBookingStatus);
router.patch('/:id/cancel', cancelBooking);

export default router;