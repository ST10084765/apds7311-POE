// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, unique: true, required: true, match: /^[a-zA-Z0-9]{3,15}$/ },
  accountNumber: { type: String, unique: true, required: true, match: /^[0-9]{10}$/ },
  idNumber: { type: String, required: true, match: /^[0-9]{13}$/ },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'employee'], default: 'customer' },
}, { timestamps: true });

// Hash password before saving the user document
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords for login
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
