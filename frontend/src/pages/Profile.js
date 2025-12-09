import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user, login } = useContext(AuthContext); // login used to update context
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`);
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (err) {
                console.error(err);
                setError('Failed to load profile');
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/profile`, {
                name,
                email
            });

            setMessage('Profile updated successfully!');
            setIsEditing(false);

            // Update local storage if needed, or trigger auth refetch
            // For simplicity, we assume context might need manual refresh or just rely on the new state
        } catch (err) {
            setError(err.response?.data?.error || 'Update failed');
        }
    };

    if (!user) return <div className="container">Please log in to view profile.</div>;

    return (
        <div className="profile-page">
            <div className="container">
                <div className="profile-card">
                    <h1>My Profile</h1>

                    {message && <div className="success-msg">{message}</div>}
                    {error && <div className="error-msg">{error}</div>}

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="profile-form">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="btn-group">
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <div className="profile-info">
                            <p><strong>Name:</strong> {name}</p>
                            <p><strong>Email:</strong> {email}</p>
                            <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Profile</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
