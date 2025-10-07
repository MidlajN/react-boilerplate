// import { Children } from "react";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
const ProtectedRoute = ({ children }) => {
    const { accessToken } = useAuth();

    useEffect(() => {
        console.log(accessToken)
    }, [])

    if (!accessToken) {
        return <Navigate to={'/login'} replace />
    }
    return <Outlet />
}

export default ProtectedRoute;