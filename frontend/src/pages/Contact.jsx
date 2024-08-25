import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import { Twitter, LinkedIn, GitHub } from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashnode } from '@fortawesome/free-brands-svg-icons';

export default function Contact() {
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                marginTop: '-2rem',
                backgroundColor: 'whitesmoke',
                color: 'text.primary',
                minHeight: '100vh'
            }}
        >
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '28rem',
                    padding: '1.5rem',
                    paddingX: '3rem',
                    backgroundColor: 'background.paper',
                    borderRadius: '1rem',
                    boxShadow: '0px 4px 6px rgba(3, 3, 3, 3.1)',
                }}
            >
            <Typography variant="h4" sx={{ marginBottom: '1.5rem' }}>
                Contact Us
            </Typography>

                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: '1rem' }}
                    InputLabelProps={{ sx: { color: 'text.secondary' } }}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    sx={{ marginBottom: '1rem' }}
                    InputLabelProps={{ sx: { color: 'text.secondary' } }}
                />
                <TextField
                    label="Message"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ marginBottom: '1rem' }}
                    InputLabelProps={{ sx: { color: 'text.secondary' } }}
                />

                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        }
                    }}
                >
                    Send Message
                </Button>
                <Box 
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}
            >
                <IconButton 
                    component="a" 
                    href="https://twitter.com/rawattwts" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                >
                    <XIcon />
                </IconButton>
                <IconButton 
                    component="a" 
                    href="https://linkedin.com/in/rhythm-rawat" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900"
                >
                    <LinkedIn />
                </IconButton>
                <IconButton 
                    component="a" 
                    href="https://github.com/Rhythm1821" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-gray-700"
                >
                    <GitHub />
                </IconButton>
                <IconButton 
                    component="a" 
                    href="https://hashnode.com/@Rhythm1821" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                >
                    <FontAwesomeIcon icon={faHashnode} />
                </IconButton>
            </Box>
            </Box>

        </Box>
    );
}
