import React from "react";
import { Typography, Box } from "@mui/material";

const PredictionResult = ({ prediction, error,confidence }) => {
  if (error) {
    return <Typography color="error" mt={3}>{error}</Typography>;
  }

  if (prediction) {
    return (
      <Box mt={4}>
        <Typography variant="h6" color="green">
          🩺 Prediction: {prediction}
        </Typography>
        <Typography variant="h6" color="green">
          🩺 confidence: {confidence}
        </Typography>
      </Box>
    );
  }

  return null;
};

export default PredictionResult;
