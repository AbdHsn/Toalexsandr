import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import Select from "react-select"
import * as moment from "moment"
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  FormFeedback,
  Label,
  Form,
} from "reactstrap"
import {
  newDirectoryNamesAddUpdate,
  editDirectoryNamesAddUpdate,
} from "../../services/directory-names-service"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import BtnSaving from "../../components/Common/BtnSaving"
const DirectoryNamesAddUpdate = ({
  open,
  modelData,
  onSaveClick,
  onCancelClick,
}) => {
  useEffect(() => {
    //set existing selected value
  }, [modelData])

  const [isSaving, setIsSaving] = useState(false)

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (modelData && modelData.id) || 0,
      personName: (modelData && modelData.personName) || "",
      personTitle: (modelData && modelData.personTitle) || "",
      baseOfOperation: (modelData && modelData.baseOfOperation) || "",
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("id is required"),
      // personName: Yup.string().required("personName is required"),
      // personTitle: Yup.string().required("personTitle is required"),
      // baseOfOperation: Yup.string().required("baseOfOperation is required"),
    }),

    onSubmit: values => {
      console.log("add-update save..01", values)

      const submitModel = {
        id: values.id,
        personName: values.personName,
        personTitle: values.personTitle,
        baseOfOperation: values.baseOfOperation,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editDirectoryNamesAddUpdate(submitModel?.id, submitModel)
          .then(res => {
            console.log("submit model create response: ", res)
            if (res.data.id > 0) {
              toastr.success("Data successfully updated.", "NINETRAX")
              setIsSaving(false)
              validation.resetForm()
              onSaveClick(res.data)
              onCancelClick(false)
            } else {
              setIsSaving(false)
              toastr.warning("Failed to update data.", "NINETRAX")
            }
          })
          .catch(error => {
            setIsSaving(false)
            toastr.error("Failed to process data.", "NINETRAX")
          })
      } else {
        setIsSaving(true)
        newDirectoryNamesAddUpdate(submitModel)
          .then(res => {
            console.log("submit model update response: ", res)
            if (res.data.id > 0) {
              toastr.success("Data successfully created.", "NINETRAX")
              setIsSaving(false)
              validation.resetForm()
              onSaveClick(res.data)
              onCancelClick(false)
            } else {
              setIsSaving(false)
              toastr.warning("Failed to create data.", "NINETRAX")
            }
          })
          .catch(error => {
            setIsSaving(false)
            toastr.error("Failed to process data.", "NINETRAX")
          })
      }
    },
  })

  return (
    <>
      <Modal isOpen={open} className="modal-dialog modal-lg">
        <ModalHeader tag="h4">
          {modelData?.id > 0 ? "Update Supervisor" : "New Supervisor"}
        </ModalHeader>
        <ModalBody>
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
                  {/* <Label className="form-label">Id</Label> */}
                  <Input
                    id="id"
                    name="id"
                    type="number"
                    placeholder="Id"
                    hidden={true}
                    defaultValue={validation.values.id || 0}
                  />
                </div>
                <div className="mb-3">
                  <Label className="form-label">Person Name</Label>
                  <Input
                    id="Person Name"
                    name="personName"
                    type="text"
                    placeholder="Person Name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.personName || ""}
                    invalid={
                      validation.touched.personName &&
                      validation.errors.personName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.personName &&
                  validation.errors.personName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.personName}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Person Title</Label>
                  <Input
                    id="Person Title"
                    name="personTitle"
                    type="text"
                    placeholder="Person Title"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.personTitle || ""}
                    invalid={
                      validation.touched.personTitle &&
                      validation.errors.personTitle
                        ? true
                        : false
                    }
                  />
                  {validation.touched.personTitle &&
                  validation.errors.personTitle ? (
                    <FormFeedback type="invalid">
                      {validation.errors.personTitle}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Base Of Operation</Label>
                  <Input
                    id="baseOfOperation"
                    name="baseOfOperation"
                    type="text"
                    placeholder="Base Of Operation"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.baseOfOperation || ""}
                    invalid={
                      validation.touched.baseOfOperation &&
                      validation.errors.baseOfOperation
                        ? true
                        : false
                    }
                  />
                  {validation.touched.baseOfOperation &&
                  validation.errors.baseOfOperation ? (
                    <FormFeedback type="invalid">
                      {validation.errors.baseOfOperation}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  {isSaving === true ? (
                    <BtnSaving isSaving={isSaving} />
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-outline-success w-xs"
                    >
                      <i className="bx bx-save"></i> SAVE
                    </button>
                  )}{" "}
                  <button
                    onClick={() => onCancelClick(false)}
                    type="button"
                    className="btn btn-danger ml-5"
                  >
                    CANCEL
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}

DirectoryNamesAddUpdate.propTypes = {
  onSaveClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  open: PropTypes.bool,
  modelData: PropTypes.object,
}

export default DirectoryNamesAddUpdate
