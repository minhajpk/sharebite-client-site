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
import MyReviews from "../Dashboard/userDashboard/MyReviews";
import ManageRequests from "../Dashboard/AdminDashboard.jsx/ManageRequests";
import FeaturedDonations2 from "../Dashboard/AdminDashboard.jsx/FeatureDonations2";
import RequestedDonations from "../Dashboard/RestrurentDashboard/RequestedDonations";
import Favorites from "../Dashboard/userDashboard/Favorites";
import MyPickups from "../Dashboard/CharityDashBoard/MyPickups";
import ReceivedDonations from "../Dashboard/CharityDashBoard/ReceivedDonations";
import ErrorPage from "../Pages/Errorpage";
import ForbiddenPage from "../Pages/ForbiddenPage";
import DonationStatistics from "../Pages/DonationStatistics";
import UpdateDonation from "../Dashboard/RestrurentDashboard/UpdateDonation";




export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <ErrorPage/>,
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
            },
            {
                path:'/forbidden',
                Component:ForbiddenPage
            },
           
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout> </PrivateRoute>,
        children: [
            {
                path:"home",
                Component: DashboardLayout
            },
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
                path: "my-reviews",
                Component: MyReviews
            },
            {
                path: 'favorite',
                Component: Favorites
            },
            {
                path:'restaurant/statistics',
                Component: DonationStatistics
            },

            // Admin dashboard route
            {
                path: 'admin-profile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'manage-user',
                element: <AdminRoute><ManagerUser></ManagerUser></AdminRoute>
            },

            {
                path: 'manage-role-requests',
                element: <AdminRoute><ManageRoleRequests></ManageRoleRequests></AdminRoute>
            },
            {
                path: 'manage-donations',
                element: <AdminRoute><ManageDonations></ManageDonations></AdminRoute>
            },
            {
                path: 'manage-requests',
                element:<AdminRoute><ManageDonations></ManageDonations></AdminRoute>
            },
            {
                path: 'feature-donations',
                element:<AdminRoute><FeaturedDonations2></FeaturedDonations2></AdminRoute>
            },

            // Restaurant Dashboard
            {
                path: 'restaurant-profile',
               element: <RestaurantRoute><RestaurantProfile></RestaurantProfile></RestaurantRoute>
            },
            {
                path: 'add-donation',
                element:<RestaurantRoute><AddDonation></AddDonation></RestaurantRoute>
            },
            {
                path: 'my-donations',
                element: <RestaurantRoute><MyDonations></MyDonations></RestaurantRoute>
            },
            {
                path: 'requested-donations',
                element:<RestaurantRoute><RequestedDonations></RequestedDonations></RestaurantRoute>

            },
            {
                path:"update-donation/:id",
                Component: UpdateDonation

            },

            // Charity Dashboard
            {
                path: 'charity-profile',
                element:<charityRoute><CharityProfile></CharityProfile></charityRoute>
            },
            {
                path: 'my-requests',
                element:<charityRoute><MyRequests></MyRequests></charityRoute>
            },
            {
                path:'my-pickups',
                element:<charityRoute><MyPickups></MyPickups></charityRoute>
            },
            {
                path:'received-donations',
               element: <charityRoute><ReceivedDonations></ReceivedDonations></charityRoute>
            }

        ]
    }
]);