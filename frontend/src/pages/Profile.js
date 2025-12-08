import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user } = useContext(AuthContext);

    if (!user) return <div className="loading">Loading...</div>;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="profile-page">
            <div className="container">
                <h1 className="page-title">My Profile</h1>

                <div className="profile-container">
                    <div className="profile-card">
                        <div className="profile-avatar">
                            <span className="avatar-text">{user.name.charAt(0).toUpperCase()}</span>
                        </div>

                        <div className="profile-info">
                            <div className="info-group">
                                <label>Name</label>
                                <div className="info-value">{user.name}</div>
                            </div>

                            <div className="info-group">
                                <label>Email</label>
                                <div className="info-value">{user.email}</div>
                            </div>

                            <div className="info-group">
                                <label>Member Since</label>
                                <div className="info-value">{formatDate(user.createdAt)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-stats">
                        <div className="stat-card">
                            <div className="stat-icon">❤️</div>
                            <div className="stat-label">Favorites</div>
                            <div className="stat-value">View Collection</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">⭐</div>
                            <div className="stat-label">Wishlist</div>
                            <div className="stat-value">View Items</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">🛍️</div>
                            <div className="stat-label">Account</div>
                            <div className="stat-value">Active</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
