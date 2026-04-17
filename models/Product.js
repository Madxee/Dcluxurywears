const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['clothes', 'shoes', 'watches', 'accessories']
  },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: null },
  description: { type: String, required: true },
  images: [{ type: String }],
  sizes: [{ type: String }],
  stock: { 
    type: String, 
    enum: ['in-stock', 'out-of-stock'],
    default: 'in-stock'
  },
  featured: { type: Boolean, default: false },
  new: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
