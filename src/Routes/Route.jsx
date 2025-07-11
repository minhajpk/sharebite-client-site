import {
    createBrowserRouter,

} from "react-router";
import Root from "../Pages/Root";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import RequestCharityRole from "../Dashboard/userDashboard/RequestCharityRole";
import Payment from "../Dashboard/userDashboard/Payment";
import MyProfile from "../Dashboard/userDashboard/MyProfile";


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
            }
        ]
    },
    {
        path: "/dashboard",
        Component: DashboardLayout,
        children: [
            {
                path: "request-charity-role",
                Component: RequestCharityRole
            },
            {
                path: "payment",
                Component: Payment
            },
            {
                path: "my-profile",
                Component: MyProfile
                
            }
        ]
    }
]);