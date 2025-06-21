import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faTint, faMountain, faSeedling } from '@fortawesome/free-solid-svg-icons';
import './Database.css';

const Database = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const plants = [
    {
      id: 1,
      name: 'Tomato',
      type: 'vegetable',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
      regions: ['temperate', 'mediterranean'],
      sunlight: 'Full sun',
      water: 'Regular watering',
      soil: 'Well-draining, rich soil',
      description: 'Popular garden vegetable that produces edible fruits. Requires support for growth.'
    },
    {
      id: 2,
      name: 'Lavender',
      type: 'herb',
      image: 'https://images.pexels.com/photos/4911710/pexels-photo-4911710.jpeg',
      regions: ['mediterranean', 'arid'],
      sunlight: 'Full sun',
      water: 'Low to moderate',
      soil: 'Well-draining, sandy soil',
      description: 'Fragrant herb with purple flowers. Drought-tolerant and attracts pollinators.'
    },
    {
      id: 3,
      name: 'Rose',
      type: 'flower',
      image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg',
      regions: ['temperate', 'subtropical'],
      sunlight: 'Full sun to partial shade',
      water: 'Regular watering',
      soil: 'Rich, well-draining soil',
      description: 'Classic garden flower known for its beautiful blooms and fragrance.'
    }
  ];

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'temperate', label: 'Temperate' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'tropical', label: 'Tropical' },
    { value: 'arid', label: 'Arid' },
    { value: 'subtropical', label: 'Subtropical' }
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'vegetable', label: 'Vegetables' },
    { value: 'herb', label: 'Herbs' },
    { value: 'flower', label: 'Flowers' },
    { value: 'fruit', label: 'Fruits' },
    { value: 'tree', label: 'Trees' }
  ];

  const lowerSearch = searchTerm.toLowerCase();
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(lowerSearch);
    const matchesRegion = selectedRegion === 'all' || plant.regions.includes(selectedRegion);
    const matchesType = selectedType === 'all' || plant.type === selectedType;
    return matchesSearch && matchesRegion && matchesType;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRegion('all');
    setSelectedType('all');
  };

  return (
    <div className="database-container">
      <div className="database-header">
        <h1>Growing Conditions Guide</h1>
        <p>Find detailed information about plants and their optimal growing conditions in your region.</p>
      </div>

      <div className="filter-box">
        <div className="filter-grid">
          <div>
            <label htmlFor="plant-search" className="input-label">Search Plants</label>
            <input
              id="plant-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter plant name"
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="region-filter" className="input-label">Region</label>
            <select
              id="region-filter"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="input-field"
            >
              {regions.map(region => (
                <option key={region.value} value={region.value}>{region.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="type-filter" className="input-label">Plant Type</label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field"
            >
              {types.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="button-container">
          <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
        </div>
      </div>

      <div className="plants-grid">
        {filteredPlants.map(plant => (
          <div key={plant.id} className="plant-card">
            <div className="plant-image">
              <img
                src={plant.image}
                alt={plant.name}
                onError={(e) => (e.target.src = '/default-plant.png')}
              />
            </div>
            <div className="plant-details">
              <div className="plant-header">
                <h3>{plant.name}</h3>
                <span className="plant-tag">{plant.type}</span>
              </div>
              <div className="plant-info">
                <div><FontAwesomeIcon icon={faSun} /> {plant.sunlight}</div>
                <div><FontAwesomeIcon icon={faTint} /> {plant.water}</div>
                <div><FontAwesomeIcon icon={faMountain} /> {plant.soil}</div>
              </div>
              <p className="plant-description">{plant.description}</p>
              <div className="region-tags">
                {plant.regions.map(region => (
                  <span key={region} className="region-badge">{region}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <div className="no-results">
          <FontAwesomeIcon icon={faSeedling} className="no-results-icon" />
          <p>No plants found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Database;
