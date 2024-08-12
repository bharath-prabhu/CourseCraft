
import React, { useEffect, useState } from 'react';
import './About.css';

import NavBar from '../NavBar/NavBar';
import Footer from '../Gridpages/Footer';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const [stats, setStats] = useState({
    satisfaction: 0,
    coursesCompleted: 0,
    studentsEnrolled: 0,
    hoursTaught: 0,
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

    return () => {
      clearInterval(satisfactionInterval);
      clearInterval(coursesCompletedInterval);
      clearInterval(studentsEnrolledInterval);
      clearInterval(hoursTaughtInterval);
    };
  }, []);

  return (
    <div>
      <NavBar />
      <div className='image-bg'>
        <div className="about-us-container">
          <section className="section-1">
            <h1 className="title-1">About Us</h1>
            <div className="content-1">
              <div className="text-1">
                <p>We are a leading online course platform, offering a wide range of courses to learners across the globe. Our mission is to make quality education accessible to everyone, everywhere.</p>
                <p>Our platform provides courses in various fields such as technology, business, arts, and science. Our expert instructors ensure that you receive the best education and practical skills to excel in your career.</p>
                <h2 className="subtitle-1">Why Choose Us</h2>
                <ul className="list-1">
                  <li>Learn from industry experts</li>
                  <li>Flexible learning schedule</li>
                  <li>Affordable pricing</li>
                  <li>Comprehensive course materials</li>
                  <li>Supportive learning community</li>
                </ul>
                <h2 className="subtitle-1">Our Services</h2>
                <ul className="list-1">
                  <li>Professional Certification Courses</li>
                  <li>Live Instructor-Led Training</li>
                  <li>Self-Paced Learning</li>
                  <li>Career Counseling</li>
                  <li>24/7 Student Support</li>
                </ul>
               <Link to="/Grid"> <button className="button-2">Explore Courses</button></Link>
              </div>
              <div className="images">
                <img className="large-image" src="https://brandlance.com/media/business-names/manufacturing-company-name-ideas.jpg" alt="Online Course" />
                <div className="small-images">
                  <img src="https://thebrandboy.com/wp-content/uploads/2020/03/26-Best-Online-Courses-Business-Names-Ideas.png" alt="Course 1" />
                  <img src="https://i.pinimg.com/originals/0c/b9/c0/0cb9c0c20a7b579ee80029d4bcc831eb.jpg" alt="Course 2" />
                </div>
              </div>
            </div>
          </section>
          <section className="stats">
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
          </section>
          <section className='trans'>
            <center>
              <h1>Our Goal</h1>
              <h3>Our dedicated team strives to deliver exceptional education and support to help you achieve your goals.</h3>
            </center>
          </section>
          <section className="company-overview">
            <center>
              <h2>Company Overview</h2>
              <p>We offer a variety of courses to help you gain the skills needed to succeed in your career. Our courses are designed to be flexible, allowing you to learn at your own pace.</p>
            </center>
            <div className="services-1">
              <div className="service-1">
                <i className="fas fa-chalkboard-teacher"></i>
                <h3>Instructor-Led Training</h3>
                <p>Engage in live training sessions with expert instructors to get hands-on experience and real-time feedback.</p>
              </div>
              <div className="service-1">
                <i className="fas fa-user-graduate"></i>
                <h3>Professional Certification</h3>
                <p>Earn certifications that are recognized by industry leaders to enhance your resume and career prospects.</p>
              </div>
              <div className="service-1">
                <i className="fas fa-laptop"></i>
                <h3>Self-Paced Learning</h3>
                <p>Access course materials and learn at your own pace with our flexible learning options.</p>
              </div>
              <div className="service-1">
                <i className="fas fa-book"></i>
                <h3>Comprehensive Materials</h3>
                <p>Get access to a wide range of study materials, including videos, articles, and practice exercises.</p>
              </div>
              <div className="service-1">
                <i className="fas fa-headset"></i>
                <h3>24/7 Support</h3>
                <p>Our support team is available around the clock to assist you with any questions or issues.</p>
              </div>
              <div className="service-1">
                <i className="fas fa-briefcase"></i>
                <h3>Career Counseling</h3>
                <p>Receive personalized career advice and guidance to help you achieve your professional goals.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
