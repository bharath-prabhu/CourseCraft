import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <Box sx={{ backgroundColor: '#007bff', color: '#ffffff', py: 4, borderTop: '1px solid #ddd' }}>
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>About Us</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            We are a leading provider of online courses, committed to helping you achieve your learning goals with expert guidance and top-notch resources.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Contact</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>Email: <Link href="mailto:contact@onlinecourses.com" color="inherit">contact@onlinecourses.com</Link></Typography>
          <Typography variant="body2">Phone: +1 (555) 123-4567</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Follow Us</Typography>
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              <FaFacebookF size={20} />
            </Link>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              <FaTwitter size={20} />
            </Link>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              <FaLinkedinIn size={20} />
            </Link>
            <Link href="#" color="inherit">
              <FaInstagram size={20} />
            </Link>
          </Box>
        </Grid>
      </Grid>
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Course Craft. All rights reserved.
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Footer;
