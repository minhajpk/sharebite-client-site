import {
  createBrowserRouter,
  
} from "react-router";
import Root from "../Pages/Root";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
        {
            path:"/login",
            Component:Login
        },
        {
            path:"/register",
            Component: Register
        }
    ]
  },
  {
    path:"/dashboard",
    Component: DashboardLayout,
    // children:[]
  }
]);