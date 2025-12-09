import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './ProductCard.css';

const ProductCard = ({ product, onFavoriteChange, onWishlistChange }) => {
    const { user } = useContext(AuthContext);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);

    const handleFavorite = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to add favorites');
            return;
        }

        try {
            if (isFavorite) {
                await axios.delete(`${process.env.REACT_APP_API_URL}/favorites/${product.id}`);
                setIsFavorite(false);
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/favorites`, {
                    productId: product.id,
                    productTitle: product.title,
                    productPrice: product.price,
                    productImage: product.image,
                    productCategory: product.category
                });
                setIsFavorite(true);
            }
            if (onFavoriteChange) onFavoriteChange();
        } catch (error) {
            console.error('Favorite error:', error);
        }
    };

    const handleWishlist = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to add to wishlist');
            return;
        }

        try {
            if (isInWishlist) {
                await axios.delete(`${process.env.REACT_APP_API_URL}/wishlist/${product.id}`);
                setIsInWishlist(false);
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/wishlist`, {
                    productId: product.id,
                    productTitle: product.title,
                    productPrice: product.price,
                    productImage: product.image,
                    productCategory: product.category
                });
                setIsInWishlist(true);
            }
            if (onWishlistChange) onWishlistChange();
        } catch (error) {
            console.error('Wishlist error:', error);
        }
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to add to cart');
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/cart`, {
                productId: product.id,
                productTitle: product.title,
                productPrice: product.price,
                productImage: product.image,
                productCategory: product.category,
                quantity: 1
            });
            alert('Added to cart!');
        } catch (error) {
            console.error('Cart error:', error);
        }
    };

    return (
        <Link to={`/products/${product.id}`} className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />
                <div className="product-actions">
                    <button onClick={handleFavorite} className={`action-btn ${isFavorite ? 'active' : ''}`}>
                        ❤
                    </button>
                    <button onClick={handleWishlist} className={`action-btn ${isInWishlist ? 'active' : ''}`}>
                        ⭐
                    </button>
                    <button onClick={handleAddToCart} className="action-btn">
                        🛒
                    </button>
                </div>
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <div className="product-footer">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    {product.rating && (
                        <span className="product-rating">⭐ {product.rating.rate.toFixed(1)}</span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;