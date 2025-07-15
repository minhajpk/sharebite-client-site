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
import ManageRoleRequests from "../Dashboard/AdminDashboard.jsx/ManageRoleRequests";
import RestaurantRoute from "./RestaurantRoute";
import RestaurantProfile from "../Dashboard/RestrurentDashboard/RestaurantProfile";
import AddDonation from "../Dashboard/RestrurentDashboard/AddDonation";
import MyDonations from "../Dashboard/RestrurentDashboard/MyDonation";
import DonationDetails from "../Dashboard/RestrurentDashboard/DonationDetails";
import CharityProfile from "../Dashboard/CharityDashBoard/CharityProfile";
import MyRequests from "../Dashboard/CharityDashBoard/MyRequests";
import ManageDonations from "../Dashboard/AdminDashboard.jsx/ManageDonation";



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

            },
             {
                path: '/donation-details/:id', 
                element: <PrivateRoute><DonationDetails /></PrivateRoute>
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
                path: "transaction-history",
                Component: TransactionHistory
            },
            {
                path: 'manage-user',
                element: <AdminRoute><ManagerUser></ManagerUser></AdminRoute>
            },
            // Admin dashboard route
            {
                path: 'admin-profile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            
            {
                path: 'manage-role-requests',
                element: <AdminRoute><ManageRoleRequests></ManageRoleRequests></AdminRoute>
            },
            {
                path: 'manage-donations',
                element: <AdminRoute><ManageDonations></ManageDonations></AdminRoute>
            },

            // Restaurant Dashboard
            {
                path: 'restaurant-profile',
                Component: RestaurantProfile
            },
            {
                path: 'add-donation',
                Component: AddDonation
            },
            {
                path: 'my-donations',
                Component: MyDonations
            },

            // Charity Dashboard
           {
            path:'charity-profile',
            Component: CharityProfile
           },
           {
            path:'my-requests',
            Component: MyRequests
           }

        ]
    }
]);