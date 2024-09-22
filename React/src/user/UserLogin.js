import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); // State to hold validation errors
    const navigate = useNavigate(); 

    const validate = () => {
        const newErrors = {};
        const phoneRegex = /^[0-9]{10}$/; // Regex for validating 10-digit phone number

        if (!phoneNumber) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!phoneRegex.test(phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be 10 digits";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!validate()) return; // Prevent submission if validation fails

        try {
            const response = await fetch('https://alevelproject.onrender.com/user/login/', {
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
                alert('Login successful!');
                window.location.reload();
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
                    {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
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
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default UserLogin;