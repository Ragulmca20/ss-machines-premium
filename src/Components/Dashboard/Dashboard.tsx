// Dashboard.tsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getMachineData } from "../../Firebase/machine";
import Container from "../../UI/Container/Container";
import "./Dashboard.css";
import TabComponent from "../../UI/Tab/Tab";
import { useDispatch, useSelector } from "react-redux";
import TableWithSkeletonLoader from "../../UI/Table Skeleton/TableSkeletonLoader";
import { dashboardActions } from "../../Store/Dashboard/DashboardSlice";
import CircularProgressCentered from "../../UI/Loader/Loader";
import NoDataFound from "../../UI/NoData/NoDataFound";
import { chartData } from "./Chart";
import { selectIsAdmin, selectUser } from "../../Store/Auth/AuthSelector";
import {
  selectDashboard,
  selectLoadingState,
} from "../../Store/Dashboard/DashboardSelector";
import { selectIsAuthenticated } from "../../Store/Admin/AdminSlice";
Chart.register(...registerables);
interface MachineData {
  filePath: string;
  id: string;
  machineValue1: string;
  machineValue2: string;
  userId: string;
}
const Dashboard: React.FC = () => {
  const userId = useSelector(selectUser).id;
  const isLoading = useSelector(selectLoadingState);
  const machineData = useSelector(selectDashboard);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const dispatch = useDispatch();
  const isAdmin = useSelector(selectIsAdmin);
  const tableData = isAdmin
    ? machineData.filter((data) => data.userId.startsWith(searchTerm))
    : machineData;
  const tabs = [
    {
      label: "Bar Chart",
      content: (
        <div>
          <Bar data={chartData} />
        </div>
      ),
    },
    {
      label: "Pie Chart",
      content: (
        <div>
          <Doughnut data={chartData} />
        </div>
      ),
    },
  ];
  useEffect(() => {
    dispatch(dashboardActions.setLoadingState(true));
    const machineData = getMachineData(userId);
    machineData.then((response: any) => {
      dispatch(
        dashboardActions.setDashboardDetails(
          response as unknown as MachineData[]
        )
      );
      dispatch(dashboardActions.setLoadingState(false));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setActiveTabIndex(newIndex);
  };

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  const getTable = () => {
    return (
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "550", fontFamily: "Arial" }}>
              Machine Input 1
            </TableCell>
            <TableCell style={{ fontWeight: "550", fontFamily: "Arial" }}>
              Machine Input 2
            </TableCell>
            <TableCell style={{ fontWeight: "550", fontFamily: "Arial" }}>
              File URL
            </TableCell>
            {isAdmin && <TableCell style={{ fontWeight: "550", fontFamily: "Arial" }}>
              ApiKey
            </TableCell>}
          </TableRow>
        </TableHead>
        <TableBody style={{ overflowY: "auto" }}>
          {isLoading ? (
            <TableWithSkeletonLoader row={6} column={3} />
          ) : (
            tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.machineValue1}</TableCell>
                <TableCell>{row.machineValue2}</TableCell>
                <TableCell>
                  <MuiLink
                    href={row.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {"Download"}
                  </MuiLink>
                </TableCell>
                {isAdmin && <TableCell>{row.userId}</TableCell>}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    );
  };
  const getDashboard = () => {
    return (
      <Container className={"container"}>
        <div className={"dashboard"}>
          <TableContainer className="table" component={Paper}>
            {isAdmin && <TextField
              label="Search"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
            />}
            {!tableData.length && !isLoading ? (
              <NoDataFound message={"No machine data avaialable"} />
            ) : (
              getTable()
            )}
          </TableContainer>
        </div>

        {/* Bar Chart */}
        <div
          style={{ width: "50%", display: "flex", justifyContent: "center" }}
        >
          <TabComponent
            tabs={tabs}
            activeTabIndex={activeTabIndex}
            handleTabChange={handleTabChange}
          />
        </div>
      </Container>
    );
  };
  return isAuthenticated ? getDashboard() : <CircularProgressCentered />;
};

export default Dashboard;
