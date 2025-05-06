import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginLeft: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1,
            }}
          >
            Portfolio
          </Typography>
          <NavButton component={RouterLink} to="/">
            Home
          </NavButton>
          <NavButton component={RouterLink} to="/about">
            About
          </NavButton>
          <NavButton component={RouterLink} to="/projects">
            Projects
          </NavButton>
          <NavButton component={RouterLink} to="/contact">
            Contact
          </NavButton>
        </Toolbar>
      </StyledAppBar>
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[100],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 