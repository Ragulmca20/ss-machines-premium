// src/components/Navbar.tsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

const navbarStyles: React.CSSProperties = {
  flexGrow: 1,
};

const linkStyles: React.CSSProperties = {
  color: 'inherit',
  textDecoration: 'none',
};

const Navbar: React.FC = () => {
  return (
    <div style={navbarStyles}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            SS Premium Machines
          </Typography>
          <Button color="inherit" component={RouterLink} to="/" style={linkStyles}>
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/login" style={linkStyles}>
            Login
          </Button>
          <Button color="inherit" component={RouterLink} to="/signup" style={linkStyles}>
            Signup
          </Button>
          <Button color="inherit" component={RouterLink} to="/dashboard" style={linkStyles}>
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
