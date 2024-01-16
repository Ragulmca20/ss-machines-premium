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
  Typography,
} from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getMachineData } from "../../Firebase/machine";
import Container from "../../UI/Container/Container";
import "./Dashboard.css";
import TabComponent from "../../UI/Tab/Tab";
import { useDispatch, useSelector } from "react-redux";
import { Role } from "../../Store/Auth/AuthSlice";
import TableWithSkeletonLoader from "../../UI/Table Skeleton/TableSkeletonLoader";
import { dashboardActions } from "../../Store/Dashboard/DashboardSlice";
import CircularProgressCentered from "../../UI/Loader/Loader";
Chart.register(...registerables);
interface MachineData {
  filePath: string;
  id: string;
  machineValue1: string;
  machineValue2: string;
  userId: string;
}
const Dashboard: React.FC = () => {
  const { machineData, isAdmin, isLoading,isAuthenticated } = useSelector((state: any) => {
    return {
      machineData: state.dashboard.dashboard,
      isAdmin: state.auth.user.role === Role.admin,
      isLoading: state.dashboard.isLoading,
      isAuthenticated: state.auth.isAuthenticated
    }
  });
  const [tableData, setMachineData] = useState<MachineData[]>(machineData);
  // Sample data for the charts
  const chartData = {
    labels: ["Category 1", "Category 2", "Category 3"],
    datasets: [
      {
        label: "Values",
        data: [25, 40, 35],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255,99,132,1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const tabs = [
    {
      label: "Bar Chart",
      content: (
        <div >
          <Bar data={chartData} />
        </div>
      ),
    },
    {
      label: "Pie Chart",
      content: (
        <div >
          <Doughnut data={chartData} />
        </div>
      ),
    },
  ];
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setActiveTabIndex(newIndex)
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dashboardActions.setLoadingState(true));
    const machineData = getMachineData();
    machineData.then(response => {
      console.log(machineData);
      setMachineData(response as unknown as MachineData[]);
      dispatch(dashboardActions.setLoadingState(false));
    });

  }, []);
  const getDashboard = () => {
    return (<Container className={"container"}>
      <div className={"dashboard"}>
        <TableContainer className="table"
          component={Paper}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "550", fontFamily: "Arial" }}>Machine Input 1</TableCell>
                <TableCell style={{ fontWeight: "550", fontFamily: "Arial" }}>Machine Input 2</TableCell>
                <TableCell style={{ fontWeight: "550", fontFamily: "Arial" }}>File URL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ overflowY: 'auto' }} >
              {isLoading ? (<TableWithSkeletonLoader row={6} column={3} />) : tableData.map((row) => (
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Bar Chart */}
      <div style={{ width: "50%", display: "flex", justifyContent: "center" }}>
        <TabComponent tabs={tabs} activeTabIndex={activeTabIndex} handleTabChange={handleTabChange} />
      </div>
    </Container>);
  }
  return (
    isAuthenticated?getDashboard():<CircularProgressCentered/>
  );
};

export default Dashboard;
