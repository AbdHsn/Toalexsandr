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
import { getDDL } from "../../services/common-service"

const PAWTrackerAddUpdate = ({
  open,
  modelData,
  onSaveClick,
  onCancelClick,
}) => {
  useEffect(() => {
    //set existing selected value
    modelData && modelData?.site != null
      ? set_siteSelected({ label: modelData?.site, value: modelData?.site })
      : set_siteSelected("")

    modelData && modelData?.pawLevel != null
      ? set_pawLevelSelected({
          label: modelData?.pawLevel,
          value: modelData?.pawLevel,
        })
      : set_pawLevelSelected("")

    modelData && modelData?.pawAssessment != null
      ? set_pawAssessmentSelected({
          label: modelData?.pawAssessment,
          value: modelData?.pawAssessment,
        })
      : set_pawAssessmentSelected("")

    modelData && modelData?.par != null
      ? set_parSelected({ label: modelData?.par, value: modelData?.par })
      : set_parSelected("")

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

    modelData && modelData?.validity != null
      ? set_validitySelected({
          label: modelData?.validity,
          value: modelData?.validity,
        })
      : set_validitySelected("")

    modelData && modelData?.responseBy != null
      ? set_responseBySelected({
          label: modelData?.responseBy,
          value: modelData?.responseBy,
        })
      : set_responseBySelected("")

    modelData && modelData?.pawStatus != null
      ? set_pawStatusSelected({
          label: modelData?.pawStatus,
          value: modelData?.pawStatus,
        })
      : set_pawStatusSelected("")

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

    //Call dropdown data
    initializeDropdownData()
  }, [modelData])

  const [isSaving, setIsSaving] = useState(false)

  const [_siteSelected, set_siteSelected] = useState("")
  const [_siteSelectItems, set_siteSelectItems] = useState([])
  const [_pawLevelSelected, set_pawLevelSelected] = useState("")
  const [_pawLevelSelectItems, set_pawLevelSelectItems] = useState([])
  const [_pawAssessmentSelected, set_pawAssessmentSelected] = useState("")
  const [_pawAssessmentSelectItems, set_pawAssessmentSelectItems] = useState([])
  const [_parSelected, set_parSelected] = useState("")
  const [_parSelectItems, set_parSelectItems] = useState([])
  const [_annexSelected, set_annexSelected] = useState("")
  const [_annexSelectItems, set_annexSelectItems] = useState([])
  const [_specItem1Selected, set_specItem1Selected] = useState("")
  const [_specItem1SelectItems, set_specItem1SelectItems] = useState([])
  const [_titleSelected, set_titleSelected] = useState("")
  const [_titleSelectItems, set_titleSelectItems] = useState([])
  const [_validitySelected, set_validitySelected] = useState("")
  const [_validitySelectItems, set_validitySelectItems] = useState([])
  const [_responseBySelected, set_responseBySelected] = useState("")
  const [_responseBySelectItems, set_responseBySelectItems] = useState([])
  const [_pawStatusSelected, set_pawStatusSelected] = useState("")
  const [_pawStatusSelectItems, set_pawStatusSelectItems] = useState([])
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
      site: (modelData && modelData.site) || "",
      pawNumber: (modelData && modelData.pawNumber) || "",
      woNumber: (modelData && modelData.woNumber) || "",
      location: (modelData && modelData.location) || "",
      pawLevel: (modelData && modelData.pawLevel) || "",
      pawAssessment: (modelData && modelData.pawAssessment) || "",
      par: (modelData && modelData.par) || "",
      modNumber: (modelData && modelData.modNumber) || "",
      annex: (modelData && modelData.annex) || "",
      specItem1: (modelData && modelData.specItem) || "",
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
      description: (modelData && modelData.description) || "",
      descriptionShort: (modelData && modelData.descriptionShort) || "",
      dateSentToPar:
        (modelData &&
          modelData?.dateReceived &&
          moment(modelData?.dateReceived).format("YYYY-MM-DD")) ||
        null,
      dateClosedByPar:
        (modelData &&
          modelData?.dateClosedByPar &&
          moment(modelData?.dateClosedByPar).format("YYYY-MM-DD")) ||
        null,
      responseBy: (modelData && modelData.responseBy) || "",
      pawStatus: (modelData && modelData.status) || "",
      unsatCondition: (modelData && modelData.unsatCondition) || "",
      unsatRootCause: (modelData && modelData.unsatRootCause) || "",
      pawResponse: (modelData && modelData.pawResponse) || "",
      comments: (modelData && modelData.comments) || "",
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
      // modNumber: Yup.string().required("modNumber is required"),
      // annex: Yup.string().required("annex is required"),
      // specItem1: Yup.string().required("specItem1 is required"),
      // title: Yup.string().required("title is required"),
      // dateReceived: Yup.string().required("dateReceived is required"),
      // dateAcknowledged: Yup.string().required("dateAcknowledged is required"),
      // validity: Yup.string().required("validity is required"),
      // description: Yup.string().required("description is required"),
      // descriptionShort: Yup.string().required("descriptionShort is required"),
      // dateSentToPar: Yup.string().required("dateSentToPar is required"),
      // dateClosedByPar: Yup.string().required("dateClosedByPar is required"),
      // responseBy: Yup.string().required("responseBy is required"),
      // pawStatus: Yup.string().required("pawStatus is required"),
      // unsatCondition: Yup.string().required("unsatCondition is required"),
      // unsatRootCause: Yup.string().required("unsatRootCause is required"),
      // pawResponse: Yup.string().required("pawResponse is required"),
      // comments: Yup.string().required("comments is required"),
    }),

    onSubmit: values => {
      console.log("add-update save..01", values)

      const submitModel = {
        id: values.id,
        site: _siteSelected.value,
        pawNumber: values.pawNumber,
        woNumber: values.woNumber,
        location: values.location,
        pawLevel: _pawLevelSelected.value,
        pawAssessment: _pawAssessmentSelected.value,
        par: _parSelected.value,
        modNumber: values.modNumber,
        annex: _annexSelected.value,
        specItem1: _specItem1Selected.value,
        title: _titleSelected.value,
        dateReceived: values.dateReceived,
        dateAcknowledged: values.dateAcknowledged,
        validity: _validitySelected.value,
        description: values.description,
        descriptionShort: values.descriptionShort,
        dateSentToPar: values.dateSentToPar,
        dateClosedByPar: values.dateClosedByPar,
        responseBy: _responseBySelected.value,
        pawStatus: _pawStatusSelected.value,
        unsatCondition: _unsatConditionSelected.value,
        unsatRootCause: _unsatRootCauseSelected.value,
        pawResponse: values.pawResponse,
        comments: values.comments,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editPAWTrackerAddUpdate(submitModel?.id, submitModel)
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
        newPAWTrackerAddUpdate(submitModel)
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

  const initializeDropdownData = () => {
    //SITE
    getDDL("SITE")
      .then(res => {
        if (res.data.length > 0) {
          set_siteSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed SITE_DDL: ", error)
      })

    //PAWLEVEL
    getDDL("PAWLEVEL")
      .then(res => {
        if (res.data.length > 0) {
          set_pawLevelSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed PAWLEVEL_DDL: ", error)
      })

    //PAWASSESSMENT
    getDDL("PAWASSESSMENT")
      .then(res => {
        if (res.data.length > 0) {
          set_pawAssessmentSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed PAWASSESSMENT_DDL: ", error)
      })

    //JAXPAR
    getDDL("JAXPAR")
      .then(res => {
        if (res.data.length > 0) {
          set_parSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed JAXPAR_DDL: ", error)
      })

    //ANNEX
    getDDL("ANNEX")
      .then(res => {
        if (res.data.length > 0) {
          set_annexSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed ANNEX_DDL: ", error)
      })

    //SPECITEM
    getDDL("SPECITEM")
      .then(res => {
        if (res.data.length > 0) {
          set_specItem1SelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed SPECITEM_DDL: ", error)
      })

    //TITLE
    getDDL("TITLE")
      .then(res => {
        if (res.data.length > 0) {
          set_titleSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed TITLE_DDL: ", error)
      })

    //INSPECTIONSURVRESULTS
    getDDL("INSPECTIONSURVRESULTS")
      .then(res => {
        if (res.data.length > 0) {
          set_surveillanceResultsSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed INSPECTIONSURVRESULTS_DDL: ", error)
      })

    //INSPECTIONPDRSTATUS
    getDDL("INSPECTIONPDRSTATUS")
      .then(res => {
        if (res.data.length > 0) {
          set_statusSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed INSPECTIONPDRSTATUS_DDL: ", error)
      })

    //DIRECTORYNAMES
    getDDL("DIRECTORYNAMES")
      .then(res => {
        if (res.data.length > 0) {
          set_fmnameSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed DIRECTORYNAMES_DDL: ", error)
      })

    //DIRECTORYNAMETITLES
    getDDL("DIRECTORYNAMETITLES")
      .then(res => {
        if (res.data.length > 0) {
          set_fmtitleSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed DIRECTORYNAMETITLES_DDL: ", error)
      })

    //USERS
    getDDL("USERS")
      .then(res => {
        if (res.data.length > 0) {
          set_closedBySelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed USERS_DDL: ", error)
      })

    //CAUSECODE
    getDDL("CAUSECODE")
      .then(res => {
        if (res.data.length > 0) {
          set_causeCodeSelectItems(res.data)
          set_inspectionFailReasonSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed CAUSECODE_DDL: ", error)
      })

    //ROOTCAUSE
    getDDL("ROOTCAUSE")
      .then(res => {
        if (res.data.length > 0) {
          set_rootCauseSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed ROOTCAUSE_DDL: ", error)
      })
  }

  return (
    <>
      <Modal isOpen={open} className="modal-dialog modal-lg">
        <ModalHeader tag="h4">
          {modelData?.id > 0 ? "Update PAW Tracker" : "New PAW Tracker"}
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
                      <Label>Site</Label>
                      <Select
                        id="site"
                        name="site"
                        type="text"
                        onChange={e => {
                          set_siteSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_siteSelectItems}
                        defaultValue={_siteSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Site"
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
                      <Label className="form-label">PAW Number</Label>
                      <Input
                        id="pawNumber"
                        name="pawNumber"
                        type="text"
                        placeholder="PAW Number"
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
                      <Label>PAW Level</Label>
                      <Select
                        id="pawLevel"
                        name="pawLevel"
                        type="text"
                        onChange={e => {
                          set_pawLevelSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_pawLevelSelectItems}
                        defaultValue={_pawLevelSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select PAW Level"
                        isClearable={false}
                        isSearchable={true}
                        isLoading={false}
                        loadingMessage={() => "Fetching Data..."}
                        noOptionsMessage={() => "No Data Found."}
                      />
                      {validation.touched.pawLevel &&
                      validation.errors.pawLevel ? (
                        <FormFeedback type="invalid">
                          {validation.errors.pawLevel}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>PAW Assessment</Label>
                      <Select
                        id="pawAssessment"
                        name="pawAssessment"
                        type="text"
                        onChange={e => {
                          set_pawAssessmentSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_pawAssessmentSelectItems}
                        defaultValue={_pawAssessmentSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select PAW Assessment"
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
                  </Col>

                  <Col className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <Label className="form-label">MOD Number</Label>
                      <Input
                        id="modNumber"
                        name="modNumber"
                        type="text"
                        placeholder="MOD Number"
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
                      <Label className="form-label">Date Acknowledged</Label>
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
                      <Label>Validity</Label>
                      <Select
                        id="validity"
                        name="validity"
                        type="text"
                        onChange={e => {
                          set_validitySelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_validitySelectItems}
                        defaultValue={_validitySelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Validity"
                        isClearable={false}
                        isSearchable={true}
                        isLoading={false}
                        loadingMessage={() => "Fetching Data..."}
                        noOptionsMessage={() => "No Data Found."}
                      />
                      {validation.touched.validity &&
                      validation.errors.validity ? (
                        <FormFeedback type="invalid">
                          {validation.errors.validity}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>

                <div className="mb-3">
                  <Label className="form-label">Finding</Label>
                  <Input
                    id="description"
                    name="description"
                    type="textarea"
                    placeholder="Finding"
                    maxLength="225"
                    rows="5"
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
                  <Label className="form-label">
                    Description Short Version
                  </Label>
                  <Input
                    id="descriptionShort"
                    name="descriptionShort"
                    type="textarea"
                    placeholder="Description Short Version"
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

                <Row>
                  <Col className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <Label className="form-label">Responded To PAR</Label>
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
                      <Label className="form-label">Date Closed By PAR</Label>
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
                  </Col>

                  <Col className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <Label>PAW Status</Label>
                      <Select
                        id="pawStatus"
                        name="pawStatus"
                        type="text"
                        onChange={e => {
                          set_pawStatusSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_pawStatusSelectItems}
                        defaultValue={_pawStatusSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select PAW Status"
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
                  <Label className="form-label">PAW Response</Label>
                  <Input
                    id="pawResponse"
                    name="pawResponse"
                    type="textarea"
                    placeholder="PAW Response"
                    maxLength="225"
                    rows="5"
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
                  <Label className="form-label">QC Comments</Label>
                  <Input
                    id="comments"
                    name="comments"
                    type="textarea"
                    placeholder="QC Comments"
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
