import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';

type HeaderProps = {
  onMenuClick: () => void;
};

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
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Academic Info System
          </Link>
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
