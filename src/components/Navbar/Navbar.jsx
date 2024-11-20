import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.scss';

const Navbar = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/men">Men</Link>
            <Link to="/women">Women</Link>
            <Link to="/kids">Kids</Link>
            <Link to="/add-product">Add Product</Link>
            {user ? (
                <button onClick={handleLogout} className="nav-button">Sign Out</button>
            ) : (
                <>
                <Link to="/signup" className="nav-button">Sign Up</Link>
                <Link to="/login" className="nav-button">Login</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
