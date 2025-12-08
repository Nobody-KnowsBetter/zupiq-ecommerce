import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = { page, limit: 12 };
                if (search) params.search = search;
                if (category) params.category = category;
                if (sort) params.sort = sort;

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`, { params });
                setProducts(response.data.products);
                setPagination(response.data.pagination);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [search, category, sort, page]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
    };

    return (
        <div className="products-page">
            <div className="container">
                <h1 className="page-title">Our Collection</h1>

                <div className="filters-section">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>

                    <div className="filters">
                        <select
                            value={category}
                            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                            className="filter-select"
                        >
                            <option value="">All Categories</option>
                            <option value="men's clothing">Men's Clothing</option>
                            <option value="women's clothing">Women's Clothing</option>
                            <option value="jewelery">Jewelry</option>
                        </select>

                        <select
                            value={sort}
                            onChange={(e) => { setSort(e.target.value); setPage(1); }}
                            className="filter-select"
                        >
                            <option value="">Sort By</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="loading">Loading products...</div>
                ) : products.length === 0 ? (
                    <div className="no-products">No products found</div>
                ) : (
                    <>
                        <div className="products-grid">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {pagination.pages > 1 && (
                            <div className="pagination">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="btn btn-secondary"
                                >
                                    Previous
                                </button>
                                <span className="page-info">
                                    Page {page} of {pagination.pages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                                    disabled={page === pagination.pages}
                                    className="btn btn-secondary"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;
