import {
    createBrowserRouter,

} from "react-router";
import Root from "../Pages/Root";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import RequestCharityRole from "../Dashboard/userDashboard/RequestCharityRole";
import MyProfile from "../Dashboard/userDashboard/MyProfile";
import AllDonationPage from "../Pages/AllDonationPage";
import ManagerUser from "../Dashboard/AdminDashboard.jsx/ManagerUser";
import PrivateRoute from "./PrivateRoute";
import AdminProfile from "../Dashboard/AdminDashboard.jsx/AdminProfile";
import AdminRoute from "./AdminRoute";
import Payment from "../Dashboard/userDashboard/PaymentStripe/Payment";
import TransactionHistory from "../Dashboard/userDashboard/TransactionHistory";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/login",
                Component: Login
            },
            {
                path: "/register",
                Component: Register
            },
            {
                path: "/all-donation",
                element: <PrivateRoute><AllDonationPage></AllDonationPage></PrivateRoute>

            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout> </PrivateRoute>,
        children: [
            {
                path: "request-charity-role",
                Component: RequestCharityRole
            },
            {
                path: "payment/:id",
                element: <Payment></Payment>
            },
            {
                path: "my-profile",
                Component: MyProfile
            },
           {
            path:"transaction-history",
            Component:TransactionHistory
           },
            {
                path: 'manage-user',
                element: <AdminRoute><ManagerUser></ManagerUser></AdminRoute>
            },
            // Admin dashboard route
            {
                path: 'admin-profile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            }

        ]
    }
]);