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
  newInspectionAddUpdate,
  editInspectionAddUpdate,
} from "../../services/wo-inspect-service"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import BtnSaving from "../../components/Common/BtnSaving"
import { getDDL } from "../../services/common-service"
const AddModifyWOInspection = ({
  open,
  modelData,
  onSaveClick,
  onSaveSuccess,
  onCancelClick,
}) => {
  useEffect(() => {
    //set existing selected value
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

    modelData && modelData?.qcInspector != null
      ? set_qcInspectorSelected({
          label: modelData?.qcInspector,
          value: modelData?.qcInspector,
        })
      : set_qcInspectorSelected("")

    modelData && modelData?.inspectionResults != null
      ? set_inspectionResultSelected({
          label: modelData?.inspectionResults,
          value: modelData?.inspectionResults,
        })
      : set_inspectionResultSelected("")

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

    //Call dropdown data
    initializeDropdownData()
  }, [modelData])

  const [isSaving, setIsSaving] = useState(false)

  const [_annexSelected, set_annexSelected] = useState("")
  const [_annexSelectItems, set_annexSelectItems] = useState([])
  const [_specItemSelected, set_specItemSelected] = useState("")
  const [_specItemSelectItems, set_specItemSelectItems] = useState([])
  const [_titleSelected, set_titleSelected] = useState("")
  const [_titleSelectItems, set_titleSelectItems] = useState([])
  const [_qcInspectorSelected, set_qcInspectorSelected] = useState("")
  const [_qcInspectorSelectItems, set_qcInspectorSelectItems] = useState([])
  const [_inspectionResultSelected, set_inspectionResultSelected] = useState("")
  const [_inspectionResultSelectItems, set_inspectionResultSelectItems] =
    useState([])
  const [_causeCodeSelected, set_causeCodeSelected] = useState("")
  const [_causeCodeSelectItems, set_causeCodeSelectItems] = useState([])
  const [_rootCauseSelected, set_rootCauseSelected] = useState("")
  const [_rootCauseSelectItems, set_rootCauseSelectItems] = useState([])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (modelData && modelData.id) || 0,
      workOrder: (modelData && modelData.workOrder) || "",
      location: (modelData && modelData.location) || "",
      sstatus: (modelData && modelData.status) || "",
      elin: (modelData && modelData.elin) || "",
      annex: (modelData && modelData.annex) || "",
      specItem: (modelData && modelData.specItem) || "",
      title: (modelData && modelData.title) || "",
      workType: (modelData && modelData.workType) || "",
      subWorkType: (modelData && modelData.subWorkType) || "",
      elin2: (modelData && modelData.elin) || "",
      onBehalfOf: (modelData && modelData.onBehalfOf) || "",
      phone: (modelData && modelData.phone) || "",
      asset: (modelData && modelData.asset) || "",
      assetDescription: (modelData && modelData.assetDescription) || "",
      crew: (modelData && modelData.crew) || "",
      lead: (modelData && modelData.lead) || "",
      targetStart:
        (modelData &&
          modelData?.targetStart &&
          moment(modelData?.targetStart).format("YYYY-MM-DD")) ||
        null,
      targetFinish:
        (modelData &&
          modelData?.targetFinish &&
          moment(modelData?.targetFinish).format("YYYY-MM-DD")) ||
        null,
      actualStart:
        (modelData &&
          modelData?.actualStart &&
          moment(modelData?.actualStart).format("YYYY-MM-DD")) ||
        null,
      actualFinish:
        (modelData &&
          modelData?.actualFinish &&
          moment(modelData?.actualFinish).format("YYYY-MM-DD")) ||
        null,
      statusDate:
        (modelData &&
          modelData?.statusDate &&
          moment(modelData?.statusDate).format("YYYY-MM-DD")) ||
        null,
      description: (modelData && modelData.description) || "",
      longDescription: (modelData && modelData.longDescription) || "",
      qcInspector: (modelData && modelData.qcInspector) || "",
      inspectionResults: (modelData && modelData.inspectionResults) || "",
      inspectionDate:
        (modelData &&
          modelData?.inspectionDate &&
          moment(modelData?.inspectionDate).format("YYYY-MM-DD")) ||
        null,
      enteredDate:
        (modelData &&
          modelData?.enteredDate &&
          moment(modelData?.enteredDate).format("YYYY-MM-DD")) ||
        null,
      causeCode: (modelData && modelData.causeCode) || "",
      rootCause: (modelData && modelData.rootCause) || "",
      unsatFindings: (modelData && modelData.unsatFindings) || "",
      correctiveActions: (modelData && modelData.correctiveActions) || "",
      qcComments: (modelData && modelData.qcComments) || "",
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("id is required"),
      // workOrder: Yup.string().required("workOrder is required"),
      // location: Yup.string().required("location is required"),
      // status: Yup.string().required("status is required"),
      // elin: Yup.string().required("elin is required"),
      // annex: Yup.string().required("annex is required"),
      // specItem: Yup.string().required("specItem is required"),
      // title: Yup.string().required("title is required"),
      // workType: Yup.string().required("workType is required"),
      // subWorkType: Yup.string().required("subWorkType is required"),
      // elin2: Yup.string().required("elin2 is required"),
      // onBehalfOf: Yup.string().required("onBehalfOf is required"),
      // phone: Yup.string().required("phone is required"),
      // asset: Yup.string().required("asset is required"),
      // assetDescription: Yup.string().required("assetDescription is required"),
      // crew: Yup.string().required("crew is required"),
      // lead: Yup.string().required("lead is required"),
      // targetStart: Yup.string().required("targetStart is required"),
      // targetFinish: Yup.string().required("targetFinish is required"),
      // actualStart: Yup.string().required("actualStart is required"),
      // actualFinish: Yup.string().required("actualFinish is required"),
      // statusDate: Yup.string().required("statusDate is required"),
      // description: Yup.string().required("description is required"),
      // longDescription: Yup.string().required("longDescription is required"),
      // qcInspector: Yup.string().required("qcInspector is required"),
      // inspectionResult: Yup.string().required("inspectionResult is required"),
      // inspectionDate: Yup.string().required("inspectionDate is required"),
      // enteredDate: Yup.string().required("enteredDate is required"),
      // causeCode: Yup.string().required("causeCode is required"),
      // rootCause: Yup.string().required("rootCause is required"),
      // unsatFindings: Yup.string().required("unsatFindings is required"),
      // currectiveAction: Yup.string().required("currectiveAction is required"),
      // qcComments: Yup.string().required("qcComments is required"),
    }),

    onSubmit: values => {
      console.log("add-update save..01", values)

      const submitModel = {
        id: values.id,
        workOrder: values.workOrder,
        location: values.location,
        status: values.sstatus,
        elin: values.elin,
        annex: _annexSelected.value,
        specItem: _specItemSelected.value,
        title: _titleSelected.value,
        workType: values.workType,
        subWorkType: values.subWorkType,
        onBehalfOf: values.onBehalfOf,
        phone: values.phone,
        asset: values.asset,
        assetDescription: values.assetDescription,
        crew: values.crew,
        lead: values.lead,
        targetStart: values.targetStart,
        targetFinish: values.targetFinish,
        actualStart: values.actualStart,
        actualFinish: values.actualFinish,
        statusDate: values.statusDate,
        description: values.description,
        longDescription: values.longDescription,
        qcInspector: _qcInspectorSelected.value,
        inspectionResults: _inspectionResultSelected.value,
        inspectionDate: values.inspectionDate,
        enteredDate: values.enteredDate,
        causeCode: _causeCodeSelected.value,
        rootCause: _rootCauseSelected.value,
        unsatFindings: values.unsatFindings,
        correctiveActions: values.correctiveActions,
        qcComments: values.qcComments,
      }

      console.log("add-update save..02", submitModel)

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editInspectionAddUpdate(submitModel?.id, submitModel)
          .then(res => {
            console.log("submit model create response: ", res)
            if (res.data.id > 0) {
              toastr.success("Data successfully updated.", "NINETRAX")
              setIsSaving(false)
              validation.resetForm()
              onSaveClick(res.data)
              onSaveSuccess(true)
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
        newInspectionAddUpdate(submitModel)
          .then(res => {
            console.log("submit model update response: ", res)
            if (res.data.id > 0) {
              toastr.success("Data successfully created.", "NINETRAX")
              setIsSaving(false)
              validation.resetForm()
              onSaveClick(res.data)
              onSaveSuccess(true)
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
    //QCSTATUS
    getDDL("QCSTATUS")
      .then(res => {
        if (res.data.length > 0) {
          set_inspectionResultSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed QCSTATUS_DDL: ", error)
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

    //CAUSECODE
    getDDL("CAUSECODE")
      .then(res => {
        if (res.data.length > 0) {
          set_causeCodeSelectItems(res.data)
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
          {modelData?.id > 0 ? "Update Inspection" : "New Inspection"}
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Row>
              <Col className="col-md-4 col-sm-12">
                <Input
                  id="id"
                  name="id"
                  type="number"
                  placeholder="Id"
                  hidden={true}
                  defaultValue={validation.values.id || 0}
                />

                <div className="mb-3">
                  <Label className="form-label">WO Number</Label>
                  <Input
                    id="workOrder"
                    name="workOrder"
                    type="text"
                    placeholder="WO Number"
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
                  <Label className="form-label">WO Location</Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="WO Location"
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
                  <Label className="form-label">WO Status</Label>
                  <Input
                    id="sstatus"
                    name="sstatus"
                    type="text"
                    placeholder="WO Status"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.sstatus || ""}
                    invalid={
                      validation.touched.sstatus && validation.errors.sstatus
                        ? true
                        : false
                    }
                  />
                  {validation.touched.sstatus && validation.errors.sstatus ? (
                    <FormFeedback type="invalid">
                      {validation.errors.sstatus}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Elin</Label>
                  <Input
                    id="elin"
                    name="elin"
                    type="text"
                    placeholder="Elin"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.elin || ""}
                    invalid={
                      validation.touched.elin && validation.errors.elin
                        ? true
                        : false
                    }
                  />
                  {validation.touched.elin && validation.errors.elin ? (
                    <FormFeedback type="invalid">
                      {validation.errors.elin}
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
                  {validation.touched.specItem && validation.errors.specItem ? (
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
              </Col>
              <Col className="col-md-4 col-sm-12">
                <div className="mb-3">
                  <Label className="form-label">Work Type</Label>
                  <Input
                    id="workType"
                    name="workType"
                    type="text"
                    placeholder="Work Type"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.workType || ""}
                    invalid={
                      validation.touched.workType && validation.errors.workType
                        ? true
                        : false
                    }
                  />
                  {validation.touched.workType && validation.errors.workType ? (
                    <FormFeedback type="invalid">
                      {validation.errors.workType}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Sub Work Type</Label>
                  <Input
                    id="subWorkType"
                    name="subWorkType"
                    type="text"
                    placeholder="Sub Work Type"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.subWorkType || ""}
                    invalid={
                      validation.touched.subWorkType &&
                      validation.errors.subWorkType
                        ? true
                        : false
                    }
                  />
                  {validation.touched.subWorkType &&
                  validation.errors.subWorkType ? (
                    <FormFeedback type="invalid">
                      {validation.errors.subWorkType}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Elin #</Label>
                  <Input
                    id="elin2"
                    name="elin2"
                    type="text"
                    placeholder="Elin #"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.elin2 || ""}
                    invalid={
                      validation.touched.elin2 && validation.errors.elin2
                        ? true
                        : false
                    }
                  />
                  {validation.touched.elin2 && validation.errors.elin2 ? (
                    <FormFeedback type="invalid">
                      {validation.errors.elin2}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Point Of Contact</Label>
                  <Input
                    id="onBehalfOf"
                    name="onBehalfOf"
                    type="text"
                    placeholder="Point Of Contact"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.onBehalfOf || ""}
                    invalid={
                      validation.touched.onBehalfOf &&
                      validation.errors.onBehalfOf
                        ? true
                        : false
                    }
                  />
                  {validation.touched.onBehalfOf &&
                  validation.errors.onBehalfOf ? (
                    <FormFeedback type="invalid">
                      {validation.errors.onBehalfOf}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">POC Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="POC Phone"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.phone || ""}
                    invalid={
                      validation.touched.phone && validation.errors.phone
                        ? true
                        : false
                    }
                  />
                  {validation.touched.phone && validation.errors.phone ? (
                    <FormFeedback type="invalid">
                      {validation.errors.phone}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Asset</Label>
                  <Input
                    id="asset"
                    name="asset"
                    type="text"
                    placeholder="Asset"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.asset || ""}
                    invalid={
                      validation.touched.asset && validation.errors.asset
                        ? true
                        : false
                    }
                  />
                  {validation.touched.asset && validation.errors.asset ? (
                    <FormFeedback type="invalid">
                      {validation.errors.asset}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Asset Description</Label>
                  <Input
                    id="assetDescription"
                    name="assetDescription"
                    type="text"
                    placeholder="Asset Description"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.assetDescription || ""}
                    invalid={
                      validation.touched.assetDescription &&
                      validation.errors.assetDescription
                        ? true
                        : false
                    }
                  />
                  {validation.touched.assetDescription &&
                  validation.errors.assetDescription ? (
                    <FormFeedback type="invalid">
                      {validation.errors.assetDescription}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-md-4 col-sm-12">
                <div className="mb-3">
                  <Label className="form-label">Crew</Label>
                  <Input
                    id="crew"
                    name="crew"
                    type="text"
                    placeholder="Crew"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.crew || ""}
                    invalid={
                      validation.touched.crew && validation.errors.crew
                        ? true
                        : false
                    }
                  />
                  {validation.touched.crew && validation.errors.crew ? (
                    <FormFeedback type="invalid">
                      {validation.errors.crew}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Lead</Label>
                  <Input
                    id="lead"
                    name="lead"
                    type="text"
                    placeholder="Lead"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.lead || ""}
                    invalid={
                      validation.touched.lead && validation.errors.lead
                        ? true
                        : false
                    }
                  />
                  {validation.touched.lead && validation.errors.lead ? (
                    <FormFeedback type="invalid">
                      {validation.errors.lead}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Target Start</Label>
                  <Input
                    id="targetStart"
                    name="targetStart"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="targetStart"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.targetStart || ""}
                    invalid={
                      validation.touched.targetStart &&
                      validation.errors.targetStart
                        ? true
                        : false
                    }
                  />
                  {validation.touched.targetStart &&
                  validation.errors.targetStart ? (
                    <FormFeedback type="invalid">
                      {validation.errors.targetStart}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Target Finish</Label>
                  <Input
                    id="targetFinish"
                    name="targetFinish"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="targetFinish"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.targetFinish || ""}
                    invalid={
                      validation.touched.targetFinish &&
                      validation.errors.targetFinish
                        ? true
                        : false
                    }
                  />
                  {validation.touched.targetFinish &&
                  validation.errors.targetFinish ? (
                    <FormFeedback type="invalid">
                      {validation.errors.targetFinish}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Actual Start</Label>
                  <Input
                    id="actualStart"
                    name="actualStart"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="actualStart"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.actualStart || ""}
                    invalid={
                      validation.touched.actualStart &&
                      validation.errors.actualStart
                        ? true
                        : false
                    }
                  />
                  {validation.touched.actualStart &&
                  validation.errors.actualStart ? (
                    <FormFeedback type="invalid">
                      {validation.errors.actualStart}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Actual Finish</Label>
                  <Input
                    id="actualFinish"
                    name="actualFinish"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="actualFinish"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.actualFinish || ""}
                    invalid={
                      validation.touched.actualFinish &&
                      validation.errors.actualFinish
                        ? true
                        : false
                    }
                  />
                  {validation.touched.actualFinish &&
                  validation.errors.actualFinish ? (
                    <FormFeedback type="invalid">
                      {validation.errors.actualFinish}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Status Date</Label>
                  <Input
                    id="statusDate"
                    name="statusDate"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="statusDate"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.statusDate || ""}
                    invalid={
                      validation.touched.statusDate &&
                      validation.errors.statusDate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.statusDate &&
                  validation.errors.statusDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.statusDate}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>

            <Row>
              <div className="mb-3">
                <Label className="form-label">Description</Label>
                <Input
                  id="description"
                  name="description"
                  type="textarea"
                  placeholder="Description"
                  maxLength="225"
                  rows="3"
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
            </Row>

            <Row>
              <div className="mb-3">
                <Label className="form-label">Long Description</Label>
                <Input
                  id="longDescription"
                  name="longDescription"
                  type="textarea"
                  placeholder="Long Description"
                  maxLength="225"
                  rows="3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.longDescription || ""}
                  invalid={
                    validation.touched.longDescription &&
                    validation.errors.longDescription
                      ? true
                      : false
                  }
                />
                {validation.touched.longDescription &&
                validation.errors.longDescription ? (
                  <FormFeedback type="invalid">
                    {validation.errors.longDescription}
                  </FormFeedback>
                ) : null}
              </div>
            </Row>

            <Row>
              <Col className="col-md-6 col-sm-12">
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
                  <Label>QC Status</Label>
                  <Select
                    id="inspectionResults"
                    name="inspectionResults"
                    type="text"
                    onChange={e => {
                      set_inspectionResultSelected({
                        label: e.label,
                        value: e.value,
                      })
                    }}
                    onBlur={validation.handleBlur}
                    options={_inspectionResultSelectItems}
                    defaultValue={_inspectionResultSelected}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select QC Status"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.inspectionResults &&
                  validation.errors.inspectionResults ? (
                    <FormFeedback type="invalid">
                      {validation.errors.inspectionResults}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Inspection Date</Label>
                  <Input
                    id="inspectionDate"
                    name="inspectionDate"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="Inspection Date"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.inspectionDate || ""}
                    invalid={
                      validation.touched.inspectionDate &&
                      validation.errors.inspectionDate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.inspectionDate &&
                  validation.errors.inspectionDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.inspectionDate}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Recorded Date</Label>
                  <Input
                    id="enteredDate"
                    name="enteredDate"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="Recorded Date"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.enteredDate || ""}
                    invalid={
                      validation.touched.enteredDate &&
                      validation.errors.enteredDate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.enteredDate &&
                  validation.errors.enteredDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.enteredDate}
                    </FormFeedback>
                  ) : null}
                </div>
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
                    placeholder="Select Root Cause"
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
              <Col className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <Label className="form-label">Deficiencies</Label>
                  <Input
                    id="unsatFindings"
                    name="unsatFindings"
                    type="textarea"
                    placeholder="Deficiencies"
                    maxLength="225"
                    rows="3"
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
                  <Label className="form-label">Corrective Action</Label>
                  <Input
                    id="correctiveActions"
                    name="correctiveActions"
                    type="textarea"
                    placeholder="Corrective Action"
                    maxLength="225"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.correctiveActions || ""}
                    invalid={
                      validation.touched.correctiveActions &&
                      validation.errors.correctiveActions
                        ? true
                        : false
                    }
                  />
                  {validation.touched.correctiveActions &&
                  validation.errors.correctiveActions ? (
                    <FormFeedback type="invalid">
                      {validation.errors.correctiveActions}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Comments</Label>
                  <Input
                    id="qcComments"
                    name="qcComments"
                    type="textarea"
                    placeholder="Comments"
                    maxLength="225"
                    rows="3"
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
              </Col>
            </Row>

            {/* <Row form>
              <Col className="col-12"></Col>
            </Row> */}

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

AddModifyWOInspection.propTypes = {
  onSaveClick: PropTypes.func,
  onSaveSuccess: PropTypes.func,
  onCancelClick: PropTypes.func,
  open: PropTypes.bool,
  modelData: PropTypes.object,
}

export default AddModifyWOInspection
