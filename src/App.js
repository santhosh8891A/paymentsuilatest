import React, { useState } from 'react';
import './styles/App.css';
import lloydsLogo from './assets/lloyds-logo.png';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && password) {
            try {
                const response = await fetch('http://localhost:8080/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                if (response.ok) {
                    const data = await response.json();
                    onLogin(data.username || username);
                    // Store JWT and userId after successful login
                    localStorage.setItem('jwtToken', data.token); // data.token should be your JWT
                    localStorage.setItem('userId', data.userId);  // store userId for later use
                } else if (response.status === 401) {
                    setError('Invalid username or password');
                } else {
                    setError('Login failed. Please try again.');
                }
            } catch (err) {
                setError('Unable to connect to server');
            }
        } else {
            setError('Please enter username and password.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form" style={{
            maxWidth: 400,
            margin: "40px auto",
            border: "1px solid #ccc",
            padding: 32,
            borderRadius: 12,
            background: "#fafbfc",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
        }}>
            <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>
            {error && (
                <div style={{ color: "red", marginBottom: 16, textAlign: "center" }}>{error}</div>
            )}
            <div style={{ marginBottom: 18, display: "flex", alignItems: "center" }}>
                <label style={{ width: 120, fontWeight: 500 }}>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    style={{
                        width: "220px",
                        padding: "8px",
                        border: "1px solid #bbb",
                        borderRadius: 4
                    }}
                />
            </div>
            <div style={{ marginBottom: 24, display: "flex", alignItems: "center" }}>
                <label style={{ width: 120, fontWeight: 500 }}>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{
                        width: "220px",
                        padding: "8px",
                        border: "1px solid #bbb",
                        borderRadius: 4
                    }}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                    type="submit"
                    style={{
                        padding: "8px 24px",
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        fontWeight: 500,
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>
            </div>
        </form>
    );
}

function AddPayeePage({ onBack, onSubmit, newPayee, handleChange }) {
    return (
        <div
            className="add-payee-page"
            style={{
                maxWidth: 400,
                margin: "40px auto",
                border: "1px solid #ccc",
                padding: 32,
                borderRadius: 12,
                background: "#fafbfc",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
            }}
        >
            <h2 style={{ textAlign: "center", marginBottom: 24 }}>Add New Payee</h2>
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: 18, display: "flex", alignItems: "center" }}>
                    <label style={{ width: 120, fontWeight: 500 }}>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={newPayee.name}
                        onChange={handleChange}
                        required
                        style={{
                            width: "220px",
                            padding: "8px",
                            border: "1px solid #bbb",
                            borderRadius: 4
                        }}
                    />
                </div>
                <div style={{ marginBottom: 18, display: "flex", alignItems: "center" }}>
                    <label style={{ width: 120, fontWeight: 500 }}>Account Number:</label>
                    <input
                        type="text"
                        name="accountNumber"
                        value={newPayee.accountNumber}
                        onChange={handleChange}
                        required
                        style={{
                            width: "220px",
                            padding: "8px",
                            border: "1px solid #bbb",
                            borderRadius: 4
                        }}
                    />
                </div>
                <div style={{ marginBottom: 24, display: "flex", alignItems: "center" }}>
                    <label style={{ width: 120, fontWeight: 500 }}>Sort Code:</label>
                    <input
                        type="text"
                        name="sortCode"
                        value={newPayee.sortCode}
                        onChange={handleChange}
                        required
                        style={{
                            width: "220px",
                            padding: "8px",
                            border: "1px solid #bbb",
                            borderRadius: 4
                        }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        type="submit"
                        style={{
                            padding: "8px 24px",
                            background: "#1976d2",
                            color: "#fff",
                            border: "none",
                            borderRadius: 4,
                            fontWeight: 500,
                            cursor: "pointer"
                        }}
                    >
                        Add Payee
                    </button>
                    <button
                        type="button"
                        onClick={onBack}
                        style={{
                            padding: "8px 24px",
                            background: "#f5f5f5",
                            color: "#333",
                            border: "1px solid #bbb",
                            borderRadius: 4,
                            fontWeight: 500,
                            cursor: "pointer"
                        }}
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
}

