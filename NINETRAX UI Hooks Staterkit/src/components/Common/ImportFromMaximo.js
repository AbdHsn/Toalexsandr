import PropTypes from "prop-types"
import React, { useState } from "react"
import * as Yup from "yup"
import { useFormik, Formik } from "formik"
import { importFromMaximo, getSampleExcel } from "../../services/common-service"
import BtnImporting from "../../components/Common/BtnImporting"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import {
  Col,
  Modal,
  ModalBody,
  Row,
  Input,
  FormFeedback,
  Label,
  Form,
} from "reactstrap"

const ImportFromMaximo = ({ show, onCloseClick, onSuccessImported }) => {
  const [importableFile, setImportableFile] = useState(null)
  const [isImporting, setIsImporting] = useState(false)

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      importableFile: null,
    },

    onSubmit: values => {
      if (!importableFile) {
        toastr.warning("Please import file.", "NINETRAX")
        return
      }
      let formData = new FormData()
      formData.append("importFile", importableFile, importableFile.name)

      setIsImporting(true)
      importFromMaximo(formData)
        .then(res => {
          toastr.success(res.data, "NINETRAX")
          setIsImporting(false)
          validation.resetForm()
          onSuccessImported(true)
        })
        .catch(error => {
          setIsImporting(false)
          toastr.error("Failed to process data.", "NINETRAX")
        })
    },
  })

  const onSampleExcelClick = () => {
    console.log("getSampleExcel func called.")
    getSampleExcel()
      .then(res => {
        let downloadLink = document.createElement("a")
        downloadLink.href = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.ms-excel",
          })
        )

        downloadLink.setAttribute("download", "ImportFromMaximoSample.xlsx")
        document.body.appendChild(downloadLink)
        downloadLink.click()

        toastr.success("Sample excel downloaded.", "NINETRAX")
      })
      .catch(error => {
        toastr.error("Failed to get sample excel.", "NINETRAX")
      })
  }

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
                <div className="mb-3 mt-3">
                  <Label className="form-label">Import Excel File </Label>

                  <div className="input-group">
                    <Input
                      id="importFile"
                      name="importFile"
                      type="file"
                      title="Upload Excel File"
                      aria-describedby="inputGroupFileAddon04"
                      aria-label="Upload"
                      accept=".xlsx, .xls, .csv"
                      onChange={event => {
                        setImportableFile(event.target.files[0])
                      }}
                    />

                    <button
                      className="btn btn-outline-info"
                      type="button"
                      id="inputGroupFileAddon04"
                      onClick={() => onSampleExcelClick()}
                    >
                      Get Sample
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  {isImporting === true ? (
                    <BtnImporting isImporting={isImporting} />
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-outline-success w-xs"
                    >
                      <i className="bx bx-import"></i> Import
                    </button>
                  )}{" "}
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={onCloseClick}
                  >
                    Cancel
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </Row>
      </ModalBody>
    </Modal>
  )
}

ImportFromMaximo.propTypes = {
  onCloseClick: PropTypes.func,
  onSuccessImported: PropTypes.func,
  show: PropTypes.bool,
}

export default ImportFromMaximo
