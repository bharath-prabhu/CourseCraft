import React, { useState } from 'react';
import {
  Container, Grid, Card, CardContent, Typography, CardMedia, Button, CardActions,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './EngineAdd.css';
import Dashboard from '../Admin/Dashboard';

const initialCourses = [
  // Initial courses
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

const EngineAdd = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [open, setOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', imageUrl: '', link: '' });

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
      const response = await fetch('http://localhost:8080/course/engine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });
      if (response.ok) {
        const savedCourse = await response.json();
        setCourses([...courses, savedCourse]);
        setNewCourse({ title: '', description: '', imageUrl: '', link: '' });
        handleClose();
      } else {
        console.error('Failed to add course');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Dashboard/>
      <div className="course-page">
        <Container style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
          <Grid container spacing={3} justifyContent="center" alignItems="stretch" style={{ maxWidth: '80%', marginTop: '0' }}>
            {courses.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex' }}>
                <CourseCard course={course} />
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
              <Card 
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', width: '100%', cursor: 'pointer' }}
                onClick={handleClickOpen}
              >
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
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Add Course</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </div>
  );
};

export default EngineAdd;
