import React from 'react';
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Get the current route

  // Function to determine if a button should be bold
  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg" sx={{ padding: '2rem' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Button
              color="inherit"
              onClick={() => navigate('/home')}
              sx={{ fontWeight: isActive('/home') ? 'bold' : 'normal' }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/profile')}
              sx={{ fontWeight: isActive('/profile') ? 'bold' : 'normal' }}
            >
              Profile
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/recently-played')}
              sx={{ fontWeight: isActive('/recently-played') ? 'bold' : 'normal' }}
            >
              Recently Played
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Sidebar;
