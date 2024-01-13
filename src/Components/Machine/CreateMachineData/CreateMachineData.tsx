import React, { useRef, useState } from "react";
import { TextField, Button, Typography, Snackbar } from "@mui/material";
import { addMachineData } from "../../../Firebase/machine";
import Alert from "@mui/material/Alert";
import Card from "../../../UI/Card/Card";
import Container from "../../../UI/Container/Container";
interface CreateMachineDataProps {}

const CreateMachineData: React.FC<CreateMachineDataProps> = () => {
  const machineValue1 = useRef<HTMLInputElement>(null);
  const machineValue2 = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const handleUpload = (e: any) => {
    e.preventDefault();
    if (!machineValue1 || !machineValue2 || !file) {
      setError("Please fill in all fields.");
      setIsSnackbarOpen(true);
      return;
    }
    if (file) {
      const userDetails = localStorage.getItem("user");
      addMachineData({
        machineValue1: machineValue1.current,
        machineValue2: machineValue2.current,
        file,
        userId:userDetails,
      });
    }
  };
  const formatFileName = (fileName: string): string => {
    // Extract the file name without extension
    const nameWithoutExtension = fileName.split(".").slice(0, -1).join(".");

    // Capitalize the first letter of each word
    return nameWithoutExtension.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Container className={"centered-container"}>
    <Card title={"Create Machine Data"}>
    <TextField
        label="Text Field 1"
        ref={machineValue1}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Text Field 2"
        ref={machineValue2}
        fullWidth
        margin="normal"
        required
      />
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          flexDirection: "row",
          columnGap: "10px",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="file-upload-input"
          multiple
          type="file"
          onChange={handleFileChange}
          required
        />
        <label htmlFor="file-upload-input">
          <Button variant="contained" component="span">
            Select Files
          </Button>
        </label>

        {file && (
          <Typography key={file.name} variant="body2">
            {formatFileName(file.name)}
          </Typography>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleUpload}
        >
          Submit
        </Button>
      </div>
    </Card>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          elevation={6}
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateMachineData;
