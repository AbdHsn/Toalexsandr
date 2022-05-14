import PropTypes from "prop-types"
import React from "react"
import { Spinner } from "reactstrap"

const BtnProcessing = ({ isProcessing }) => {
  return (
    <>
      {isProcessing === true ? (
        <button type="button" className="btn btn-outline-warning w-xs" disabled>
          <Spinner className="text-danger" animation="border" size="sm" />{" "}
          Processing..
        </button>
      ) : null}
    </>
  )
}

BtnProcessing.propTypes = {
  isProcessing: PropTypes.bool,
}

export default BtnProcessing
