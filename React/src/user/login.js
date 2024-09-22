
import { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';
const Mylogin = () =>{
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Correctly using useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://alevelproject.onrender.com/user/adminLogin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('sellerid', data.userId); // Store userId in session storage
                sessionStorage.setItem('token', data.token); // Store token in session storage
                alert('Login successful!');
                navigate('/adminLogin'); // Redirect to home after successful login
                window.location.reload();
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
    );}

export default Mylogin;
