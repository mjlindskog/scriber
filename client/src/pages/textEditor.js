import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useMutation } from '@apollo/client';
import { ADD_ENTRY } from '../utils/mutations';
import { ME } from './../utils/queries';
import { useQuery } from '@apollo/client';
import CreateIcon from '@mui/icons-material/Create';
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-hooks';

export default function WritePage() {
    const theme = createTheme();
    const [addEntry, { err, entry }] = useMutation(ADD_ENTRY);

    const { loading, error, data } = useQuery(ME)
    const [value, setValue] = useState('');
    const { speak } = useSpeechSynthesis();

    if (loading) {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <h1>loading!</h1>
                </Container>
            </ThemeProvider>
        )
    }
    if (error) {
        console.log(error)
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <h1>Error! Must be logged in!</h1>
                </Container>
            </ThemeProvider>
        )
    }

    /*
    useEffect(() => {
        console.log(editorState.getCurrentContent().getPlainText());
    }, [editorState]);
    */
    const handleSave = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let user = JSON.stringify([data.me.hash])
        console.log(user);
        const response = await addEntry({

            variables: {
                "authors": user,
                "title": formData.get('title'),
                "subject": formData.get('subject'),
                "body": formData.get('entry')
            }
        })
        window.location.assign('/');
    }


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'grey.300' }}>
                        <CreateIcon />
                    </Avatar>
                    <Box component="form" noValidate onSubmit={handleSave} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="subject"
                                    label="Subject"
                                    name="subject"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="entry"
                                    label="Thoughts"
                                    id="entry"
                                    multiline
                                    rows={10}
                                    defaultValue=""
                                    variant="filled"
                                    value={value}
                                    onChange={(event) => setValue(event.target.value)} />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, borderRadius: '6px', zIndex: '0', width: '150px' }}
                            elevation={0}
                        >
                            Save
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            sx={{ ml: 2, mt: 3, mb: 2, borderRadius: '6px', zIndex: '0' }}
                            elevation={0}
                            onClick={() => speak({ text: value })}
                            startIcon={<VolumeUpIcon />}>
                            Read Back your Thoughts
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}
