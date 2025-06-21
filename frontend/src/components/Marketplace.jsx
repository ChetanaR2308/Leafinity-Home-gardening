import './Marketplace.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faBox,
  faCalendar,
  faHeart,
  faPlus,
  faStore
} from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, isLiked, toggleLike }) => (
  <div className="product-card">
    <div className="product-image-container">
      <img
        className="product-image"
        src={product.image}
        alt={product.title}
      />
      {product.organic && <span className="organic-badge">Organic</span>}
    </div>
    <div className="product-details">
      <div className="product-header">
        <div>
          <h3>{product.title}</h3>
          <p className="seller">{product.seller}</p>
        </div>
        <span className="product-price">${product.price}</span>
      </div>

      <div className="product-meta">
        <div className="meta-item">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>{product.location}</span>
        </div>
        <div className="meta-item">
          <FontAwesomeIcon icon={faBox} />
          <span>{product.quantity}</span>
        </div>
        <div className="meta-item">
          <FontAwesomeIcon icon={faCalendar} />
          <span>Harvested: {product.harvestDate}</span>
        </div>
      </div>

      <p className="product-description">{product.description}</p>

      <div className="card-buttons">
        <button className="btn-primary">Contact Seller</button>
        <button
          className={`btn-outline ${isLiked ? 'liked' : ''}`}
          onClick={() => toggleLike(product.id)}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </div>
  </div>
);

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [likedProducts, setLikedProducts] = useState([]);

  const toggleLike = async (productId) => {
    const isAlreadyLiked = likedProducts.includes(productId);
    setLikedProducts((prev) =>
      isAlreadyLiked
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );

    // Simulated backend call
    await fetch(`/api/products/${productId}/like`, {
      method: isAlreadyLiked ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 'demo-user' }),
    });
  };

  const products = [
    {
      id: 1,
      title: 'Fresh Organic Tomatoes',
      seller: 'Green Thumb Gardens',
      price: 4.99,
      quantity: '2 lbs available',
      location: 'Portland, OR',
      harvestDate: '2024-01-15',
      description: 'Freshly harvested organic tomatoes, perfect for salads or cooking.',
      organic: true,
      category: 'vegetables',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
    },
    {
      id: 2,
      title: 'Fresh Herbs Bundle',
      seller: 'Herbal Haven',
      price: 3.99,
      quantity: '5 bundles available',
      location: 'Seattle, WA',
      harvestDate: '2024-01-16',
      description: 'Mixed herb bundle including basil, thyme, and rosemary.',
      organic: true,
      category: 'herbs',
      image: 'https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg',
    },
    {
      id: 3,
      title: 'Homegrown Strawberries',
      seller: 'Berry Best Farm',
      price: 6.99,
      quantity: '3 pints available',
      location: 'Vancouver, BC',
      harvestDate: '2024-01-16',
      description: 'Sweet and juicy strawberries, freshly picked from our garden.',
      organic: false,
      category: 'fruits',
      image: 'https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg',
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'herbs', label: 'Herbs' },
    { value: 'flowers', label: 'Flowers' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return new Date(b.harvestDate) - new Date(a.harvestDate);
    });

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <h1>Harvest Marketplace</h1>
        <p>Buy, sell, or trade fresh produce from local gardeners in your community.</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Search Products</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name"
          />
        </div>
        <div className="filter-group">
          <label>Category</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Sort By</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isLiked={likedProducts.includes(product.id)}
            toggleLike={toggleLike}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <FontAwesomeIcon icon={faStore} className="no-products-icon" />
          <p>No products found matching your criteria.</p>
        </div>
      )}

      <button className="add-product-btn">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default Marketplace;
