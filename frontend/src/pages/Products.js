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
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = 'https://fakestoreapi.com/products';
                if (category) {
                    url = `https://fakestoreapi.com/products/category/${category}`;
                }

                // FakeStore API supports sort=desc or sort=asc
                const params = {};
                if (sort) {
                    // map our sort values to fakestore values
                    if (sort === 'price-asc' || sort === 'asc') params.sort = 'asc';
                    if (sort === 'price-desc' || sort === 'desc') params.sort = 'desc';
                }

                const response = await axios.get(url, { params });
                let data = response.data;

                // Client-side search since FakeStore doesn't support search query
                if (search) {
                    data = data.filter(product =>
                        product.title.toLowerCase().includes(search.toLowerCase())
                    );
                }

                // Client-side sorting for price if needed (FakeStore sort might be by ID)
                // But let's trust the API sort for now or implement client side if needed.
                // Actually FakeStore sort param sorts by ID, not price usually.
                // Let's implement client side sort for better UX.
                if (sort === 'price-asc') {
                    data.sort((a, b) => a.price - b.price);
                } else if (sort === 'price-desc') {
                    data.sort((a, b) => b.price - a.price);
                } else if (sort === 'rating') {
                    data.sort((a, b) => b.rating.rate - a.rating.rate);
                }

                setProducts(data);
                setPage(1); // Reset to page 1 on filter change
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [search, category, sort]);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    // Pagination logic
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

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
                            onChange={(e) => { setCategory(e.target.value); }}
                            className="filter-select"
                        >
                            <option value="">All Categories</option>
                            <option value="men's clothing">Men's Clothing</option>
                            <option value="women's clothing">Women's Clothing</option>
                            <option value="jewelery">Jewelry</option>
                            <option value="electronics">Electronics</option>
                        </select>

                        <select
                            value={sort}
                            onChange={(e) => { setSort(e.target.value); }}
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
                            {currentProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="btn btn-secondary"
                                >
                                    Previous
                                </button>
                                <span className="page-info">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
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
