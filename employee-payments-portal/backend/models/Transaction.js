// backend/models/Transaction.js
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  provider: { type: String, default: 'SWIFT' },
  payeeAccount: { type: String, required: true },
  swiftCode: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Verified'], default: 'Pending' }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
