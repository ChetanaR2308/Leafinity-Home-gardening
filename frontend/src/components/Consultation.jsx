import React, { useState } from 'react';
import './Consultation.css';

const ExpertCard = ({ expert }) => (
  <div className="expert-card">
    <div className="expert-image">
      <img src={expert.image} alt={expert.name} />
    </div>
    <div className="expert-details">
      <div className="expert-header">
        <div>
          <h2>{expert.name}</h2>
          <p>{expert.specialty}</p>
        </div>
        <div className="rating">
          <i className="fas fa-star"></i>
          <span>{expert.rating}</span>
        </div>
      </div>

      <div className="expert-meta">
        <p><i className="fas fa-map-marker-alt"></i> {expert.location}</p>
        <p><i className="fas fa-clock"></i> {expert.availability}</p>
      </div>

      <p className="expert-description">{expert.description}</p>

      <div className="expert-tags">
        {expert.expertise.map((skill, index) => (
          <span key={index} className="tag">{skill}</span>
        ))}
      </div>

      <div className="expert-footer">
        <span className="rate">${expert.rate}/hour</span>
        <button className="primary-btn">Book Consultation</button>
      </div>
    </div>
  </div>
);

const Consultation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    consultationType: 'virtual',
    description: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const experts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialty: 'Organic Gardening Expert',
      rating: 4.9,
      location: 'Portland, OR',
      availability: 'Available Mon-Fri',
      description: 'Certified organic gardening specialist with 15 years of experience in sustainable practices.',
      expertise: ['Organic Methods', 'Pest Control', 'Soil Health'],
      rate: 45,
      image: 'https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Urban Farming Specialist',
      rating: 4.8,
      location: 'Seattle, WA',
      availability: 'Available Weekends',
      description: 'Experienced in maximizing yields in small urban spaces using innovative techniques.',
      expertise: ['Container Gardening', 'Vertical Gardens', 'Hydroponics'],
      rate: 40,
      image: 'https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      specialty: 'Landscape Designer',
      rating: 5.0,
      location: 'Vancouver, BC',
      availability: 'Available Tue-Sat',
      description: 'Professional landscape designer specializing in sustainable and beautiful garden spaces.',
      expertise: ['Design', 'Native Plants', 'Water Conservation'],
      rate: 50,
      image: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg'
    }
  ];

  const specialties = [
    { value: 'all', label: 'All Specialties' },
    { value: 'organic', label: 'Organic Gardening' },
    { value: 'urban', label: 'Urban Farming' },
    { value: 'landscape', label: 'Landscape Design' },
    { value: 'hydroponics', label: 'Hydroponics' }
  ];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || 
      expert.expertise.some(skill =>
        skill.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
    
    return matchesSearch && matchesSpecialty;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    const payload = {
      title: 'Gardening Consultation',
      description: formData.description,
      date: formData.date,
      user: {
        name: formData.name,
        email: formData.email,
        type: formData.consultationType
      }
    };

    try {
      const response = await fetch('http://localhost:5000/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          date: '',
          consultationType: 'virtual',
          description: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="consultation-container">
      <header>
        <h1>Expert Consultation</h1>
        <p>Get personalized advice from experienced gardening professionals.</p>
      </header>

      <div className="search-filter-box">
        <div>
          <label>Search Experts</label>
          <input
            type="text"
            placeholder="Search by name or specialty"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label>Specialty</label>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {specialties.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="experts-list">
        {filteredExperts.map(expert => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
        {filteredExperts.length === 0 && (
          <div className="no-experts">
            <i className="fas fa-user-md"></i>
            <p>No experts found matching your criteria.</p>
          </div>
        )}
      </div>

      <section className="consultation-form">
        <h2>Request a Consultation</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
          <select
            name="consultationType"
            value={formData.consultationType}
            onChange={handleInputChange}
          >
            <option value="virtual">Virtual Consultation</option>
            <option value="inPerson">In-Person Visit</option>
          </select>
          <textarea
            name="description"
            rows="4"
            placeholder="Describe your garden or project"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="primary-btn">Submit Request</button>
        </form>
        {submitStatus === 'success' && <p className="success-message">Consultation request submitted successfully!</p>}
        {submitStatus === 'error' && <p className="error-message">Failed to submit consultation request. Please try again.</p>}
      </section>
    </div>
  );
};

export default Consultation;
