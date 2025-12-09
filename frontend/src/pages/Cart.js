import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Collection.css'; // Reusing collection styles for now

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        const newTotal = cartItems.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
        setTotal(newTotal);
    }, [cartItems]);

    const fetchCart = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/cart`);
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/cart/${productId}`, { quantity: newQuantity });
            setCartItems(items => items.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            ));
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeItem = async (productId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/cart/${productId}`);
            setCartItems(items => items.filter(item => item.productId !== productId));
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    if (loading) return <div className="loading">Loading cart...</div>;

    return (
        <div className="collection-page">
            <div className="container">
                <h1 className="page-title">🛒 My Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/products">
                            <button className="btn btn-primary">Start Shopping</button>
                        </Link>
                    </div>
                ) : (
                    <div className="cart-container">
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item" style={{ display: 'flex', gap: '20px', marginBottom: '20px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                                    <img src={item.productImage} alt={item.productTitle} style={{ width: '100px', height: '100px', objectFit: 'contain', background: 'white', borderRadius: '5px' }} />
                                    <div className="cart-item-info" style={{ flex: 1 }}>
                                        <h3 style={{ margin: '0 0 10px 0' }}>{item.productTitle}</h3>
                                        <p style={{ color: '#a855f7', fontWeight: 'bold' }}>${item.productPrice.toFixed(2)}</p>
                                        <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                className="btn btn-secondary"
                                                style={{ padding: '5px 10px' }}
                                            >-</button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                className="btn btn-secondary"
                                                style={{ padding: '5px 10px' }}
                                            >+</button>
                                            <button
                                                onClick={() => removeItem(item.productId)}
                                                className="btn btn-danger"
                                                style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer' }}
                                            >Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart-summary" style={{ marginTop: '40px', padding: '20px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '10px', textAlign: 'right' }}>
                            <h2>Total: ${total.toFixed(2)}</h2>
                            <button className="btn btn-primary btn-large" style={{ marginTop: '20px' }}>Proceed to Checkout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
