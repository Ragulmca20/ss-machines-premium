import { useSelector } from "react-redux";
import Login from "../Login/Login";
import CreateMachineData from "../Machine/CreateMachineData/CreateMachineData";
import { useNavigate } from "react-router";
import CircularProgressCentered from "../../UI/Loader/Loader";

const Home = () => {
    const { user, isAuthenticated, isLoading } = useSelector((state: any) => {
        // console.log(state);
        return {
            user: state.auth.user,
            isAuthenticated: state.auth.isAuthenticated,
            isLoading: state.dashboard.isLoading
        }
    })
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