import React, { useEffect, useState } from 'react';
import { FaTachometerAlt, FaTags, FaPlusCircle, FaCreditCard, FaSignOutAlt } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import './AdminDashboard.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    satisfaction: 0,
    coursesCompleted: 0,
    studentsEnrolled: 0,
    hoursTaught: 0,
  });
  const [courseStatusData, setCourseStatusData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Course Status',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const satisfactionInterval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        satisfaction: prevStats.satisfaction < 100 ? prevStats.satisfaction + 1 : 100,
      }));
    }, 20);

    const coursesCompletedInterval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        coursesCompleted: prevStats.coursesCompleted < 1500 ? prevStats.coursesCompleted + 1 : 1500,
      }));
    }, 150);

    const studentsEnrolledInterval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        studentsEnrolled: prevStats.studentsEnrolled < 20000 ? prevStats.studentsEnrolled + 1 : 20000,
      }));
    }, 10);

    const hoursTaughtInterval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        hoursTaught: prevStats.hoursTaught < 100000 ? prevStats.hoursTaught + 10 : 100000,
      }));
    }, 1);

    const courseStatusInterval = setInterval(() => {
      setCourseStatusData(prevData => {
        const newTime = new Date().toLocaleTimeString();
        const newStatus = prevData.datasets[0].data.length > 0 ? prevData.datasets[0].data.slice(-1)[0] + 1 : 1;

        return {
          labels: [...prevData.labels, newTime],
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data, newStatus],
            },
          ],
        };
      });
    }, 1000);

    return () => {
      clearInterval(satisfactionInterval);
      clearInterval(coursesCompletedInterval);
      clearInterval(studentsEnrolledInterval);
      clearInterval(hoursTaughtInterval);
      clearInterval(courseStatusInterval);
    };
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const pieData = {
    labels: ['Engineering', 'Medical', 'Arts & Science'],
    datasets: [
      {
        label: '# of Courses',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Courses',
        },
      },
    },
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar1">
        <FaTachometerAlt className="sidebar-icon" />
        <span>Dashboard</span>
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
      <div className="content">
        <h1>Admin Dashboard</h1>
        <div className="stats">
          <div className="stat">
            <h3>{stats.satisfaction}%</h3>
            <p>Student Satisfaction</p>
          </div>
          <div className="stat">
            <h3>{stats.coursesCompleted}</h3>
            <p>Courses Completed</p>
          </div>
          <div className="stat">
            <h3>{stats.studentsEnrolled}</h3>
            <p>Students Enrolled</p>
          </div>
          <div className="stat">
            <h3>{stats.hoursTaught}</h3>
            <p>Hours Taught</p>
          </div>
        </div>
        <div className="charts">
          <div className="pie-chart">
            <h3>Course Distribution</h3>
            <Pie data={pieData} />
          </div>
          <div className="line-chart">
            <h3>Course Status Over Time</h3>
            <Line data={courseStatusData} options={lineOptions} />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
