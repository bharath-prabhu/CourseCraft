import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box } from '@mui/material';
import './Chapform.css';

const Chapform = () => {
  const [open, setOpen] = useState(false);
  const [chapterDetails, setChapterDetails] = useState({
    courseTitle: '',
    task1Title: '',
    task1VideoUrl: '',
    task2Title: '',
    task2VideoUrl: '',
    task3Title: '',
    task3VideoUrl: '',
    task4Title: '',
    task4VideoUrl: '',
    task5Title: '',
    task5VideoUrl: ''
  });

  useEffect(() => {
    const fetchChapterDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8080/course/getChapterDetails');
        console.log('Fetched chapter details:', response.data);
        setChapterDetails(response.data);
      } catch (error) {
        console.error('Error fetching chapter details', error);
      }
    };

    fetchChapterDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChapterDetails({
      ...chapterDetails,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/course/chapters', chapterDetails);
      console.log('Form submitted', response.data);
      const fetchChapterDetails = async () => {
        try {
          const response = await axios.get('http://localhost:8080/course/getChapterDetails');
          setChapterDetails(response.data);
        } catch (error) {
          console.error('Error fetching chapter details', error);
        }
      };

      fetchChapterDetails();
      setOpen(false);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container className="chapform-container">
      <Typography variant="h4" gutterBottom>
        Create Chapter Description
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Chapter
      </Button>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="chapform-dialog-title">Add New Chapter</DialogTitle>
        <DialogContent className="chapform-dialog-content">
          <Typography variant="h6">Course Title:</Typography>
          <TextField
            label="Course Title"
            name="courseTitle"
            value={chapterDetails.courseTitle}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          {[1, 2, 3, 4, 5].map(taskId => (
            <Box key={taskId} className="chapform-task-section">
              <Typography variant="h6">Task {taskId}</Typography>
              <TextField
                label="Title"
                name={`task${taskId}Title`}
                value={chapterDetails[`task${taskId}Title`]}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Video URL"
                name={`task${taskId}VideoUrl`}
                value={chapterDetails[`task${taskId}VideoUrl`]}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleFormSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Chapform;
