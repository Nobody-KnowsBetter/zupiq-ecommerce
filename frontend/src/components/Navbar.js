import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-text">ZUPIQ</span>
                </Link>

                <div className="navbar-menu">
                    <Link to="/products" className="navbar-link">Products</Link>

                    {user ? (
                        <>
                            <Link to="/favorites" className="navbar-link">
                                <span className="icon">❤</span> Favorites
                            </Link>
                            <Link to="/wishlist" className="navbar-link">
                                <span className="icon">⭐</span> Wishlist
                            </Link>
                            <Link to="/cart" className="navbar-link">
                                <span className="icon">🛒</span> Cart
                            </Link>
                            <Link to="/profile" className="navbar-link">
                                <span className="icon">👤</span> Profile
                            </Link>
                            <button onClick={handleLogout} className="btn btn-secondary navbar-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="navbar-link">Login</Link>
                            <Link to="/signup">
                                <button className="btn btn-primary navbar-btn">Sign Up</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
