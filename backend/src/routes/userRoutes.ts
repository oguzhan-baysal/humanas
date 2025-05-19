import express from 'express';
import { getAllUsers, getUserById, getUserPredictions, getAllPredictions } from '../controllers/userController';

const router = express.Router();

// Kullanıcı rotaları
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// Tahmin rotaları
router.get('/predictions', getAllPredictions);
router.get('/:id/predictions', getUserPredictions);

export default router; 