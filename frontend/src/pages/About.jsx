import React from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Paper, 
    createTheme, 
    ThemeProvider 
} from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default function About() {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 8,
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            p: 6,
                            borderRadius: '16px',
                            textAlign: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <Typography 
                            variant="h2" 
                            component="h1" 
                            gutterBottom
                            sx={{ 
                                fontWeight: 700, 
                                color: 'primary.main',
                                mb: 4,
                            }}
                        >
                            About Us
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                fontSize: '1.2rem', 
                                lineHeight: 1.8,
                                color: 'text.secondary',
                            }}
                        >
                            ReactWrite is a powerful and user-friendly platform built with React and Django, 
                            allowing users to express themselves through posts, connect with others, and manage their profiles with ease. 
                            The project leverages modern web technologies and is deployed across Vercel and Render, with Neon Postgres as the database.
                        </Typography>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
}