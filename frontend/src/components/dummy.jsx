import React, { useState } from "react";
import Button from "@mui/material/Button";
import styled from "@mui/system/styled";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileUploadButton = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Implement your file upload logic here
      console.log("Uploading file:", selectedFile);
      // Reset the selected file if needed
      setSelectedFile(null);
    }
  };

  return (
    <div>
      <Button component="label" variant="contained" onClick={handleUpload}>
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
    </div>
  );
};

export default FileUploadButton;
