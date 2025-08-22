import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

function SideMenu({ open, onClose }: SideMenuProps) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 260 }}>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" onClick={onClose}>
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
      </List>
    </Drawer>
  );
}

export default SideMenu;
