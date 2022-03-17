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
    //set existing selected value
    modelData && modelData?.inspectionFailReason != null
      ? set_inspectionFailReasonSelected({
          label: modelData?.inspectionFailReason,
          value: modelData?.inspectionFailReason,
        })
      : set_inspectionFailReasonSelected("")

    modelData && modelData?.qcInspector != null
      ? set_qcInspectorSelected({
          label: modelData?.qcInspector,
          value: modelData?.qcInspector,
        })
      : set_qcInspectorSelected("")

    modelData && modelData?.surveillanceType != null
      ? set_surveillanceTypeSelected({
          label: modelData?.surveillanceType,
          value: modelData?.surveillanceType,
        })
      : set_surveillanceTypeSelected("")

    modelData && modelData?.surveillanceResults != null
      ? set_surveillanceResultsSelected({
          label: modelData?.surveillanceResults,
          value: modelData?.surveillanceResults,
        })
      : set_surveillanceResultsSelected("")

    modelData && modelData?.fmname != null
      ? set_fmnameSelected({
          label: modelData?.fmname,
          value: modelData?.fmname,
        })
      : set_fmnameSelected("")

    modelData && modelData?.fmtitle != null
      ? set_fmtitleSelected({
          label: modelData?.fmtitle,
          value: modelData?.fmtitle,
        })
      : set_fmtitleSelected("")

    modelData && modelData?.status != null
      ? set_statusSelected({
          label: modelData?.status,
          value: modelData?.status,
        })
      : set_statusSelected("")

    modelData && modelData?.subcontractorName != null
      ? set_subcontractorNameSelected({
          label: modelData?.subcontractorName,
          value: modelData?.subcontractorName,
        })
      : set_subcontractorNameSelected("")

    modelData && modelData?.annex != null
      ? set_annexSelected({ label: modelData?.annex, value: modelData?.annex })
      : set_annexSelected("")

    modelData && modelData?.specItem != null
      ? set_specItemSelected({
          label: modelData?.specItem,
          value: modelData?.specItem,
        })
      : set_specItemSelected("")

    modelData && modelData?.title != null
      ? set_titleSelected({ label: modelData?.title, value: modelData?.title })
      : set_titleSelected("")

    modelData && modelData?.closedBy != null
      ? set_closedBySelected({
          label: modelData?.closedBy,
          value: modelData?.closedBy,
        })
      : set_closedBySelected("")

    modelData && modelData?.qcComments != null
      ? set_qcCommentsSelected({
          label: modelData?.qcComments,
          value: modelData?.qcComments,
        })
      : set_qcCommentsSelected("")

    modelData && modelData?.causeCode != null
      ? set_causeCodeSelected({
          label: modelData?.causeCode,
          value: modelData?.causeCode,
        })
      : set_causeCodeSelected("")

    modelData && modelData?.rootCause != null
      ? set_rootCauseSelected({
          label: modelData?.rootCause,
          value: modelData?.rootCause,
        })
      : set_rootCauseSelected("")
  }, [modelData])

  const [isSaving, setIsSaving] = useState(false)

  const [_inspectionFailReasonSelected, set_inspectionFailReasonSelected] =
    useState("")
  const [
    _inspectionFailReasonSelectItems,
    set_inspectionFailReasonSelectItems,
  ] = useState([])
  const [_qcInspectorSelected, set_qcInspectorSelected] = useState("")
  const [_qcInspectorSelectItems, set_qcInspectorSelectItems] = useState([])
  const [_surveillanceTypeSelected, set_surveillanceTypeSelected] = useState("")
  const [_surveillanceTypeSelectItems, set_surveillanceTypeSelectItems] =
    useState([])
  const [_surveillanceResultsSelected, set_surveillanceResultsSelected] =
    useState("")
  const [_surveillanceResultsSelectItems, set_surveillanceResultsSelectItems] =
    useState([])
  const [_fmnameSelected, set_fmnameSelected] = useState("")
  const [_fmnameSelectItems, set_fmnameSelectItems] = useState([])
  const [_fmtitleSelected, set_fmtitleSelected] = useState("")
  const [_fmtitleSelectItems, set_fmtitleSelectItems] = useState([])
  const [_subcontractorNameSelected, set_subcontractorNameSelected] =
    useState("")
  const [_subcontractorNameSelectItems, set_subcontractorNameSelectItems] =
    useState([])
  const [_annexSelected, set_annexSelected] = useState("")
  const [_annexSelectItems, set_annexSelectItems] = useState([])
  const [_specItemSelected, set_specItemSelected] = useState("")
  const [_specItemSelectItems, set_specItemSelectItems] = useState([])
  const [_titleSelected, set_titleSelected] = useState("")
  const [_titleSelectItems, set_titleSelectItems] = useState([])
  const [_closedBySelected, set_closedBySelected] = useState("")
  const [_closedBySelectItems, set_closedBySelectItems] = useState([])
  const [_qcCommentsSelected, set_qcCommentsSelected] = useState("")
  const [_qcCommentsSelectItems, set_qcCommentsSelectItems] = useState([])
  const [_causeCodeSelected, set_causeCodeSelected] = useState("")
  const [_causeCodeSelectItems, set_causeCodeSelectItems] = useState([])
  const [_rootCauseSelected, set_rootCauseSelected] = useState("")
  const [_rootCauseSelectItems, set_rootCauseSelectItems] = useState([])
  const [_statusSelected, set_statusSelected] = useState("")
  const [_statusSelectItems, set_statusSelectItems] = useState([])
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (modelData && modelData.id) || 0,
      pdrnumber: (modelData && modelData.pdrNumber) || "",
      workOrder: (modelData && modelData.workOrder) || "",
      location: (modelData && modelData.location) || "",
      inspectionFailReason: (modelData && modelData.inspectionFailReason) || "",
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
      status: (modelData && modelData.status) || "",
      fmname: (modelData && modelData.fmName) || "",
      fmtitle: (modelData && modelData.fmTitle) || "",
      techsName: (modelData && modelData.techsName) || "",
      subcontractorName: (modelData && modelData.subcontractorName) || "",
      annex: (modelData && modelData.annex) || "",
      specItem: (modelData && modelData.specItem) || "",
      title: (modelData && modelData.title) || "",
      specItemRequirements: (modelData && modelData.specItemRequirements) || "",
      descriptionOfInspection:
        (modelData && modelData.descriptionOfInspection) || "",
      unsatFindings: (modelData && modelData.unsatFindings) || "",
      fmResponse: (modelData && modelData.fmResponse) || "",
      closedBy: (modelData && modelData.closedBy) || "",
      dateClosed:
        (modelData &&
          modelData?.dateClosed &&
          moment(modelData?.dateClosed).format("YYYY-MM-DD")) ||
        null,
      qcComments: (modelData && modelData.qcComments) || "",
      causeCode: (modelData && modelData.causeCode) || "",
      rootCause: (modelData && modelData.rootCause) || "",
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("id is required"),
      // pdrnumber: Yup.string().required("pdrnumber is required"),
      // workOrder: Yup.string().required("workOrder is required"),
      // location: Yup.string().required("location is required"),
      // inspectionFailReason: Yup.string().required("inspectionFailReason is required"),
      // qcInspector: Yup.string().required("qcInspector is required"),
      // surveillanceType: Yup.string().required("surveillanceType is required"),
      // surveillanceResults: Yup.string().required("surveillanceResults is required"),
      // dateStarted: Yup.string().required("dateStarted is required"),
      // dateCompleted: Yup.string().required("dateCompleted is required"),
      // dateIssued: Yup.string().required("dateIssued is required"),
      // dateDue: Yup.string().required("dateDue is required"),
      // dateReinspected: Yup.string().required("dateReinspected is required"),
      // status: Yup.string().required("status is required"),
      // fmname: Yup.string().required("fmname is required"),
      // fmtitle: Yup.string().required("fmtitle is required"),
      // techsName: Yup.string().required("techsName is required"),
      // subcontractorName: Yup.string().required("subcontractorName is required"),
      // annex: Yup.string().required("annex is required"),
      // specItem: Yup.string().required("specItem is required"),
      // title: Yup.string().required("title is required"),
      // specItemRequirements: Yup.string().required("specItemRequirements is required"),
      // descriptionOfInspection: Yup.string().required("descriptionOfInspection is required"),
      // unsatFindings: Yup.string().required("unsatFindings is required"),
      // fmResponse: Yup.string().required("fmResponse is required"),
      // closedBy: Yup.string().required("closedBy is required"),
      // dateClosed: Yup.string().required("dateClosed is required"),
      // qcComments: Yup.string().required("qcComments is required"),
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
        inspectionFailReason: _inspectionFailReasonSelected.value,
        qcInspector: _qcInspectorSelected.value,
        surveillanceType: _surveillanceTypeSelected.value,
        surveillanceResults: _surveillanceResultsSelected.value,
        dateStarted: values.dateStarted,
        dateCompleted: values.dateCompleted,
        dateIssued: values.dateIssued,
        dateDue: values.dateDue,
        dateReinspected: values.dateReinspected,
        status: _statusSelected.value,
        fmname: _fmnameSelected.value,
        fmtitle: _fmtitleSelected.value,
        techsName: values.techsName,
        subcontractorName: _subcontractorNameSelected.value,
        annex: _annexSelected.value,
        specItem: _specItemSelected.value,
        title: _titleSelected.value,
        specItemRequirements: values.specItemRequirements,
        descriptionOfInspection: values.descriptionOfInspection,
        unsatFindings: values.unsatFindings,
        fmResponse: values.fmResponse,
        closedBy: _closedBySelected.value,
        dateClosed: values.dateClosed,
        qcComments: _qcCommentsSelected.value,
        causeCode: _causeCodeSelected.value,
        rootCause: _rootCauseSelected.value,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editPDRTrackerAddUpdate(submitModel?.id, submitModel)
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
        newPDRTrackerAddUpdate(submitModel)
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
          {modelData?.id > 0 ? "Update PDR Tracker" : "New PDR Tracker"}
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

                <Row>
                  <Col className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <Label className="form-label">PDR Number</Label>
                      <Input
                        id="pdrnumber"
                        name="pdrnumber"
                        type="text"
                        placeholder="PDR Number"
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
                      <Label className="form-label">WO Number</Label>
                      <Input
                        id="workOrder"
                        name="workOrder"
                        type="text"
                        placeholder="Work Order Number"
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
                      <Label className="form-label">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="Location"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.location || ""}
                        invalid={
                          validation.touched.location &&
                          validation.errors.location
                            ? true
                            : false
                        }
                      />
                      {validation.touched.location &&
                      validation.errors.location ? (
                        <FormFeedback type="invalid">
                          {validation.errors.location}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>Fail Reason</Label>
                      <Select
                        id="inspectionFailReason"
                        name="inspectionFailReason"
                        type="text"
                        onChange={e => {
                          set_inspectionFailReasonSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_inspectionFailReasonSelectItems}
                        defaultValue={_inspectionFailReasonSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Fail Reason"
                        isClearable={false}
                        isSearchable={true}
                        isLoading={false}
                        loadingMessage={() => "Fetching Data..."}
                        noOptionsMessage={() => "No Data Found."}
                      />
                      {validation.touched.inspectionFailReason &&
                      validation.errors.inspectionFailReason ? (
                        <FormFeedback type="invalid">
                          {validation.errors.inspectionFailReason}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>Quality Person</Label>
                      <Select
                        id="qcInspector"
                        name="qcInspector"
                        type="text"
                        onChange={e => {
                          set_qcInspectorSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_qcInspectorSelectItems}
                        defaultValue={_qcInspectorSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Quality Person"
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
                      <Label>Surveillance Type</Label>
                      <Select
                        id="surveillanceType"
                        name="surveillanceType"
                        type="text"
                        onChange={e => {
                          set_surveillanceTypeSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_surveillanceTypeSelectItems}
                        defaultValue={_surveillanceTypeSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Surveillance Type"
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
                      <Label>Surveillance Result</Label>
                      <Select
                        id="surveillanceResults"
                        name="surveillanceResults"
                        type="text"
                        onChange={e => {
                          set_surveillanceResultsSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_surveillanceResultsSelectItems}
                        defaultValue={_surveillanceResultsSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Surveillance Result"
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
                      <Label className="form-label">Date Started</Label>
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
                      <Label className="form-label">Date Completed</Label>
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
                      <Label className="form-label">Date Issued</Label>
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
                      <Label className="form-label">Date Due</Label>
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
                          validation.touched.dateDue &&
                          validation.errors.dateDue
                            ? true
                            : false
                        }
                      />
                      {validation.touched.dateDue &&
                      validation.errors.dateDue ? (
                        <FormFeedback type="invalid">
                          {validation.errors.dateDue}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Date Reinspected</Label>
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
                  </Col>
                  <Col className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <Label className="form-label">PDR Status</Label>
                      <Select
                        id="sstatus"
                        name="sstatus"
                        type="text"
                        onChange={e => {
                          set_statusSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_statusSelectItems}
                        defaultValue={_statusSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select PDR Status"
                        isClearable={false}
                        isSearchable={true}
                        isLoading={false}
                        loadingMessage={() => "Fetching Data..."}
                        noOptionsMessage={() => "No Data Found."}
                      />
                      {validation.touched.status && validation.errors.status ? (
                        <FormFeedback type="invalid">
                          {validation.errors.status}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>Functional Manager</Label>
                      <Select
                        id="fmname"
                        name="fmname"
                        type="text"
                        onChange={e => {
                          set_fmnameSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_fmnameSelectItems}
                        defaultValue={_fmnameSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select fmname"
                        isClearable={false}
                        isSearchable={true}
                        isLoading={false}
                        loadingMessage={() => "Fetching Data..."}
                        noOptionsMessage={() => "No Data Found."}
                      />
                      {validation.touched.fmname && validation.errors.fmname ? (
                        <FormFeedback type="invalid">
                          {validation.errors.fmname}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>FM Title</Label>
                      <Select
                        id="fmtitle"
                        name="fmtitle"
                        type="text"
                        onChange={e => {
                          set_fmtitleSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_fmtitleSelectItems}
                        defaultValue={_fmtitleSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select fmtitle"
                        isClearable={false}
                        isSearchable={true}
                        isLoading={false}
                        loadingMessage={() => "Fetching Data..."}
                        noOptionsMessage={() => "No Data Found."}
                      />
                      {validation.touched.fmtitle &&
                      validation.errors.fmtitle ? (
                        <FormFeedback type="invalid">
                          {validation.errors.fmtitle}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Tech Completing Job</Label>
                      <Input
                        id="techsName"
                        name="techsName"
                        type="text"
                        placeholder="techsName"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.techsName || ""}
                        invalid={
                          validation.touched.techsName &&
                          validation.errors.techsName
                            ? true
                            : false
                        }
                      />
                      {validation.touched.techsName &&
                      validation.errors.techsName ? (
                        <FormFeedback type="invalid">
                          {validation.errors.techsName}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>Sub Contractor Name</Label>
                      <Select
                        id="subcontractorName"
                        name="subcontractorName"
                        type="text"
                        onChange={e => {
                          set_subcontractorNameSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_subcontractorNameSelectItems}
                        defaultValue={_subcontractorNameSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Sub Contractor"
                        isClearable={false}
                        isSearchable={true}
                        isLoading={false}
                        loadingMessage={() => "Fetching Data..."}
                        noOptionsMessage={() => "No Data Found."}
                      />
                      {validation.touched.subcontractorName &&
                      validation.errors.subcontractorName ? (
                        <FormFeedback type="invalid">
                          {validation.errors.subcontractorName}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>Annex</Label>
                      <Select
                        id="annex"
                        name="annex"
                        type="text"
                        onChange={e => {
                          set_annexSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_annexSelectItems}
                        defaultValue={_annexSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Annex"
                        isClearable={false}
                        isSearchable={true}
                        isLoading={false}
                        loadingMessage={() => "Fetching Data..."}
                        noOptionsMessage={() => "No Data Found."}
                      />
                      {validation.touched.annex && validation.errors.annex ? (
                        <FormFeedback type="invalid">
                          {validation.errors.annex}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>Spec Item</Label>
                      <Select
                        id="specItem"
                        name="specItem"
                        type="text"
                        onChange={e => {
                          set_specItemSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_specItemSelectItems}
                        defaultValue={_specItemSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Spec Item"
                        isClearable={false}
                        isSearchable={true}
                        isLoading={false}
                        loadingMessage={() => "Fetching Data..."}
                        noOptionsMessage={() => "No Data Found."}
                      />
                      {validation.touched.specItem &&
                      validation.errors.specItem ? (
                        <FormFeedback type="invalid">
                          {validation.errors.specItem}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>Title</Label>
                      <Select
                        id="title"
                        name="title"
                        type="text"
                        onChange={e => {
                          set_titleSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_titleSelectItems}
                        defaultValue={_titleSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Title"
                        isClearable={false}
                        isSearchable={true}
                        isLoading={false}
                        loadingMessage={() => "Fetching Data..."}
                        noOptionsMessage={() => "No Data Found."}
                      />
                      {validation.touched.title && validation.errors.title ? (
                        <FormFeedback type="invalid">
                          {validation.errors.title}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">
                        Spec Item Requirements
                      </Label>
                      <Input
                        id="specItemRequirements"
                        name="specItemRequirements"
                        type="textarea"
                        placeholder="Spec Item Requirements"
                        maxLength="225"
                        rows="7"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.specItemRequirements || ""}
                        invalid={
                          validation.touched.specItemRequirements &&
                          validation.errors.specItemRequirements
                            ? true
                            : false
                        }
                      />
                      {validation.touched.specItemRequirements &&
                      validation.errors.specItemRequirements ? (
                        <FormFeedback type="invalid">
                          {validation.errors.specItemRequirements}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>

                <div className="mb-3">
                  <Label className="form-label">
                    Description Of Inspection
                  </Label>
                  <Input
                    id="descriptionOfInspection"
                    name="descriptionOfInspection"
                    type="textarea"
                    placeholder="Description Of Inspection"
                    maxLength="225"
                    rows="5"
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
                  <Label className="form-label">Deficiencies Noted</Label>
                  <Input
                    id="unsatFindings"
                    name="unsatFindings"
                    type="textarea"
                    placeholder="Deficiencies Noted"
                    maxLength="225"
                    rows="5"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.unsatFindings || ""}
                    invalid={
                      validation.touched.unsatFindings &&
                      validation.errors.unsatFindings
                        ? true
                        : false
                    }
                  />
                  {validation.touched.unsatFindings &&
                  validation.errors.unsatFindings ? (
                    <FormFeedback type="invalid">
                      {validation.errors.unsatFindings}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">FM Response</Label>
                  <Input
                    id="fmResponse"
                    name="fmResponse"
                    type="textarea"
                    placeholder="FM Response"
                    maxLength="225"
                    rows="5"
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
                  <Label className="form-label">QC Comments</Label>
                  <Input
                    id="qcComment"
                    name="qcComment"
                    type="textarea"
                    placeholder="QC Comment"
                    maxLength="225"
                    rows="5"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.qcComment || ""}
                    invalid={
                      validation.touched.qcComment &&
                      validation.errors.qcComment
                        ? true
                        : false
                    }
                  />
                  {validation.touched.qcComment &&
                  validation.errors.qcComment ? (
                    <FormFeedback type="invalid">
                      {validation.errors.qcComment}
                    </FormFeedback>
                  ) : null}
                </div>

                <Row>
                  <Col className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <Label>Closed By</Label>
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
                        placeholder="Select Closed By"
                        isClearable={false}
                        isSearchable={true}
                        isLoading={false}
                        loadingMessage={() => "Fetching Data..."}
                        noOptionsMessage={() => "No Data Found."}
                      />
                      {validation.touched.closedBy &&
                      validation.errors.closedBy ? (
                        <FormFeedback type="invalid">
                          {validation.errors.closedBy}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Date Closed</Label>
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
                  </Col>

                  <Col className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <Label>Cause Code</Label>
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
                        placeholder="Select Cause Code"
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
                      <Label>Root Cause</Label>
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

                <div className="mb-3">
                  <Label className="form-label">QC Comments</Label>
                  <Input
                    id="qcComment"
                    name="qcComment"
                    type="textarea"
                    placeholder="QC Comment"
                    maxLength="225"
                    rows="5"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.qcComment || ""}
                    invalid={
                      validation.touched.qcComment &&
                      validation.errors.qcComment
                        ? true
                        : false
                    }
                  />
                  {validation.touched.qcComment &&
                  validation.errors.qcComment ? (
                    <FormFeedback type="invalid">
                      {validation.errors.qcComment}
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
