import { BrowserRouter as Router, Routes, Route } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import VerifyEmail from "../pages/VerifyEmail";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Dashboard from "../pages/Dashboard";
import AddProduct from "../pages/AddProduct";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<SignUp/>} />
                <Route path="/verify-email" element={<VerifyEmail/>} />
                

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home/>} />
                    <Route path="/products/:id" element={<Product />} />
                    <Route path="/dashboard" element={<Dashboard/>}  />
                    <Route path="/dashboard/add-product" element={<AddProduct />} />

                </Route>
            </Routes>
        </Router>
    )
}
export default AppRoutes;