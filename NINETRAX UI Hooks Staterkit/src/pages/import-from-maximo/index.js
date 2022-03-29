import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import { useFormik, Formik } from "formik"
import {
  Col,
  Row,
  Modal,
  ModalBody,
  Input,
  FormFeedback,
  Label,
  Form,
} from "reactstrap"
import { useSelector, useDispatch } from "react-redux"

const ImportFromMaximoModal = ({ show, onCloseClick }) => {
  const [importableFile, setImportableFile] = useState(null)
  const dispatch = useDispatch()
  const SUPPORTED_FORMATS = [
    "application/csv",
    "application/excel",
    "application/vnd.ms-excel",
    "application/vnd.msexcel",
  ]
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      importableFile: null,
    },
    // validationSchema: Yup.object().shape({
    //   importableFile: Yup.mixed()
    //     //.nullable()
    //     // .notRequired()
    //     .required("File is required")
    //     .test(
    //       "FILE_FORMAT",
    //       "File format is not supported",
    //       value => value && SUPPORTED_FORMATS.includes(value.type)
    //     ),
    // }),

    onSubmit: values => {
      console.log("Filessss", importableFile)

      let formData = new FormData()
      formData.append("importFile", importableFile, importableFile.name)

      //dispatch(action.importFromMaximo(formData))
      // validation.resetForm()
    },
  })

  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <Row>
          <Form
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Row form>
              <Col className="col-12">
                <div className="mb-3">
                  <Label className="form-label">Upload Excel File</Label>
                  <Input
                    id="importFile"
                    name="importFile"
                    type="file"
                    title="Upload Excel File"
                    accept=".xlsx, .xls, .csv"
                    onChange={event => {
                      setImportableFile(event.target.files[0])
                    }}
                    // onChange={validation.handleChange}
                    //onBlur={validation.handleBlur}
                    // invalid={
                    //   validation.touched.importFile &&
                    //   validation.errors.importFile
                    //     ? true
                    //     : false
                    // }
                  />
                  {/* {validation.touched.importFile &&
                  validation.errors.importFile ? (
                    <FormFeedback type="invalid">
                      {validation.errors.importFile}
                    </FormFeedback>
                  ) : null} */}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-success save-customer"
                  >
                    Import
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-success btn-lg ms-2"
                // onClick={onImportClick}
              >
                Import
              </button>
              <button
                type="button"
                className="btn btn-danger btn-lg ms-2"
                onClick={onCloseClick}
              >
                Cancel
              </button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

ImportFromMaximoModal.propTypes = {
  onCloseClick: PropTypes.func,
  // onImportClick: PropTypes.func,
  show: PropTypes.any,
}

export default ImportFromMaximoModal
