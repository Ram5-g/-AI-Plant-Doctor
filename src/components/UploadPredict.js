import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";

const UploadPredict = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const selected = acceptedFiles[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setPrediction(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/predict`, {
            method: "POST",
            body: formData,
          });

      const data = await res.json();

      setPrediction({
        label: data.prediction,
        confidence: data.confidence?.toFixed(2),
      });
    } catch (err) {
      alert("Prediction failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Dropzone Upload Box */}
      <Paper
        variant="outlined"
        sx={{
          border: "2px dashed green",
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          background: 'linear-gradient(to bottom right, #e8f5e9, #a5d6a7)',
        }}
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <img src="https://img.icons8.com/ios/100/image--v1.png" alt="upload-icon" width={60} />
          <Typography variant="body1" mt={2} mb={1}>
            <strong>Drag & Drop</strong> or <span style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}>browse</span>
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Supports: JPEG, JPG, PNG
          </Typography>
        </div>
      </Paper>

      {preview && (
        <Box mt={3} textAlign="center">
          <img
            src={preview}
            alt="preview"
            width={180}
            style={{ borderRadius: "10px", border: "2px solid #4caf50" }}
          />
          <Typography variant="body2" mt={1}>📷 Image Preview</Typography>
        </Box>
      )}

      {/* Predict Button */}
      <Box mt={3} textAlign="center">
        <Button
          variant="contained"
          color="success"
          sx={{
            borderRadius:"16px"
          }}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Predict Disease"}
        </Button>
      </Box>

      {/* Prediction Result */}
      {prediction && (
        <Box mt={4} textAlign="center">
          <Typography variant="h6" color="green">
            🧠 {prediction.label}
          </Typography>
          <Typography variant="subtitle1" color="green">
            🔬 Confidence: {prediction.confidence}%
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UploadPredict;
