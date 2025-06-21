import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import './Exchange.css';

const Exchange = () => {
  const [listings, setListings] = useState([]);
  const [newListing, setNewListing] = useState({
    title: '',
    variety: '',
    type: 'vegetable',
    quantity: '',
    description: '',
    interested: '',
    location: '',
    user: '',
    email: '',
    phone: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [contactDetails, setContactDetails] = useState(null);

  // Fetch listings from backend on mount
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/exchange');
        if (response.ok) {
          const data = await response.json();
          setListings(data);
        } else {
          console.error('Failed to fetch listings');
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    fetchListings();
  }, []);

  const handleAddListing = async (e) => {
    e.preventDefault();
    if (!newListing.title || !newListing.variety) {
      alert("Title and Variety are required");
      return; // Prevent form submission
    }

    try {
      const response = await fetch('http://localhost:5000/api/exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newListing),
      });
      if (response.ok) {
        const savedListing = await response.json();
        setListings([savedListing, ...listings]);
        setNewListing({
          title: '',
          variety: '',
          type: 'vegetable',
          quantity: '',
          description: '',
          interested: '',
          location: '',
          user: '',
          email: '',
          phone: ''
        });
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const handleContactExchange = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/exchange/${id}`);
      const data = await response.json();
      if (response.ok) {
        setContactDetails({
          name: data.user || 'Anonymous',
          email: data.email || 'Not Provided',
          phone: data.phone || 'Not Provided'
        });
      } else {
        console.error('Failed to fetch listing details');
      }
    } catch (error) {
      console.error('Error fetching listing details:', error);
    }
  };

  return (
    <div className="exchange-container">
      <div className="exchange-header">
        <h1>Seed Exchange</h1>
        <p>Connect with fellow gardeners to share and exchange seeds from your favorite plants.</p>
      </div>

      <div className="exchange-content">
        {/* Listings */}
        <div className="exchange-listings">
          {listings.map((listing) => (
            <div key={listing._id || listing.id} className="exchange-card">
              <img
                className="exchange-image"
                src={listing.image || 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg'}
                alt={listing.title}
                loading="lazy"
              />
              <div className="exchange-details">
                <div className="exchange-heading">
                  <div>
                    <h2>{listing.title}</h2>
                    <p className="exchange-variety">Variety: {listing.variety}</p>
                  </div>
                  <span className="exchange-type">{listing.type}</span>
                </div>

                <div className="exchange-info">
                  <div><FontAwesomeIcon icon={faSeedling} /> {listing.quantity}</div>
                  <div><FontAwesomeIcon icon={faMapMarkerAlt} /> {listing.location || 'Unknown'}</div>
                  <div><FontAwesomeIcon icon={faUser} /> {listing.user || 'Anonymous'}</div>
                </div>

                <p className="exchange-description">{listing.description}</p>
                <p className="exchange-interested">{listing.interested}</p>

                <button
                  className="exchange-button"
                  onClick={() => handleContactExchange(listing._id)}
                >
                  Contact for Exchange
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Listing */}
        <div className="exchange-form-wrapper">
          <div className="exchange-form">
            <h2>Add New Listing</h2>
            <form onSubmit={handleAddListing}>
              <label>Seed Title</label>
              <input
                type="text"
                value={newListing.title}
                onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                placeholder="e.g., Tomato Seeds"
                required
              />

              <label>Variety</label>
              <input
                type="text"
                value={newListing.variety}
                onChange={(e) => setNewListing({ ...newListing, variety: e.target.value })}
                placeholder="e.g., Cherry Tomato"
                required
              />

              <label>Type</label>
              <select
                value={newListing.type}
                onChange={(e) => setNewListing({ ...newListing, type: e.target.value })}
              >
                <option value="vegetable">Vegetable</option>
                <option value="herb">Herb</option>
                <option value="flower">Flower</option>
                <option value="fruit">Fruit</option>
              </select>

              <label>Quantity</label>
              <input
                type="text"
                value={newListing.quantity}
                onChange={(e) => setNewListing({ ...newListing, quantity: e.target.value })}
                placeholder="e.g., 25 seeds"
              />

              <label>Description</label>
              <textarea
                rows="3"
                value={newListing.description}
                onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                placeholder="Describe your seeds"
              />

              <label>Looking For</label>
              <textarea
                rows="2"
                value={newListing.interested}
                onChange={(e) => setNewListing({ ...newListing, interested: e.target.value })}
                placeholder="What seeds are you interested in?"
              />

              <button type="submit" className="exchange-submit-button">Post Listing</button>
            </form>
            {submitStatus === 'success' && <p className="success-message">Listing posted successfully!</p>}
            {submitStatus === 'error' && <p className="error-message">Failed to post listing. Please try again.</p>}
          </div>
        </div>

        {/* Contact Info Modal */}
        {contactDetails && (
          <div className="contact-details-modal">
            <h3>Contact Information</h3>
            <p>Name: {contactDetails.name}</p>
            <p>Email: {contactDetails.email}</p>
            <p>Phone: {contactDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exchange;
