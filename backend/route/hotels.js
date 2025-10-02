import express from 'express';
import {
  searchHotels,
  getHotelById,
  createHotel,
  updateHotel,
  getHotelsByLocation
} from '../controllers/hotelController.js';

const router = express.Router();

router.get('/search', searchHotels);
router.get('/location/:location', getHotelsByLocation);
router.get('/:id', getHotelById);
router.post('/', createHotel);
router.put('/:id', updateHotel);

export default router;