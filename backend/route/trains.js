import express from 'express';
import {
  searchTrains,
  getTrainById,
  getTrainByNumber,
  createTrain,
  updateTrain
} from '../controllers/trainController.js';

const router = express.Router();

router.get('/search', searchTrains);
router.get('/number/:number', getTrainByNumber);
router.get('/:id', getTrainById);
router.post('/', createTrain);
router.put('/:id', updateTrain);

export default router;