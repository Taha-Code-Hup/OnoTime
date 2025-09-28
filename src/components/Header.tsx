// src/components/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getCurrentUser, removeCurrentUser } from '../utils/storage';

type HeaderProps = {
  onMenuClick: () => void;
};

function UserArea() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  function logout() {
    removeCurrentUser();
    navigate('/login');
  }

  if (!user) {
    return <Button color="inherit" onClick={() => navigate('/login')}>התחבר</Button>;
  }

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="body2">שלום, {user.name}</Typography>
      <Button color="inherit" onClick={logout}>התנתק</Button>
    </Box>
  );
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Title (Now Clickable) */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
            Academic Info System
          </Link>
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Link to="/lecturers" style={{ color: 'inherit', textDecoration: 'none' }}>
            Lecturers
          </Link>
          <Link to="/students" style={{ color: 'inherit', textDecoration: 'none' }}>
            Students
          </Link>
          <Link to="/courses" style={{ color: 'inherit', textDecoration: 'none' }}>
            Courses
          </Link>
          <Link to="/files" style={{ color: 'inherit', textDecoration: 'none' }}>
            Files
          </Link>
          <Link to="/help" style={{ color: 'inherit', textDecoration: 'none' }}>
            Help
          </Link>

          {/* User area (login / greeting / logout) */}
          <Box sx={{ ml: 2 }}>
            <UserArea />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
