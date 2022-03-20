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
  newNCRTrackerAddUpdate,
  editNCRTrackerAddUpdate,
} from "../../services/ncr-trackers-service"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import BtnSaving from "../../components/Common/BtnSaving"
import { getDDL } from "../../services/common-service"

const NCRTrackerAddUpdate = ({
  open,
  modelData,
  onSaveClick,
  onCancelClick,
}) => {
  useEffect(() => {
    //set existing selected value
    modelData && modelData?.status != null
      ? set_statusSelected({
          label: modelData?.status,
          value: modelData?.status,
        })
      : set_statusSelected("")

    modelData && modelData?.qcInspector != null
      ? set_qcInspectorSelected({
          label: modelData?.qcInspector,
          value: modelData?.qcInspector,
        })
      : set_qcInspectorSelected("")

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

    modelData && modelData?.assessmentType != null
      ? set_assessmentTypeSelected({
          label: modelData?.assessmentType,
          value: modelData?.assessmentType,
        })
      : set_assessmentTypeSelected("")

    modelData && modelData?.nonconformanceType != null
      ? set_nonconformanceTypeSelected({
          label: modelData?.nonconformanceType,
          value: modelData?.nonconformanceType,
        })
      : set_nonconformanceTypeSelected("")

    //Call dropdown data
    initializeDropdownData()
  }, [modelData])

  const [isSaving, setIsSaving] = useState(false)

  const [_statusSelected, set_statusSelected] = useState("")
  const [_statusSelectItems, set_statusSelectItems] = useState([])
  const [_qcInspectorSelected, set_qcInspectorSelected] = useState("")
  const [_qcInspectorSelectItems, set_qcInspectorSelectItems] = useState([])
  const [_annexSelected, set_annexSelected] = useState("")
  const [_annexSelectItems, set_annexSelectItems] = useState([])
  const [_specItemSelected, set_specItemSelected] = useState("")
  const [_specItemSelectItems, set_specItemSelectItems] = useState([])
  const [_titleSelected, set_titleSelected] = useState("")
  const [_titleSelectItems, set_titleSelectItems] = useState([])
  const [_assessmentTypeSelected, set_assessmentTypeSelected] = useState("")
  const [_assessmentTypeSelectItems, set_assessmentTypeSelectItems] = useState(
    []
  )
  const [_nonconformanceTypeSelected, set_nonconformanceTypeSelected] =
    useState("")
  const [_nonconformanceTypeSelectItems, set_nonconformanceTypeSelectItems] =
    useState([])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (modelData && modelData.id) || 0,
      ncrNumber: (modelData && modelData.ncrNumber) || "",
      qcfrNumber: (modelData && modelData.qcfrNumber) || "",
      pdrNumber: (modelData && modelData.pdrNumber) || "",
      woNumber: (modelData && modelData.woNumber) || "",
      dateIssued:
        (modelData &&
          modelData?.dateIssued &&
          moment(modelData?.dateIssued).format("YYYY-MM-DD")) ||
        null,
      qcInspector: (modelData && modelData.qcInspector) || "",
      annex: (modelData && modelData.annex) || "",
      specItem: (modelData && modelData.specItem) || "",
      title: (modelData && modelData.title) || "",
      assessmentType: (modelData && modelData.assessmentType) || "",
      nonconformanceType: (modelData && modelData.nonconformanceType) || "",
      nonconformanceSummary:
        (modelData && modelData.nonConformanceSummary) || "",
      requirement1: (modelData && modelData.requirement1) || "",
      observation1: (modelData && modelData.observation1) || "",
      requirement2: (modelData && modelData.requirement2) || "",
      observation2: (modelData && modelData.observation2) || "",
      requirement3: (modelData && modelData.requirement3) || "",
      observation3: (modelData && modelData.observation3) || "",
      requirement4: (modelData && modelData.requirement4) || "",
      observation4: (modelData && modelData.observation4) || "",
      responsiblePersone: (modelData && modelData.responsiblePerson) || "",
      responsibleDiscipline:
        (modelData && modelData.responsibleDiscipline) || "",
      responsibleSub: (modelData && modelData.responsibleSub) || "",
      dateCapDue:
        (modelData &&
          modelData?.dateCAPDue &&
          moment(modelData?.dateCAPDue).format("YYYY-MM-DD")) ||
        null,
      status: (modelData && modelData.status) || "",
      comments: (modelData && modelData.comments) || "",
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("id is required"),
      // ncrNumber: Yup.string().required("ncrNumber is required"),
      // qcfrNumber: Yup.string().required("qcfrNumber is required"),
      // pdrNumber: Yup.string().required("pdrNumber is required"),
      // woNumber: Yup.string().required("woNumber is required"),
      // dateIssued: Yup.string().required("dateIssued is required"),
      // qcInspector: Yup.string().required("qcInspector is required"),
      // annex: Yup.string().required("annex is required"),
      // specItem: Yup.string().required("specItem is required"),
      // title: Yup.string().required("title is required"),
      // assessmentType: Yup.string().required("assessmentType is required"),
      // nonconformanceType: Yup.string().required("nonconformanceType is required"),
      // nonconformanceSummary: Yup.string().required("nonconformanceSummary is required"),
      // requirement1: Yup.string().required("requirement1 is required"),
      // observation1: Yup.string().required("observation1 is required"),
      // requirement2: Yup.string().required("requirement2 is required"),
      // observation2: Yup.string().required("observation2 is required"),
      // requirement3: Yup.string().required("requirement3 is required"),
      // observation3: Yup.string().required("observation3 is required"),
      // requirement4: Yup.string().required("requirement4 is required"),
      // observation4: Yup.string().required("observation4 is required"),
      // responsiblePersone: Yup.string().required("responsiblePersone is required"),
      // responsibleDiscipline: Yup.string().required("responsibleDiscipline is required"),
      // responsibleSub: Yup.string().required("responsibleSub is required"),
      // dateCapDue: Yup.string().required("dateCapDue is required"),
      // status: Yup.string().required("status is required"),
      // comments: Yup.string().required("comments is required"),
    }),

    onSubmit: values => {
      console.log("add-update save..01", values)

      const submitModel = {
        id: values.id,
        ncrNumber: values.ncrNumber,
        qcfrNumber: values.qcfrNumber,
        pdrNumber: values.pdrNumber,
        woNumber: values.woNumber,
        dateIssued: values.dateIssued,
        qcInspector: _qcInspectorSelected.value,
        annex: _annexSelected.value,
        specItem: _specItemSelected.value,
        title: _titleSelected.value,
        assessmentType: _assessmentTypeSelected.value,
        nonconformanceType: _nonconformanceTypeSelected.value,
        nonconformanceSummary: values.nonconformanceSummary,
        requirement1: values.requirement1,
        observation1: values.observation1,
        requirement2: values.requirement2,
        observation2: values.observation2,
        requirement3: values.requirement3,
        observation3: values.observation3,
        requirement4: values.requirement4,
        observation4: values.observation4,
        responsiblePersone: values.responsiblePersone,
        responsibleDiscipline: values.responsibleDiscipline,
        responsibleSub: values.responsibleSub,
        dateCapDue: values.dateCapDue,
        status: _statusSelected.value,
        comments: values.comments,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editNCRTrackerAddUpdate(submitModel?.id, submitModel)
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
        newNCRTrackerAddUpdate(submitModel)
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
          set_specItemSelectItems(res.data)
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

    //NONCONFORMANCETYPE
    getDDL("NONCONFORMANCETYPE")
      .then(res => {
        if (res.data.length > 0) {
          set_nonconformanceTypeSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed NONCONFORMANCETYPE_DDL: ", error)
      })

    //NCRASSESSMENTTYPE
    getDDL("NCRASSESSMENTTYPE")
      .then(res => {
        if (res.data.length > 0) {
          set_assessmentTypeSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed NCRASSESSMENTTYPE_DDL: ", error)
      })

    //NCRSTATUS
    getDDL("NCRSTATUS")
      .then(res => {
        if (res.data.length > 0) {
          set_statusSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed NCRSTATUS_DDL: ", error)
      })

    //USERS
    getDDL("USERS")
      .then(res => {
        if (res.data.length > 0) {
          set_qcInspectorSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed USERS_DDL: ", error)
      })
  }

  return (
    <>
      <Modal isOpen={open} className="modal-dialog modal-lg">
        <ModalHeader tag="h4">
          {modelData?.id > 0 ? "Update NCR Tracker" : "New NCR Tracker"}
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
                      <Label className="form-label">QCFR Number</Label>
                      <Input
                        id="qcfrNumber"
                        name="qcfrNumber"
                        type="text"
                        placeholder="QCFR Number"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.qcfrNumber || ""}
                        invalid={
                          validation.touched.qcfrNumber &&
                          validation.errors.qcfrNumber
                            ? true
                            : false
                        }
                      />
                      {validation.touched.qcfrNumber &&
                      validation.errors.qcfrNumber ? (
                        <FormFeedback type="invalid">
                          {validation.errors.qcfrNumber}
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
                      <Label>QC Inspector</Label>
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
                        placeholder="Select QC Inspector"
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
                      <Label>Assessment Type</Label>
                      <Select
                        id="assessmentType"
                        name="assessmentType"
                        type="text"
                        onChange={e => {
                          set_assessmentTypeSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_assessmentTypeSelectItems}
                        defaultValue={_assessmentTypeSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Assessment Type"
                        isClearable={false}
                        isSearchable={true}
                        isLoading={false}
                        loadingMessage={() => "Fetching Data..."}
                        noOptionsMessage={() => "No Data Found."}
                      />
                      {validation.touched.assessmentType &&
                      validation.errors.assessmentType ? (
                        <FormFeedback type="invalid">
                          {validation.errors.assessmentType}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>Nonconformance Type</Label>
                      <Select
                        id="nonconformanceType"
                        name="nonconformanceType"
                        type="text"
                        onChange={e => {
                          set_nonconformanceTypeSelected({
                            label: e.label,
                            value: e.value,
                          })
                        }}
                        onBlur={validation.handleBlur}
                        options={_nonconformanceTypeSelectItems}
                        defaultValue={_nonconformanceTypeSelected}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select Nonconformance Type"
                        isClearable={false}
                        isSearchable={true}
                        isLoading={false}
                        loadingMessage={() => "Fetching Data..."}
                        noOptionsMessage={() => "No Data Found."}
                      />
                      {validation.touched.nonconformanceType &&
                      validation.errors.nonconformanceType ? (
                        <FormFeedback type="invalid">
                          {validation.errors.nonconformanceType}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">
                        Nonconformance Summary
                      </Label>
                      <Input
                        id="nonconformanceSummary"
                        name="nonconformanceSummary"
                        type="textarea"
                        placeholder="Nonconformance Summary"
                        maxLength="225"
                        rows="3"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.nonconformanceSummary || ""}
                        invalid={
                          validation.touched.nonconformanceSummary &&
                          validation.errors.nonconformanceSummary
                            ? true
                            : false
                        }
                      />
                      {validation.touched.nonconformanceSummary &&
                      validation.errors.nonconformanceSummary ? (
                        <FormFeedback type="invalid">
                          {validation.errors.nonconformanceSummary}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <Label className="form-label">Requirement 1</Label>
                      <Input
                        id="requirement1"
                        name="requirement1"
                        type="textarea"
                        placeholder="Requirement 1"
                        maxLength="225"
                        rows="3"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.requirement1 || ""}
                        invalid={
                          validation.touched.requirement1 &&
                          validation.errors.requirement1
                            ? true
                            : false
                        }
                      />
                      {validation.touched.requirement1 &&
                      validation.errors.requirement1 ? (
                        <FormFeedback type="invalid">
                          {validation.errors.requirement1}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Observation 1</Label>
                      <Input
                        id="observation1"
                        name="observation1"
                        type="textarea"
                        placeholder="Observation 1"
                        maxLength="225"
                        rows="3"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.observation1 || ""}
                        invalid={
                          validation.touched.observation1 &&
                          validation.errors.observation1
                            ? true
                            : false
                        }
                      />
                      {validation.touched.observation1 &&
                      validation.errors.observation1 ? (
                        <FormFeedback type="invalid">
                          {validation.errors.observation1}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Requirement 2</Label>
                      <Input
                        id="requirement2"
                        name="requirement2"
                        type="textarea"
                        placeholder="Requirement 2"
                        maxLength="225"
                        rows="3"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.requirement2 || ""}
                        invalid={
                          validation.touched.requirement2 &&
                          validation.errors.requirement2
                            ? true
                            : false
                        }
                      />
                      {validation.touched.requirement2 &&
                      validation.errors.requirement2 ? (
                        <FormFeedback type="invalid">
                          {validation.errors.requirement2}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Observation 2</Label>
                      <Input
                        id="observation2"
                        name="observation2"
                        type="textarea"
                        placeholder="Observation 2"
                        maxLength="225"
                        rows="3"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.observation2 || ""}
                        invalid={
                          validation.touched.observation2 &&
                          validation.errors.observation2
                            ? true
                            : false
                        }
                      />
                      {validation.touched.observation2 &&
                      validation.errors.observation2 ? (
                        <FormFeedback type="invalid">
                          {validation.errors.observation2}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Requirement 3</Label>
                      <Input
                        id="requirement3"
                        name="requirement3"
                        type="textarea"
                        placeholder="Requirement 3"
                        maxLength="225"
                        rows="3"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.requirement3 || ""}
                        invalid={
                          validation.touched.requirement3 &&
                          validation.errors.requirement3
                            ? true
                            : false
                        }
                      />
                      {validation.touched.requirement3 &&
                      validation.errors.requirement3 ? (
                        <FormFeedback type="invalid">
                          {validation.errors.requirement3}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Observation 3</Label>
                      <Input
                        id="observation3"
                        name="observation3"
                        type="textarea"
                        placeholder="Observation 3"
                        maxLength="225"
                        rows="3"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.observation3 || ""}
                        invalid={
                          validation.touched.observation3 &&
                          validation.errors.observation3
                            ? true
                            : false
                        }
                      />
                      {validation.touched.observation3 &&
                      validation.errors.observation3 ? (
                        <FormFeedback type="invalid">
                          {validation.errors.observation3}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Requirement 4</Label>
                      <Input
                        id="requirement4"
                        name="requirement4"
                        type="textarea"
                        placeholder="Requirement 4"
                        maxLength="225"
                        rows="3"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.requirement4 || ""}
                        invalid={
                          validation.touched.requirement4 &&
                          validation.errors.requirement4
                            ? true
                            : false
                        }
                      />
                      {validation.touched.requirement4 &&
                      validation.errors.requirement4 ? (
                        <FormFeedback type="invalid">
                          {validation.errors.requirement4}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Observation 4</Label>
                      <Input
                        id="observation4"
                        name="observation4"
                        type="textarea"
                        placeholder="Observation 4"
                        maxLength="225"
                        rows="3"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.observation4 || ""}
                        invalid={
                          validation.touched.observation4 &&
                          validation.errors.observation4
                            ? true
                            : false
                        }
                      />
                      {validation.touched.observation4 &&
                      validation.errors.observation4 ? (
                        <FormFeedback type="invalid">
                          {validation.errors.observation4}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>

                <div className="mb-3">
                  <Label className="form-label">Responsible Persone</Label>
                  <Input
                    id="responsiblePersone"
                    name="responsiblePersone"
                    type="text"
                    placeholder="Responsible Persone"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.responsiblePersone || ""}
                    invalid={
                      validation.touched.responsiblePersone &&
                      validation.errors.responsiblePersone
                        ? true
                        : false
                    }
                  />
                  {validation.touched.responsiblePersone &&
                  validation.errors.responsiblePersone ? (
                    <FormFeedback type="invalid">
                      {validation.errors.responsiblePersone}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Responsible Discipline</Label>
                  <Input
                    id="responsibleDiscipline"
                    name="responsibleDiscipline"
                    type="text"
                    placeholder="Responsible Discipline"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.responsibleDiscipline || ""}
                    invalid={
                      validation.touched.responsibleDiscipline &&
                      validation.errors.responsibleDiscipline
                        ? true
                        : false
                    }
                  />
                  {validation.touched.responsibleDiscipline &&
                  validation.errors.responsibleDiscipline ? (
                    <FormFeedback type="invalid">
                      {validation.errors.responsibleDiscipline}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Responsible Sub</Label>
                  <Input
                    id="responsibleSub"
                    name="responsibleSub"
                    type="text"
                    placeholder="Responsible Sub"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.responsibleSub || ""}
                    invalid={
                      validation.touched.responsibleSub &&
                      validation.errors.responsibleSub
                        ? true
                        : false
                    }
                  />
                  {validation.touched.responsibleSub &&
                  validation.errors.responsibleSub ? (
                    <FormFeedback type="invalid">
                      {validation.errors.responsibleSub}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Date Cap Due</Label>
                  <Input
                    id="dateCapDue"
                    name="dateCapDue"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateCapDue"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateCapDue || ""}
                    invalid={
                      validation.touched.dateCapDue &&
                      validation.errors.dateCapDue
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateCapDue &&
                  validation.errors.dateCapDue ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateCapDue}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Status</Label>
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
                    placeholder="Select Status"
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
                  <Label className="form-label">Comments</Label>
                  <Input
                    id="comments"
                    name="comments"
                    type="textarea"
                    placeholder="Comments"
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

NCRTrackerAddUpdate.propTypes = {
  onSaveClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  open: PropTypes.bool,
  modelData: PropTypes.object,
}

export default NCRTrackerAddUpdate
