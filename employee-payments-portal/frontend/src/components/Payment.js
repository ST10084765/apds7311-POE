// src/pages/Payment.js
import React, { useState } from 'react';
import './Payment.css'; // Import shared styles

const Payment = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [provider, setProvider] = useState('SWIFT');
    const [accountInfo, setAccountInfo] = useState('');
    const [swiftCode, setSwiftCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle payment logic here
    };

    return (
        <div>
            <h1>Make a Payment</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="ZAR">ZAR</option>
                    {/* Add more currency options as needed */}
                </select>
                <input
                    type="text"
                    placeholder="Provider"
                    value={provider}
                    readOnly
                />
                <input
                    type="text"
                    placeholder="Payee Account Info"
                    value={accountInfo}
                    onChange={(e) => setAccountInfo(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="SWIFT Code"
                    value={swiftCode}
                    onChange={(e) => setSwiftCode(e.target.value)}
                    required
                />
                <button type="submit">Pay Now</button>
            </form>
        </div>
    );
};

export default Payment;
