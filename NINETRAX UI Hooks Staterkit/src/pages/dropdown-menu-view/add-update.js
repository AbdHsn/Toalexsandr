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
  newDropDownMenuAddUpdate,
  editDropDownMenuAddUpdate,
} from "../../services/dropdown-menu-service"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import BtnSaving from "../../components/Common/BtnSaving"
const DropDownMenuAddUpdate = ({
  open,
  modelData,
  onSaveClick,
  onCancelClick,
}) => {
  useEffect(() => {
    //set existing selected value
  }, [modelData])

  const [isSaving, setIsSaving] = useState(false)

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (modelData && modelData.id) || 0,
      causeCode: (modelData && modelData.causeCode) || "",
      rootCause: (modelData && modelData.rootCause) || "",
      correctiveAction: (modelData && modelData.correctiveAction) || "",
      qcstatus: (modelData && modelData.qcstatus) || "",
      pdrstatusMenu: (modelData && modelData.pdrstatusMenu) || "",
      pawstatusMenu: (modelData && modelData.pawstatusMenu) || "",
      pawrating: (modelData && modelData.pawrating) || "",
      pawAssessment: (modelData && modelData.pawAssessment) || "",
      ccrstatusMenu: (modelData && modelData.ccrstatusMenu) || "",
      validity: (modelData && modelData.validity) || "",
      qctechs: (modelData && modelData.qctechs) || "",
      mptPar: (modelData && modelData.mptPar) || "",
      mptAsgnCode: (modelData && modelData.mptAsgnCode) || "",
      jaxPar: (modelData && modelData.jaxPar) || "",
      pawunsat: (modelData && modelData.pawunsat) || "",
      pawrootCause: (modelData && modelData.pawrootCause) || "",
      fmBldgManager: (modelData && modelData.fmBldgManager) || "",
      estimators: (modelData && modelData.estimators) || "",
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("id is required"),
      // causeCode: Yup.string().required("causeCode is required"),
      // rootCause: Yup.string().required("rootCause is required"),
      // correctiveAction: Yup.string().required("correctiveAction is required"),
      // qcstatus: Yup.string().required("qcstatus is required"),
      // pdrstatusMenu: Yup.string().required("pdrstatusMenu is required"),
      // pawstatusMenu: Yup.string().required("pawstatusMenu is required"),
      // pawrating: Yup.string().required("pawrating is required"),
      // pawAssessment: Yup.string().required("pawAssessment is required"),
      // ccrstatusMenu: Yup.string().required("ccrstatusMenu is required"),
      // validity: Yup.string().required("validity is required"),
      // qctechs: Yup.string().required("qctechs is required"),
      // mptPar: Yup.string().required("mptPar is required"),
      // mptAsgnCode: Yup.string().required("mptAsgnCode is required"),
      // jaxPar: Yup.string().required("jaxPar is required"),
      // pawunsat: Yup.string().required("pawunsat is required"),
      // pawrootCause: Yup.string().required("pawrootCause is required"),
      // fmBldgManager: Yup.string().required("fmBldgManager is required"),
      // estimators: Yup.string().required("estimators is required"),
    }),

    onSubmit: values => {
      console.log("add-update save..01", values)

      const submitModel = {
        id: values.id,
        causeCode: values.causeCode,
        rootCause: values.rootCause,
        correctiveAction: values.correctiveAction,
        qcstatus: values.qcstatus,
        pdrstatusMenu: values.pdrstatusMenu,
        pawstatusMenu: values.pawstatusMenu,
        pawrating: values.pawrating,
        pawAssessment: values.pawAssessment,
        ccrstatusMenu: values.ccrstatusMenu,
        validity: values.validity,
        qctechs: values.qctechs,
        mptPar: values.mptPar,
        mptAsgnCode: values.mptAsgnCode,
        jaxPar: values.jaxPar,
        pawunsat: values.pawunsat,
        pawrootCause: values.pawrootCause,
        fmBldgManager: values.fmBldgManager,
        estimators: values.estimators,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editDropDownMenuAddUpdate(submitModel?.id, submitModel)
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
        newDropDownMenuAddUpdate(submitModel)
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
          {modelData?.id > 0 ? "Update DropDown Menu" : "New DropDown Menu"}
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
              <Col className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <Label className="form-label">Cause Code</Label>
                  <Input
                    id="causeCode"
                    name="causeCode"
                    type="text"
                    placeholder="Cause Code"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.causeCode || ""}
                    invalid={
                      validation.touched.causeCode &&
                      validation.errors.causeCode
                        ? true
                        : false
                    }
                  />
                  {validation.touched.causeCode &&
                  validation.errors.causeCode ? (
                    <FormFeedback type="invalid">
                      {validation.errors.causeCode}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Root Cause</Label>
                  <Input
                    id="rootCause"
                    name="rootCause"
                    type="text"
                    placeholder="Root Cause"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.rootCause || ""}
                    invalid={
                      validation.touched.rootCause &&
                      validation.errors.rootCause
                        ? true
                        : false
                    }
                  />
                  {validation.touched.rootCause &&
                  validation.errors.rootCause ? (
                    <FormFeedback type="invalid">
                      {validation.errors.rootCause}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Corrective Action</Label>
                  <Input
                    id="correctiveAction"
                    name="correctiveAction"
                    type="text"
                    placeholder="Corrective Action"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.correctiveAction || ""}
                    invalid={
                      validation.touched.correctiveAction &&
                      validation.errors.correctiveAction
                        ? true
                        : false
                    }
                  />
                  {validation.touched.correctiveAction &&
                  validation.errors.correctiveAction ? (
                    <FormFeedback type="invalid">
                      {validation.errors.correctiveAction}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">QC Status</Label>
                  <Input
                    id="qcstatus"
                    name="qcstatus"
                    type="text"
                    placeholder="QC Status"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.qcstatus || ""}
                    invalid={
                      validation.touched.qcstatus && validation.errors.qcstatus
                        ? true
                        : false
                    }
                  />
                  {validation.touched.qcstatus && validation.errors.qcstatus ? (
                    <FormFeedback type="invalid">
                      {validation.errors.qcstatus}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">PDR Status Menu</Label>
                  <Input
                    id="pdrstatusMenu"
                    name="pdrstatusMenu"
                    type="text"
                    placeholder="PDR Status Menu"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pdrstatusMenu || ""}
                    invalid={
                      validation.touched.pdrstatusMenu &&
                      validation.errors.pdrstatusMenu
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pdrstatusMenu &&
                  validation.errors.pdrstatusMenu ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pdrstatusMenu}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">PAW Status Menu</Label>
                  <Input
                    id="pawstatusMenu"
                    name="pawstatusMenu"
                    type="text"
                    placeholder="PAW Status Menu"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pawstatusMenu || ""}
                    invalid={
                      validation.touched.pawstatusMenu &&
                      validation.errors.pawstatusMenu
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pawstatusMenu &&
                  validation.errors.pawstatusMenu ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pawstatusMenu}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">PAW Rating</Label>
                  <Input
                    id="pawrating"
                    name="pawrating"
                    type="text"
                    placeholder="PAW Rating"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pawrating || ""}
                    invalid={
                      validation.touched.pawrating &&
                      validation.errors.pawrating
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pawrating &&
                  validation.errors.pawrating ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pawrating}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">PAW Assessment</Label>
                  <Input
                    id="pawAssessment"
                    name="pawAssessment"
                    type="text"
                    placeholder="PAW Assessment"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pawAssessment || ""}
                    invalid={
                      validation.touched.pawAssessment &&
                      validation.errors.pawAssessment
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pawAssessment &&
                  validation.errors.pawAssessment ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pawAssessment}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">CCR Status Menu</Label>
                  <Input
                    id="ccrstatusMenu"
                    name="ccrstatusMenu"
                    type="text"
                    placeholder="CCR Status Menu"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.ccrstatusMenu || ""}
                    invalid={
                      validation.touched.ccrstatusMenu &&
                      validation.errors.ccrstatusMenu
                        ? true
                        : false
                    }
                  />
                  {validation.touched.ccrstatusMenu &&
                  validation.errors.ccrstatusMenu ? (
                    <FormFeedback type="invalid">
                      {validation.errors.ccrstatusMenu}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <Label className="form-label">Validity</Label>
                  <Input
                    id="validity"
                    name="validity"
                    type="text"
                    placeholder="Validity"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.validity || ""}
                    invalid={
                      validation.touched.validity && validation.errors.validity
                        ? true
                        : false
                    }
                  />
                  {validation.touched.validity && validation.errors.validity ? (
                    <FormFeedback type="invalid">
                      {validation.errors.validity}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">QC Techs</Label>
                  <Input
                    id="qctechs"
                    name="qctechs"
                    type="text"
                    placeholder="QC Techs"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.qctechs || ""}
                    invalid={
                      validation.touched.qctechs && validation.errors.qctechs
                        ? true
                        : false
                    }
                  />
                  {validation.touched.qctechs && validation.errors.qctechs ? (
                    <FormFeedback type="invalid">
                      {validation.errors.qctechs}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">MPT PAR</Label>
                  <Input
                    id="mptPar"
                    name="mptPar"
                    type="text"
                    placeholder="MPT PAR"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.mptPar || ""}
                    invalid={
                      validation.touched.mptPar && validation.errors.mptPar
                        ? true
                        : false
                    }
                  />
                  {validation.touched.mptPar && validation.errors.mptPar ? (
                    <FormFeedback type="invalid">
                      {validation.errors.mptPar}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">MPT Assign Code</Label>
                  <Input
                    id="mptAsgnCode"
                    name="mptAsgnCode"
                    type="text"
                    placeholder="MPT Assign Code"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.mptAsgnCode || ""}
                    invalid={
                      validation.touched.mptAsgnCode &&
                      validation.errors.mptAsgnCode
                        ? true
                        : false
                    }
                  />
                  {validation.touched.mptAsgnCode &&
                  validation.errors.mptAsgnCode ? (
                    <FormFeedback type="invalid">
                      {validation.errors.mptAsgnCode}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">JAX PAR</Label>
                  <Input
                    id="jaxPar"
                    name="jaxPar"
                    type="text"
                    placeholder="JAX PAR"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.jaxPar || ""}
                    invalid={
                      validation.touched.jaxPar && validation.errors.jaxPar
                        ? true
                        : false
                    }
                  />
                  {validation.touched.jaxPar && validation.errors.jaxPar ? (
                    <FormFeedback type="invalid">
                      {validation.errors.jaxPar}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">PAW Unsat</Label>
                  <Input
                    id="pawunsat"
                    name="pawunsat"
                    type="text"
                    placeholder="PAW Unsat"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pawunsat || ""}
                    invalid={
                      validation.touched.pawunsat && validation.errors.pawunsat
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pawunsat && validation.errors.pawunsat ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pawunsat}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">PAW Root Cause</Label>
                  <Input
                    id="pawrootCause"
                    name="pawrootCause"
                    type="text"
                    placeholder="PAW Root Cause"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.pawrootCause || ""}
                    invalid={
                      validation.touched.pawrootCause &&
                      validation.errors.pawrootCause
                        ? true
                        : false
                    }
                  />
                  {validation.touched.pawrootCause &&
                  validation.errors.pawrootCause ? (
                    <FormFeedback type="invalid">
                      {validation.errors.pawrootCause}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">FM Building Manager</Label>
                  <Input
                    id="fmBldgManager"
                    name="fmBldgManager"
                    type="text"
                    placeholder="FM Building Manager"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.fmBldgManager || ""}
                    invalid={
                      validation.touched.fmBldgManager &&
                      validation.errors.fmBldgManager
                        ? true
                        : false
                    }
                  />
                  {validation.touched.fmBldgManager &&
                  validation.errors.fmBldgManager ? (
                    <FormFeedback type="invalid">
                      {validation.errors.fmBldgManager}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Estimator</Label>
                  <Input
                    id="estimators"
                    name="estimators"
                    type="text"
                    placeholder="Estimators"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.estimators || ""}
                    invalid={
                      validation.touched.estimators &&
                      validation.errors.estimators
                        ? true
                        : false
                    }
                  />
                  {validation.touched.estimators &&
                  validation.errors.estimators ? (
                    <FormFeedback type="invalid">
                      {validation.errors.estimators}
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

DropDownMenuAddUpdate.propTypes = {
  onSaveClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  open: PropTypes.bool,
  modelData: PropTypes.object,
}

export default DropDownMenuAddUpdate
