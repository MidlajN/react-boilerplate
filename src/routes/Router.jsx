import { BrowserRouter as Router, Routes, Route } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<SignUp/>} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Login/>} />
                    <Route path="/dashboard" element={<Login/>}  />
                </Route>
            </Routes>
        </Router>
    )
}
export default AppRoutes;