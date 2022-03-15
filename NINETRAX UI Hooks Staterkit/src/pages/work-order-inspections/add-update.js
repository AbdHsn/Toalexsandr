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
const InspectionAddUpdate = ({
  open,
  modelData,
  onSaveClick,
  onCancelClick,
}) => {
  useEffect(() => {
    console.log("modal is running...", modelData)
  }, [])

  const [isSaving, setIsSaving] = useState(false)

  const [_annexSelected, set_annexSelected] = useState(null)
  const [_annexSelectItems, set_annexSelectItems] = useState([])
  const [_specItemSelected, set_specItemSelected] = useState(null)
  const [_specItemSelectItems, set_specItemSelectItems] = useState([])
  const [_titleSelected, set_titleSelected] = useState(null)
  const [_titleSelectItems, set_titleSelectItems] = useState([])
  const [_qcInspectorSelected, set_qcInspectorSelected] = useState(null)
  const [_qcInspectorSelectItems, set_qcInspectorSelectItems] = useState([])
  const [_causeCodeSelected, set_causeCodeSelected] = useState(null)
  const [_causeCodeSelectItems, set_causeCodeSelectItems] = useState([])
  const [_rootCauseSelected, set_rootCauseSelected] = useState(null)
  const [_rootCauseSelectItems, set_rootCauseSelectItems] = useState([])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (modelData && modelData.id) || 0,
      workOrder: (modelData && modelData.workOrder) || "",
      location: (modelData && modelData.location) || "",
      status: (modelData && modelData.status) || "",
      elin: (modelData && modelData.elin) || "",
      annex: (modelData && modelData.annex) || "",
      specItem: (modelData && modelData.specItem) || "",
      title: (modelData && modelData.title) || "",
      description: (modelData && modelData.description) || "",
      workType: (modelData && modelData.workType) || "",
      subWorkType: (modelData && modelData.subWorkType) || "",
      asset: (modelData && modelData.asset) || "",
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
      qcInspector: (modelData && modelData.qcInspector) || "",
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
      // description: Yup.string().required("description is required"),
      // workType: Yup.string().required("workType is required"),
      // subWorkType: Yup.string().required("subWorkType is required"),
      // asset: Yup.string().required("asset is required"),
      // crew: Yup.string().required("crew is required"),
      // lead: Yup.string().required("lead is required"),
      // targetStart: Yup.string().required("targetStart is required"),
      // targetFinish: Yup.string().required("targetFinish is required"),
      // actualStart: Yup.string().required("actualStart is required"),
      // actualFinish: Yup.string().required("actualFinish is required"),
      // statusDate: Yup.string().required("statusDate is required"),
      // qcInspector: Yup.string().required("qcInspector is required"),
      // inspectionDate: Yup.string().required("inspectionDate is required"),
      // enteredDate: Yup.string().required("enteredDate is required"),
      // causeCode: Yup.string().required("causeCode is required"),
      // rootCause: Yup.string().required("rootCause is required"),
    }),

    onSubmit: values => {
      console.log("add-update save..01", values)

      const submitModel = {
        id: values.id,
        workOrder: values.workOrder,
        location: values.location,
        status: values.status,
        elin: values.elin,
        annex: _annexSelected,
        specItem: _specItemSelected,
        title: _titleSelected,
        description: values.description,
        workType: values.workType,
        subWorkType: values.subWorkType,
        asset: values.asset,
        crew: values.crew,
        lead: values.lead,
        targetStart: values.targetStart,
        targetFinish: values.targetFinish,
        actualStart: values.actualStart,
        actualFinish: values.actualFinish,
        statusDate: values.statusDate,
        qcInspector: _qcInspectorSelected,
        inspectionDate: values.inspectionDate,
        enteredDate: values.enteredDate,
        causeCode: _causeCodeSelected,
        rootCause: _rootCauseSelected,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editInspectionAddUpdate(submitModel)
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
        newInspectionAddUpdate(submitModel)
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
            ? "Update InspectionAddUpdate"
            : "New InspectionAddUpdate"}
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
                  <Label className="form-label">status</Label>
                  <Input
                    id="status"
                    name="status"
                    type="text"
                    placeholder="status"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.status || ""}
                    invalid={
                      validation.touched.status && validation.errors.status
                        ? true
                        : false
                    }
                  />
                  {validation.touched.status && validation.errors.status ? (
                    <FormFeedback type="invalid">
                      {validation.errors.status}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">elin</Label>
                  <Input
                    id="elin"
                    name="elin"
                    type="text"
                    placeholder="elin"
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
                  <Label>specItem</Label>
                  <Select
                    id="specItem"
                    name="specItem"
                    type="text"
                    onChange={e => {
                      set_specItemSelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_specItemSelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select specItem"
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
                  <Label className="form-label">description</Label>
                  <Input
                    id="description"
                    name="description"
                    type="textarea"
                    placeholder="description"
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
                <div className="mb-3">
                  <Label className="form-label">workType</Label>
                  <Input
                    id="workType"
                    name="workType"
                    type="text"
                    placeholder="workType"
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
                  <Label className="form-label">subWorkType</Label>
                  <Input
                    id="subWorkType"
                    name="subWorkType"
                    type="text"
                    placeholder="subWorkType"
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
                  <Label className="form-label">asset</Label>
                  <Input
                    id="asset"
                    name="asset"
                    type="text"
                    placeholder="asset"
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
                  <Label className="form-label">crew</Label>
                  <Input
                    id="crew"
                    name="crew"
                    type="text"
                    placeholder="crew"
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
                  <Label className="form-label">lead</Label>
                  <Input
                    id="lead"
                    name="lead"
                    type="text"
                    placeholder="lead"
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
                  <Label className="form-label">targetStart</Label>
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
                  <Label className="form-label">targetFinish</Label>
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
                  <Label className="form-label">actualStart</Label>
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
                  <Label className="form-label">actualFinish</Label>
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
                  <Label className="form-label">statusDate</Label>
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
                  <Label className="form-label">inspectionDate</Label>
                  <Input
                    id="inspectionDate"
                    name="inspectionDate"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="inspectionDate"
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
                  <Label className="form-label">enteredDate</Label>
                  <Input
                    id="enteredDate"
                    name="enteredDate"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="enteredDate"
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

InspectionAddUpdate.propTypes = {
  onSaveClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  open: PropTypes.bool,
  modelData: PropTypes.object,
}

export default InspectionAddUpdate
