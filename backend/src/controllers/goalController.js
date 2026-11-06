import logger from '../config/logger.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all goals
// @route   GET /api/goals
// @access  Public
const getGoals = asyncHandler(async(req, res) => {
  res.status(200).json({ goals: [] });
});

// @desc    Set a goal
// @route   POST /api/goals
// @access  Public
const setGoal = asyncHandler(async(req, res) => {
  if(!req.body.text){
    logger.error('Please add a text field');
    res.status(400).json({message: 'Please add a text field'});
    throw new Error('Please add a text field');
  }
  logger.info('Goal set successfully');
  res.status(201).json({ message: 'Set Goals' });
});

// @desc    Update a goal
// @route   PUT /api/goals/:id
// @access  Public
const updateGoal = asyncHandler(async(req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}`, goals: [] });
});

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  Public
const deleteGoal = asyncHandler(async(req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
});

export { getGoals, setGoal, updateGoal, deleteGoal };
