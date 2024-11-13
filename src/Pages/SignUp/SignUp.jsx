// src/pages/SignUp/SignUp.jsx
import React, { useState } from 'react';
import { signUpWithEmail, signInWithGoogle } from '../../components/AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';
import './SignUp.scss'


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;

        }
        try {
            await signUpWithEmail(email, password);
            setError('');
            navigate('/')
            alert("Sign up was succesfull!")
            // Redirect or show success message
            console.log("User signed up successfully");
        } catch (err) {
            setError(err.message);
        }
    };

     const handleGoogleSignUp = async () => {
        try {
            await signInWithGoogle();
            setError('');
            navigate('/')
            alert("Sign up was succesfull!")
            // Redirect or show success message
            console.log("User signed in with Google");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className="auth-page">
             <div className="wrapper">
    <h2>Registration</h2>
    <form onSubmit={handleSignUp} className='signup-form'>
      <div className="input-box">
        <input type="email" placeholder="Enter your email" value={email}  onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="input-box">
        <input type="password"  placeholder="Create password" value={email} onChange={(e) => setPassword(e.target.value)}  required />
      </div>
      <div className="input-box">
        <input type="password" placeholder="Confirm password" value={setConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </div>
      <div className="terms-container">
        <input type="checkbox" required />
        <label>I accept all terms & condition</label>
      </div>
      <div className="input-box button">
        <button type='submit' className='signup-button'>Sign Up</button>
        {error && <div className='error'>{error}</div>}
      </div>
      <button onClick={handleGoogleSignUp} className="google-signup-button">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google icon" /> Sign in with Google
        </button>
      <div className="text">
        <h3>Already have an account? <a href="#">Login now</a></h3>
      </div>
    </form>

  </div>
        </main>
    );
};

export default SignUp;