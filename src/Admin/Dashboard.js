import React from 'react';
import { FaTachometerAlt, FaTags, FaPlusCircle, FaCreditCard, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <Link to="/admin" className="sidebar-item">
          <FaTachometerAlt className="sidebar-icon" />
          <span>Dashboard</span>
        </Link>
        <Link to="/categories" className="sidebar-item">
          <FaTags className="sidebar-icon" />
          <span>Categories</span>
        </Link>
        <Link to="/course" className="sidebar-item">
          <FaPlusCircle className="sidebar-icon" />
          <span>Course +</span>
        </Link>
        <Link to="/description" className="sidebar-item">
          <FaPlusCircle className="sidebar-icon" />
          <span>Description +</span>
        </Link>
        <Link to="/vedio" className="sidebar-item">
          <FaPlusCircle className="sidebar-icon" />
          <span>Chapter +</span>
        </Link>
        <Link to="/admin/payment" className="sidebar-item">
          <FaCreditCard className="sidebar-icon" />
          <span>Payment & Bill</span>
        </Link>
        <div className="sidebar-item" onClick={handleLogout}>
          <FaSignOutAlt className="sidebar-icon" />
          <span>Log Out</span>
        </div>
      </div>
     
      
    </div>
  );
};

export default Dashboard;
