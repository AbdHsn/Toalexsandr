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
  newCDRTrackerAddUpdate,
  editCDRTrackerAddUpdate,
} from "../../services/cdr-trackers-service"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import BtnSaving from "../../components/Common/BtnSaving"
const CDRTrackersAddUpdate = ({
  open,
  modelData,
  onSaveClick,
  onCancelClick,
}) => {
  useEffect(() => {
    console.log("modal is running...", modelData)
  }, [])

  const [isSaving, setIsSaving] = useState(false)

  const [_statusSelected, set_statusSelected] = useState(null)
  const [_statusSelectItems, set_statusSelectItems] = useState([])
  const [_responsebySelected, set_responsebySelected] = useState(null)
  const [_responsebySelectItems, set_responsebySelectItems] = useState([])
  const [_isitvalidSelected, set_isitvalidSelected] = useState(null)
  const [_isitvalidSelectItems, set_isitvalidSelectItems] = useState([])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (modelData && modelData.id) || 0,
      cdrnumber: (modelData && modelData.cdrnumber) || "",
      datereceived:
        (modelData &&
          modelData?.datereceived &&
          moment(modelData?.datereceived).format("YYYY-MM-DD")) ||
        null,
      responseduedate:
        (modelData &&
          modelData?.responseduedate &&
          moment(modelData?.responseduedate).format("YYYY-MM-DD")) ||
        null,
      dateclosed:
        (modelData &&
          modelData?.dateclosed &&
          moment(modelData?.dateclosed).format("YYYY-MM-DD")) ||
        null,
      status: (modelData && modelData.status) || "",
      discrepancy: (modelData && modelData.discrepancy) || "",
      discrepancyshort: (modelData && modelData.discrepancyshort) || "",
      responsedate:
        (modelData &&
          modelData?.responsedate &&
          moment(modelData?.responsedate).format("YYYY-MM-DD")) ||
        null,
      responseby: (modelData && modelData.responseby) || "",
      isitvalid: (modelData && modelData.isitvalid) || "",
      memonumber: (modelData && modelData.memonumber) || "",
      notes: (modelData && modelData.notes) || "",
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("id is required"),
      // cdrnumber: Yup.string().required("cdrnumber is required"),
      // datereceived: Yup.string().required("datereceived is required"),
      // responseduedate: Yup.string().required("responseduedate is required"),
      // dateclosed: Yup.string().required("dateclosed is required"),
      // status: Yup.string().required("status is required"),
      // discrepancy: Yup.string().required("discrepancy is required"),
      // discrepancyshort: Yup.string().required("discrepancyshort is required"),
      // responsedate: Yup.string().required("responsedate is required"),
      // responseby: Yup.string().required("responseby is required"),
      // isitvalid: Yup.string().required("isitvalid is required"),
      // memonumber: Yup.string().required("memonumber is required"),
      // notes: Yup.string().required("notes is required"),
    }),

    onSubmit: values => {
      console.log("add-update save..01", values)

      const submitModel = {
        id: values.id,
        cdrnumber: values.cdrnumber,
        datereceived: values.datereceived,
        responseduedate: values.responseduedate,
        dateclosed: values.dateclosed,
        status: _statusSelected,
        discrepancy: values.discrepancy,
        discrepancyshort: values.discrepancyshort,
        responsedate: values.responsedate,
        responseby: _responsebySelected,
        isitvalid: _isitvalidSelected,
        memonumber: values.memonumber,
        notes: values.notes,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editCDRTrackerAddUpdate(submitModel)
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
        newCDRTrackerAddUpdate(submitModel)
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
            ? "Update CDRTrackersAddUpdate"
            : "New CDRTrackersAddUpdate"}
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
                  <Label className="form-label">cdrnumber</Label>
                  <Input
                    id="cdrnumber"
                    name="cdrnumber"
                    type="text"
                    placeholder="cdrnumber"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.cdrnumber || ""}
                    invalid={
                      validation.touched.cdrnumber &&
                      validation.errors.cdrnumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.cdrnumber &&
                  validation.errors.cdrnumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.cdrnumber}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">datereceived</Label>
                  <Input
                    id="datereceived"
                    name="datereceived"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="datereceived"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.datereceived || ""}
                    invalid={
                      validation.touched.datereceived &&
                      validation.errors.datereceived
                        ? true
                        : false
                    }
                  />
                  {validation.touched.datereceived &&
                  validation.errors.datereceived ? (
                    <FormFeedback type="invalid">
                      {validation.errors.datereceived}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">responseduedate</Label>
                  <Input
                    id="responseduedate"
                    name="responseduedate"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="responseduedate"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.responseduedate || ""}
                    invalid={
                      validation.touched.responseduedate &&
                      validation.errors.responseduedate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.responseduedate &&
                  validation.errors.responseduedate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.responseduedate}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">dateclosed</Label>
                  <Input
                    id="dateclosed"
                    name="dateclosed"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateclosed"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateclosed || ""}
                    invalid={
                      validation.touched.dateclosed &&
                      validation.errors.dateclosed
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateclosed &&
                  validation.errors.dateclosed ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateclosed}
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
                  <Label className="form-label">discrepancy</Label>
                  <Input
                    id="discrepancy"
                    name="discrepancy"
                    type="textarea"
                    placeholder="discrepancy"
                    maxLength="225"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.discrepancy || ""}
                    invalid={
                      validation.touched.discrepancy &&
                      validation.errors.discrepancy
                        ? true
                        : false
                    }
                  />
                  {validation.touched.discrepancy &&
                  validation.errors.discrepancy ? (
                    <FormFeedback type="invalid">
                      {validation.errors.discrepancy}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">discrepancyshort</Label>
                  <Input
                    id="discrepancyshort"
                    name="discrepancyshort"
                    type="textarea"
                    placeholder="discrepancyshort"
                    maxLength="225"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.discrepancyshort || ""}
                    invalid={
                      validation.touched.discrepancyshort &&
                      validation.errors.discrepancyshort
                        ? true
                        : false
                    }
                  />
                  {validation.touched.discrepancyshort &&
                  validation.errors.discrepancyshort ? (
                    <FormFeedback type="invalid">
                      {validation.errors.discrepancyshort}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">responsedate</Label>
                  <Input
                    id="responsedate"
                    name="responsedate"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="responsedate"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.responsedate || ""}
                    invalid={
                      validation.touched.responsedate &&
                      validation.errors.responsedate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.responsedate &&
                  validation.errors.responsedate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.responsedate}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>responseby</Label>
                  <Select
                    id="responseby"
                    name="responseby"
                    type="text"
                    onChange={e => {
                      set_responsebySelected(e.value)
                    }}
                    onBlur={validation.handleBlur}
                    options={_responsebySelectItems}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select responseby"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.responseby &&
                  validation.errors.responseby ? (
                    <FormFeedback type="invalid">
                      {validation.errors.responseby}
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
                  <Label className="form-label">memonumber</Label>
                  <Input
                    id="memonumber"
                    name="memonumber"
                    type="text"
                    placeholder="memonumber"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.memonumber || ""}
                    invalid={
                      validation.touched.memonumber &&
                      validation.errors.memonumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.memonumber &&
                  validation.errors.memonumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.memonumber}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">notes</Label>
                  <Input
                    id="notes"
                    name="notes"
                    type="textarea"
                    placeholder="notes"
                    maxLength="225"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.notes || ""}
                    invalid={
                      validation.touched.notes && validation.errors.notes
                        ? true
                        : false
                    }
                  />
                  {validation.touched.notes && validation.errors.notes ? (
                    <FormFeedback type="invalid">
                      {validation.errors.notes}
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

CDRTrackersAddUpdate.propTypes = {
  onSaveClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  open: PropTypes.bool,
  modelData: PropTypes.object,
}

export default CDRTrackersAddUpdate
