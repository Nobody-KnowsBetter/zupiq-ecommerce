import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="gradient-text">ZUPIQ</span>
                    </h1>
                    <p className="hero-subtitle">Premium Fashion E-Commerce</p>
                    <p className="hero-description">
                        Discover the finest collection of clothing and accessories.
                        Elevate your style with our curated selection.
                    </p>
                    <Link to="/products">
                        <button className="btn btn-primary btn-large">
                            Explore Collection
                        </button>
                    </Link>
                </div>
            </div>

            <div className="features">
                <div className="container">
                    <h2 className="section-title">Why Choose Zupiq?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🛍️</div>
                            <h3>Premium Quality</h3>
                            <p>Handpicked products from top brands</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">❤️</div>
                            <h3>Save Favorites</h3>
                            <p>Keep track of items you love</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⭐</div>
                            <h3>Wishlist</h3>
                            <p>Create your dream collection</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔍</div>
                            <h3>Smart Search</h3>
                            <p>Find exactly what you need</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;