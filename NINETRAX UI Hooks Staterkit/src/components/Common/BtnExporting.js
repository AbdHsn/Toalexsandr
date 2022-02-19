import PropTypes from "prop-types"
import React from "react"
import { Spinner } from "reactstrap"

const BtnExporting = ({ isExporting }) => {
  return (
    <>
      {isExporting === true ? (
        <button type="button" className="btn btn-outline-warning w-xs" disabled>
          <Spinner className="text-danger" animation="border" size="sm" />{" "}
          Exporting..
        </button>
      ) : null}
    </>
  )
}

BtnExporting.propTypes = {
  isExporting: PropTypes.bool,
}

export default BtnExporting
