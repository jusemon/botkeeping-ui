import React from 'react';
import {
  Box,
  CssBaseline,
  Container,
  Divider,
  IconButton,
  Toolbar,
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  SmartToy as SmartToyIcon,
  Task as TaskIcon,
} from '@mui/icons-material';

import { AppBar } from './features/ui/AppBar';
import { Drawer } from './features/ui/Drawer';
import { Copyright } from './features/ui/Copyright';
import TasksList from './features/tasks/TasksList';
import BotsList from './features/bots/BotsList';
import {
  LinkProps as RouterLinkProps,
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import BotsForm from './features/bots/BotsForm';

const LinkBehavior = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => <NavLink ref={ref} {...props} />
);

const App = () => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='absolute' open={open}>
        <Toolbar
          sx={{
            pr: '24px',
          }}
        >
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Botkeeping
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component='nav'>
          <ListItemButton component={LinkBehavior} to='/'>
            <ListItemIcon>
              <SmartToyIcon />
            </ListItemIcon>
            <ListItemText primary='Bots' />
          </ListItemButton>
          <ListItemButton component={LinkBehavior} to='/tasks'>
            <ListItemIcon>
              <TaskIcon />
            </ListItemIcon>
            <ListItemText primary='Tasks' />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component='main'
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route path='/' element={<Navigate replace to='/bots' />} />
              <Route path='/bots' element={<BotsList />} />
              <Route path='/bots/create' element={<BotsForm />} />
              <Route path='/tasks' element={<TasksList />} />
            </Routes>
          </Paper>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
};

export default App;
