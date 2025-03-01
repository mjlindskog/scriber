import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import { useHistory } from 'react-router-dom';
import Link from '@mui/material/Link';
import Auth from '../utils/auth';
import LoginIcon from '@mui/icons-material/Login';

import { Image } from 'mui-image';
import LOGO from '../img/logo40.png';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    let history = useHistory();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    if (Auth.getToken()) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} elevation={0} sx={{ background: "primary", borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    <Toolbar sx={{ background: "primary" }}>
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                                color: 'secondary.main'
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Image src={LOGO} alt="Scriber logo, quotation marks" width={15}/>
                        <Typography variant="h6" noWrap component="div" sx={{ color: 'white', paddingLeft: "3px" }}>
                            Scriber
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} >
                    <DrawerHeader sx={{ bgcolor: "secondary.main" }}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <Link href='/'>
                            <ListItem button key={'Home'} sx={{ color: "primary" }}>
                                <ListItemIcon>
                                    <HomeIcon sx={{ color: "primary.main" }}/>
                                </ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItem>
                        </ Link>
                        <Link href='/favorites'>
                            <ListItem button key={'Favorites'}>
                                <ListItemIcon>
                                    <StarIcon sx={{ color: "primary.main" }}/>
                                </ListItemIcon>
                                <ListItemText primary={'Favorites'} />
                            </ListItem>
                        </ Link>
                        <Link href='/write'>
                            <ListItem button key={'Write'}>
                                <ListItemIcon>
                                    <CreateIcon sx={{ color: "primary.main" }}/>
                                </ListItemIcon>
                                <ListItemText primary={'Write'} />
                            </ListItem>
                        </ Link>
                    </List>
                    <Divider />
                    <List>
                        <Link href='/profile'>
                            <ListItem button key={'Profile'}>
                                <ListItemIcon>
                                    <AccountCircleIcon sx={{ color: "primary.main" }}/>
                                </ListItemIcon>
                                <ListItemText primary={'Profile'} />
                            </ListItem>
                        </ Link>
                        <Link href='#'>
                            <ListItem button key={'Sign Out'} onClick={Auth.logout}>
                                <ListItemIcon>
                                    <LogoutIcon sx={{ color: "primary.main" }}/>
                                </ListItemIcon>
                                <ListItemText primary={'Sign Out'} />
                            </ListItem>
                        </ Link>
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                </Box>
            </Box >
        );
    } else {
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} elevation={0} sx={{ background: "primary", borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    <Toolbar>
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                                color: 'secondary.main'
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Image src={LOGO} alt="Scriber logo, quotation marks" width={15}/>
                        <Typography variant="h6" noWrap component="div" sx={{ color: 'white', paddingLeft: "3px" }}>
                            Scriber
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader sx={{ bgcolor: "secondary.main" }}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <Link href='/'>
                            <ListItem button key={'Home'}>
                                <ListItemIcon>
                                    <HomeIcon sx={{ color: "primary.main" }}/>
                                </ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItem>
                        </ Link>
                    </List>
                    <Divider />
                    <List>
                        <Link href='/signin'>
                            <ListItem button key={'Sign In'}>
                                <ListItemIcon>
                                    <LoginIcon sx={{ color: "primary.main" }}/>
                                </ListItemIcon>
                                <ListItemText primary={'Sign In'} />
                            </ListItem>
                        </ Link>
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                </Box>
            </Box >
        );
    }
}