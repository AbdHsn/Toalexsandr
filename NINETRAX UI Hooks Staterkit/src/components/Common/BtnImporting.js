import PropTypes from "prop-types"
import React from "react"
import { Spinner } from "reactstrap"

const BtnImporting = ({ isImporting }) => {
  return (
    <>
      {isImporting === true ? (
        <button type="button" className="btn btn-outline-warning w-xs" disabled>
          <Spinner className="text-danger" animation="border" size="sm" />{" "}
          Importing..
        </button>
      ) : null}
    </>
  )
}

BtnImporting.propTypes = {
  isImporting: PropTypes.bool,
}

export default BtnImporting
