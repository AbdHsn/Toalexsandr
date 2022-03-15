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
  newPAWTrackerAddUpdate,
  editPAWTrackerAddUpdate,
} from "../../services/paw-trackers-service"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import BtnSaving from "../../components/Common/BtnSaving"
const PAWTrackerAddUpdate = ({
  open,
  modelData,
  onSaveClick,
  onCancelClick,
}) => {
  useEffect(() => {
    console.log("modal is running...", modelData)
  }, [])

  const [isSaving, setIsSaving] = useState(false)

  const [_siteSelected, set_siteSelected] = useState(null)
  const [_siteSelectItems, set_siteSelectItems] = useState([])
  const [_pawLevelSelected, set_pawLevelSelected] = useState(null)
  const [_pawLevelSelectItems, set_pawLevelSelectItems] = useState([])
  const [_pawAssessmentSelected, set_pawAssessmentSelected] = useState(null)
  const [_pawAssessmentSelectItems, set_pawAssessmentSelectItems] = useState([])
  const [_parSelected, set_parSelected] = useState(null)
  const [_parSelectItems, set_parSelectItems] = useState([])
  const [_responseBySelected, set_responseBySelected] = useState(null)
  const [_responseBySelectItems, set_responseBySelectItems] = useState([])
  const [_annexSelected, set_annexSelected] = useState(null)
  const [_annexSelectItems, set_annexSelectItems] = useState([])
  const [_specItem1Selected, set_specItem1Selected] = useState(null)
  const [_specItem1SelectItems, set_specItem1SelectItems] = useState([])
  const [_titleSelected, set_titleSelected] = useState(null)
  const [_titleSelectItems, set_titleSelectItems] = useState([])
  const [_validitySelected, set_validitySelected] = useState(null)
  const [_validitySelectItems, set_validitySelectItems] = useState([])
  const [_pawStatusSelected, set_pawStatusSelected] = useState(null)
  const [_pawStatusSelectItems, set_pawStatusSelectItems] = useState([])
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
      site: (modelData && modelData.site) || "",
      pawNumber: (modelData && modelData.pawNumber) || "",
      woNumber: (modelData && modelData.woNumber) || "",
      location: (modelData && modelData.location) || "",
      pawLevel: (modelData && modelData.pawLevel) || "",
      pawAssessment: (modelData && modelData.pawAssessment) || "",
      par: (modelData && modelData.par) || "",
      finding: (modelData && modelData.finding) || "",
      descriptionShort: (modelData && modelData.descriptionShort) || "",
      pawResponse: (modelData && modelData.pawResponse) || "",
      dateClosedByPar:
        (modelData &&
          modelData?.dateClosedByPar &&
          moment(modelData?.dateClosedByPar).format("YYYY-MM-DD")) ||
        null,
      responseBy: (modelData && modelData.responseBy) || "",
      comments: (modelData && modelData.comments) || "",
      modNumber: (modelData && modelData.modNumber) || "",
      annex: (modelData && modelData.annex) || "",
      specItem1: (modelData && modelData.specItem1) || "",
      title: (modelData && modelData.title) || "",
      dateReceived:
        (modelData &&
          modelData?.dateReceived &&
          moment(modelData?.dateReceived).format("YYYY-MM-DD")) ||
        null,
      dateAcknowledged:
        (modelData &&
          modelData?.dateAcknowledged &&
          moment(modelData?.dateAcknowledged).format("YYYY-MM-DD")) ||
        null,
      validity: (modelData && modelData.validity) || "",
      pawStatus: (modelData && modelData.pawStatus) || "",
      unsatCondition: (modelData && modelData.unsatCondition) || "",
      unsatRootCause: (modelData && modelData.unsatRootCause) || "",
      description: (modelData && modelData.description) || "",
      pawRating: (modelData && modelData.pawRating) || "",
      toNumber: (modelData && modelData.toNumber) || "",
      dateSentToPar:
        (modelData &&
          modelData?.dateSentToPar &&
          moment(modelData?.dateSentToPar).format("YYYY-MM-DD")) ||
        null,
      pastDueFromPar: (modelData && modelData.pastDueFromPar) || "",
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("id is required"),
      // site: Yup.string().required("site is required"),
      // pawNumber: Yup.string().required("pawNumber is required"),
      // woNumber: Yup.string().required("woNumber is required"),
      // location: Yup.string().required("location is required"),
      // pawLevel: Yup.string().required("pawLevel is required"),
      // pawAssessment: Yup.string().required("pawAssessment is required"),
      // par: Yup.string().required("par is required"),
      // finding: Yup.string().required("finding is required"),
      // descriptionShort: Yup.string().required("descriptionShort is required"),
      // pawResponse: Yup.string().required("pawResponse is required"),
      // dateClosedByPar: Yup.string().required("dateClosedByPar is required"),
      // responseBy: Yup.string().required("responseBy is required"),
      // comments: Yup.string().required("comments is required"),
      // modNumber: Yup.string().required("modNumber is required"),
      // annex: Yup.string().required("annex is required"),
      // specItem1: Yup.string().required("specItem1 is required"),
      // title: Yup.string().required("title is required"),
      // dateReceived: Yup.string().required("dateReceived is required"),
      // dateAcknowledged: Yup.string().required("dateAcknowledged is required"),
      // validity: Yup.string().required("validity is required"),
      // pawStatus: Yup.string().required("pawStatus is required"),
      // unsatCondition: Yup.string().required("unsatCondition is required"),
      // unsatRootCause: Yup.string().required("unsatRootCause is required"),
      // description: Yup.string().required("description is required"),
      // pawRating: Yup.string().required("pawRating is required"),
      // toNumber: Yup.string().required("toNumber is required"),
      // dateSentToPar: Yup.string().required("dateSentToPar is required"),
      // pastDueFromPar: Yup.string().required("pastDueFromPar is required"),
    }),

    onSubmit: values => {
      console.log("add-update save..01", values)

      const submitModel = {
        id: values.id,
        site: _siteSelected,
        pawNumber: values.pawNumber,
        woNumber: values.woNumber,
        location: values.location,
        pawLevel: _pawLevelSelected,
        pawAssessment: _pawAssessmentSelected,
        par: _parSelected,
        finding: values.finding,
        descriptionShort: values.descriptionShort,
        pawResponse: values.pawResponse,
        dateClosedByPar: values.dateClosedByPar,
        responseBy: _responseBySelected,
        comments: values.comments,
        modNumber: values.modNumber,
        annex: _annexSelected,
        specItem1: _specItem1Selected,
        title: _titleSelected,
        dateReceived: values.dateReceived,
        dateAcknowledged: values.dateAcknowledged,
        validity: _validitySelected,
        pawStatus: _pawStatusSelected,
        unsatCondition: _unsatConditionSelected,
        unsatRootCause: _unsatRootCauseSelected,
        description: values.description,
        pawRating: values.pawRating,
        toNumber: values.toNumber,
        dateSentToPar: values.dateSentToPar,
        pastDueFromPar: values.pastDueFromPar,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editPAWTrackerAddUpdate(submitModel)
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
        newPAWTrackerAddUpdate(submitModel)
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
            ? "Update PAWTrackerAddUpdate"
            : "New PAWTrackerAddUpdate"}
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
                  <Label>site</Label>
                  <Select
                    id="site"
                    name="site"
                    type="text"
                    onChange={e => {
                      set_siteSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_siteSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select site"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.site && validation.errors.site ? (
                    <FormFeedback type="invalid">
                      {validation.errors.site}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">pawNumber</Label>
                  <Input
                    id="pawNumber"
                    name="pawNumber"
                    type="text"
                    placeholder="pawNumber"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pawNumber || ""}
                    invalid={
                      validation.touched.pawNumber &&
                      validation.errors.pawNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pawNumber &&
                  validation.errors.pawNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pawNumber}
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
                  <Label>pawLevel</Label>
                  <Select
                    id="pawLevel"
                    name="pawLevel"
                    type="text"
                    onChange={e => {
                      set_pawLevelSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_pawLevelSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select pawLevel"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.pawLevel && validation.errors.pawLevel ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pawLevel}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>pawAssessment</Label>
                  <Select
                    id="pawAssessment"
                    name="pawAssessment"
                    type="text"
                    onChange={e => {
                      set_pawAssessmentSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_pawAssessmentSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select pawAssessment"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.pawAssessment &&
                  validation.errors.pawAssessment ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pawAssessment}
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
                  <Label className="form-label">finding</Label>
                  <Input
                    id="finding"
                    name="finding"
                    type="textarea"
                    placeholder="finding"
                    maxLength="225"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.finding || ""}
                    invalid={
                      validation.touched.finding && validation.errors.finding
                        ? true
                        : false
                    }
                  />
                  {validation.touched.finding && validation.errors.finding ? (
                    <FormFeedback type="invalid">
                      {validation.errors.finding}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">descriptionShort</Label>
                  <Input
                    id="descriptionShort"
                    name="descriptionShort"
                    type="textarea"
                    placeholder="descriptionShort"
                    maxLength="225"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.descriptionShort || ""}
                    invalid={
                      validation.touched.descriptionShort &&
                      validation.errors.descriptionShort
                        ? true
                        : false
                    }
                  />
                  {validation.touched.descriptionShort &&
                  validation.errors.descriptionShort ? (
                    <FormFeedback type="invalid">
                      {validation.errors.descriptionShort}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">pawResponse</Label>
                  <Input
                    id="pawResponse"
                    name="pawResponse"
                    type="textarea"
                    placeholder="pawResponse"
                    maxLength="225"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pawResponse || ""}
                    invalid={
                      validation.touched.pawResponse &&
                      validation.errors.pawResponse
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pawResponse &&
                  validation.errors.pawResponse ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pawResponse}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">dateClosedByPar</Label>
                  <Input
                    id="dateClosedByPar"
                    name="dateClosedByPar"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateClosedByPar"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateClosedByPar || ""}
                    invalid={
                      validation.touched.dateClosedByPar &&
                      validation.errors.dateClosedByPar
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateClosedByPar &&
                  validation.errors.dateClosedByPar ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateClosedByPar}
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
                  <Label className="form-label">modNumber</Label>
                  <Input
                    id="modNumber"
                    name="modNumber"
                    type="text"
                    placeholder="modNumber"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.modNumber || ""}
                    invalid={
                      validation.touched.modNumber &&
                      validation.errors.modNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.modNumber &&
                  validation.errors.modNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.modNumber}
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
                  <Label className="form-label">dateAcknowledged</Label>
                  <Input
                    id="dateAcknowledged"
                    name="dateAcknowledged"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateAcknowledged"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateAcknowledged || ""}
                    invalid={
                      validation.touched.dateAcknowledged &&
                      validation.errors.dateAcknowledged
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateAcknowledged &&
                  validation.errors.dateAcknowledged ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateAcknowledged}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>validity</Label>
                  <Select
                    id="validity"
                    name="validity"
                    type="text"
                    onChange={e => {
                      set_validitySelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_validitySelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select validity"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.validity && validation.errors.validity ? (
                    <FormFeedback type="invalid">
                      {validation.errors.validity}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>pawStatus</Label>
                  <Select
                    id="pawStatus"
                    name="pawStatus"
                    type="text"
                    onChange={e => {
                      set_pawStatusSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_pawStatusSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select pawStatus"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.pawStatus &&
                  validation.errors.pawStatus ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pawStatus}
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
                  <Label className="form-label">description</Label>
                  <Input
                    id="description"
                    name="description"
                    type="text"
                    placeholder="description"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ""}
                    invalid={
                      validation.touched.description &&
                      validation.errors.description
                        ? true
                        : false
                    }
                  />
                  {validation.touched.description &&
                  validation.errors.description ? (
                    <FormFeedback type="invalid">
                      {validation.errors.description}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">pawRating</Label>
                  <Input
                    id="pawRating"
                    name="pawRating"
                    type="text"
                    placeholder="pawRating"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pawRating || ""}
                    invalid={
                      validation.touched.pawRating &&
                      validation.errors.pawRating
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pawRating &&
                  validation.errors.pawRating ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pawRating}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">toNumber</Label>
                  <Input
                    id="toNumber"
                    name="toNumber"
                    type="text"
                    placeholder="toNumber"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.toNumber || ""}
                    invalid={
                      validation.touched.toNumber && validation.errors.toNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.toNumber && validation.errors.toNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.toNumber}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">dateSentToPar</Label>
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
                  <Label className="form-label">pastDueFromPar</Label>
                  <Input
                    id="pastDueFromPar"
                    name="pastDueFromPar"
                    type="text"
                    placeholder="pastDueFromPar"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pastDueFromPar || ""}
                    invalid={
                      validation.touched.pastDueFromPar &&
                      validation.errors.pastDueFromPar
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pastDueFromPar &&
                  validation.errors.pastDueFromPar ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pastDueFromPar}
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

PAWTrackerAddUpdate.propTypes = {
  onSaveClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  open: PropTypes.bool,
  modelData: PropTypes.object,
}

export default PAWTrackerAddUpdate
