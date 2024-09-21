import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Correctly using useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, password }),
            });

            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem('userId', data.userId); // Store userId in session storage
                sessionStorage.setItem('token', data.token); // Store token in session storage
                console.log('Session ID:', sessionStorage.getItem('userId')); // Log the session ID
                console.log('Token:', sessionStorage.getItem('token')); // Log the token
                alert('Login successful!');
                navigate('/'); // Redirect to home after successful login
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input 
                        type="tel" 
                        className="form-control" 
                        id="phoneNumber" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default UserLogin;