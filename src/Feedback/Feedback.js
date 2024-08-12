import React, { useState } from 'react';
import './Feedback.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    courseRating: 0,
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      courseRating: rating,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted: ', formData);
    // Here you can add code to send formData to your backend or an API
    setFormData({
      name: '',
      email: '',
      courseRating: 0,
      comments: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h2>Course Feedback</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="courseRating">Course Rating:</label>
        <StarRating
          rating={formData.courseRating}
          onRatingChange={handleRatingChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="comments">Comments:</label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="submit-button">Submit Feedback</button>
    </form>
  );
};

const StarRating = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => onRatingChange(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default FeedbackForm;
