import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaSearch, FaGlobe, FaAngleDown, FaUser, FaTimes, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './NavBar.css';
import Login from '../Login/Login';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(''); 
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [coursesMenuOpen, setCoursesMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(loggedIn);
    setUsername(storedUsername || ''); 
  }, []);

  const handleLoginToggle = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setLoginModalOpen(false);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username'); 
    setIsLoggedIn(false);
    setUsername('');
    setDrawerOpen(false);
    window.location.href = "/"; 
  };

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const linkStyles = (path) => ({
    color: location.pathname === path ? '#1976d2' : 'inherit',
    textDecoration: 'none',
  });

  const courses = [
    { name: 'Engineering', path: '/engine' },
    { name: 'Medical', path: '/Medical' },
    { name: 'Arts & Science', path: '/Artsss' },
  ];

  return (
    <div className="app-bar">
      <div className="toolbar">
        <Typography variant="h6" className="title">
          Course Craft
        </Typography>
        <div
          className="nav-button courses-button"
          onMouseEnter={() => setCoursesMenuOpen(true)}
          onMouseLeave={() => setCoursesMenuOpen(false)}
        >
          <button className="nav-button">
            Profession <FaAngleDown className="arrow-icon" />
          </button>
          {coursesMenuOpen && (
            <div className="dropdown-content courses-dropdown">
              <div className="courses-list">
                {courses.map((course) => (
                  <Link 
                    key={course.name} 
                    to={course.path} 
                    className="course-item"
                    style={linkStyles(course.path)}
                  >
                    {course.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search…" className="search-box" />
        </div>
        <div className="spacer" />
        <Link to="/" style={linkStyles('/')}>
          <button className="nav-button">Home</button>
        </Link>
        <Link to="/EmbeddedWebsite" style={linkStyles('/EmbeddedWebsite')}>
          <button className="nav-button">Open IDE</button>
        </Link>
        <Link to="/about-us" style={linkStyles('/about-us')}>
          <button className="nav-button">About Us</button>
        </Link>
        <div className="language-dropdown">
          <button className="nav-button" onClick={toggleLanguageMenu}>
            <FaGlobe />
          </button>
          {languageMenuOpen && (
            <div className="dropdown-content">
              <button>English</button>
              <button>Spanish</button>
              <button>French</button>
            </div>
          )}
        </div>
        {isLoggedIn ? (
          <div className="profile-dropdown">
            <button className="nav-button" onClick={openDrawer}>
              <FaUser />
              <span className="username">{username}</span>
            </button>
          </div>
        ) : (
          <button className="nav-button" onClick={() => setLoginModalOpen(true)}>
            Login
          </button>
        )}
      </div>
      <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
        <button className="drawer-close-button" onClick={closeDrawer}>
          <FaTimes />
        </button>
        <div className="drawer-content">
          <Link to={`/profile/${username}`} className="drawer-item" onClick={closeDrawer}>
            <FaUserCircle /> Profile
          </Link>
          <div className="drawer-item">
            <FaCog /> Settings
          </div>
          <div className="drawer-item" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </div>
        </div>
      </div>
      <Login
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLoginToggle}
      />
    </div>
  );
};

const Typography = ({ variant, className, children }) => {
  return <div className={`${variant} ${className}`}>{children}</div>;
};

export default NavBar;
