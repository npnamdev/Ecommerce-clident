import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/NotFound/index";
import ProtectedRoute from "../components/ProtectedRoute/index";
import Home from "../components/Home/index";
import LoginPage from "../pages/login/index";
import RegisterPage from "../pages/register/index";
import Dashboard from "../pages/admin/dashboard/index";
import UserPage from "../pages/admin/user/index";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";


const Routes = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
            ],
        },
        {
            path: "/admin",
            element: <AdminLayout />,
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
                },
                {
                    path: "user",
                    element: <UserPage />,
                },
            ],
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },
    ]);
};

export default Routes;
