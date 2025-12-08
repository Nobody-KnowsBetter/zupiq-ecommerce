import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Collection.css';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/wishlist`);
            setWishlist(response.data);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading wishlist...</div>;

    return (
        <div className="collection-page">
            <div className="container">
                <h1 className="page-title">⭐ My Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">⭐</div>
                        <h2>No items in wishlist</h2>
                        <p>Add products you wish to buy to your wishlist!</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {wishlist.map((item) => (
                            <ProductCard
                                key={item.id}
                                product={item.product}
                                onWishlistChange={fetchWishlist}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;