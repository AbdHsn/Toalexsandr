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
  newNCRTracker,
  editNCRTracker,
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
      site: (modelData && modelData.site) || "",
      ncrNumber: (modelData && modelData.ncrNumber) || "",
      qcfrNumber: (modelData && modelData.qcfrNumber) || "",
      pdrNumber: (modelData && modelData.pdrNumber) || "",
      woNumber: (modelData && modelData.woNumber) || "",
      dateIssued: (modelData && modelData.dateIssued) || "",
      qcInspector: (modelData && modelData.qcInspector) || "",
      nonconformanceSummary:
        (modelData && modelData.nonconformanceSummary) || "",
      annex: (modelData && modelData.annex) || "",
      specItem: (modelData && modelData.specItem) || "",
      title: (modelData && modelData.title) || "",
      dateCAPDue: (modelData && modelData.dateCAPDue) || "",
      status: (modelData && modelData.status) || "",
      responsiblePerson: (modelData && modelData.responsiblePerson) || "",
      responsibleSub: (modelData && modelData.responsibleSub) || "",
    },
    validationSchema: Yup.object({
      // ncrNumber: Yup.string().required("NCR Number is required"),
      // pdrNumber: Yup.string().required("PDR Number is required"),
      // woNumber: Yup.string().required("WO Number is required"),
      // dateIssued: Yup.string().required("Date Issued is required"),
      // qcInspector: Yup.string().required("QC Inspector is required"),
      // nonConformanceSummary: Yup.string().required(
      //   "Non Conformance Summary is required"
      // ),
      // dateCAPDue: Yup.string().required("Date CAP Due is required"),
      // status: Yup.string().required("Status is required"),
      // annex: Yup.string().required("Annex is required"),
      // specItem: Yup.string().required("Spec Item is required"),
      // title: Yup.string().required("Title is required"),
      // responsiblePerson: Yup.string().required(
      //   "Responsible Person is required"
      // ),
      // responsibleSub: Yup.string().required("Responsible Sub is required"),
    }),

    onSubmit: values => {
      console.log("add-update save..01", values)

      const submitModel = {
        id: values.id,
        ncrNumber: values.ncrNumber,
        pdrNumber: values.pdrNumber,
        woNumber: values.woNumber,
        dateIssued: values.dateIssued,
        qcInspector: values.qcInspector,
        annex: values.annex,
        specItem: values.specItem,
        title: values.title,
        nonConformanceSummary: values.nonConformanceSummary,
        dateCAPDue: values.dateCAPDue,
        status: values.status,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editNCRTracker(submitModel)
          .then(res => {
            console.log("add res", res)
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
        newNCRTracker(submitModel)
          .then(res => {
            console.log("add res", res)
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

  const postData = item => {
    console.log("add-update save..03", validation.values)

    let data = {
      id: 12,
      site: "Site o1 test",
      ncrNumber: "string",
      qcfrNumber: "string",
      pdrNumber: "string",
      woNumber: "string",
      dateIssued: "2022-03-07T12:00:38.603Z",
      qcInspector: "string",
      nonconformanceSummary: "string",
      annex: "string",
      specItem: "string",
      title: "string",
      assessmentType: "string",
      nonconformanceType: "string",
      requirement1: "string",
      observation1: "string",
      requirement2: "string",
      observation2: "string",
      requirement3: "string",
      observation3: "string",
      requirement4: "string",
      observation4: "string",
      responsiblePersone: "string",
      responsibleDiscipline: "string",
      responsibleSub: "string",
      dateCapDue: "2022-03-07T12:00:38.603Z",
      comments: "string",
      status: "string",
    }

    setIsSaving(true)
    newNCRTracker(data)
      .then(res => {
        console.log("add res", res)
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
    //validation.resetForm()
    //toggle()
  }

  return (
    <>
      <Modal isOpen={open}>
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
                    type="text"
                    placeholder="Id"
                    hidden={true}
                    defaultValue={validation.values.id || 0}
                  />
                </div>

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
                  <Label className="form-label">Date Issued</Label>
                  <Input
                    id="dateIssued"
                    name="dateIssued"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
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
                  <Label className="form-label">QC Inspector</Label>
                  <Input
                    id="qcInspector"
                    name="qcInspector"
                    type="text"
                    placeholder="QC Inspector"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.qcInspector || ""}
                    invalid={
                      validation.touched.qcInspector &&
                      validation.errors.qcInspector
                        ? true
                        : false
                    }
                  />
                  {validation.touched.qcInspector &&
                  validation.errors.qcInspector ? (
                    <FormFeedback type="invalid">
                      {validation.errors.qcInspector}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Annex</Label>
                  {/* <Select
                    placeholder="Select Annex"
                    value={data.find(obj => obj.value === annexSelectValue)} // set selected value
                    options={data} // set list of the data
                    onChange={value => console.log("change!", value)} // assign onChange function
                  /> */}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Spec Item</Label>
                  <Input
                    id="specItem"
                    name="specItem"
                    type="text"
                    placeholder="Spec Item"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.specItem || ""}
                    invalid={
                      validation.touched.specItem && validation.errors.specItem
                        ? true
                        : false
                    }
                  />
                  {validation.touched.specItem && validation.errors.specItem ? (
                    <FormFeedback type="invalid">
                      {validation.errors.specItem}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.title || ""}
                    invalid={
                      validation.touched.title && validation.errors.title
                        ? true
                        : false
                    }
                  />
                  {validation.touched.title && validation.errors.title ? (
                    <FormFeedback type="invalid">
                      {validation.errors.title}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Responsible Person</Label>
                  <Input
                    id="responsiblePerson"
                    name="responsiblePerson"
                    type="text"
                    placeholder="Responsible Person"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.responsiblePerson || ""}
                    invalid={
                      validation.touched.responsiblePerson &&
                      validation.errors.responsiblePerson
                        ? true
                        : false
                    }
                  />
                  {validation.touched.responsiblePerson &&
                  validation.errors.responsiblePerson ? (
                    <FormFeedback type="invalid">
                      {validation.errors.responsiblePerson}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Responsible Sub</Label>
                  <Input
                    id="responsibleSub"
                    name="responsibleSub"
                    type="text"
                    placeholder="ResponsibleSub"
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
