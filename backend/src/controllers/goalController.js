import logger from '../config/logger.js';
import asyncHandler from 'express-async-handler';
import Goal from '../models/goalModel.js';
import User from '../models/userModel.js';

// @desc    Get all goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json({ goals: goals.map(goal => ({ text: goal.text, id: goal.id })) });
});

// @desc    Set a goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    logger.error('Please add a text field');
    res.status(400).json({ message: 'Please add a text field' });
    throw new Error('Please add a text field');
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  logger.info('Goal set successfully');
  res.status(201).json(goal);
});

// @desc    Update a goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400).json({ message: 'Goal not found' });
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);

  // Check for user existence
  if (!user) {
    res.status(401).json({ message: 'User not found' });
    throw new Error('User not found');
  }
  // check if the logged-in user is the owner of the goal
  if (goal.user.toString() !== req.user.id) {
    res.status(401).json({ message: 'User not authorized' });
    throw new Error('User not authorized');
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedGoal);
});

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: 'User not found' });
    throw new Error('User not found');
  }
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400).json({ message: 'Goal not found' });
    throw new Error('Goal not found');
  }
  const user = await User.findById(req.user.id);

  // Check for user existence
  if (!user) {
    res.status(401).json({ message: 'User not found' });
    throw new Error('User not found');
  }
  // check if the logged-in user is the owner of the goal
  if (goal.user.toString() !== req.user.id) {
    res.status(401).json({ message: 'User not authorized' });
    throw new Error('User not authorized');
  }
  await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Deleted Goal ${req.params.id}`, goal });
});

export { getGoals, setGoal, updateGoal, deleteGoal };
