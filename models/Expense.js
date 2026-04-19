const mongoose = require('mongoose');

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Utilities', 'Other'];

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, enum: CATEGORIES },
  date: { type: Date, required: true },
  notes: { type: String, trim: true, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
