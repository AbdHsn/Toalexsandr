import PropTypes from "prop-types"
import React from "react"
import { Spinner } from "reactstrap"

const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading === true ? (
        <>
          <div className="text-center pt-2">
            <Spinner className="text-danger" animation="border" size="sm" />{" "}
            <label className="text-danger"> Loading...</label>
          </div>
        </>
      ) : null}
    </>
  )
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
}

export default Loader
