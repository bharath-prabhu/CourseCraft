import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import './Description.css';

const Description = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    imageUrl1: '',
    imageUrl2: '',
    link: '',
    rating: '',
    reviews: '',
    level: '',
    duration: '',
    schedule: '',
    pace: '',
    degreePreparation: '',
    enrolled: ''
  });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/course/getAllEnrolls');
        setCourses(response.data);
      } catch (error) {
        console.error("There was an error fetching the courses!", error);
      }
    };

    fetchCourses();
  }, []);

  const handleClickOpen = (course) => {
    if (course) {
      setEditMode(true);
      setSelectedCourseId(course.id);
      setNewCourse(course);
    } else {
      setEditMode(false);
      setNewCourse({
        title: '',
        description: '',
        imageUrl1: '',
        imageUrl2: '',
        link: '',
        rating: '',
        reviews: '',
        level: '',
        duration: '',
        schedule: '',
        pace: '',
        degreePreparation: '',
        enrolled: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourseId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:8080/course/updateEnroll/${selectedCourseId}`, newCourse);
      } else {
        await axios.post('http://localhost:8080/course/addenroll', newCourse);
      }
      const response = await axios.get('http://localhost:8080/course/getAllEnrolls');
      setCourses(response.data);
      handleClose();
    } catch (error) {
      console.error("There was an error saving the course!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/course/deleteEnroll/${id}`);
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error("There was an error deleting the course!", error);
    }
  };

  return (
    <div className='des-vis'>
      <Container>
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Image URL 1</TableCell>
                <TableCell>Image URL 2</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Reviews</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Schedule</TableCell>
                <TableCell>Pace</TableCell>
                <TableCell>Degree Preparation</TableCell>
                <TableCell>Enrolled</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course, index) => (
                <TableRow key={index}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>{course.imageUrl1}</TableCell>
                  <TableCell>{course.imageUrl2}</TableCell>
                  <TableCell>{course.link}</TableCell>
                  <TableCell>{course.rating}</TableCell>
                  <TableCell>{course.reviews}</TableCell>
                  <TableCell>{course.level}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>{course.schedule}</TableCell>
                  <TableCell>{course.pace}</TableCell>
                  <TableCell>{course.degreePreparation}</TableCell>
                  <TableCell>{course.enrolled}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleClickOpen(course)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(course.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button className='des-button' variant="contained" color="primary" onClick={() => handleClickOpen(null)}>
          Add New Course
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className='des-dialog-title'>{editMode ? "Edit Course" : "Add New Course"}</DialogTitle>
          <DialogContent className='des-dialog-content'>
            <DialogContentText>
              {editMode ? "Update the course details below." : "Please fill out the details for the new course."}
            </DialogContentText>
            {Object.keys(newCourse).map((key) => (
              <TextField
                key={key}
                margin="dense"
                name={key}
                label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                type="text"
                fullWidth
                variant="standard"
                value={newCourse[key]}
                onChange={handleChange}
                className='des-text-field'
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">Cancel</Button>
            <Button onClick={handleSubmit} color="primary">{editMode ? "Update Course" : "Add Course"}</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default Description;
