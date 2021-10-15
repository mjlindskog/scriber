import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
        <Route exact path="/read">
          <Read articleHash={"bce7cfea180c06a9721d9620cca36d323c36fce65e41a7fd1019e262ca36885a"} />
        </Route>
      </Router>
      <Copyright />
    </main>
  );
}
