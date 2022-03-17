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
    //set existing selected value
    modelData && modelData?.par != null
      ? set_parSelected({ label: modelData?.par, value: modelData?.par })
      : set_parSelected("")

    modelData && modelData?.valid != null
      ? set_validSelected({ label: modelData?.valid, value: modelData?.valid })
      : set_validSelected("")

    modelData && modelData?.annex != null
      ? set_annexSelected({ label: modelData?.annex, value: modelData?.annex })
      : set_annexSelected("")

    modelData && modelData?.specItem1 != null
      ? set_specItem1Selected({
          label: modelData?.specItem1,
          value: modelData?.specItem1,
        })
      : set_specItem1Selected("")

    modelData && modelData?.title != null
      ? set_titleSelected({ label: modelData?.title, value: modelData?.title })
      : set_titleSelected("")

    modelData && modelData?.fmBldgManager != null
      ? set_fmBldgManagerSelected({
          label: modelData?.fmBldgManager,
          value: modelData?.fmBldgManager,
        })
      : set_fmBldgManagerSelected("")

    modelData && modelData?.responseBy != null
      ? set_responseBySelected({
          label: modelData?.responseBy,
          value: modelData?.responseBy,
        })
      : set_responseBySelected("")

    modelData && modelData?.status != null
      ? set_statusSelected({
          label: modelData?.status,
          value: modelData?.status,
        })
      : set_statusSelected("")

    modelData && modelData?.isitvalid != null
      ? set_isitvalidSelected({
          label: modelData?.isitvalid,
          value: modelData?.isitvalid,
        })
      : set_isitvalidSelected("")

    modelData && modelData?.unsatCondition != null
      ? set_unsatConditionSelected({
          label: modelData?.unsatCondition,
          value: modelData?.unsatCondition,
        })
      : set_unsatConditionSelected("")

    modelData && modelData?.unsatRootCause != null
      ? set_unsatRootCauseSelected({
          label: modelData?.unsatRootCause,
          value: modelData?.unsatRootCause,
        })
      : set_unsatRootCauseSelected("")
  }, [modelData])

  const [isSaving, setIsSaving] = useState(false)

  const [_parSelected, set_parSelected] = useState("")
  const [_parSelectItems, set_parSelectItems] = useState([])
  const [_validSelected, set_validSelected] = useState("")
  const [_validSelectItems, set_validSelectItems] = useState([])
  const [_annexSelected, set_annexSelected] = useState("")
  const [_annexSelectItems, set_annexSelectItems] = useState([])
  const [_specItem1Selected, set_specItem1Selected] = useState("")
  const [_specItem1SelectItems, set_specItem1SelectItems] = useState([])
  const [_titleSelected, set_titleSelected] = useState("")
  const [_titleSelectItems, set_titleSelectItems] = useState([])
  const [_fmBldgManagerSelected, set_fmBldgManagerSelected] = useState("")
  const [_fmBldgManagerSelectItems, set_fmBldgManagerSelectItems] = useState([])
  const [_responseBySelected, set_responseBySelected] = useState("")
  const [_responseBySelectItems, set_responseBySelectItems] = useState([])
  const [_statusSelected, set_statusSelected] = useState("")
  const [_statusSelectItems, set_statusSelectItems] = useState([])
  const [_isitvalidSelected, set_isitvalidSelected] = useState("")
  const [_isitvalidSelectItems, set_isitvalidSelectItems] = useState([])
  const [_unsatConditionSelected, set_unsatConditionSelected] = useState("")
  const [_unsatConditionSelectItems, set_unsatConditionSelectItems] = useState(
    []
  )
  const [_unsatRootCauseSelected, set_unsatRootCauseSelected] = useState("")
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
          modelData?.dateAcknowledged &&
          moment(modelData?.dateAcknowledged).format("YYYY-MM-DD")) ||
        null,
      valid: (modelData && modelData.valid) || "",
      annex: (modelData && modelData.annex) || "",
      specItem1: (modelData && modelData.specItem) || "",
      title: (modelData && modelData.title) || "",
      fmBldgManager: (modelData && modelData.fmManager) || "",
      detailOfComplaint: (modelData && modelData.detailOfComplaint) || "",
      comments: (modelData && modelData.comments) || "",
      detailOfComplaintShort:
        (modelData && modelData.detailOfComplaintShort) || "",
      dateResponded:
        (modelData &&
          modelData?.dateToPar &&
          moment(modelData?.dateToPar).format("YYYY-MM-DD")) ||
        null,
      dateClosed:
        (modelData &&
          modelData?.dateClosed &&
          moment(modelData?.dateClosed).format("YYYY-MM-DD")) ||
        null,
      responseBy: (modelData && modelData.responseBy) || "",
      status: (modelData && modelData.status) || "",
      isitvalid: (modelData && modelData.validity) || "",
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
        par: _parSelected.value,
        dateReceived: values.dateReceived,
        dateAcked: values.dateAcked,
        valid: _validSelected.value,
        annex: _annexSelected.value,
        specItem1: _specItem1Selected.value,
        title: _titleSelected.value,
        fmBldgManager: _fmBldgManagerSelected.value,
        detailOfComplaint: values.detailOfComplaint,
        comments: values.comments,
        detailOfComplaintShort: values.detailOfComplaintShort,
        dateResponded: values.dateResponded,
        dateClosed: values.dateClosed,
        responseBy: _responseBySelected.value,
        status: _statusSelected.value,
        isitvalid: _isitvalidSelected.value,
        unsatCondition: _unsatConditionSelected.value,
        unsatRootCause: _unsatRootCauseSelected.value,
        ccrResponse: values.ccrResponse,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editCCRTrackerAddUpdate(submitModel?.id, submitModel)
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
        newCCRTrackerAddUpdate(submitModel)
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
          {modelData?.id > 0 ? "Update CCR Tracker" : "New CCR Tracker"}
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
                      <Label className="form-label">CCR Number</Label>
                      <Input
                        id="ccrNumber"
                        name="ccrNumber"
                        type="text"
                        placeholder="CCR Number"
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
                          validation.touched.woNumber &&
                          validation.errors.woNumber
                            ? true
                            : false
                        }
                      />
                      {validation.touched.woNumber &&
                      validation.errors.woNumber ? (
                        <FormFeedback type="invalid">
                          {validation.errors.woNumber}
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
                      <Label>PAR</Label>
                      <Select
                        id="par"
                        name="par"
                        type="text"
                        onChange={e => {
                          set_parSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_parSelectItems}
                        defaultValue={_parSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select PAR"
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
                      <Label className="form-label">Date Received</Label>
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
                      <Label className="form-label">Date Acked</Label>
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
                  </Col>

                  <Col className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <Label>Valid</Label>
                      <Select
                        id="valid"
                        name="valid"
                        type="text"
                        onChange={e => {
                          set_validSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_validSelectItems}
                        defaultValue={_validSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Valid"
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
                        id="specItem1"
                        name="specItem1"
                        type="text"
                        onChange={e => {
                          set_specItem1Selected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_specItem1SelectItems}
                        defaultValue={_specItem1Selected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Spec Item"
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
                      <Label>FM/ Building Manager</Label>
                      <Select
                        id="fmBldgManager"
                        name="fmBldgManager"
                        type="text"
                        onChange={e => {
                          set_fmBldgManagerSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_fmBldgManagerSelectItems}
                        defaultValue={_fmBldgManagerSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select FM/ Building Manager"
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
                  </Col>
                </Row>

                <div className="mb-3">
                  <Label className="form-label">Description of complaint</Label>
                  <Input
                    id="detailOfComplaint"
                    name="detailOfComplaint"
                    type="textarea"
                    placeholder="Description of complaint"
                    maxLength="225"
                    rows="5"
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
                  <Label className="form-label">Comments From PAR</Label>
                  <Input
                    id="comments"
                    name="comments"
                    type="textarea"
                    placeholder="Comments From PAR"
                    maxLength="225"
                    rows="5"
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
                  <Label className="form-label">
                    Description of complaint Short Version for Reports
                  </Label>
                  <Input
                    id="detailOfComplaintShort"
                    name="detailOfComplaintShort"
                    type="textarea"
                    placeholder="Description of complaint Short Version for Reports"
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

                <Row>
                  <Col className="col-md-4 col-sm-12">
                    <div className="mb-3">
                      <Label className="form-label">Date Sent to PAR</Label>
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
                      <Label className="form-label">Date Closed by PAR</Label>
                      <Input
                        id="dateClosed"
                        name="dateClosed"
                        type="date"
                        pattern="\d{4}-\d{2}-\d{2}"
                        placeholder="Date Closed by PAR"
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
                  <Col className="col-md-4 col-sm-12">
                    <div className="mb-3">
                      <Label>Responded By</Label>
                      <Select
                        id="responseBy"
                        name="responseBy"
                        type="text"
                        onChange={e => {
                          set_responseBySelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_responseBySelectItems}
                        defaultValue={_responseBySelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Response By"
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
                      <Label>CCR Status</Label>
                      <Select
                        id="ccrstatus"
                        name="ccrstatus"
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
                        placeholder="Select CCR Status"
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
                      <Label>Is It Valid</Label>
                      <Select
                        id="isitvalid"
                        name="isitvalid"
                        type="text"
                        onChange={e => {
                          set_isitvalidSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_isitvalidSelectItems}
                        defaultValue={_isitvalidSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Validation"
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
                  </Col>
                  <Col className="col-md-4 col-sm-12">
                    <div className="mb-3">
                      <Label>Unsat Condition</Label>
                      <Select
                        id="unsatCondition"
                        name="unsatCondition"
                        type="text"
                        onChange={e => {
                          set_unsatConditionSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_unsatConditionSelectItems}
                        defaultValue={_unsatConditionSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Unsat Condition"
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
                      <Label>Unsat Root Cause</Label>
                      <Select
                        id="unsatRootCause"
                        name="unsatRootCause"
                        type="text"
                        onChange={e => {
                          set_unsatRootCauseSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_unsatRootCauseSelectItems}
                        defaultValue={_unsatRootCauseSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Unsat Root Cause"
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
                  </Col>
                </Row>

                <div className="mb-3">
                  <Label className="form-label">CCR Response</Label>
                  <Input
                    id="ccrResponse"
                    name="ccrResponse"
                    type="textarea"
                    placeholder="CCR Response"
                    maxLength="225"
                    rows="5"
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
