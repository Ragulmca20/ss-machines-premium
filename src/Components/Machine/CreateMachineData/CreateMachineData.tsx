import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { addMachineData } from "../../../Firebase/machine";
import Card from "../../../UI/Card/Card";
import Container from "../../../UI/Container/Container";
interface CreateMachineDataProps { }

const CreateMachineData: React.FC<CreateMachineDataProps> = () => {
  const [machineValue1, setMachineValue1] = useState<string>("");
  const [machineValue2, setMachineValue2] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const handleUpload = (e: any) => {
    e.preventDefault();
    if (file) {
      const userDetails = localStorage.getItem("user");
      addMachineData({
        machineValue1: machineValue1,
        machineValue2: machineValue2,
        file,
        userId: userDetails||"",
      });
    }
  };
  const formatFileName = (fileName?: string): string => {
    // Extract the file name without extension
    const nameWithoutExtension = fileName?.split(".").slice(0, -1).join(".");
    // Capitalize the first letter of each word
    return nameWithoutExtension?.replace(/\b\w/g, (char) => char.toUpperCase())||"File Name";
  };
  return (
    <Container className={"centered-container"}>
      <Card title={"Create Machine Data"}>
        <TextField
          label="Text Field 1"
          fullWidth
          margin="normal"
          size="small"
          required
          onChange={(e)=> setMachineValue1(e.target.value)}
        />
        <TextField
          label="Text Field 2"
          fullWidth
          margin="normal"
          size="small"
          required
          onChange={(e)=> setMachineValue2(e.target.value)}
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
            type="file"
            onChange={handleFileChange}
            required
          />
          <TextField
            label={formatFileName(file?.name)}
            disabled
            size="small"
            variant="outlined"
          // Any additional props or styles can be added here
          />
          <label htmlFor="file-upload-input">
            <Button variant="contained" size="small" color="secondary" component="span">
              Select File
            </Button>
          </label>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!(file && machineValue1 && machineValue2)}
          >
            Submit
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default CreateMachineData;
