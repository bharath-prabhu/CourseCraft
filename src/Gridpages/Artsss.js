import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Button, CardActions } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => (
  <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px' }}>
    <CardMedia
      component="img"
      alt={course.title}
      height="140"
      image={course.imageUrl}
    />
    <CardContent style={{ height: '150px', overflow: 'hidden' }}>
      <Typography variant="h5" component="div">
        {course.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {course.description}
      </Typography>
    </CardContent>
    <CardActions style={{ justifyContent: 'center' }}>
      <Button
        size="small"
        color="primary"
        variant="contained"
        component={Link}
        to={`/enroll?title=${course.title}`}
      >
        Enroll
      </Button>
    </CardActions>
  </Card>
);

const Engine = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/course/art')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the courses!', error);
      });
  }, []);

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Engine;
