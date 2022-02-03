import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import DirectoryName from "../pages/DirectoryName/index"
import woInspect from "../pages/work-order-inspections/index"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/directory-name-list", component: DirectoryName },
  { path: "/wo-inspect", component: woInspect },

  // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  // { path: "/dashboard", component: Dashboard },
  // { path: "/directory-name-list", component: DirectoryName },
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { publicRoutes, authProtectedRoutes }
