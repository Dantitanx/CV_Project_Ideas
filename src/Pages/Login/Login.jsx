import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signUpWithEmail, signInWithGoogle } from '../../components/AuthForm/AuthForm';
import './Login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Failed to log in');
        }
    };

    const handleGoogleSignIn = async () => {
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
        <body className='loginBody'>
  
        <div className="login-page">
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit={handleSubmit} id='loginForm'>
                <h3>Login Here</h3>

                <label id='loginLabelEmail' htmlFor="username">Username</label>
                <input className='loginInput' type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}  />

                <label htmlFor="password">Password</label>
                <input className='loginInput' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />

                <button id='loginButton' type='submit'>Log In</button>
                {error && <div className="error">{error}</div>}
                <button className="googleButton" onClick={handleGoogleSignIn}>
                    <img
                        src="https://img.icons8.com/color/16/000000/google-logo.png"
                        alt="Google icon"
                        className="googleIcon"
                    />
                    Sign in with Google
                </button>
                
            </form>
        </div>
        </body>
    );
};

export default Login;
