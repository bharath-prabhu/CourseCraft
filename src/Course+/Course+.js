import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Button, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import './Course+.css';

const initialCourses = [
  { 
    title: 'Python for Everybody Specialization', 
    description: 'Learn the basics of programming using Python. Perfect for beginners!',
    imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/08/33f720502a11e59e72391aa537f5c9/pythonlearn_thumbnail_1x1.png?auto=format%2Ccompress%2C%20enhance&dpr=1&w=265&h=216&q=50&fit=crop',
    link: '/enroll',
    category: 'Home'
  },
  { 
    title: 'Web Development Bootcamp', 
    description: 'A comprehensive course on full-stack web development with HTML, CSS, JavaScript, and React.',
    imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/e1/c5c12969714f7bb91cd6d740bce678/back-end-dev1.jpg?auto=format%2Ccompress%2C%20enhance&dpr=1&w=265&h=216&q=50&fit=crop',
    link: '/enroll/web-development-bootcamp',
    category: 'Engineering'
  },
  { 
    title: 'Data Science with Python', 
    description: 'Master data analysis, visualization, and machine learning with Python.',
    imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/e6/18b1e0df02473cb269cc9c68160068/python_programming_specialization_logo.png?auto=format%2Ccompress%2C%20enhance&dpr=1&w=265&h=216&q=50&fit=crop',
    link: '/enroll/data-science-with-python',
    category: 'Medical'
  },
  { 
    title: 'Introduction to Machine Learning', 
    description: 'Get started with machine learning concepts and techniques using real-world examples.',
    imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/e4/3283d04d0111e5970145eef7ee0b59/gears-818461_1280.jpg?auto=format%2C%20enhance&dpr=1&w=265&h=216&q=50&fit=crop',
    link: '/enroll/introduction-to-machine-learning',
    category: 'Art & Science'
  },
];

const CourseCard = ({ course }) => (
  <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px' }}>
    <CardMedia
      component="img"
      alt={course.title}
      height="140"
      image={course.imageUrl}
    />
    <CardContent>
      <Typography variant="h5" component="div">
        {course.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {course.description}
      </Typography>
    </CardContent>
    <CardActions style={{ justifyContent: 'center' }}>
      <Button size="small" color="primary" variant="contained" href={course.link}>
        Enroll
      </Button>
    </CardActions>
  </Card>
);

const CoursePage = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [open, setOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', imageUrl: '', link: '', category: 'Home' });
  const [activeCategory, setActiveCategory] = useState('Home');
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8080/course/add', newCourse);
      setCourses([...courses, newCourse]);
      setNewCourse({ title: '', description: '', imageUrl: '', link: '', category: 'Home' });
      handleClose();
    } catch (error) {
      console.error("There was an error adding the course!", error);
    }
  };

  const filterCourses = (category) => {
    switch (category) {
      case 'Home':
        setActiveCategory(category);
        break;
      case 'Engineering':
        navigate('/EngineAdd');
        break;
      case 'Art & Science':
        navigate('/ArtAdd');
        break;
      case 'Medical':
        navigate('/MedAdd');
        break;
      default:
        navigate('/');
        break;
    }
  };

  return (
    <div className="course-page">
      <Container>
        <div className="button-container">
          <Button className="filter-button" variant={activeCategory === 'Home' ? 'contained' : 'outlined'} onClick={() => filterCourses('Home')}>
            Home
          </Button>
          <Button className="filter-button" variant={activeCategory === 'Engineering' ? 'contained' : 'outlined'} onClick={() => filterCourses('Engineering')}>
            Engineering
          </Button>
          <Button className="filter-button" variant={activeCategory === 'Art & Science' ? 'contained' : 'outlined'} onClick={() => filterCourses('Art & Science')}>
            Art & Science
          </Button>
          <Button className="filter-button" variant={activeCategory === 'Medical' ? 'contained' : 'outlined'} onClick={() => filterCourses('Medical')}>
            Medical
          </Button>
        </div>
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          {courses.filter(course => course.category === activeCategory || activeCategory === 'Home').map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex' }}>
              <CourseCard course={course} />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
            <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', width: '100%', cursor: 'pointer' }} onClick={handleClickOpen}>
              <IconButton size="large">
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Card>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the details for the new course.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Course Title"
              type="text"
              fullWidth
              variant="standard"
              value={newCourse.title}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Course Description"
              type="text"
              fullWidth
              variant="standard"
              value={newCourse.description}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="imageUrl"
              label="Image URL"
              type="text"
              fullWidth
              variant="standard"
              value={newCourse.imageUrl}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="link"
              label="Course Link"
              type="text"
              fullWidth
              variant="standard"
              value={newCourse.link}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="category"
              label="Category"
              type="text"
              fullWidth
              variant="standard"
              value={newCourse.category}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add Course</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default CoursePage;
