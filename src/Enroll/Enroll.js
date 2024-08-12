import React, { useEffect, useState } from 'react';
import './Enroll.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Enroll = () => {
  const [enrollData, setEnrollData] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const title = query.get('title');

  useEffect(() => {
    if (title) {
      axios.get(`http://localhost:8080/course/enrollsByTitle?title=${title}`)
        .then(response => {
          setEnrollData(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the enroll data!', error);
        });
    }
  }, [title]);

  return (
    <div className='vis'>
      {enrollData.map((enroll) => (
        <div className='mm' key={enroll.id}>
          <div className="form-box">
            <form>
              <p style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '200px' }}>{enroll.title}</p>
              <p style={{ margin: '0', fontSize: '15px', marginRight: '200px' }}>{enroll.description}</p>
              <hr />
              <p style={{ marginRight: '350px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{enroll.rating} </span>
                <span className="star">★</span>
                <span>({enroll.reviews} reviews)</span>
              </p>
              <p style={{ fontWeight: 'bold', marginRight: '550px' }}>{enroll.level}</p>
              <p style={{ marginRight: '440px' }}>{enroll.duration}</p>
              <p style={{ fontWeight: 'bold', marginRight: '360px' }}>{enroll.schedule}</p>
              <p style={{ fontWeight: 'bold', marginRight: '320px' }}>{enroll.pace}</p>
              <p style={{ marginRight: '360px' }}>{enroll.degreePreparation}</p>
              <hr />
              <a href="#" style={{ color: 'blue', textDecoration: 'none', color: 'blue', marginRight: '300px', fontSize: '19px' }}>View all courses --</a>
            </form>
          </div>

          <div className='left'>
            <br />
            <br />
            <br />
            <img src={enroll.imageUrl1} style={{ marginRight: '1150px' }} alt="Course visual" />
            <br />
            <b style={{ fontSize: '30px', marginLeft: '-950px' }}>{enroll.title}</b>
            <p style={{ marginLeft: '-650px' }}>{enroll.description}</p>

            <img src={enroll.imageUrl2} style={{ marginRight: '1400px', width: '20px' }} alt="Additional visual" />
            <p style={{ marginTop: '-25px', marginRight: '800px' }}>Taught in English | 22 languages available | Some content may not be translated</p>
            <br />
            <br /><br/><br></br>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to={`${enroll.link}?title=${enroll.title}`}>
                <button type='button' style={{ width: '130px', height: '80px', color: 'white',marginLeft:'100px' }}>
                  Enroll for Free <p>starts from 30 Aug</p>
                </button>
              </Link>
              <Link to={`/payment?title=${enroll.title}`}>
                <button type='button' style={{ width: '130px', height: '80px', color: 'white' }}>
                  Payment
                </button>
              </Link>
            </div>
          </div>
          <p style={{ marginRight: '1050px' }}>{enroll.enrolled} already enrolled</p>
        </div>
      ))}
    </div>
  );
};

export default Enroll;
