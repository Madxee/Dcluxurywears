const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const auth = require('../middleware/auth');

// @route   POST /api/upload/image
// @desc    Upload single image
// @access  Private (Admin)
router.post('/image', auth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ 
      url: req.file.path,
      public_id: req.file.filename 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/upload/images
// @desc    Upload multiple images
// @access  Private (Admin)
router.post('/images', auth, upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const urls = req.files.map(file => ({
      url: file.path,
      public_id: file.filename
    }));
    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/upload/payment-proof
// @desc    Upload payment proof (public)
// @access  Public
router.post('/payment-proof', upload.single('proof'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ 
      url: req.file.path,
      public_id: req.file.filename 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
