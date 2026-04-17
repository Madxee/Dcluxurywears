const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  ceoName: { type: String, default: 'Abubakar Muhammed' },
  ceoRole: { type: String, default: 'Founder & CEO' },
  ceoQuote: { type: String, default: 'At DC Luxury Wears, we believe that true style is not just about what you wear. Every piece in our collection is handpicked to ensure our clients experience the perfect blend of tradition, luxury, and modern sophistication.' },
  ceoImage: { type: String, default: '' },
  bankAccountName: { type: String, default: 'Abubakar Muhammed' },
  bankAccountNumber: { type: String, default: '7030146879' },
  bankName: { type: String, default: 'OPAY' },
  whatsappNumber: { type: String, default: '2347030146879' },
  contactEmail: { type: String, default: 'madzee44225@gmail.com' },
}, { timestamps: true });

// Singleton - only one settings document
settingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('Settings', settingsSchema);
