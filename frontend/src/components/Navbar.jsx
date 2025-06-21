// // frontend/src/components/Navbar.jsx
// import './Navbar.css';
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const navItems = [
//     { path: '/', label: 'Home' },
//     { path: '/calender', label: 'Plant Calendar' },
//     { path: '/database', label: 'Growing Guide' },
//     { path: '/exchange', label: 'Seed Exchange' },
//     { path: '/consultation', label: 'Expert Help' },
//     { path: '/marketplace', label: 'Marketplace' },
//   ];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <button className="brand" onClick={() => navigate('/')}>
//           Leafinity
//         </button>
//         <div className="nav-buttons">
//           {navItems.map((item) => (
//             <button
//               key={item.path}
//               onClick={() => navigate(item.path)}
//               className={`nav-btn ${isActive(item.path) ? 'active' : ''}`}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>
//         <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//           <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
//         </button>
//       </div>
//       {isMenuOpen && (
//         <div className="mobile-menu">
//           {navItems.map((item) => (
//             <button
//               key={item.path}
//               onClick={() => {
//                 navigate(item.path);
//                 setIsMenuOpen(false);
//               }}
//               className={`mobile-btn ${isActive(item.path) ? 'active' : ''}`}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// frontend/src/components/Navbar.jsx
import './Navbar.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]); // Rerun when route changes (e.g., after login)

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const navItems = [
    { path: '/', label: 'Home' },
    ...(isLoggedIn ? [
      { path: '/calender', label: 'Plant Calendar' },
      { path: '/database', label: 'Growing Guide' },
      { path: '/exchange', label: 'Seed Exchange' },
      { path: '/consultation', label: 'Expert Help' },
      { path: '/marketplace', label: 'Marketplace' },
    ] : []),
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="brand" onClick={() => navigate('/')}>
          Leafinity
        </button>

        <div className="nav-buttons">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-btn ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}

          {!isLoggedIn ? (
            <>
              <button className="nav-btn" onClick={() => navigate('/login')}>Login</button>
              <button className="nav-btn" onClick={() => navigate('/register')}>Register</button>
            </>
          ) : (
            <button className="nav-btn" onClick={handleLogout}>Logout</button>
          )}
        </div>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsMenuOpen(false);
              }}
              className={`mobile-btn ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
          {!isLoggedIn ? (
            <>
              <button className="mobile-btn" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>Login</button>
              <button className="mobile-btn" onClick={() => { navigate('/register'); setIsMenuOpen(false); }}>Register</button>
            </>
          ) : (
            <button className="mobile-btn" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
