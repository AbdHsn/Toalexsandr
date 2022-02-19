import PropTypes from "prop-types"
import React from "react"
import { Spinner } from "reactstrap"

const BtnSaving = ({ isSaving }) => {
  return (
    <>
      {isSaving === true ? (
        <button type="button" className="btn btn-outline-warning w-xs" disabled>
          <Spinner className="text-danger" animation="border" size="sm" />{" "}
          Saving..
        </button>
      ) : null}
    </>
  )
}

BtnSaving.propTypes = {
  isSaving: PropTypes.bool,
}

export default BtnSaving
