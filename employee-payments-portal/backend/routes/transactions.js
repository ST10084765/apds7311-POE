// backend/routes/transactions.js
const express = require('express');
const Transaction = require('../models/Transaction'); // Import the Transaction model
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Create Transaction
router.post('/create', async (req, res) => {
    const { accountNumber, payeeAccount, amount, currency, swiftCode } = req.body;

    // Validate input
    const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/; // Allow positive numbers with up to two decimal places
    const swiftCodeRegex = /^[A-Z]{6}[0-9A-Z]{2}([A-Z0-9]{3})?$/; // Standard SWIFT/BIC code format

    if (!accountNumber || !payeeAccount || !amount || !currency || !swiftCode) {
        return res.status(400).send('All fields are required.');
    }
    if (!amountRegex.test(amount)) {
        return res.status(400).send('Invalid amount format.');
    }
    if (!swiftCodeRegex.test(swiftCode)) {
        return res.status(400).send('Invalid SWIFT code format.');
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ accountNumber });
        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Create a new transaction
        const newTransaction = new Transaction({
            userId: user._id, // Reference to the user
            payeeAccount,
            amount,
            currency,
            swiftCode,
            status: 'Pending', // Default status
            createdAt: new Date(),
        });

        await newTransaction.save();
        res.status(201).send('Transaction created successfully');
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).send('Error creating transaction: ' + error.message);
    }
});

// Get User Transactions
router.get('/:accountNumber', async (req, res) => {
    const { accountNumber } = req.params;

    try {
        // Find the user
        const user = await User.findOne({ accountNumber });
        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Fetch transactions for the user
        const transactions = await Transaction.find({ userId: user._id }).sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).send('Error fetching transactions: ' + error.message);
    }
});

// Export the router
module.exports = router;
