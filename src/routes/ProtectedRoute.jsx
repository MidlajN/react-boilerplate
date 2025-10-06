// import { Children } from "react";
import { useState } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ children }) => {
    // const { accessToken } = useProvider();
    const [ accessToken, setAccessToken ] = useState()

    if (!accessToken) {
        return <Navigate to={'/login'} replace />
    }
    return <Outlet />
}

export default ProtectedRoute;