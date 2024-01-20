import { useSelector } from "react-redux";
import CreateMachineData from "../Machine/CreateMachineData/CreateMachineData";
import { useNavigate } from "react-router";
import CircularProgressCentered from "../../UI/Loader/Loader";
import {
  selectUser,
} from "../../Store/Auth/AuthSelector";
import { useEffect } from "react";
import { selectLoadingState } from "../../Store/Dashboard/DashboardSelector";
import { selectIsAuthenticated } from "../../Store/Admin/AdminSlice";

const Home = () => {
  const isLoading = useSelector(selectLoadingState);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.isReadOnly) navigate("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return <>{isLoading || !isAuthenticated ? <CircularProgressCentered /> : <CreateMachineData />}</>;
};
export default Home;
