import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { zIndex } from '@mui/system';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme();


export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1, zIndex: 0, background: "white" }}>
            <AppBar position="static" sx={{
                zIndex: 0, background: "white"
            }} elevation={0}>
                <Toolbar sx={{
                    zIndex: 0, background: "white"
                }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, color: 'black' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black" }}>
                        Scriber
                    </Typography>
                    <Button color="inherit" sx={{ color: "black" }}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box >
    );
}