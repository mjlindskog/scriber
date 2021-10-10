import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Button } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function App() {
    const theme = createTheme();

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    useEffect(() => {
        console.log(editorState);
    }, [editorState]);
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Typography>
                    <h1>Write.</h1>
                </Typography>
                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        border: 1,
                        borderColor: 'grey.500',
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        height: '66vh'
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                    }}>
                        <TextField
                            margin="normal"
                            required
                            id="title"
                            label="Title"
                            name="title"
                            autoFocus
                            sx={{ margin: '1.5rem', borderRadius: '6px' }}
                        />
                        <TextField
                            margin="normal"
                            required
                            id="Subject"
                            label="Subject"
                            name="subject"
                            autoFocus
                            sx={{ margin: '1.5rem', borderRadius: '6px' }}
                        />
                    </Box>
                    <div style={{ padding: '2px', minHeight: '400px', borderRadius: '10px' }}>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                        />
                    </div>
                </Box>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, borderRadius: '6px', zIndex: '0', width: '150px' }}
                    elevation={0}
                >
                    Save
                </Button>
            </Container>
        </ThemeProvider >
    );
}
