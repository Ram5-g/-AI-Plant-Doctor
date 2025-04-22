import React from "react";
import { Box, Typography, Button, Input } from "@mui/material";

const UploadLeafImage = ({ onFileChange, onUpload, loading }) => {
  return (
    <Box textAlign="center">
      <Typography variant="h6" mb={2}>
        Upload a Leaf Image 📸
      </Typography>
      <Input
        type="file"
        onChange={onFileChange}
        inputProps={{ accept: "image/*" }}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={onUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Predict Disease"}
        </Button>
      </Box>
    </Box>
  );
};

export default UploadLeafImage;
