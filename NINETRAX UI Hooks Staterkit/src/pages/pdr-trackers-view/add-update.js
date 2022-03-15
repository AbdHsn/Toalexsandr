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
  newPDRTrackerAddUpdate,
  editPDRTrackerAddUpdate,
} from "../../services/pdr-trackers-service"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import BtnSaving from "../../components/Common/BtnSaving"
const PDRTrackerAddUpdate = ({
  open,
  modelData,
  onSaveClick,
  onCancelClick,
}) => {
  useEffect(() => {
    console.log("modal is running...", modelData)
  }, [])

  const [isSaving, setIsSaving] = useState(false)

  const [_inspectionFailReasoSelected, set_inspectionFailReasoSelected] =
    useState(null)
  const [_inspectionFailReasoSelectItems, set_inspectionFailReasoSelectItems] =
    useState([])
  const [_qcInspectorSelected, set_qcInspectorSelected] = useState(null)
  const [_qcInspectorSelectItems, set_qcInspectorSelectItems] = useState([])
  const [_surveillanceTypeSelected, set_surveillanceTypeSelected] =
    useState(null)
  const [_surveillanceTypeSelectItems, set_surveillanceTypeSelectItems] =
    useState([])
  const [_surveillanceResultsSelected, set_surveillanceResultsSelected] =
    useState(null)
  const [_surveillanceResultsSelectItems, set_surveillanceResultsSelectItems] =
    useState([])
  const [_closedBySelected, set_closedBySelected] = useState(null)
  const [_closedBySelectItems, set_closedBySelectItems] = useState([])
  const [_causeCodeSelected, set_causeCodeSelected] = useState(null)
  const [_causeCodeSelectItems, set_causeCodeSelectItems] = useState([])
  const [_rootCauseSelected, set_rootCauseSelected] = useState(null)
  const [_rootCauseSelectItems, set_rootCauseSelectItems] = useState([])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (modelData && modelData.id) || 0,
      pdrnumber: (modelData && modelData.pdrnumber) || "",
      workOrder: (modelData && modelData.workOrder) || "",
      location: (modelData && modelData.location) || "",
      inspectionFailReaso: (modelData && modelData.inspectionFailReaso) || "",
      qcInspector: (modelData && modelData.qcInspector) || "",
      surveillanceType: (modelData && modelData.surveillanceType) || "",
      surveillanceResults: (modelData && modelData.surveillanceResults) || "",
      dateStarted:
        (modelData &&
          modelData?.dateStarted &&
          moment(modelData?.dateStarted).format("YYYY-MM-DD")) ||
        null,
      dateCompleted:
        (modelData &&
          modelData?.dateCompleted &&
          moment(modelData?.dateCompleted).format("YYYY-MM-DD")) ||
        null,
      dateIssued:
        (modelData &&
          modelData?.dateIssued &&
          moment(modelData?.dateIssued).format("YYYY-MM-DD")) ||
        null,
      dateDue:
        (modelData &&
          modelData?.dateDue &&
          moment(modelData?.dateDue).format("YYYY-MM-DD")) ||
        null,
      dateReinspected:
        (modelData &&
          modelData?.dateReinspected &&
          moment(modelData?.dateReinspected).format("YYYY-MM-DD")) ||
        null,
      descriptionOfInspection:
        (modelData && modelData.descriptionOfInspection) || "",
      fmResponse: (modelData && modelData.fmResponse) || "",
      qcComments: (modelData && modelData.qcComments) || "",
      closedBy: (modelData && modelData.closedBy) || "",
      dateClosed:
        (modelData &&
          modelData?.dateClosed &&
          moment(modelData?.dateClosed).format("YYYY-MM-DD")) ||
        null,
      qcComments2: (modelData && modelData.qcComments2) || "",
      causeCode: (modelData && modelData.causeCode) || "",
      rootCause: (modelData && modelData.rootCause) || "",
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("id is required"),
      // pdrnumber: Yup.string().required("pdrnumber is required"),
      // workOrder: Yup.string().required("workOrder is required"),
      // location: Yup.string().required("location is required"),
      // inspectionFailReaso: Yup.string().required("inspectionFailReaso is required"),
      // qcInspector: Yup.string().required("qcInspector is required"),
      // surveillanceType: Yup.string().required("surveillanceType is required"),
      // surveillanceResults: Yup.string().required("surveillanceResults is required"),
      // dateStarted: Yup.string().required("dateStarted is required"),
      // dateCompleted: Yup.string().required("dateCompleted is required"),
      // dateIssued: Yup.string().required("dateIssued is required"),
      // dateDue: Yup.string().required("dateDue is required"),
      // dateReinspected: Yup.string().required("dateReinspected is required"),
      // descriptionOfInspection: Yup.string().required("descriptionOfInspection is required"),
      // fmResponse: Yup.string().required("fmResponse is required"),
      // qcComments: Yup.string().required("qcComments is required"),
      // closedBy: Yup.string().required("closedBy is required"),
      // dateClosed: Yup.string().required("dateClosed is required"),
      // qcComments2: Yup.string().required("qcComments2 is required"),
      // causeCode: Yup.string().required("causeCode is required"),
      // rootCause: Yup.string().required("rootCause is required"),
    }),

    onSubmit: values => {
      console.log("add-update save..01", values)

      const submitModel = {
        id: values.id,
        pdrnumber: values.pdrnumber,
        workOrder: values.workOrder,
        location: values.location,
        inspectionFailReaso: _inspectionFailReasoSelected,
        qcInspector: _qcInspectorSelected,
        surveillanceType: _surveillanceTypeSelected,
        surveillanceResults: _surveillanceResultsSelected,
        dateStarted: values.dateStarted,
        dateCompleted: values.dateCompleted,
        dateIssued: values.dateIssued,
        dateDue: values.dateDue,
        dateReinspected: values.dateReinspected,
        descriptionOfInspection: values.descriptionOfInspection,
        fmResponse: values.fmResponse,
        qcComments: values.qcComments,
        closedBy: _closedBySelected,
        dateClosed: values.dateClosed,
        qcComments2: values.qcComments2,
        causeCode: _causeCodeSelected,
        rootCause: _rootCauseSelected,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editPDRTrackerAddUpdate(submitModel)
          .then(res => {
            console.log("submit model create response: ", res)
            if (res.data.id > 0) {
              toastr.success("Data successfully saved.", "NINETRAX")
              setIsSaving(false)
              validation.resetForm()
              onSaveClick(res.data)
              onCancelClick(false)
            } else {
              setIsSaving(false)
              toastr.warning("Failed to save data.", "NINETRAX")
            }
          })
          .catch(error => {
            setIsSaving(false)
            toastr.error("Failed to process data.", "NINETRAX")
          })
      } else {
        setIsSaving(true)
        newPDRTrackerAddUpdate(submitModel)
          .then(res => {
            console.log("submit model update response: ", res)
            if (res.data.id > 0) {
              toastr.success("Data successfully saved.", "NINETRAX")
              setIsSaving(false)
              validation.resetForm()
              onSaveClick(res.data)
              onCancelClick(false)
            } else {
              setIsSaving(false)
              toastr.warning("Failed to save data.", "NINETRAX")
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
      <Modal isOpen={open}>
        <ModalHeader tag="h4">
          {modelData?.id > 0
            ? "Update PDRTrackerAddUpdate"
            : "New PDRTrackerAddUpdate"}
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
                  <Label className="form-label">pdrnumber</Label>
                  <Input
                    id="pdrnumber"
                    name="pdrnumber"
                    type="text"
                    placeholder="pdrnumber"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pdrnumber || ""}
                    invalid={
                      validation.touched.pdrnumber &&
                      validation.errors.pdrnumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pdrnumber &&
                  validation.errors.pdrnumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pdrnumber}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">workOrder</Label>
                  <Input
                    id="workOrder"
                    name="workOrder"
                    type="text"
                    placeholder="workOrder"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.workOrder || ""}
                    invalid={
                      validation.touched.workOrder &&
                      validation.errors.workOrder
                        ? true
                        : false
                    }
                  />
                  {validation.touched.workOrder &&
                  validation.errors.workOrder ? (
                    <FormFeedback type="invalid">
                      {validation.errors.workOrder}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">location</Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="location"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.location || ""}
                    invalid={
                      validation.touched.location && validation.errors.location
                        ? true
                        : false
                    }
                  />
                  {validation.touched.location && validation.errors.location ? (
                    <FormFeedback type="invalid">
                      {validation.errors.location}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>inspectionFailReaso</Label>
                  <Select
                    id="inspectionFailReaso"
                    name="inspectionFailReaso"
                    type="text"
                    onChange={e => {
                      set_inspectionFailReasoSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_inspectionFailReasoSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select inspectionFailReaso"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.inspectionFailReaso &&
                  validation.errors.inspectionFailReaso ? (
                    <FormFeedback type="invalid">
                      {validation.errors.inspectionFailReaso}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>qcInspector</Label>
                  <Select
                    id="qcInspector"
                    name="qcInspector"
                    type="text"
                    onChange={e => {
                      set_qcInspectorSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_qcInspectorSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select qcInspector"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.qcInspector &&
                  validation.errors.qcInspector ? (
                    <FormFeedback type="invalid">
                      {validation.errors.qcInspector}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>surveillanceType</Label>
                  <Select
                    id="surveillanceType"
                    name="surveillanceType"
                    type="text"
                    onChange={e => {
                      set_surveillanceTypeSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_surveillanceTypeSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select surveillanceType"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.surveillanceType &&
                  validation.errors.surveillanceType ? (
                    <FormFeedback type="invalid">
                      {validation.errors.surveillanceType}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>surveillanceResults</Label>
                  <Select
                    id="surveillanceResults"
                    name="surveillanceResults"
                    type="text"
                    onChange={e => {
                      set_surveillanceResultsSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_surveillanceResultsSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select surveillanceResults"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.surveillanceResults &&
                  validation.errors.surveillanceResults ? (
                    <FormFeedback type="invalid">
                      {validation.errors.surveillanceResults}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">dateStarted</Label>
                  <Input
                    id="dateStarted"
                    name="dateStarted"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateStarted"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateStarted || ""}
                    invalid={
                      validation.touched.dateStarted &&
                      validation.errors.dateStarted
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateStarted &&
                  validation.errors.dateStarted ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateStarted}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">dateCompleted</Label>
                  <Input
                    id="dateCompleted"
                    name="dateCompleted"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateCompleted"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateCompleted || ""}
                    invalid={
                      validation.touched.dateCompleted &&
                      validation.errors.dateCompleted
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateCompleted &&
                  validation.errors.dateCompleted ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateCompleted}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">dateIssued</Label>
                  <Input
                    id="dateIssued"
                    name="dateIssued"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateIssued"
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
                  <Label className="form-label">dateDue</Label>
                  <Input
                    id="dateDue"
                    name="dateDue"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateDue"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateDue || ""}
                    invalid={
                      validation.touched.dateDue && validation.errors.dateDue
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateDue && validation.errors.dateDue ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateDue}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">dateReinspected</Label>
                  <Input
                    id="dateReinspected"
                    name="dateReinspected"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateReinspected"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateReinspected || ""}
                    invalid={
                      validation.touched.dateReinspected &&
                      validation.errors.dateReinspected
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateReinspected &&
                  validation.errors.dateReinspected ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateReinspected}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">descriptionOfInspection</Label>
                  <Input
                    id="descriptionOfInspection"
                    name="descriptionOfInspection"
                    type="text"
                    placeholder="descriptionOfInspection"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.descriptionOfInspection || ""}
                    invalid={
                      validation.touched.descriptionOfInspection &&
                      validation.errors.descriptionOfInspection
                        ? true
                        : false
                    }
                  />
                  {validation.touched.descriptionOfInspection &&
                  validation.errors.descriptionOfInspection ? (
                    <FormFeedback type="invalid">
                      {validation.errors.descriptionOfInspection}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">fmResponse</Label>
                  <Input
                    id="fmResponse"
                    name="fmResponse"
                    type="text"
                    placeholder="fmResponse"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.fmResponse || ""}
                    invalid={
                      validation.touched.fmResponse &&
                      validation.errors.fmResponse
                        ? true
                        : false
                    }
                  />
                  {validation.touched.fmResponse &&
                  validation.errors.fmResponse ? (
                    <FormFeedback type="invalid">
                      {validation.errors.fmResponse}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">qcComments</Label>
                  <Input
                    id="qcComments"
                    name="qcComments"
                    type="text"
                    placeholder="qcComments"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.qcComments || ""}
                    invalid={
                      validation.touched.qcComments &&
                      validation.errors.qcComments
                        ? true
                        : false
                    }
                  />
                  {validation.touched.qcComments &&
                  validation.errors.qcComments ? (
                    <FormFeedback type="invalid">
                      {validation.errors.qcComments}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>closedBy</Label>
                  <Select
                    id="closedBy"
                    name="closedBy"
                    type="text"
                    onChange={e => {
                      set_closedBySelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_closedBySelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select closedBy"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.closedBy && validation.errors.closedBy ? (
                    <FormFeedback type="invalid">
                      {validation.errors.closedBy}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">dateClosed</Label>
                  <Input
                    id="dateClosed"
                    name="dateClosed"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateClosed"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateClosed || ""}
                    invalid={
                      validation.touched.dateClosed &&
                      validation.errors.dateClosed
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateClosed &&
                  validation.errors.dateClosed ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateClosed}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">qcComments2</Label>
                  <Input
                    id="qcComments2"
                    name="qcComments2"
                    type="textarea"
                    placeholder="qcComments2"
                    maxLength="225"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.qcComments2 || ""}
                    invalid={
                      validation.touched.qcComments2 &&
                      validation.errors.qcComments2
                        ? true
                        : false
                    }
                  />
                  {validation.touched.qcComments2 &&
                  validation.errors.qcComments2 ? (
                    <FormFeedback type="invalid">
                      {validation.errors.qcComments2}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>causeCode</Label>
                  <Select
                    id="causeCode"
                    name="causeCode"
                    type="text"
                    onChange={e => {
                      set_causeCodeSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_causeCodeSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select causeCode"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.causeCode &&
                  validation.errors.causeCode ? (
                    <FormFeedback type="invalid">
                      {validation.errors.causeCode}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>rootCause</Label>
                  <Select
                    id="rootCause"
                    name="rootCause"
                    type="text"
                    onChange={e => {
                      set_rootCauseSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_rootCauseSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select rootCause"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.rootCause &&
                  validation.errors.rootCause ? (
                    <FormFeedback type="invalid">
                      {validation.errors.rootCause}
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

PDRTrackerAddUpdate.propTypes = {
  onSaveClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  open: PropTypes.bool,
  modelData: PropTypes.object,
}

export default PDRTrackerAddUpdate