function TransactionPasswordPage({ onBack, onSubmit, transactionPassword, setTransactionPassword }) {
    return (
        <div
            className="transaction-password-page"
            style={{
                maxWidth: 400,
                margin: "40px auto",
                border: "1px solid #ccc",
                padding: 32,
                borderRadius: 12,
                background: "#fafbfc",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
            }}
        >
            <h2 style={{ textAlign: "center", marginBottom: 24 }}>Enter Transaction Password</h2>
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: 24, display: "flex", alignItems: "center" }}>
                    <label style={{ width: 120, fontWeight: 500 }}>Transaction Password:</label>
                    <input
                        type="password"
                        value={transactionPassword}
                        onChange={e => setTransactionPassword(e.target.value)}
                        required
                        style={{
                            width: "220px",
                            padding: "8px",
                            border: "1px solid #bbb",
                            borderRadius: 4
                        }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                    <button
                        type="submit"
                        style={{
                            padding: "8px 24px",
                            background: "#1976d2",
                            color: "#fff",
                            border: "none",
                            borderRadius: 4,
                            fontWeight: 500,
                            cursor: "pointer"
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        type="button"
                        onClick={onBack}
                        style={{
                            padding: "8px 24px",
                            background: "#f5f5f5",
                            color: "#333",
                            border: "1px solid #bbb",
                            borderRadius: 4,
                            fontWeight: 500,
                            cursor: "pointer"
                        }}
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
}

function SendMoneyPage({
    onBack, onSubmit, amount, setAmount, date, setDate,
    userAccounts, existingAccounts,
    selectedAccount, setSelectedAccount,
    selectedToAccount, setSelectedToAccount
}) {
    return (
        <div className="send-money-page" style={{
            maxWidth: 400,
            margin: "40px auto",
            border: "1px solid #ccc",
            padding: 32,
            borderRadius: 12,
            background: "#fafbfc",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
        }}>
            <h2 style={{ textAlign: "center", marginBottom: 24 }}>Send Money</h2>
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: 18, display: "flex", alignItems: "center" }}>
                    <label style={{ width: 120, fontWeight: 500 }}>From Account:</label>
                    <select
                        value={selectedAccount}
                        onChange={e => setSelectedAccount(e.target.value)}
                        required
                        style={{
                            width: "220px",
                            padding: "8px",
                            border: "1px solid #bbb",
                            borderRadius: 4
                        }}
                    >
                        <option value="">Select your account</option>
                        {userAccounts.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.name}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: 18, display: "flex", alignItems: "center" }}>
                    <label style={{ width: 120, fontWeight: 500 }}>To Payee:</label>
                    <select
                        value={selectedToAccount}
                        onChange={e => setSelectedToAccount(e.target.value)} // This will now call handleToPayeeChange
                        required
                        style={{
                            width: "220px",
                            padding: "8px",
                            border: "1px solid #bbb",
                            borderRadius: 4
                        }}
                    >
                        <option value="">Select payee</option>
                        {existingAccounts.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.name}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: 18, display: "flex", alignItems: "center" }}>
                    <label style={{ width: 120, fontWeight: 500 }}>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                        min="1"
                        style={{
                            width: "220px",
                            padding: "8px",
                            border: "1px solid #bbb",
                            borderRadius: 4
                        }}
                    />
                </div>
                <div style={{ marginBottom: 24, display: "flex", alignItems: "center" }}>
                    <label style={{ width: 120, fontWeight: 500 }}>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                        style={{
                            width: "220px",
                            padding: "8px",
                            border: "1px solid #bbb",
                            borderRadius: 4
                        }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                    <button
                        type="submit"
                        style={{
                            padding: "8px 24px",
                            background: "#1976d2",
                            color: "#fff",
                            border: "none",
                            borderRadius: 4,
                            fontWeight: 500,
                            cursor: "pointer"
                        }}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={onBack}
                        style={{
                            padding: "8px 24px",
                            background: "#f5f5f5",
                            color: "#333",
                            border: "1px solid #bbb",
                            borderRadius: 4,
                            fontWeight: 500,
                            cursor: "pointer"
                        }}
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
}

