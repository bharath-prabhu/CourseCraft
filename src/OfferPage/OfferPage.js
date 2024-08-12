// OfferPage.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Container, Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3a1d5d', // Dark purple color for buttons
    },
    secondary: {
      main: '#b188ea', // Light purple color for headers
    },
  },
});

const offers = [
  {
    title: 'Gold',
    credits: '10 class credits',
    discount: '20% DISCOUNT',
    originalPrice: '₹10844',
    discountedPrice: '₹8680',
    pricePerClass: '₹868 PER CLASS',
    description: 'Private and Group Classes\n4 Live25 sessions per month\n24 hours a day/7 days a week\nPay monthly & cancel anytime',
    buttonText: '2 FREE classes',
    image: 'https://via.placeholder.com/300x200', // Replace with your image URL
  },
  {
    title: 'Premium Business Classes',
    credits: '15 class credits',
    discount: '20% DISCOUNT',
    originalPrice: '₹14711',
    discountedPrice: '₹11800',
    pricePerClass: '₹787 PER CLASS',
    description: 'Premium Business Classes included\nPrivate and Group Classes\n4 Live25 sessions per month\n24 hours a day/7 days a week\nPay monthly & cancel anytime',
    buttonText: '2 FREE classes',
    image: 'https://via.placeholder.com/300x200', // Replace with your image URL
  },
  {
    title: 'Silver',
    credits: '5 class credits',
    originalPrice: '',
    discountedPrice: '₹5128',
    pricePerClass: '₹1026 PER CLASS',
    description: 'Private and Group Classes\n4 Live25 sessions per month\n24 hours a day/7 days a week\nPay monthly & cancel anytime',
    buttonText: 'No Free Trial',
    image: 'https://via.placeholder.com/300x200', // Replace with your image URL
  },
];

const OfferPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box textAlign="center" my={4}>
          <Typography variant="h4" gutterBottom>
            Our Plans
          </Typography>
          <Typography variant="h6">
            Select Gold or Platinum to get 7 days for free
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Try out our group or private classes and premium learning activities. Cancel anytime.
          </Typography>
          <Typography variant="body1" color="error">
            Please note: Our Silver Plan does not include a free trial
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {offers.map((offer, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ backgroundColor: '#b188ea', borderRadius: '8px 8px 0 0' }}>
                  <CardMedia
                    component="img"
                    alt={offer.title}
                    height="140"
                    image={offer.image}
                    title={offer.title}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom sx={{ color: '#fff' }}>
                      {offer.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {offer.credits}
                    </Typography>
                  </CardContent>
                </Box>
                <CardContent>
                  {offer.discount && (
                    <Typography variant="body2" color="primary">
                      {offer.discount}
                    </Typography>
                  )}
                  <Typography variant="body2" style={{ textDecoration: 'line-through' }}>
                    {offer.originalPrice}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    {offer.discountedPrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {offer.pricePerClass}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ whiteSpace: 'pre-line' }}>
                    {offer.description}
                  </Typography>
                </CardContent>
                <Button variant="contained" color="primary" sx={{ borderRadius: 2, m: 2 }}>
                  {offer.buttonText}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default OfferPage;
