import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Select from "react-select"
import { useFormik } from "formik"
import * as Yup from "yup"
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

const NCRTrackerAddUpdate = ({
  open,
  modelData,
  onSaveClick,
  onCancelClick,
}) => {
  useEffect(() => {
    console.log("modal is running...", modelData)
  }, [])

  const data = [
    {
      value: 1,
      label: "cerulean",
    },
    {
      value: 2,
      label: "fuchsia rose",
    },
    {
      value: 3,
      label: "true red",
    },
    {
      value: 4,
      label: "aqua sky",
    },
    {
      value: 5,
      label: "tigerlily",
    },
    {
      value: 6,
      label: "blue turquoise",
    },
  ]

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (modelData && modelData.id) || 0,
      ncrNumber: (modelData && modelData.ncrNumber) || "",
      pdrNumber: (modelData && modelData.pdrNumber) || "",
      woNumber: (modelData && modelData.woNumber) || "",
      dateIssued: (modelData && modelData.dateIssued) || "",
      qcInspector: (modelData && modelData.qcInspector) || "",
      nonConformanceSummary:
        (modelData && modelData.nonConformanceSummary) || "",
      dateCAPDue: (modelData && modelData.dateCAPDue) || "",
      status: (modelData && modelData.status) || "",
      annex: (modelData && modelData.annex) || "",
      specItem: (modelData && modelData.specItem) || "",
      title: (modelData && modelData.title) || "",
      responsiblePerson: (modelData && modelData.responsiblePerson) || "",
      responsibleSub: (modelData && modelData.responsibleSub) || "",
    },
    validationSchema: Yup.object({
      ncrNumber: Yup.string().required("NCR Number is required"),
      pdrNumber: Yup.string().required("PDR Number is required"),
      woNumber: Yup.string().required("WO Number is required"),
      dateIssued: Yup.string().required("Date Issued is required"),
      qcInspector: Yup.string().required("QC Inspector is required"),
      nonConformanceSummary: Yup.string().required(
        "Non Conformance Summary is required"
      ),
      dateCAPDue: Yup.string().required("Date CAP Due is required"),
      status: Yup.string().required("Status is required"),
      annex: Yup.string().required("Annex is required"),
      specItem: Yup.string().required("Spec Item is required"),
      title: Yup.string().required("Title is required"),
      responsiblePerson: Yup.string().required(
        "Responsible Person is required"
      ),
      responsibleSub: Yup.string().required("Responsible Sub is required"),
    }),

    onSubmit: values => {
      if (isEdit) {
        const update = {
          id: modelData ? modelData.id : 0,
          name: values.name,
          title: values.title,
        }
        // update function
        //dispatch(onUpdateDirectoryName(update))
        //call api function....
        validation.resetForm()
      } else {
        const create = {
          name: values["name"],
          title: values["title"],
        }
        // save new function
        //dispatch(onAddNewDirectoryName(create))
        //call api function....
        validation.resetForm()
      }
      //toggle()
    },
  })

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState(3)

  // handle onChange event of the dropdown
  const handleChange = e => {
    setSelectedValue(e.value)
  }

  return (
    <>
      <Modal isOpen={open}>
        <ModalHeader tag="h4">
          {modelData.id > 0 ? "Update NCR Tracker" : "New NCR Tracker"}
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
                    type="text"
                    placeholder="Id"
                    hidden={true}
                    value={validation.values.id || 0}
                  />
                </div>

                <div className="mb-3">
                  <Label className="form-label">NCR Number</Label>
                  <Input
                    id="ncrNumber"
                    name="ncrNumber"
                    type="text"
                    placeholder="NCR Number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.ncrNumber || ""}
                    invalid={
                      validation.touched.ncrNumber &&
                      validation.errors.ncrNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.ncrNumber &&
                  validation.errors.ncrNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.ncrNumber}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">PDR Number</Label>
                  <Input
                    id="pdrNumber"
                    name="pdrNumber"
                    type="text"
                    placeholder="PDR Number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pdrNumber || ""}
                    invalid={
                      validation.touched.pdrNumber &&
                      validation.errors.pdrNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pdrNumber &&
                  validation.errors.pdrNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pdrNumber}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">WO Number</Label>
                  <Input
                    id="woNumber"
                    name="woNumber"
                    type="text"
                    placeholder="WO Number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.woNumber || ""}
                    invalid={
                      validation.touched.woNumber && validation.errors.woNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.woNumber && validation.errors.woNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.woNumber}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Date Issued</Label>
                  <Input
                    id="dateIssued"
                    name="dateIssued"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateIssued || ""}
                    invalid={
                      validation.touched.dateIssued &&
                      validation.errors.dateIssued
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateIssued &&
                  validation.errors.dateIssued ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateIssued}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">QC Inspector</Label>
                  <Input
                    name="qcInspector"
                    type="text"
                    placeholder="QC Inspector"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.qcInspector || ""}
                    invalid={
                      validation.touched.qcInspector &&
                      validation.errors.qcInspector
                        ? true
                        : false
                    }
                  />
                  {validation.touched.qcInspector &&
                  validation.errors.qcInspector ? (
                    <FormFeedback type="invalid">
                      {validation.errors.qcInspector}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Annex</Label>
                  <Select
                    placeholder="Select Annex"
                    value={data.find(obj => obj.value === selectedValue)} // set selected value
                    options={data} // set list of the data
                    onChange={handleChange} // assign onChange function
                  />
                  {validation.touched.annex && validation.errors.annex ? (
                    <FormFeedback type="invalid">
                      {validation.errors.annex}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">PDR Number</Label>
                  <Input
                    name="pdrNumber"
                    type="text"
                    placeholder="PDR Number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pdrNumber || ""}
                    invalid={
                      validation.touched.pdrNumber &&
                      validation.errors.pdrNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pdrNumber &&
                  validation.errors.pdrNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pdrNumber}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">PDR Number</Label>
                  <Input
                    name="pdrNumber"
                    type="text"
                    placeholder="PDR Number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pdrNumber || ""}
                    invalid={
                      validation.touched.pdrNumber &&
                      validation.errors.pdrNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pdrNumber &&
                  validation.errors.pdrNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pdrNumber}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">PDR Number</Label>
                  <Input
                    name="pdrNumber"
                    type="text"
                    placeholder="PDR Number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pdrNumber || ""}
                    invalid={
                      validation.touched.pdrNumber &&
                      validation.errors.pdrNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pdrNumber &&
                  validation.errors.pdrNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pdrNumber}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">PDR Number</Label>
                  <Input
                    name="pdrNumber"
                    type="text"
                    placeholder="PDR Number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pdrNumber || ""}
                    invalid={
                      validation.touched.pdrNumber &&
                      validation.errors.pdrNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pdrNumber &&
                  validation.errors.pdrNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pdrNumber}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">PDR Number</Label>
                  <Input
                    name="pdrNumber"
                    type="text"
                    placeholder="PDR Number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pdrNumber || ""}
                    invalid={
                      validation.touched.pdrNumber &&
                      validation.errors.pdrNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pdrNumber &&
                  validation.errors.pdrNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pdrNumber}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">PDR Number</Label>
                  <Input
                    name="pdrNumber"
                    type="text"
                    placeholder="PDR Number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pdrNumber || ""}
                    invalid={
                      validation.touched.pdrNumber &&
                      validation.errors.pdrNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pdrNumber &&
                  validation.errors.pdrNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pdrNumber}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Title</Label>
                  <Input
                    name="title"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.title || ""}
                    invalid={
                      validation.touched.title && validation.errors.title
                        ? true
                        : false
                    }
                  />
                  {validation.touched.title && validation.errors.title ? (
                    <FormFeedback type="invalid">
                      {validation.errors.title}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <button type="submit" className="btn btn-success">
                    SAVE
                  </button>{" "}
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

NCRTrackerAddUpdate.propTypes = {
  onSaveClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  open: PropTypes.bool,
  modelData: PropTypes.object,
}

export default NCRTrackerAddUpdate
