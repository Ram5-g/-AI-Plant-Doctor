import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import UploadPredict from "./components/UploadPredict";

const App = () => {
  return (
    <Box sx={{ background: 'linear-gradient(to bottom right, #e8f5e9, #a5d6a7)', height: '100vh', py: 6 }}>
      <Container maxWidth="sm" sx={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
      }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, backgroundColor: '#ffffffcc', backdropFilter: 'blur(6px)' }}>
          <Typography variant="h4" align="center" fontWeight={600} color="green" gutterBottom>
            🌿 AI Plant Doctor
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" mb={3}>
            Upload a leaf image to detect plant diseases instantly.
          </Typography>

          <UploadPredict />
        </Paper>
      </Container>
    </Box>
  );
};

export default App;
