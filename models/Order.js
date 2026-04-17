const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
  },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    image: String,
    size: String,
    qty: Number,
  }],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: { type: String, default: 'bank_transfer' },
  paymentProof: { type: String, default: '' },
  coupon: { type: Object, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
