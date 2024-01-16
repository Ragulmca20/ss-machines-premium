import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute:FC<any> = ( {children }) => {
    const {isAuthenticated} = useSelector((state:any)=>{
        return {isAuthenticated:state.auth.isAuthenticated};
    })
    return isAuthenticated ? children : <Navigate to="/" />;
  };
export default PrivateRoute;