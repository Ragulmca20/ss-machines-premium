import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { getUserDetails, updateUserProfile } from "../../Firebase/user";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../Store/Admin/AdminSlice";
import { Role, User } from "../../Store/Auth/AuthSlice";
import { dashboardActions } from "../../Store/Dashboard/DashboardSlice";
import TableWithSkeletonLoader from "../../UI/Table Skeleton/TableSkeletonLoader";
import NoDataFound from "../../UI/NoData/NoDataFound";
import { selectUserList } from "../../Store/Admin/AdminSelector";
import { selectLoadingState } from "../../Store/Dashboard/DashboardSelector";
import { selectUser } from "../../Store/Auth/AuthSelector";
import { useNavigate } from "react-router-dom";

const AdminComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const users = useSelector(selectUserList);
  const isLoading = useSelector(selectLoadingState);
  const role = useSelector(selectUser).role;
  const navigate = useNavigate();
  const filteredUsers = isLoading
    ? [1, 2, 3, 4]
    : users.filter((user: User) => user?.email.startsWith(searchTerm));
  const dispatch = useDispatch();

  const handleChange = async (id: string, value: boolean) => {
    dispatch(dashboardActions.setLoadingState(true));
    const payload = { id, data: { isReadOnly: value } };
    await updateUserProfile(payload.id, payload.data);
    dispatch(adminActions.updateUserlist(payload));
    dispatch(dashboardActions.setLoadingState(false));
  };

  useEffect(() => {
    if (role !== Role.admin) navigate("/");
    dispatch(dashboardActions.setLoadingState(true));
    getUserDetails().then((data: any) => {
      dispatch(adminActions.setUserlist(data));
      dispatch(dashboardActions.setLoadingState(false));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGiveAccess = async (id: string) => {
    dispatch(dashboardActions.setLoadingState(true));
    const payload = { id, data: { role: Role.admin } };
    await updateUserProfile(payload.id, payload.data);
    dispatch(adminActions.updateUserlist(payload));
    dispatch(dashboardActions.setLoadingState(false));
  };

  const handleRevokeAccess = async (id: string) => {
    dispatch(dashboardActions.setLoadingState(true));
    const payload = { id, data: { role: Role.user } };
    await updateUserProfile(payload.id, payload.data);
    dispatch(adminActions.updateUserlist(payload));
    dispatch(dashboardActions.setLoadingState(false));
  };

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };
  const isAdmin = (user: User) => {
    return user.role === Role.admin ? true : false;
  };
  const getAdminTable = () => {
    return (
      <TableContainer style={{ maxHeight: "50vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "550", fontFamily: "Arial" }}>
                Email
              </TableCell>
              <TableCell style={{ fontWeight: "550", fontFamily: "Arial" }}>
                Role
              </TableCell>
              <TableCell style={{ fontWeight: "550", fontFamily: "Arial" }}>
                Read/Write
              </TableCell>
              <TableCell style={{ fontWeight: "550", fontFamily: "Arial" }}>
                Grant/Revoke
              </TableCell>
              <TableCell style={{ fontWeight: "550", fontFamily: "Arial" }}>
                Api Key
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ overflowY: "auto" }}>
            {isLoading ? (
              <TableWithSkeletonLoader row={4} column={5} />
            ) : (
              filteredUsers.map((user: any) => {
                return (
                  <TableRow key={user.email}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={user.isReadOnly}
                            onChange={(e) =>
                              handleChange(user.id, e.currentTarget.checked)
                            }
                          />
                        }
                        label="Read Only"
                      />
                    </TableCell>
                    <TableCell>
                      {isAdmin(user) ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleRevokeAccess(user.id)}
                        >
                          Revoke
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleGiveAccess(user.id)}
                        >
                          Grant
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
      <Paper
        style={{
          maxWidth: "80%",
          maxHeight: "70vh",
          padding: "2rem",
          width: "50%",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          User List
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {filteredUsers.length ? (
          getAdminTable()
        ) : (
          <NoDataFound message={"No user data available"} />
        )}
      </Paper>
    </div>
  );
};

export default AdminComponent;
