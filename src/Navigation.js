import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';

const Nav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [courseDrawerOpen, setCourseDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleCourseDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setCourseDrawerOpen(open);
  };

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const linkStyles = (path) => ({
    color: location.pathname === path ? '#1976d2' : 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: '#115293'
    }
  });

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            style: {
              width: 250, // Adjust the width of the drawer
            },
          }}
        >
          <List>
            <ListItem button component={Link} to="/" style={linkStyles('/')}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/offers" style={linkStyles('/offers')}>
              <ListItemIcon><LocalOfferIcon /></ListItemIcon>
              <ListItemText primary="Offers" />
            </ListItem>
            <ListItem button component={Link} to="/contact" style={linkStyles('/contact')}>
              <ListItemIcon><ContactMailIcon /></ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
            <ListItem button component={Link} to="/login" style={linkStyles('/login')} onClick={handleLoginToggle}>
              <ListItemIcon>{isLoggedIn ? <ExitToAppIcon /> : <LoginIcon />}</ListItemIcon>
              <ListItemText primary={isLoggedIn ? "Logout" : "Login"} />
            </ListItem>
          </List>
        </Drawer>
        <Drawer
          anchor="right"
          open={courseDrawerOpen}
          onClose={toggleCourseDrawer(false)}
          PaperProps={{
            style: {
              width: 250, // Adjust the width of the drawer
            },
          }}
        >
          <List>
            <ListItem>
              <ListItemText primary="Courses" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Engineering" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Arts & Science" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Medical" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Special Course" />
            </ListItem>
          </List>
        </Drawer>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Course Craft
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search…"
          InputProps={{
            startAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
          style={{ backgroundColor: 'white', borderRadius: 4, marginRight: '16px' }}
        />
        <Link to="/" style={linkStyles('/')}>
          <Button color="inherit" startIcon={<HomeIcon />}>
            Home
          </Button>
        </Link>
        <Button
          color="inherit"
          startIcon={<SchoolIcon />}
          onClick={toggleCourseDrawer(true)}
        >
          Courses
        </Button>
        <Link to="/offer" style={linkStyles('/offer')}>
          <Button color="inherit" startIcon={<LocalOfferIcon />}>
            Offers
          </Button>
        </Link>
        <Link to="/contact" style={linkStyles('/contact')}>
          <Button color="inherit" startIcon={<ContactMailIcon />}>
            Contact
          </Button>
        </Link>
        <IconButton edge="end" color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
