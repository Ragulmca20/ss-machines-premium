import { onAuthStateChanged } from "@firebase/auth";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import auth from "../Firebase/firebase";
import CircularProgressCentered from "../UI/Loader/Loader";

const PrivateRoute:FC<any> = ( {children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser)
        setIsAuthenticated(true);
      setIsLoading(false);
    });

    // Cleanup the subscription to avoid memory leaks
    return () => unsubscribe();
  }, []);
  
    if(isLoading)
    return <CircularProgressCentered/>
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
export default PrivateRoute;