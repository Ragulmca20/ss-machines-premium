// src/components/Navbar.tsx
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../Firebase/user';
import { onAuthStateChanged } from '@firebase/auth';
import auth from '../../Firebase/firebase';
import { authActions } from '../../Store/Auth/AuthSlice';

const navbarStyles: React.CSSProperties = {
  flexGrow: 1,
};

const linkStyles: React.CSSProperties = {
  color: 'inherit',
  textDecoration: 'none',
};

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser)
        dispatch(authActions.login());
    })

  }, [])
  const { isAuthenticated, role } = useSelector((state: any) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      role: state.auth.user.role
    }
  });
  const handleLogout = async () => {
    await signOut();
    dispatch(authActions.logout());
  }
  return (
    <div style={navbarStyles}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            SS Premium Machines
          </Typography>
          <Button color="inherit" component={RouterLink} to="/" style={linkStyles}>
            {isAuthenticated ? "Home" : "Login/Sign Up"}
          </Button>
          {isAuthenticated && (<><Button color="inherit" component={RouterLink} to="/admin" style={linkStyles}>
            Admin
          </Button>
            <Button color="inherit" component={RouterLink} to="/dashboard" style={linkStyles}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={handleLogout} component={RouterLink} to="/" style={linkStyles}>
              Logout
            </Button></>)}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
