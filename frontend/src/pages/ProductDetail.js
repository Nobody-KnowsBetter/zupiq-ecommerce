import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleFavorite = async () => {
        if (!user) {
            alert('Please login to add favorites');
            return;
        }

        try {
            if (isFavorite) {
                await axios.delete(`${process.env.REACT_APP_API_URL}/favorites/${id}`);
                setIsFavorite(false);
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/favorites`, { productId: parseInt(id) });
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Favorite error:', error);
        }
    };

    const handleWishlist = async () => {
        if (!user) {
            alert('Please login to add to wishlist');
            return;
        }

        try {
            if (isInWishlist) {
                await axios.delete(`${process.env.REACT_APP_API_URL}/wishlist/${id}`);
                setIsInWishlist(false);
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/wishlist`, { productId: parseInt(id) });
                setIsInWishlist(true);
            }
        } catch (error) {
            console.error('Wishlist error:', error);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (!product) return <div className="error">Product not found</div>;

    return (
        <div className="product-detail-page">
            <div className="container">
                <div className="product-detail-grid">
                    <div className="product-image-section">
                        <img src={product.image} alt={product.title} className="detail-image" />
                    </div>

                    <div className="product-info-section">
                        <span className="product-category">{product.category}</span>
                        <h1 className="detail-title">{product.title}</h1>

                        <div className="price-rating">
                            <span className="detail-price">${product.price.toFixed(2)}</span>
                            {product.rating && (
                                <span className="detail-rating">⭐ {product.rating.toFixed(1)}</span>
                            )}
                        </div>

                        <p className="detail-description">{product.description}</p>

                        <div className="action-buttons">
                            <button onClick={handleFavorite} className={`btn ${isFavorite ? 'btn-primary' : 'btn-secondary'}`}>
                                ❤ {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                            <button onClick={handleWishlist} className={`btn ${isInWishlist ? 'btn-primary' : 'btn-secondary'}`}>
                                ⭐ {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;