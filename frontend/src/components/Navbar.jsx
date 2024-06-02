import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Fab, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';

import {UserContext} from '../contexts/UserContext'
import { useContext, useState } from 'react';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <Link to={`/${item.toLowerCase()}`}>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, mr: 2 }}
          >
            React Write
          </Typography>
          
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
                <Link to={`/${item.toLowerCase()}`} key={item}>
                    <Button key={item} sx={{ color: '#fff' }}>
                        {item}
                    </Button>
                </Link>
            ))}
          </Box>
          <Link to={'/create'}>
          <Fab 
            sx={{ 
              display: { xs: 'none', sm: 'block' }, 
              mr: 2, 
              transform: 'scale(0.6)', 
              backgroundColor: '#fff', 
              color: 'primary.main' 
            }}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
          </Link>
            {
              localStorage.getItem('access_token') ? 
                <>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <img src={user.image} height={50} width={50} alt="" style={{ borderRadius: '50%', overflow: 'hidden' }} />
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                > 
                  <MenuItem onClick={() => {
                    handleClose();
                    navigate(`/profile/${user.id}/`);
                  }}>My Profile</MenuItem>
                  <MenuItem onClick={() => {
                    navigate('/')
                    handleClose();
                  }}>My account</MenuItem>
                  <MenuItem onClick={() => {
                    navigate('/logout')
                    handleClose();
                  }}>Logout</MenuItem>
                </Menu>
                {/* <Link to={`/profile/${user.id}/`}>
                  <img src={user.image} height={50} width={50} alt="" style={{ borderRadius: '50%', overflow: 'hidden' }} />
                </Link>  */}
            </>
                : 
              (<p>Login</p>)
            }
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navbar;
