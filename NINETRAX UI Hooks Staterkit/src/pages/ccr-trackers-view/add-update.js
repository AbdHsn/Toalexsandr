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
  newCCRTrackerAddUpdate,
  editCCRTrackerAddUpdate,
} from "../../services/ccr-trackers-service"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import BtnSaving from "../../components/Common/BtnSaving"
const CCRTrackerAddUpdate = ({
  open,
  modelData,
  onSaveClick,
  onCancelClick,
}) => {
  useEffect(() => {
    console.log("modal is running...", modelData)
  }, [])

  const [isSaving, setIsSaving] = useState(false)

  const [_parSelected, set_parSelected] = useState(null)
  const [_parSelectItems, set_parSelectItems] = useState([])
  const [_validSelected, set_validSelected] = useState(null)
  const [_validSelectItems, set_validSelectItems] = useState([])
  const [_annexSelected, set_annexSelected] = useState(null)
  const [_annexSelectItems, set_annexSelectItems] = useState([])
  const [_specItem1Selected, set_specItem1Selected] = useState(null)
  const [_specItem1SelectItems, set_specItem1SelectItems] = useState([])
  const [_titleSelected, set_titleSelected] = useState(null)
  const [_titleSelectItems, set_titleSelectItems] = useState([])
  const [_fmBldgManagerSelected, set_fmBldgManagerSelected] = useState(null)
  const [_fmBldgManagerSelectItems, set_fmBldgManagerSelectItems] = useState([])
  const [_responseBySelected, set_responseBySelected] = useState(null)
  const [_responseBySelectItems, set_responseBySelectItems] = useState([])
  const [_statusSelected, set_statusSelected] = useState(null)
  const [_statusSelectItems, set_statusSelectItems] = useState([])
  const [_isitvalidSelected, set_isitvalidSelected] = useState(null)
  const [_isitvalidSelectItems, set_isitvalidSelectItems] = useState([])
  const [_unsatConditionSelected, set_unsatConditionSelected] = useState(null)
  const [_unsatConditionSelectItems, set_unsatConditionSelectItems] = useState(
    []
  )
  const [_unsatRootCauseSelected, set_unsatRootCauseSelected] = useState(null)
  const [_unsatRootCauseSelectItems, set_unsatRootCauseSelectItems] = useState(
    []
  )

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (modelData && modelData.id) || 0,
      ccrNumber: (modelData && modelData.ccrNumber) || "",
      woNumber: (modelData && modelData.woNumber) || "",
      location: (modelData && modelData.location) || "",
      par: (modelData && modelData.par) || "",
      dateReceived:
        (modelData &&
          modelData?.dateReceived &&
          moment(modelData?.dateReceived).format("YYYY-MM-DD")) ||
        null,
      dateAcked:
        (modelData &&
          modelData?.dateAcked &&
          moment(modelData?.dateAcked).format("YYYY-MM-DD")) ||
        null,
      valid: (modelData && modelData.valid) || "",
      annex: (modelData && modelData.annex) || "",
      specItem1: (modelData && modelData.specItem1) || "",
      title: (modelData && modelData.title) || "",
      fmBldgManager: (modelData && modelData.fmBldgManager) || "",
      detailOfComplaint: (modelData && modelData.detailOfComplaint) || "",
      comments: (modelData && modelData.comments) || "",
      detailOfComplaintShort:
        (modelData && modelData.detailOfComplaintShort) || "",
      issuedBy: (modelData && modelData.issuedBy) || "",
      dateResponded:
        (modelData &&
          modelData?.dateResponded &&
          moment(modelData?.dateResponded).format("YYYY-MM-DD")) ||
        null,
      dateClosed:
        (modelData &&
          modelData?.dateClosed &&
          moment(modelData?.dateClosed).format("YYYY-MM-DD")) ||
        null,
      responseBy: (modelData && modelData.responseBy) || "",
      status: (modelData && modelData.status) || "",
      isitvalid: (modelData && modelData.isitvalid) || "",
      unsatCondition: (modelData && modelData.unsatCondition) || "",
      unsatRootCause: (modelData && modelData.unsatRootCause) || "",
      ccrResponse: (modelData && modelData.ccrResponse) || "",
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("id is required"),
      // ccrNumber: Yup.string().required("ccrNumber is required"),
      // woNumber: Yup.string().required("woNumber is required"),
      // location: Yup.string().required("location is required"),
      // par: Yup.string().required("par is required"),
      // dateReceived: Yup.string().required("dateReceived is required"),
      // dateAcked: Yup.string().required("dateAcked is required"),
      // valid: Yup.string().required("valid is required"),
      // annex: Yup.string().required("annex is required"),
      // specItem1: Yup.string().required("specItem1 is required"),
      // title: Yup.string().required("title is required"),
      // fmBldgManager: Yup.string().required("fmBldgManager is required"),
      // detailOfComplaint: Yup.string().required("detailOfComplaint is required"),
      // comments: Yup.string().required("comments is required"),
      // detailOfComplaintShort: Yup.string().required("detailOfComplaintShort is required"),
      // issuedBy: Yup.string().required("issuedBy is required"),
      // dateResponded: Yup.string().required("dateResponded is required"),
      // dateClosed: Yup.string().required("dateClosed is required"),
      // responseBy: Yup.string().required("responseBy is required"),
      // status: Yup.string().required("status is required"),
      // isitvalid: Yup.string().required("isitvalid is required"),
      // unsatCondition: Yup.string().required("unsatCondition is required"),
      // unsatRootCause: Yup.string().required("unsatRootCause is required"),
      // ccrResponse: Yup.string().required("ccrResponse is required"),
    }),

    onSubmit: values => {
      console.log("add-update save..01", values)

      const submitModel = {
        id: values.id,
        ccrNumber: values.ccrNumber,
        woNumber: values.woNumber,
        location: values.location,
        par: _parSelected,
        dateReceived: values.dateReceived,
        dateAcked: values.dateAcked,
        valid: _validSelected,
        annex: _annexSelected,
        specItem1: _specItem1Selected,
        title: _titleSelected,
        fmBldgManager: _fmBldgManagerSelected,
        detailOfComplaint: values.detailOfComplaint,
        comments: values.comments,
        detailOfComplaintShort: values.detailOfComplaintShort,
        issuedBy: values.issuedBy,
        dateResponded: values.dateResponded,
        dateClosed: values.dateClosed,
        responseBy: _responseBySelected,
        status: _statusSelected,
        isitvalid: _isitvalidSelected,
        unsatCondition: _unsatConditionSelected,
        unsatRootCause: _unsatRootCauseSelected,
        ccrResponse: values.ccrResponse,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editCCRTrackerAddUpdate(submitModel)
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
        newCCRTrackerAddUpdate(submitModel)
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
            ? "Update CCRTrackerAddUpdate"
            : "New CCRTrackerAddUpdate"}
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
                  <Label className="form-label">ccrNumber</Label>
                  <Input
                    id="ccrNumber"
                    name="ccrNumber"
                    type="text"
                    placeholder="ccrNumber"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.ccrNumber || ""}
                    invalid={
                      validation.touched.ccrNumber &&
                      validation.errors.ccrNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.ccrNumber &&
                  validation.errors.ccrNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.ccrNumber}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">woNumber</Label>
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
                  <Label>par</Label>
                  <Select
                    id="par"
                    name="par"
                    type="text"
                    onChange={e => {
                      set_parSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_parSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select par"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.par && validation.errors.par ? (
                    <FormFeedback type="invalid">
                      {validation.errors.par}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">dateReceived</Label>
                  <Input
                    id="dateReceived"
                    name="dateReceived"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateReceived"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateReceived || ""}
                    invalid={
                      validation.touched.dateReceived &&
                      validation.errors.dateReceived
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateReceived &&
                  validation.errors.dateReceived ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateReceived}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">dateAcked</Label>
                  <Input
                    id="dateAcked"
                    name="dateAcked"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateAcked"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateAcked || ""}
                    invalid={
                      validation.touched.dateAcked &&
                      validation.errors.dateAcked
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateAcked &&
                  validation.errors.dateAcked ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateAcked}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>valid</Label>
                  <Select
                    id="valid"
                    name="valid"
                    type="text"
                    onChange={e => {
                      set_validSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_validSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select valid"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.valid && validation.errors.valid ? (
                    <FormFeedback type="invalid">
                      {validation.errors.valid}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>annex</Label>
                  <Select
                    id="annex"
                    name="annex"
                    type="text"
                    onChange={e => {
                      set_annexSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_annexSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select annex"
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
                  <Label>specItem1</Label>
                  <Select
                    id="specItem1"
                    name="specItem1"
                    type="text"
                    onChange={e => {
                      set_specItem1Selected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_specItem1SelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select specItem1"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.specItem1 &&
                  validation.errors.specItem1 ? (
                    <FormFeedback type="invalid">
                      {validation.errors.specItem1}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>title</Label>
                  <Select
                    id="title"
                    name="title"
                    type="text"
                    onChange={e => {
                      set_titleSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_titleSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select title"
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
                  <Label>fmBldgManager</Label>
                  <Select
                    id="fmBldgManager"
                    name="fmBldgManager"
                    type="text"
                    onChange={e => {
                      set_fmBldgManagerSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_fmBldgManagerSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select fmBldgManager"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.fmBldgManager &&
                  validation.errors.fmBldgManager ? (
                    <FormFeedback type="invalid">
                      {validation.errors.fmBldgManager}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">detailOfComplaint</Label>
                  <Input
                    id="detailOfComplaint"
                    name="detailOfComplaint"
                    type="textarea"
                    placeholder="detailOfComplaint"
                    maxLength="225"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.detailOfComplaint || ""}
                    invalid={
                      validation.touched.detailOfComplaint &&
                      validation.errors.detailOfComplaint
                        ? true
                        : false
                    }
                  />
                  {validation.touched.detailOfComplaint &&
                  validation.errors.detailOfComplaint ? (
                    <FormFeedback type="invalid">
                      {validation.errors.detailOfComplaint}
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
                  <Label className="form-label">detailOfComplaintShort</Label>
                  <Input
                    id="detailOfComplaintShort"
                    name="detailOfComplaintShort"
                    type="textarea"
                    placeholder="detailOfComplaintShort"
                    maxLength="225"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.detailOfComplaintShort || ""}
                    invalid={
                      validation.touched.detailOfComplaintShort &&
                      validation.errors.detailOfComplaintShort
                        ? true
                        : false
                    }
                  />
                  {validation.touched.detailOfComplaintShort &&
                  validation.errors.detailOfComplaintShort ? (
                    <FormFeedback type="invalid">
                      {validation.errors.detailOfComplaintShort}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">issuedBy</Label>
                  <Input
                    id="issuedBy"
                    name="issuedBy"
                    type="text"
                    placeholder="issuedBy"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.issuedBy || ""}
                    invalid={
                      validation.touched.issuedBy && validation.errors.issuedBy
                        ? true
                        : false
                    }
                  />
                  {validation.touched.issuedBy && validation.errors.issuedBy ? (
                    <FormFeedback type="invalid">
                      {validation.errors.issuedBy}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">dateResponded</Label>
                  <Input
                    id="dateResponded"
                    name="dateResponded"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateResponded"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateResponded || ""}
                    invalid={
                      validation.touched.dateResponded &&
                      validation.errors.dateResponded
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateResponded &&
                  validation.errors.dateResponded ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateResponded}
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
                  <Label>responseBy</Label>
                  <Select
                    id="responseBy"
                    name="responseBy"
                    type="text"
                    onChange={e => {
                      set_responseBySelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_responseBySelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select responseBy"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.responseBy &&
                  validation.errors.responseBy ? (
                    <FormFeedback type="invalid">
                      {validation.errors.responseBy}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>status</Label>
                  <Select
                    id="status"
                    name="status"
                    type="text"
                    onChange={e => {
                      set_statusSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_statusSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select status"
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
                  <Label>isitvalid</Label>
                  <Select
                    id="isitvalid"
                    name="isitvalid"
                    type="text"
                    onChange={e => {
                      set_isitvalidSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_isitvalidSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select isitvalid"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.isitvalid &&
                  validation.errors.isitvalid ? (
                    <FormFeedback type="invalid">
                      {validation.errors.isitvalid}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>unsatCondition</Label>
                  <Select
                    id="unsatCondition"
                    name="unsatCondition"
                    type="text"
                    onChange={e => {
                      set_unsatConditionSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_unsatConditionSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select unsatCondition"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.unsatCondition &&
                  validation.errors.unsatCondition ? (
                    <FormFeedback type="invalid">
                      {validation.errors.unsatCondition}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>unsatRootCause</Label>
                  <Select
                    id="unsatRootCause"
                    name="unsatRootCause"
                    type="text"
                    onChange={e => {
                      set_unsatRootCauseSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_unsatRootCauseSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select unsatRootCause"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.unsatRootCause &&
                  validation.errors.unsatRootCause ? (
                    <FormFeedback type="invalid">
                      {validation.errors.unsatRootCause}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">ccrResponse</Label>
                  <Input
                    id="ccrResponse"
                    name="ccrResponse"
                    type="text"
                    placeholder="ccrResponse"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.ccrResponse || ""}
                    invalid={
                      validation.touched.ccrResponse &&
                      validation.errors.ccrResponse
                        ? true
                        : false
                    }
                  />
                  {validation.touched.ccrResponse &&
                  validation.errors.ccrResponse ? (
                    <FormFeedback type="invalid">
                      {validation.errors.ccrResponse}
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

CCRTrackerAddUpdate.propTypes = {
  onSaveClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  open: PropTypes.bool,
  modelData: PropTypes.object,
}

export default CCRTrackerAddUpdate
