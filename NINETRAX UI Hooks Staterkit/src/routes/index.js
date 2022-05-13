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
import NCRTrackersView from "../pages/ncr-trackers-view/index"
import CDRTrackersView from "../pages/cdr-trackers-view/index"
import InspectionDailyReport from "../pages/inspection-daily-report"
import DropDownMenuView from "../pages/dropdown-menu-view/index"
import UserLoginView from "../pages/user-login-view/index"
import DirectoryNamesView from "../pages/directory-names-view/index"
import NamingConventionView from "../pages/naming-convention-view"
import UsersView from "../pages/users-view/index"

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
  { path: "/cdr-trackers", component: CDRTrackersView },
  { path: "/ncr-trackers", component: NCRTrackersView },
  { path: "/menu-options", component: DropDownMenuView },
  { path: "/user-login", component: UserLoginView },
  { path: "/directory-names", component: DirectoryNamesView },
  { path: "/naming-convention", component: NamingConventionView },
  { path: "/user-access", component: UsersView },
  {
    //path: "/inspection-daily-report/:reportType",
    path: "/inspection-daily-report",
    component: InspectionDailyReport,
  },

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
