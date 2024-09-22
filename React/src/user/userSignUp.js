import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserSignup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); 

    const validate = () => {
        const newErrors = {};
        const phoneRegex = /^[0-9]{10}$/; // Regex for validating 10-digit phone number

        if (!username) {
            newErrors.username = "Username is required";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        if (!phoneNumber) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!phoneRegex.test(phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be 10 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!validate()) return; // Prevent submission if validation fails

        try {
            const response = await fetch('https://alevelproject.onrender.com/user/register/', {
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
                    <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    {errors.username && <small className="text-danger">{errors.username}</small>}
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
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
};

export default UserSignup;