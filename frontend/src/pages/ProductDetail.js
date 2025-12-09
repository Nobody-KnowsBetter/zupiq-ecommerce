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
        const fetchProductAndStatus = async () => {
            try {
                const productRes = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(productRes.data);

                if (user) {
                    const [favRes, wishRes] = await Promise.all([
                        axios.get(`${process.env.REACT_APP_API_URL}/favorites`),
                        axios.get(`${process.env.REACT_APP_API_URL}/wishlist`)
                    ]);

                    const isFav = favRes.data.some(item => item.productId === parseInt(id));
                    const isWish = wishRes.data.some(item => item.productId === parseInt(id));

                    setIsFavorite(isFav);
                    setIsInWishlist(isWish);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductAndStatus();
    }, [id, user]);

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
                await axios.post(`${process.env.REACT_APP_API_URL}/favorites`, {
                    productId: parseInt(id),
                    productTitle: product.title,
                    productPrice: product.price,
                    productImage: product.image,
                    productCategory: product.category
                });
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
                await axios.post(`${process.env.REACT_APP_API_URL}/wishlist`, {
                    productId: parseInt(id),
                    productTitle: product.title,
                    productPrice: product.price,
                    productImage: product.image,
                    productCategory: product.category
                });
                setIsInWishlist(true);
            }
        } catch (error) {
            console.error('Wishlist error:', error);
        }
    };

    const handleAddToCart = async () => {
        if (!user) {
            alert('Please login to add to cart');
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/cart`, {
                productId: parseInt(id),
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
                                <span className="detail-rating">⭐ {product.rating.rate.toFixed(1)}</span>
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
                            <button onClick={handleAddToCart} className="btn btn-primary">
                                🛒 Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;