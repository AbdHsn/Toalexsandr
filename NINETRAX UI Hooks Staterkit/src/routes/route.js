import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import LogoutTimer from "../pages/logout-timer/LogoutTimer"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthProtected && !localStorage.getItem("authUser")) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }

      return (
        <Layout>
          <div>
            <Component {...props} />
            <LogoutTimer />
          </div>
        </Layout>
      )
    }
  }
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware;
