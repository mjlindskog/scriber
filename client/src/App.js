import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import TextEditor from './pages/textEditor';
import NavBar from './components/NavBar'
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
    <div>
      <NavBar />
      <TextEditor />
      <Copyright />
    </div>
  );
}
