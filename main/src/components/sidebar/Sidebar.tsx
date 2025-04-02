import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Button color="inherit" onClick={() => handleNavigation('/')}>Home</Button>
          <Button color="inherit" onClick={() => handleNavigation('/about')}>About</Button>
          <Button color="inherit" onClick={() => handleNavigation('/services')}>Services</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Sidebar;