const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

// @route   GET /api/settings
// @desc    Get site settings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/settings
// @desc    Update site settings
// @access  Private (Admin)
router.put('/', auth, async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    Object.assign(settings, req.body);
    const updated = await settings.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
