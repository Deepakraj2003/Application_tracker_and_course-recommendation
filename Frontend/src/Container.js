import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Buttonrec from './Buttonrec';
import './Container.css';
import ApexChart from './ApexChart';
import Read from './Read';
import Skills from './Skills';
import Basic from './BasicDetials';
import Strength from './Strength';
import Weakness from './Weakness';
import Improve from './Improve';


const drawerWidth = 335;

const ResponsiveDrawer = (props) => {
  const { window } = props || {};
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="contact-details-container">
      <Toolbar >
      {mobileOpen && (
            <IconButton
              color="inherit"
              aria-label="go back"
              edge="end"
              onClick={handleDrawerClose}
              sx={{ ml: 'auto', display: { sm: 'none' } }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
      </Toolbar>
      <Divider />
      <div className="contact-details">
        <Basic />
      </div>
      <Divider />
      
      <ApexChart />
      <Divider />
      <br></br>
      <Buttonrec />
      
     
    </div>
  );

  const container = window?.document?.body;
 
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        backgroundColor="white"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <AccountCircleIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {/* App Title */}
          </Typography>
          {/* Conditional rendering of "Go Back" button */}
          
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        <Typography  >
           <u>Education Detilas</u>
            <Read />
        </Typography>
        <Divider />
        <br></br>
        <Typography  >
           <u>Skills</u>
            <Skills />
        </Typography>
        <Divider />
        <br></br>
        <Typography  >
           <u>Strength</u>
            <Strength />
        </Typography>
        <Divider />
        <br></br>
        <Typography  >
           <u>Weakness</u>
            <Weakness />
        </Typography>
        <Divider />
        <br></br>
        <Typography  >
           <u>Area To Improve</u>
            <Improve />
        </Typography>
        <Divider />
        <br></br>
        <Typography paragraph>
          {/* Your Lorem Ipsum text */}
        </Typography>
        <Typography paragraph>
          {/* Your Lorem Ipsum text */}
        </Typography>
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
