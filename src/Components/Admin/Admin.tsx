import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Skeleton,
} from '@mui/material';
import { getUserDetails } from '../../Firebase/user';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions } from '../../Store/Admin/AdminSlice';
import { Role, User } from '../../Store/Auth/AuthSlice';
import { dashboardActions } from '../../Store/Dashboard/DashboardSlice';
import TableWithSkeletonLoader from '../../UI/Table Skeleton/TableSkeletonLoader';
const AdminComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { users, role, isLoading }: { users: User[], role: Role, isLoading: boolean } = useSelector((state: any) => {
    return {
      users: state.admin.users,
      role: state.auth.user.role,
      isLoading: state.dashboard.isLoading
    };
  });
  console.log(isLoading);
  console.log(users, role)
  const filteredUsers = isLoading ? [1, 2, 3, 4] : users.filter((user: User) => user?.email.startsWith(searchTerm));
  console.log(filteredUsers)
  const dispatch = useDispatch();

  const handleChange = (event: any, id: string) => {
    console.log(id);
  };

  useEffect(() => {
    // Fetch the list of users from Firebase when the component mounts
    dispatch(dashboardActions.setLoadingState(true));
    getUserDetails().then((data: any) => {
      dispatch(adminActions.setUserlist(data))
      dispatch(dashboardActions.setLoadingState(false));
    });
  }, []);

  const handleGiveAccess = (userId: any) => {
    // Implement logic to give access (replace with your API call)
    console.log(`Give access to user with ID ${userId}`);
  };

  const handleRevokeAccess = (userId: any) => {
    // Implement logic to revoke access (replace with your API call)
    console.log(`Revoke access from user with ID ${userId}`);
  };

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value)
  };

  return (
    <div style={{ padding: "2rem", display: "flex", justifyContent: 'center' }}>
      <Paper style={{ maxWidth: "80%", maxHeight: "70vh", padding: "2rem" }}>
        <Typography variant="h6" align="center" gutterBottom>
          User List
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          size='small'

          value={searchTerm}
          onChange={handleSearchChange}
        />
        <TableContainer style={{ maxHeight: '50vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "550", fontFamily:"Arial" }}>Email</TableCell>
                <TableCell style={{ fontWeight: "550", fontFamily:"Arial" }}>Role</TableCell>
                <TableCell style={{ fontWeight: "550", fontFamily:"Arial" }}>Read/Write</TableCell>
                <TableCell style={{ fontWeight: "550", fontFamily:"Arial" }}>Grant/Revoke</TableCell>
                <TableCell style={{ fontWeight: "550", fontFamily:"Arial" }}>Api Key</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ overflowY: 'auto' }}>
              {isLoading ? (<TableWithSkeletonLoader row={4} column={5} />) :
                filteredUsers.map((user: any) => (
                  (<TableRow key={user.email} >
                    <TableCell >{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell><FormControlLabel
                      control={<Checkbox checked={user.isReadOnly} onChange={e => handleChange(e, user.id)} />}
                      label="Read Only"
                    /></TableCell>
                    <TableCell align='center'>
                      {user.hasAccess ? (
                        <Button variant="contained" color="secondary" onClick={() => handleRevokeAccess(user.id)}>
                          Revoke
                        </Button>
                      ) : (
                        <Button variant="contained" color="primary" onClick={() => handleGiveAccess(user.id)}>
                          Grant
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                  </TableRow>)
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default AdminComponent;
