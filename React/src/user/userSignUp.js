import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserSignup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate(); // Correctly using useNavigate

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, phoneNumber }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                navigate('/login'); // Redirect to login after successful signup
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input type="tel" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
};

export default UserSignup;