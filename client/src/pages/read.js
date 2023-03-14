import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { QUERY_ENTRIES } from './../utils/queries';
import { useQuery } from '@apollo/client'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-hooks';
const theme = createTheme();

const accordionStyle = {
    marginBottom: '2.5rem',
    border: '1px solid rgba(0, 0, 0, 0.12)'
}

const subjectStyle = {
    color: 'rgba(0, 0, 0, 0.5)'
}

function ArticleAccordion(article) {
    article = article.article

    return (
        <div>
            <Accordion elevation={0} sx={accordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{article.title}
                        <Typography sx={subjectStyle}>{article.subject}</Typography>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: 'grey.100' }}>
                    <Typography>
                        <Typography sx={subjectStyle}>Author:</Typography>
                        {article.authors}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div >
    )
}

export default function ReadPage(articleHash) {
    const [value, setValue] = useState('');
    const { speak } = useSpeechSynthesis();
    const { id } = useParams();
    const { loading, error, data } = useQuery(QUERY_ENTRIES, {
        variables: {
            "hash": id
        },
    })
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
                    <h1>Error!</h1>
                </Container>
            </ThemeProvider>
        )
    }

    let article = data.getEntry
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <h1>{article.title}</h1>
                <h2>{article.authors[0]}</h2>
                <Typography>
                    {article.body}
                </Typography>
                <Button
                    color="secondary"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, borderRadius: '6px', zIndex: '0' }}
                    elevation={0}
                    onClick={() => speak({ text: article.body })}
                    startIcon={<VolumeUpIcon />}>
                    Hear this story
                </Button>
            </Container>
        </ThemeProvider>
    );
}