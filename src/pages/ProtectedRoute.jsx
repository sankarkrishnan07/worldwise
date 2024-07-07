import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({children}){

    const {isAuthorized} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthorized) navigate("/");
    },[navigate, isAuthorized])

    return isAuthorized ?  children : null;
}

ProtectedRoute.propTypes = {
    children: PropTypes.any,
  };
  