import PropTypes from "prop-types"
import React from "react"
import * as Yup from "yup"
import { useFormik } from "formik"
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
import { addNewImportFromMaximo as onImportFromMaximo } from "store/import-from-maximo/actions"
import { useSelector, useDispatch } from "react-redux"

const ImportFromMaximoModal = ({ show, onImportClick, onCloseClick }) => {
  //const [importFile, setImportFile] = useState(null)
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
      importFile: null,
    },
    // validationSchema: Yup.object().shape({
    //   importFile: Yup.mixed()
    //     //.nullable()
    //     // .notRequired()
    //     .required("File is required")
    //     .test(
    //       "fileFormat",
    //       "File format is not supported",
    //       value => value && SUPPORTED_FORMATS.includes(value.type)
    //     ),
    // }),

    onSubmit: values => {
      // let formData = new FormData();
      // formData.append('file', values.importFile);

      const create = {
        importFile: values["importFile"],
      }
      dispatch(onImportFromMaximo(create))
      validation.resetForm()
      console.log("values", values)
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
                onClick={onImportClick}
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
  onImportClick: PropTypes.func,
  show: PropTypes.any,
}

export default ImportFromMaximoModal
