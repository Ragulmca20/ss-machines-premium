import { useSelector } from "react-redux";
import CreateMachineData from "../Machine/CreateMachineData/CreateMachineData";
import { useNavigate } from "react-router";
import CircularProgressCentered from "../../UI/Loader/Loader";
import { selectIsAuthenticated, selectUser } from "../../Store/Auth/AuthSelector";
import { selectLoadingState } from "../../Store/Dashboard/DashboardSelector";

const Home = () => {
    const isLoading = useSelector(selectLoadingState);
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const navigate = useNavigate();
    if (user.isReadOnly) {
        navigate("/dashboard")
    }
    const getPageData = () => {
        return <>
            {isAuthenticated && <CreateMachineData />}
        </>
    }
    return (<>
        {isLoading ? <CircularProgressCentered /> : getPageData()}

    </>)
}
export default Home;