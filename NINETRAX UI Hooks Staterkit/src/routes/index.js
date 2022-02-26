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
import PDRTrackersView from "../pages/pdr-trackers-view/index"
import IDIQTrackersView from "../pages/idiq-trackers-view/index"
import PAWTrackersView from "../pages/paw-trackers-view/index"
import CCRTrackersView from "../pages/ccr-trackers-view/index"
//import NCRTrackersView from "../pages/ncr-trackers-view/index"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/directory-name-list", component: DirectoryName },
  { path: "/wo-inspect", component: woInspect },
  { path: "/pdr-trackers", component: PDRTrackersView },
  { path: "/idiq-trackers", component: IDIQTrackersView },
  { path: "/paw-trackers", component: PAWTrackersView },
  { path: "/ccr-trackers", component: CCRTrackersView },
  //{ path: "/ncr-trackers", component: NCRTrackersView },

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
