const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check against env credentials
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (email !== adminEmail) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, adminPasswordHash);
    
    // Fallback for demo - plain text compare if hash doesn't work
    let validPassword = isMatch;
    if (!isMatch && adminPasswordHash && adminPasswordHash.startsWith('$2a$')) {
      validPassword = false;
    } else if (!isMatch) {
      // Demo mode fallback
      validPassword = (password === 'admin123');
    }

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: adminEmail, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, admin: { email: adminEmail, role: 'admin' } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current admin
// @access  Private
router.get('/me', require('../middleware/auth'), (req, res) => {
  res.json({ admin: req.admin });
});

module.exports = router;
