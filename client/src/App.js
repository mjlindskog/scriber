import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import TextEditor from './pages/textEditor';
import NavBar from './components/NavBar'
import HomePage from './pages/home'
import Profile from './pages/profile'
import Favorites from './pages/favorites'
import Read from './pages/read'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#262626',
    },
    secondary: {
      main: '#f4883c',
    },
  },
});


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{
      padding: '5rem'
    }}>
      {'Copyright © '}
      < Link color="inherit" href="#" >
        Scriber
      </ Link > {' '}
      {new Date().getFullYear()}.
    </Typography >
  );
}

export default function App() {
  return (
    <main>
      <ThemeProvider theme={theme}>
      <NavBar />
      <Router>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/write">
          <TextEditor />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/read/:id" component={Read}>
        </Route>
      </Router>
      <Copyright />
      </ThemeProvider>
    </main>
  );
}
