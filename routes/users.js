const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', message: err.message });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    if (!name || !email || !role || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newUser = new User({ name, email, role, status });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user', message: err.message });
  }
});

module.exports = router;
