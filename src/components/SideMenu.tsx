import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, removeCurrentUser } from '../utils/storage';

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

function SideMenu({ open, onClose }: SideMenuProps) {
  const navigate = useNavigate();
  const user = getCurrentUser();

  function handleLogout() {
    removeCurrentUser();
    onClose();
    navigate('/login');
  }

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 260 }}>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/home" onClick={onClose}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/students" onClick={onClose}>
            <ListItemText primary="Students" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/courses" onClick={onClose}>
            <ListItemText primary="Courses" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/files" onClick={onClose}>
            <ListItemText primary="Study Files" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/lecturers" onClick={onClose}>
            <ListItemText primary="Lecturers" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/help" onClick={onClose}>
            <ListItemText primary="Help" />
          </ListItemButton>
        </ListItem>

        <Divider />
        
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/all-lecturers" onClick={onClose}>
            <ListItemText primary="Our Staff" />
          </ListItemButton>
        </ListItem>

        <Divider />
                <ListItem disablePadding>
          <ListItemButton component={Link} to="/popular" onClick={onClose}>
            <ListItemText primary="Popular" />
          </ListItemButton>
        </ListItem>

        <Divider />
        

        {/* Conditional Login / Logout */}
        {!user ? (
          <ListItem disablePadding>
            <ListItemButton onClick={() => { onClose(); navigate('/login'); }}>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}

export default SideMenu;
