import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Categories.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    adminName: '',
    categoryName: '',
    professionName: ''
  });

  const categories = ['Engineering', 'Arts and Science', 'Medical', 'Special Course'];
  const pieData = {
    labels: categories,
    datasets: [
      {
        label: '# of Courses',
        data: [12, 19, 3, 8], // Example data
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleAddCategoryClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setFormData({
      adminName: '',
      categoryName: '',
      professionName: ''
    }); // Reset form data
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Successfully added!');
    handleCloseModal();
    // Add additional logic to handle the submitted data
  };

  return (
    <div className="categories-container">
      <div className="categories-list">
        <h1>Categories</h1>
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="category-item">
              {category}
            </li>
          ))}
        </ul>
        <button className="add-category-button" onClick={handleAddCategoryClick}>
          Add Categories +
        </button>
      </div>
      <div className="pie-chart">
        <h2>Course Distribution</h2>
        <Pie data={pieData} />
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Admin Name:
                <input
                  type="text"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Category Name:
                <input
                  type="text"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Profession Name:
                <input
                  type="text"
                  name="professionName"
                  value={formData.professionName}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={handleCloseModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
