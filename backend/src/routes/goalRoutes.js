import express from 'express';
import { getGoals, setGoal, updateGoal, deleteGoal } from '../controllers/goalController.js';

const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';
// Goals API endpoints
router.route('/').get(protect, getGoals).post(protect, setGoal);

router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

export default router;
