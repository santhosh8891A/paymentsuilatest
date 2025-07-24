import React, { useState } from 'react';

const SenderForm = () => {
    const [senderName, setSenderName] = useState('');
    const [paymentInfo, setPaymentInfo] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!senderName || !paymentInfo) {
            setError('Please fill in all fields');
            return;
        }
        setError('');
        // Handle form submission logic here
        console.log('Sender Name:', senderName);
        console.log('Payment Info:', paymentInfo);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sender Information</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label htmlFor="senderName">Name:</label>
                <input
                    type="text"
                    id="senderName"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="paymentInfo">Payment Information:</label>
                <input
                    type="text"
                    id="paymentInfo"
                    value={paymentInfo}
                    onChange={(e) => setPaymentInfo(e.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default SenderForm;