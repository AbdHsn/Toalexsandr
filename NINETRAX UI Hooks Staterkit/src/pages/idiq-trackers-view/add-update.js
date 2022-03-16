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
  newIDIQTrackerAddUpdate,
  editIDIQTrackerAddUpdate,
} from "../../services/idiq-trackers-service"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import BtnSaving from "../../components/Common/BtnSaving"
const IDIQTrackerAddUpdate = ({
  open,
  modelData,
  onSaveClick,
  onCancelClick,
}) => {
  useEffect(() => {
    //set existing selected value
    modelData && modelData?.woType != null
      ? set_woTypeSelected({ label: modelData?.woType, value: "" })
      : set_woTypeSelected("")

    modelData && modelData?.estimator != null
      ? set_estimatorSelected({ label: modelData?.estimator, value: "" })
      : set_estimatorSelected("")

    modelData && modelData?.taskCompleted != null
      ? set_taskCompletedSelected({
          label: modelData?.taskCompleted,
          value: "",
        })
      : set_taskCompletedSelected("")

    modelData && modelData?.taskCompletedOnTime != null
      ? set_taskCompletedOnTimeSelected({
          label: modelData?.taskCompletedOnTime,
          value: "",
        })
      : set_taskCompletedOnTimeSelected("")

    modelData && modelData?.closedBy != null
      ? set_closedBySelected({ label: modelData?.closedBy, value: "" })
      : set_closedBySelected("")

    modelData && modelData?.verifiedBy != null
      ? set_verifiedBySelected({ label: modelData?.verifiedBy, value: "" })
      : set_verifiedBySelected("")

    modelData && modelData?.parAssigned != null
      ? set_parAssignedSelected({ label: modelData?.parAssigned, value: "" })
      : set_parAssignedSelected("")

    modelData && modelData?.subcontractorInHouse != null
      ? set_subcontractorInHouseSelected({
          label: modelData?.subcontractorInHouse,
          value: "",
        })
      : set_subcontractorInHouseSelected("")

    modelData && modelData?.causeCode != null
      ? set_causeCodeSelected({ label: modelData?.causeCode, value: "" })
      : set_causeCodeSelected("")

    modelData && modelData?.rootCause != null
      ? set_rootCauseSelected({ label: modelData?.rootCause, value: "" })
      : set_rootCauseSelected("")
  }, [modelData])

  const [isSaving, setIsSaving] = useState(false)

  const [_woTypeSelected, set_woTypeSelected] = useState("")
  const [_woTypeSelectItems, set_woTypeSelectItems] = useState([])
  const [_estimatorSelected, set_estimatorSelected] = useState("")
  const [_estimatorSelectItems, set_estimatorSelectItems] = useState([])
  const [_taskCompletedSelected, set_taskCompletedSelected] = useState("")
  const [_taskCompletedSelectItems, set_taskCompletedSelectItems] = useState([
    { value: "YES", label: "YES" },
    { value: "NO", label: "NO" },
  ])
  const [_taskCompletedOnTimeSelected, set_taskCompletedOnTimeSelected] =
    useState("")
  const [_taskCompletedOnTimeSelectItems, set_taskCompletedOnTimeSelectItems] =
    useState([
      { value: "ON TIME", label: "ON TIME" },
      { value: "LATE", label: "LATE" },
    ])
  const [_closedBySelected, set_closedBySelected] = useState("")
  const [_closedBySelectItems, set_closedBySelectItems] = useState([])
  const [_verifiedBySelected, set_verifiedBySelected] = useState("")
  const [_verifiedBySelectItems, set_verifiedBySelectItems] = useState([])
  const [_parAssignedSelected, set_parAssignedSelected] = useState("")
  const [_parAssignedSelectItems, set_parAssignedSelectItems] = useState([])
  const [_subcontractorInHouseSelected, set_subcontractorInHouseSelected] =
    useState("")
  const [
    _subcontractorInHouseSelectItems,
    set_subcontractorInHouseSelectItems,
  ] = useState([])
  const [_causeCodeSelected, set_causeCodeSelected] = useState("")
  const [_causeCodeSelectItems, set_causeCodeSelectItems] = useState([])
  const [_rootCauseSelected, set_rootCauseSelected] = useState("")
  const [_rootCauseSelectItems, set_rootCauseSelectItems] = useState([])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (modelData && modelData.id) || 0,
      woNumber: (modelData && modelData.woNumber) || "",
      woType: (modelData && modelData.woType) || "",
      woLocation: (modelData && modelData.woLocation) || "",
      estimator: (modelData && modelData.estimator) || "",
      idiqWorkOrderDescription:
        (modelData && modelData.idiqWorkOrderDescription) || "",
      approvedStartDate:
        (modelData &&
          modelData?.approvedStartDate &&
          moment(modelData?.approvedStartDate).format("YYYY-MM-DD")) ||
        null,
      approvedEndDate:
        (modelData &&
          modelData?.approvedEndDate &&
          moment(modelData?.approvedEndDate).format("YYYY-MM-DD")) ||
        null,
      actualCompletionDate:
        (modelData &&
          modelData?.actualCompletionDate &&
          moment(modelData?.actualCompletionDate).format("YYYY-MM-DD")) ||
        null,
      taskCompleted: (modelData && modelData.taskCompleted) || "",
      taskCompletedOnTime: (modelData && modelData.taskCompletedOnTime) || "",
      qcReceivedDate:
        (modelData &&
          modelData?.qcReceivedDate &&
          moment(modelData?.qcReceivedDate).format("YYYY-MM-DD")) ||
        null,
      closedBy: (modelData && modelData.closedBy) || "",
      qcInspectionComplete:
        (modelData &&
          modelData?.qcInspectionComplete &&
          moment(modelData?.qcInspectionComplete).format("YYYY-MM-DD")) ||
        null,
      verifiedBy: (modelData && modelData.verifiedBy) || "",
      parAssigned: (modelData && modelData.parAssigned) || "",
      dateSentToPar:
        (modelData &&
          modelData?.dateSentToPar &&
          moment(modelData?.dateSentToPar).format("YYYY-MM-DD")) ||
        null,
      dateReceivedFromPar:
        (modelData &&
          modelData?.dateReceivedFromPar &&
          moment(modelData?.dateReceivedFromPar).format("YYYY-MM-DD")) ||
        null,
      dateSentToWorkControl:
        (modelData &&
          modelData?.dateSentToWorkControl &&
          moment(modelData?.dateSentToWorkControl).format("YYYY-MM-DD")) ||
        null,
      subcontractorInHouse: (modelData && modelData.subcontractorInHouse) || "",
      subcontractorName: (modelData && modelData.subcontractorName) || "",
      dateWoWasClosed:
        (modelData &&
          modelData?.dateWoWasClosed &&
          moment(modelData?.dateWoWasClosed).format("YYYY-MM-DD")) ||
        null,
      woStatus: (modelData && modelData.woStatus) || "",
      comments: (modelData && modelData.comments) || "",
      unsatNotes: (modelData && modelData.unsatNotes) || "",
      causeCode: (modelData && modelData.causeCode) || "",
      rootCause: (modelData && modelData.rootCause) || "",
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("id is required"),
      // woNumber: Yup.string().required("woNumber is required"),
      // woType: Yup.string().required("woType is required"),
      // woLocation: Yup.string().required("woLocation is required"),
      // estimator: Yup.string().required("estimator is required"),
      // idiqWorkOrderDescription: Yup.string().required("idiqWorkOrderDescription is required"),
      // approvedStartDate: Yup.string().required("approvedStartDate is required"),
      // approvedEndDate: Yup.string().required("approvedEndDate is required"),
      // actualCompletionDate: Yup.string().required("actualCompletionDate is required"),
      // taskCompleted: Yup.string().required("taskCompleted is required"),
      // taskCompletedOnTime: Yup.string().required("taskCompletedOnTime is required"),
      // qcReceivedDate: Yup.string().required("qcReceivedDate is required"),
      // closedBy: Yup.string().required("closedBy is required"),
      // qcInspectionComplete: Yup.string().required("qcInspectionComplete is required"),
      // verifiedBy: Yup.string().required("verifiedBy is required"),
      // parAssigned: Yup.string().required("parAssigned is required"),
      // dateSentToPar: Yup.string().required("dateSentToPar is required"),
      // dateReceivedFromPar: Yup.string().required("dateReceivedFromPar is required"),
      // dateSentToWorkControl: Yup.string().required("dateSentToWorkControl is required"),
      // subcontractorInHouse: Yup.string().required("subcontractorInHouse is required"),
      // subcontractorName: Yup.string().required("subcontractorName is required"),
      // dateWoWasClosed: Yup.string().required("dateWoWasClosed is required"),
      // woStatus: Yup.string().required("woStatus is required"),
      // comments: Yup.string().required("comments is required"),
      // unsatNotes: Yup.string().required("unsatNotes is required"),
      // causeCode: Yup.string().required("causeCode is required"),
      // rootCause: Yup.string().required("rootCause is required"),
    }),

    onSubmit: values => {
      console.log("add-update save..01", values)

      const submitModel = {
        id: values.id,
        woNumber: values.woNumber,
        woType: _woTypeSelected.value,
        woLocation: values.woLocation,
        estimator: _estimatorSelected.value,
        idiqWorkOrderDescription: values.idiqWorkOrderDescription,
        approvedStartDate: values.approvedStartDate,
        approvedEndDate: values.approvedEndDate,
        actualCompletionDate: values.actualCompletionDate,
        taskCompleted: _taskCompletedSelected.value,
        taskCompletedOnTime: _taskCompletedOnTimeSelected.value,
        qcReceivedDate: values.qcReceivedDate,
        closedBy: _closedBySelected.value,
        qcInspectionComplete: values.qcInspectionComplete,
        verifiedBy: _verifiedBySelected.value,
        parAssigned: _parAssignedSelected.value,
        dateSentToPar: values.dateSentToPar,
        dateReceivedFromPar: values.dateReceivedFromPar,
        dateSentToWorkControl: values.dateSentToWorkControl,
        subcontractorInHouse: _subcontractorInHouseSelected.value,
        subcontractorName: values.subcontractorName,
        dateWoWasClosed: values.dateWoWasClosed,
        woStatus: values.woStatus,
        comments: values.comments,
        unsatNotes: values.unsatNotes,
        causeCode: _causeCodeSelected.value,
        rootCause: _rootCauseSelected.value,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editIDIQTrackerAddUpdate(submitModel)
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
        newIDIQTrackerAddUpdate(submitModel)
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
          {modelData?.id > 0 ? "Update IDIQ Tracker" : "New IDIQ Tracker"}
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
                  <Label className="form-label">WO Number</Label>
                  <Input
                    id="woNumber"
                    name="woNumber"
                    type="text"
                    placeholder="woNumber"
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
                  <Label>WO Type</Label>
                  <Select
                    id="woType"
                    name="woType"
                    type="text"
                    onChange={e => {
                      set_woTypeSelected({
                        label: e.label,
                        value: e.value,
                      })
                    }}
                    onBlur={validation.handleBlur}
                    options={_woTypeSelectItems}
                    defaultValue={_woTypeSelected}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select woType"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.woType && validation.errors.woType ? (
                    <FormFeedback type="invalid">
                      {validation.errors.woType}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">WO Location</Label>
                  <Input
                    id="woLocation"
                    name="woLocation"
                    type="text"
                    placeholder="woLocation"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.woLocation || ""}
                    invalid={
                      validation.touched.woLocation &&
                      validation.errors.woLocation
                        ? true
                        : false
                    }
                  />
                  {validation.touched.woLocation &&
                  validation.errors.woLocation ? (
                    <FormFeedback type="invalid">
                      {validation.errors.woLocation}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>Estimator</Label>
                  <Select
                    id="estimator"
                    name="estimator"
                    type="text"
                    onChange={e => {
                      set_estimatorSelected({
                        label: e.label,
                        value: e.value,
                      })
                    }}
                    onBlur={validation.handleBlur}
                    options={_estimatorSelectItems}
                    defaultValue={_estimatorSelected}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select estimator"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.estimator &&
                  validation.errors.estimator ? (
                    <FormFeedback type="invalid">
                      {validation.errors.estimator}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">IDIQ SOW</Label>
                  <Input
                    id="idiqWorkOrderDescription"
                    name="idiqWorkOrderDescription"
                    type="textarea"
                    placeholder="idiqWorkOrderDescription"
                    maxLength="225"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.idiqWorkOrderDescription || ""}
                    invalid={
                      validation.touched.idiqWorkOrderDescription &&
                      validation.errors.idiqWorkOrderDescription
                        ? true
                        : false
                    }
                  />
                  {validation.touched.idiqWorkOrderDescription &&
                  validation.errors.idiqWorkOrderDescription ? (
                    <FormFeedback type="invalid">
                      {validation.errors.idiqWorkOrderDescription}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Target Start</Label>
                  <Input
                    id="approvedStartDate"
                    name="approvedStartDate"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="approvedStartDate"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.approvedStartDate || ""}
                    invalid={
                      validation.touched.approvedStartDate &&
                      validation.errors.approvedStartDate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.approvedStartDate &&
                  validation.errors.approvedStartDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.approvedStartDate}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Target End</Label>
                  <Input
                    id="approvedEndDate"
                    name="approvedEndDate"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="approvedEndDate"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.approvedEndDate || ""}
                    invalid={
                      validation.touched.approvedEndDate &&
                      validation.errors.approvedEndDate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.approvedEndDate &&
                  validation.errors.approvedEndDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.approvedEndDate}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Actual Date</Label>
                  <Input
                    id="actualCompletionDate"
                    name="actualCompletionDate"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="actualCompletionDate"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.actualCompletionDate || ""}
                    invalid={
                      validation.touched.actualCompletionDate &&
                      validation.errors.actualCompletionDate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.actualCompletionDate &&
                  validation.errors.actualCompletionDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.actualCompletionDate}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>Done (YES/NO)</Label>
                  <Select
                    id="taskCompleted"
                    name="taskCompleted"
                    type="text"
                    onChange={e => {
                      set_taskCompletedSelected({
                        label: e.label,
                        value: e.value,
                      })
                    }}
                    onBlur={validation.handleBlur}
                    options={_taskCompletedSelectItems}
                    defaultValue={_taskCompletedSelected}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select taskCompleted"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.taskCompleted &&
                  validation.errors.taskCompleted ? (
                    <FormFeedback type="invalid">
                      {validation.errors.taskCompleted}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>On Time</Label>
                  <Select
                    id="taskCompletedOnTime"
                    name="taskCompletedOnTime"
                    type="text"
                    onChange={e => {
                      set_taskCompletedOnTimeSelected({
                        label: e.label,
                        value: e.value,
                      })
                    }}
                    onBlur={validation.handleBlur}
                    options={_taskCompletedOnTimeSelectItems}
                    defaultValue={_taskCompletedOnTimeSelected}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select taskCompletedOnTime"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.taskCompletedOnTime &&
                  validation.errors.taskCompletedOnTime ? (
                    <FormFeedback type="invalid">
                      {validation.errors.taskCompletedOnTime}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Inspection Date</Label>
                  <Input
                    id="qcReceivedDate"
                    name="qcReceivedDate"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="qcReceivedDate"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.qcReceivedDate || ""}
                    invalid={
                      validation.touched.qcReceivedDate &&
                      validation.errors.qcReceivedDate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.qcReceivedDate &&
                  validation.errors.qcReceivedDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.qcReceivedDate}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>IDIQ Closed By</Label>
                  <Select
                    id="closedBy"
                    name="closedBy"
                    type="text"
                    onChange={e => {
                      set_closedBySelected({
                        label: e.label,
                        value: e.value,
                      })
                    }}
                    onBlur={validation.handleBlur}
                    options={_closedBySelectItems}
                    defaultValue={_closedBySelected}
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
                  <Label className="form-label">Verified Date</Label>
                  <Input
                    id="qcInspectionComplete"
                    name="qcInspectionComplete"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="qcInspectionComplete"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.qcInspectionComplete || ""}
                    invalid={
                      validation.touched.qcInspectionComplete &&
                      validation.errors.qcInspectionComplete
                        ? true
                        : false
                    }
                  />
                  {validation.touched.qcInspectionComplete &&
                  validation.errors.qcInspectionComplete ? (
                    <FormFeedback type="invalid">
                      {validation.errors.qcInspectionComplete}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>Verified By</Label>
                  <Select
                    id="verifiedBy"
                    name="verifiedBy"
                    type="text"
                    onChange={e => {
                      set_verifiedBySelected({
                        label: e.label,
                        value: e.value,
                      })
                    }}
                    onBlur={validation.handleBlur}
                    options={_verifiedBySelectItems}
                    defaultValue={_verifiedBySelected}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select verifiedBy"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.verifiedBy &&
                  validation.errors.verifiedBy ? (
                    <FormFeedback type="invalid">
                      {validation.errors.verifiedBy}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>PAR Assigned</Label>
                  <Select
                    id="parAssigned"
                    name="parAssigned"
                    type="text"
                    onChange={e => {
                      set_parAssignedSelected({
                        label: e.label,
                        value: e.value,
                      })
                    }}
                    onBlur={validation.handleBlur}
                    options={_parAssignedSelectItems}
                    defaultValue={_parAssignedSelected}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select parAssigned"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.parAssigned &&
                  validation.errors.parAssigned ? (
                    <FormFeedback type="invalid">
                      {validation.errors.parAssigned}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">To PAR</Label>
                  <Input
                    id="dateSentToPar"
                    name="dateSentToPar"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateSentToPar"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateSentToPar || ""}
                    invalid={
                      validation.touched.dateSentToPar &&
                      validation.errors.dateSentToPar
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateSentToPar &&
                  validation.errors.dateSentToPar ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateSentToPar}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">From PAR</Label>
                  <Input
                    id="dateReceivedFromPar"
                    name="dateReceivedFromPar"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateReceivedFromPar"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateReceivedFromPar || ""}
                    invalid={
                      validation.touched.dateReceivedFromPar &&
                      validation.errors.dateReceivedFromPar
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateReceivedFromPar &&
                  validation.errors.dateReceivedFromPar ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateReceivedFromPar}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">To Work Control</Label>
                  <Input
                    id="dateSentToWorkControl"
                    name="dateSentToWorkControl"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateSentToWorkControl"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateSentToWorkControl || ""}
                    invalid={
                      validation.touched.dateSentToWorkControl &&
                      validation.errors.dateSentToWorkControl
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateSentToWorkControl &&
                  validation.errors.dateSentToWorkControl ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateSentToWorkControl}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>Sub Contractor/ In House</Label>
                  <Select
                    id="subcontractorInHouse"
                    name="subcontractorInHouse"
                    type="text"
                    onChange={e => {
                      set_subcontractorInHouseSelected({
                        label: e.label,
                        value: e.value,
                      })
                    }}
                    onBlur={validation.handleBlur}
                    options={_subcontractorInHouseSelectItems}
                    defaultValue={_subcontractorInHouseSelected}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select subcontractorInHouse"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.subcontractorInHouse &&
                  validation.errors.subcontractorInHouse ? (
                    <FormFeedback type="invalid">
                      {validation.errors.subcontractorInHouse}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Sub Contractor Name</Label>
                  <Input
                    id="subcontractorName"
                    name="subcontractorName"
                    type="text"
                    placeholder="subcontractorName"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.subcontractorName || ""}
                    invalid={
                      validation.touched.subcontractorName &&
                      validation.errors.subcontractorName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.subcontractorName &&
                  validation.errors.subcontractorName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.subcontractorName}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Date Closed</Label>
                  <Input
                    id="dateWoWasClosed"
                    name="dateWoWasClosed"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateWoWasClosed"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateWoWasClosed || ""}
                    invalid={
                      validation.touched.dateWoWasClosed &&
                      validation.errors.dateWoWasClosed
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateWoWasClosed &&
                  validation.errors.dateWoWasClosed ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateWoWasClosed}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">woStatus</Label>
                  <Input
                    id="woStatus"
                    name="woStatus"
                    type="text"
                    placeholder="woStatus"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.woStatus || ""}
                    invalid={
                      validation.touched.woStatus && validation.errors.woStatus
                        ? true
                        : false
                    }
                  />
                  {validation.touched.woStatus && validation.errors.woStatus ? (
                    <FormFeedback type="invalid">
                      {validation.errors.woStatus}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">comments</Label>
                  <Input
                    id="comments"
                    name="comments"
                    type="textarea"
                    placeholder="comments"
                    maxLength="225"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.comments || ""}
                    invalid={
                      validation.touched.comments && validation.errors.comments
                        ? true
                        : false
                    }
                  />
                  {validation.touched.comments && validation.errors.comments ? (
                    <FormFeedback type="invalid">
                      {validation.errors.comments}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">unsatNotes</Label>
                  <Input
                    id="unsatNotes"
                    name="unsatNotes"
                    type="textarea"
                    placeholder="unsatNotes"
                    maxLength="225"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.unsatNotes || ""}
                    invalid={
                      validation.touched.unsatNotes &&
                      validation.errors.unsatNotes
                        ? true
                        : false
                    }
                  />
                  {validation.touched.unsatNotes &&
                  validation.errors.unsatNotes ? (
                    <FormFeedback type="invalid">
                      {validation.errors.unsatNotes}
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
                      set_causeCodeSelected({
                        label: e.label,
                        value: e.value,
                      })
                    }}
                    onBlur={validation.handleBlur}
                    options={_causeCodeSelectItems}
                    defaultValue={_causeCodeSelected}
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
                      set_rootCauseSelected({
                        label: e.label,
                        value: e.value,
                      })
                    }}
                    onBlur={validation.handleBlur}
                    options={_rootCauseSelectItems}
                    defaultValue={_rootCauseSelected}
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

IDIQTrackerAddUpdate.propTypes = {
  onSaveClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  open: PropTypes.bool,
  modelData: PropTypes.object,
}

export default IDIQTrackerAddUpdate
