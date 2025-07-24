import React, { useState } from 'react';

const ReceiverForm = () => {
    const [receiverName, setReceiverName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!receiverName) newErrors.receiverName = 'Receiver name is required';
        if (!accountNumber) newErrors.accountNumber = 'Account number is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Handle successful form submission
            console.log('Receiver Details:', { receiverName, accountNumber });
            // Reset form fields
            setReceiverName('');
            setAccountNumber('');
            setErrors({});
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="receiverName">Receiver Name:</label>
                <input
                    type="text"
                    id="receiverName"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                />
                {errors.receiverName && <span>{errors.receiverName}</span>}
            </div>
            <div>
                <label htmlFor="accountNumber">Account Number:</label>
                <input
                    type="text"
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                />
                {errors.accountNumber && <span>{errors.accountNumber}</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ReceiverForm;