import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import "firebase/auth";
import { getUserDetails } from "../../Firebase/user";

const AdminComponent = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    // Fetch the list of users from Firebase when the component mounts
    getUserDetails().then((data: any) => {
      console.log(data);
      setUsers((previousState: any) => [...previousState, ...data]);
    });
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users"); // Replace with your server endpoint
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const giveAccess = async (uid: string) => {
    try {
      // Give access to the user using Firebase Admin SDK on your server
      await fetch(`/api/giveAccess/${uid}`, { method: "POST" }); // Replace with your server endpoint
      // Update the local users state
      fetchUsers();
    } catch (error) {
      console.error("Error giving access:", error);
    }
  };

  const revokeAccess = async (uid: string) => {
    try {
      // Revoke access from the user using Firebase Admin SDK on your server
      await fetch(`/api/revokeAccess/${uid}`, { method: "POST" }); // Replace with your server endpoint
      // Update the local users state
      fetchUsers();
    } catch (error) {
      console.error("Error revoking access:", error);
    }
  };

  return (
    <Container style={{ marginTop: "20px", height:"100vh", overflow:"scroll" }}>
      <Paper style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Admin
        </Typography>
        <List>
          {users.map((user: { id: string; email: string; role: string }) => (
            <ListItem key={user.id} style={{ marginBottom: "10px" }}>
              <ListItemText primary={`${user.email} - ${user.role}`} />
              {user.role !== "admin" ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => giveAccess(user.id)}
                >
                  Give Access
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => revokeAccess(user.id)}
                >
                  Revoke Access
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default AdminComponent;