function Dashboard({ username, onLogout }) {
    const [showPayment, setShowPayment] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedToAccount, setSelectedToAccount] = useState('');
    const [showAddPayeePage, setShowAddPayeePage] = useState(false);
    const [showSendMoneyPage, setShowSendMoneyPage] = useState(false);
    const [showTransactionPasswordPage, setShowTransactionPasswordPage] = useState(false);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [transactionPassword, setTransactionPassword] = useState('');
    const [newPayee, setNewPayee] = useState({
        accountNumber: '',
        sortCode: '',
        name: ''
    });
    const [existingAccounts, setExistingAccounts] = useState([]);
    const [userAccounts, setUserAccounts] = useState([]);

    // In Dashboard component, add these state variables to store the selected full objects:
    const [selectedFromAccountObj, setSelectedFromAccountObj] = useState(null);
    const [selectedToPayeeObj, setSelectedToPayeeObj] = useState(null);

    const handleNewPayeeChange = (e) => {
        const { name, value } = e.target;
        setNewPayee(prev => ({ ...prev, [name]: value }));
    };

    const handleAddPayee = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert('User ID not found. Please login again.');
            return;
        }

        const payeeData = {
            user: { userId: Number(userId) },
            name: newPayee.name,
            accountNumber: newPayee.accountNumber,
            sortCode: newPayee.sortCode,
            isInternal: false
        };

        try {
            const response = await fetch('http://localhost:8080/api/payees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payeeData)
            });

            if (response.ok) {
                const result = await response.json();
                setExistingAccounts(prev => [
                    ...prev,
                    {
                        id: result.id || `acc${prev.length + 5}`,
                        name: `${newPayee.name} - ${newPayee.accountNumber}`
                    }
                ]);
                alert('Payee added successfully!');
                setShowAddPayeePage(false);
                setNewPayee({ accountNumber: '', sortCode: '', name: '' });
                // Refresh payees from backend
                fetchExistingAccounts();
            } else if (response.status === 403) {
                alert('You are not authorized. Please login again.');
            } else {
                alert('Failed to add payee.');
            }
        } catch (error) {
            alert('Error connecting to backend');
        }
    };

    const handleFromAccountChange = (value) => {
        setSelectedAccount(value);
        const found = userAccounts.find(acc => String(acc.id) === String(value));
        setSelectedFromAccountObj(found || null);
        // Store in localStorage
        if (found) {
            localStorage.setItem('fromAccount', JSON.stringify(found));
        }
    };

    const handleToPayeeChange = (value) => {
        setSelectedToAccount(value);
        const found = existingAccounts.find(acc => String(acc.id) === String(value));
        setSelectedToPayeeObj(found || null);
        // Store in localStorage
        if (found) {
            localStorage.setItem('toPayee', JSON.stringify(found));
        }
    };

    const handleSendMoney = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('userId');

        // Retrieve from localStorage if not in state
        let fromAccountObj = selectedFromAccountObj;
        let toPayeeObj = selectedToPayeeObj;
        if (!fromAccountObj) {
            const fromAccountStr = localStorage.getItem('fromAccount');
            if (fromAccountStr) fromAccountObj = JSON.parse(fromAccountStr);
        }
        if (!toPayeeObj) {
            const toPayeeStr = localStorage.getItem('toPayee');
            if (toPayeeStr) toPayeeObj = JSON.parse(toPayeeStr);
        }

        if (!userId || !fromAccountObj || !toPayeeObj) {
            alert('Please select both accounts and ensure you are logged in.');
            return;
        }

        const transactionData = {
            user: { userId: Number(userId) },
            fromAccount: {
                accountId: Number(fromAccountObj.id),
                accountNumber: fromAccountObj.accountNumber
            },
            payee: {
                payeeId: Number(toPayeeObj.id),
                accountNumber: toPayeeObj.accountNumber
            },
            amount: Number(amount),
            scheduledFor: date,
            status: "PENDING"
        };

        try {
            const response = await fetch('http://localhost:8080/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(transactionData)
            });

            if (response.ok) {
                const result = await response.json();
                // Assuming result contains transactionId or id
                const txnId = result.transactionId || result.id;
                alert(`Money sent successfully! Transaction ID: ${txnId}`);
                setShowSendMoneyPage(false);
                setAmount('');
                setDate('');
                setSelectedAccount('');
                setSelectedToAccount('');
                // Clear from localStorage
                localStorage.removeItem('fromAccount');
                localStorage.removeItem('toPayee');
            } else if (response.status === 403) {
                alert('You are not authorized. Please login again.');
            } else {
                alert('Failed to send money.');
            }
        } catch (error) {
            alert('Error connecting to backend');
        }
    };

    // Fetch payees from the API
    const fetchExistingAccounts = async () => {
        const token = localStorage.getItem('jwtToken');
        try {
            const response = await fetch('http://localhost:8080/api/payees', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setExistingAccounts(
                    data.map(payee => ({
                        id: payee.payeeId,
                        name: `${payee.name} - ${payee.accountNumber}`
                    }))
                );
            } else if (response.status === 403) {
                alert('You are not authorized. Please login again.');
            } else {
                alert('Failed to fetch payees.');
            }
        } catch (error) {
            alert('Error connecting to backend');
        }
    };

    // Fetch user accounts from the API
    const fetchUserAccounts = async () => {
        const token = localStorage.getItem('jwtToken');
        try {
            const response = await fetch('http://localhost:8080/api/accounts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUserAccounts(
                    data.map(acc => ({
                        id: String(acc.accountId), // force string
                        name: `${acc.accountType} - ${acc.accountNumber}`,
                        accountNumber: acc.accountNumber
                    }))
                );
            } else if (response.status === 403) {
                alert('You are not authorized. Please login again.');
            } else {
                alert('Failed to fetch accounts.');
            }
        } catch (error) {
            alert('Error connecting to backend');
        }
    };

    React.useEffect(() => {
        fetchUserAccounts();
        fetchExistingAccounts();
        // eslint-disable-next-line
    }, []);

    const handleTransactionPassword = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert('User ID not found. Please login again.');
            return;
        }

        try {
            // Fetch user details to get txPasswordHash (for backend verification)
            const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Send the entered transaction password to backend for verification
                const verifyResponse = await fetch('http://localhost:8080/api/transactions/verify-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        userId: Number(userId),
                        transactionPassword
                    })
                });

                if (verifyResponse.ok) {
                    // If password is correct, proceed with the transaction
                    await handleSendMoney(e);
                    setShowTransactionPasswordPage(false);
                    setTransactionPassword('');
                } else {
                    alert('Invalid transaction password.');
                }
            } else if (response.status === 403) {
                alert('You are not authorized. Please login again.');
            } else {
                alert('Failed to fetch user details.');
            }
        } catch (error) {
            alert('Error connecting to backend');
        }
    };

    if (showAddPayeePage) {
        return (
            <AddPayeePage
                onBack={() => setShowAddPayeePage(false)}
                onSubmit={handleAddPayee}
                newPayee={newPayee}
                handleChange={handleNewPayeeChange}
            />
        );
    }

    if (showSendMoneyPage) {
        return (
            <SendMoneyPage
                onBack={() => setShowSendMoneyPage(false)}
                onSubmit={handleSendMoney}
                amount={amount}
                setAmount={setAmount}
                date={date}
                setDate={setDate}
                userAccounts={userAccounts}
                existingAccounts={existingAccounts}
                selectedAccount={selectedAccount}
                setSelectedAccount={handleFromAccountChange}
                selectedToAccount={selectedToAccount}
                setSelectedToAccount={handleToPayeeChange}
            />
        );
    }

    if (showTransactionPasswordPage) {
        return (
            <TransactionPasswordPage
                onBack={() => setShowTransactionPasswordPage(false)}
                onSubmit={handleTransactionPassword}
                transactionPassword={transactionPassword}
                setTransactionPassword={setTransactionPassword}
            />
        );
    }

    return (
        <div className="App">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <img
                        src={lloydsLogo}
                        alt="Lloyds Bank Logo"
                        style={{ height: 48 }}
                    />
                    <h1 style={{ margin: 0 }}>Payment UI</h1>
                </div>
                <button
                    onClick={onLogout}
                    style={{
                        padding: "8px 20px",
                        background: "#e53935",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        fontWeight: 500,
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>
            </div>
            <div style={{ margin: "40px 0", textAlign: "center" }}>
                <h2>Welcome, {username}!</h2>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <button
                    onClick={() => setShowAddPayeePage(true)}
                    style={{
                        padding: "12px 24px",
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        fontWeight: 500,
                        cursor: "pointer",
                        marginBottom: 18,
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    Add New Payee
                </button>
                <button
                    onClick={() => setShowSendMoneyPage(true)}
                    style={{
                        padding: "12px 24px",
                        background: "#4caf50",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        fontWeight: 500,
                        cursor: "pointer",
                        marginBottom: 18,
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    Send Money
                </button>
            </div>
        </div>
    );
}

function App() {
    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
        <div>
            {!loggedInUser ? (
                <Login onLogin={setLoggedInUser} />
            ) : (
                <Dashboard username={loggedInUser} onLogout={() => setLoggedInUser(null)} />
            )}
        </div>
    );
}

export default App;

