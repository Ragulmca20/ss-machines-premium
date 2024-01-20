import { FC, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../Firebase/firebase";
import CircularProgressCentered from "../UI/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Firebase/user";
import { selectUser } from "../Store/Auth/AuthSelector";
import { Role, authActions } from "../Store/Auth/AuthSlice";

const PrivateRoute: FC<any> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation()
  const id = useSelector(selectUser).id;
  const getUserDetails = async (id: string) => {
    const userDetails = await getUser(id);
    if(location.pathname.includes("admin") && userDetails?.role !== Role.admin){
      setIsAuthenticated(false);
    }
    dispatch(authActions.saveUserData(userDetails));
  };
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsAuthenticated(true);
        !id && getUserDetails(authUser.uid);
      }
      setIsLoading(false);
    });

    // Cleanup the subscription to avoid memory leaks
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <CircularProgressCentered />;
  return isAuthenticated ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
