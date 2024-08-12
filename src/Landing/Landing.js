import React from 'react';
import './Landing.css';
import NavBar from '../NavBar/NavBar';
import image from './image.png';
import { Link } from 'react-router-dom';
import Footer from '../Gridpages/Footer';
import Chatbot from './Chatbot';


const Landing = () => {
  return (
    <div className="landing-container">
      <NavBar/>
      <div className="landing-content">
        <p className='land-h1'>Build confidence.</p>
        <p className='land-h2'>Get the skills.</p>
        <p className='land-h3'>Explore careers and prepare for the job with hundreds of free courses</p>
        <p className='land-h4'>Simulations designed by the world's top experts.</p>
        <Link to='/Grid'>
          <button className='land-btn'>
            Get Started
          </button>
        </Link>
      </div>
      <img src={image} alt='good' className='landing-src'></img>
      <div>
        <br/><br/><br/><br/><br/><br/><br/>
        <Footer/>
      </div>
      <Chatbot /> 
    </div>
  );
}

export default Landing;
