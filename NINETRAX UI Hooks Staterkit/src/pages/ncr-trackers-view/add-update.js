import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
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
const NCRTrackerAddUpdate = ({
  open,
  modelData,
  onSaveClick,
  onCancelClick,
}) => {
  useEffect(() => {
    console.log("modal is running...", modelData)
  }, [])

  const [isSaving, setIsSaving] = useState(false)

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (modelData && modelData.id) || 0,
      ncrNumber: (modelData && modelData.ncrNumber) || "",
      qcfrNumber: (modelData && modelData.qcfrNumber) || "",
      pdrNumber: (modelData && modelData.pdrNumber) || "",
      woNumber: (modelData && modelData.woNumber) || "",
      dateIssued: (modelData && modelData.dateIssued) || "",
      qcInspector: (modelData && modelData.qcInspector) || "",
      annex: (modelData && modelData.annex) || "",
      specItem: (modelData && modelData.specItem) || "",
      title: (modelData && modelData.title) || "",
      assessmentType: (modelData && modelData.assessmentType) || "",
      nonconformanceType: (modelData && modelData.nonconformanceType) || "",
      nonconformanceSummary:
        (modelData && modelData.nonconformanceSummary) || "",
      requirement1: (modelData && modelData.requirement1) || "",
      observation1: (modelData && modelData.observation1) || "",
      requirement2: (modelData && modelData.requirement2) || "",
      observation2: (modelData && modelData.observation2) || "",
      requirement3: (modelData && modelData.requirement3) || "",
      observation3: (modelData && modelData.observation3) || "",
      requirement4: (modelData && modelData.requirement4) || "",
      observation4: (modelData && modelData.observation4) || "",
      responsiblePersone: (modelData && modelData.responsiblePersone) || "",
      responsibleDiscipline:
        (modelData && modelData.responsibleDiscipline) || "",
      responsibleSub: (modelData && modelData.responsibleSub) || "",
      dateCapDue: (modelData && modelData.dateCapDue) || "",
      status: (modelData && modelData.status) || "",
      comments: (modelData && modelData.comments) || "",
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("id is required")
      // ncrNumber: Yup.string().required("ncrNumber is required")
      // qcfrNumber: Yup.string().required("qcfrNumber is required")
      // pdrNumber: Yup.string().required("pdrNumber is required")
      // woNumber: Yup.string().required("woNumber is required")
      // dateIssued: Yup.string().required("dateIssued is required")
      // qcInspector: Yup.string().required("qcInspector is required")
      // annex: Yup.string().required("annex is required")
      // specItem: Yup.string().required("specItem is required")
      // title: Yup.string().required("title is required")
      // assessmentType: Yup.string().required("assessmentType is required")
      // nonconformanceType: Yup.string().required("nonconformanceType is required")
      // nonconformanceSummary: Yup.string().required("nonconformanceSummary is required")
      // requirement1: Yup.string().required("requirement1 is required")
      // observation1: Yup.string().required("observation1 is required")
      // requirement2: Yup.string().required("requirement2 is required")
      // observation2: Yup.string().required("observation2 is required")
      // requirement3: Yup.string().required("requirement3 is required")
      // observation3: Yup.string().required("observation3 is required")
      // requirement4: Yup.string().required("requirement4 is required")
      // observation4: Yup.string().required("observation4 is required")
      // responsiblePersone: Yup.string().required("responsiblePersone is required")
      // responsibleDiscipline: Yup.string().required("responsibleDiscipline is required")
      // responsibleSub: Yup.string().required("responsibleSub is required")
      // dateCapDue: Yup.string().required("dateCapDue is required")
      // status: Yup.string().required("status is required")
      // comments: Yup.string().required("comments is required")
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
        qcInspector: values.qcInspector,
        annex: values.annex,
        specItem: values.specItem,
        title: values.title,
        assessmentType: values.assessmentType,
        nonconformanceType: values.nonconformanceType,
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
        status: values.status,
        comments: values.comments,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editNCRTrackerAddUpdate(submitModel)
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
        newNCRTrackerAddUpdate(submitModel)
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
            ? "Update NCRTrackerAddUpdate"
            : "New NCRTrackerAddUpdate"}
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
                  <Label className="form-label">id</Label>
                  <Input
                    id="id"
                    name="id"
                    type="number"
                    placeholder="id"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.id || ""}
                    invalid={
                      validation.touched.id && validation.errors.id
                        ? true
                        : false
                    }
                  />
                  {validation.touched.id && validation.errors.id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.id}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">ncrNumber</Label>
                  <Input
                    id="ncrNumber"
                    name="ncrNumber"
                    type="text"
                    placeholder="ncrNumber"
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
                  <Label className="form-label">qcfrNumber</Label>
                  <Input
                    id="qcfrNumber"
                    name="qcfrNumber"
                    type="text"
                    placeholder="qcfrNumber"
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
                  <Label className="form-label">pdrNumber</Label>
                  <Input
                    id="pdrNumber"
                    name="pdrNumber"
                    type="text"
                    placeholder="pdrNumber"
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
                {/* selectList */}
                {/* selectList */}
                {/* selectList */}
                {/* selectList */}
                {/* selectList */}
                {/* selectList */}
                <div className="mb-3">
                  <Label className="form-label">nonconformanceSummary</Label>
                  <Input
                    id="nonconformanceSummary"
                    name="nonconformanceSummary"
                    type="textarea"
                    placeholder="nonconformanceSummary"
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
                <div className="mb-3">
                  <Label className="form-label">requirement1</Label>
                  <Input
                    id="requirement1"
                    name="requirement1"
                    type="textarea"
                    placeholder="requirement1"
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
                  <Label className="form-label">observation1</Label>
                  <Input
                    id="observation1"
                    name="observation1"
                    type="textarea"
                    placeholder="observation1"
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
                  <Label className="form-label">requirement2</Label>
                  <Input
                    id="requirement2"
                    name="requirement2"
                    type="textarea"
                    placeholder="requirement2"
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
                  <Label className="form-label">observation2</Label>
                  <Input
                    id="observation2"
                    name="observation2"
                    type="textarea"
                    placeholder="observation2"
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
                  <Label className="form-label">requirement3</Label>
                  <Input
                    id="requirement3"
                    name="requirement3"
                    type="textarea"
                    placeholder="requirement3"
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
                  <Label className="form-label">observation3</Label>
                  <Input
                    id="observation3"
                    name="observation3"
                    type="textarea"
                    placeholder="observation3"
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
                  <Label className="form-label">requirement4</Label>
                  <Input
                    id="requirement4"
                    name="requirement4"
                    type="textarea"
                    placeholder="requirement4"
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
                  <Label className="form-label">observation4</Label>
                  <Input
                    id="observation4"
                    name="observation4"
                    type="textarea"
                    placeholder="observation4"
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
                <div className="mb-3">
                  <Label className="form-label">responsiblePersone</Label>
                  <Input
                    id="responsiblePersone"
                    name="responsiblePersone"
                    type="text"
                    placeholder="responsiblePersone"
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
                  <Label className="form-label">responsibleDiscipline</Label>
                  <Input
                    id="responsibleDiscipline"
                    name="responsibleDiscipline"
                    type="text"
                    placeholder="responsibleDiscipline"
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
                  <Label className="form-label">responsibleSub</Label>
                  <Input
                    id="responsibleSub"
                    name="responsibleSub"
                    type="text"
                    placeholder="responsibleSub"
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
                  <Label className="form-label">dateCapDue</Label>
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
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  {isSaving === true ? (
                    <BtnSaving isSaving={isSaving} />
                  ) : (
                    // <button
                    //   type="button"
                    //   className="btn btn-outline-secondary w-xs"
                    //   onClick={onExportClick}
                    // >
                    //   <i className="bx bx-file"></i> Export
                    // </button>

                    <button
                      type="submit"
                      className="btn btn-outline-success w-xs"
                    >
                      <i className="bx bx-save"></i> SAVE
                    </button>
                  )}{" "}
                  <button
                    onClick={() => postData(modelData)}
                    type="button"
                    className="btn btn-danger ml-5"
                  >
                    Test
                  </button>
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
