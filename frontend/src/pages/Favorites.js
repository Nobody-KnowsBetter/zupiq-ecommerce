import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Collection.css';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/favorites`);
            setFavorites(response.data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading favorites...</div>;

    return (
        <div className="collection-page">
            <div className="container">
                <h1 className="page-title">❤ My Favorites</h1>

                {favorites.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">❤️</div>
                        <h2>No favorites yet</h2>
                        <p>Start adding products to your favorites collection!</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {favorites.map((fav) => (
                            <ProductCard
                                key={fav.id}
                                product={fav.product}
                                onFavoriteChange={fetchFavorites}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;