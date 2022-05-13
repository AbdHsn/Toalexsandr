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
  newUsersAddUpdate,
  editUsersAddUpdate,
} from "../../services/users-service"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import BtnSaving from "../../components/Common/BtnSaving"
import { getDDL } from "../../services/common-service"

const UsersAddUpdate = ({ open, modelData, onSaveClick, onCancelClick }) => {
  useEffect(() => {
    //set existing selected value
    modelData && modelData?.accessType != null
      ? set_accessTypeSelected({
          label: modelData?.accessType,
          value: modelData?.accessType,
        })
      : set_accessTypeSelected("")

    modelData && modelData?.aor != null
      ? set_aorSelected({
          label: modelData?.aor,
          value: modelData?.aor,
        })
      : set_aorSelected("")

    modelData && modelData?.securityQuesOne != null
      ? set_securityQuestionSelected({
          label: modelData?.securityQuesOne,
          value: modelData?.securityQuesOne,
        })
      : set_securityQuestionSelected("")

    modelData && modelData?.qualityInspectors != null
      ? set_qualityInspectors(modelData.qualityInspectors)
      : set_qualityInspectors(false)

    modelData && modelData?.qualityInspectors != null
      ? set_qualityInspectors(modelData?.qualityInspectors)
      : set_qualityInspectors(false)
    modelData && modelData?.assosicateInspectors != null
      ? set_assosicateInspectors(modelData?.assosicateInspectors)
      : set_assosicateInspectors(false)
    modelData && modelData?.planEstimateInspectors != null
      ? set_planEstimateInspectors(modelData?.planEstimateInspectors)
      : set_planEstimateInspectors(false)
    modelData && modelData?.customerInspectors != null
      ? set_customerInspectors(modelData?.customerInspectors)
      : set_customerInspectors(false)
    modelData && modelData?.activeStatus != null
      ? set_activeStatus(modelData?.activeStatus)
      : set_activeStatus(false)
    modelData && modelData?.fullAdminRights != null
      ? set_fullAdminRights(modelData?.fullAdminRights)
      : set_fullAdminRights(false)
    modelData && modelData?.editRights != null
      ? set_editRights(modelData?.editRights)
      : set_editRights(false)
    modelData && modelData?.deleteRights != null
      ? set_deleteRights(modelData?.deleteRights)
      : set_deleteRights(false)
    modelData && modelData?.viewRights != null
      ? set_viewRights(modelData?.viewRights)
      : set_viewRights(false)
    modelData && modelData?.importRights != null
      ? set_importRights(modelData?.importRights)
      : set_importRights(false)
    modelData && modelData?.activateAutologout != null
      ? set_activateAutologout(modelData?.activateAutologout)
      : set_activateAutologout(false)
    modelData && modelData?.resetPassword != null
      ? set_resetPassword(modelData?.resetPassword)
      : set_resetPassword(false)

    //Call dropdown data
    initializeDropdownData()
  }, [modelData])

  const [isSaving, setIsSaving] = useState(false)
  const [qualityInspectors, set_qualityInspectors] = useState(false)
  const [_accessTypeSelected, set_accessTypeSelected] = useState("")
  const [_accessTypeSelectItems, set_accessTypeSelectItems] = useState([])
  const [_aorSelected, set_aorSelected] = useState("")
  const [_aorSelectItems, set_aorSelectItems] = useState([])
  const [_securityQuestionSelected, set_securityQuestionSelected] = useState("")
  const [_securityQuestionSelectItems, set_securityQuestionSelectItems] =
    useState([])

  const [assosicateInspectors, set_assosicateInspectors] = useState(false)
  const [planEstimateInspectors, set_planEstimateInspectors] = useState(false)
  const [customerInspectors, set_customerInspectors] = useState(false)
  const [activeStatus, set_activeStatus] = useState(false)
  const [fullAdminRights, set_fullAdminRights] = useState(false)
  const [editRights, set_editRights] = useState(false)
  const [deleteRights, set_deleteRights] = useState(false)
  const [viewRights, set_viewRights] = useState(false)
  const [importRights, set_importRights] = useState(false)
  const [activateAutologout, set_activateAutologout] = useState(false)
  const [resetPassword, set_resetPassword] = useState(false)

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (modelData && modelData.id) || 0,
      firstName: (modelData && modelData.firstName) || "",
      lastName: (modelData && modelData.lastName) || "",
      fullName: (modelData && modelData.fullName) || "",
      uniqueId: (modelData && modelData.uniqueId) || "",
      qualityInspectors: (modelData && modelData.qualityInspectors) || false,
      assosicateInspectors:
        (modelData && modelData.assosicateInspectors) || false,
      planEstimateInspectors:
        (modelData && modelData.planEstimateInspectors) || false,
      customerInspectors: (modelData && modelData.customerInspectors) || false,
      aor: (modelData && modelData.aor) || "",
      positionTitle: (modelData && modelData.positionTitle) || "",
      email: (modelData && modelData.email) || "",
      accessType: (modelData && modelData.accessType) || "",
      activeStatus: (modelData && modelData.activeStatus) || false,
      fullAdminRights: (modelData && modelData.fullAdminRights) || false,
      editRights: (modelData && modelData.editRights) || false,
      deleteRights: (modelData && modelData.deleteRights) || false,
      viewRights: (modelData && modelData.viewRights) || false,
      importRights: (modelData && modelData.importRights) || false,
      activateAutologout: (modelData && modelData.activateAutologout) || false,
      loginId: (modelData && modelData.loginId) || "",
      password: (modelData && modelData.password) || "",
      resetPassword: (modelData && modelData.resetPassword) || false,
      securityQuesOne: (modelData && modelData.securityQuesOne) || "",
      securityAnsOne: (modelData && modelData.securityAnsOne) || "",
      dateAccessGranted:
        (modelData &&
          modelData?.dateAccessGranted &&
          moment(modelData?.dateAccessGranted).format("YYYY-MM-DD")) ||
        null,
      dateAccessRemoved:
        (modelData &&
          modelData?.dateAccessRemoved &&
          moment(modelData?.dateAccessRemoved).format("YYYY-MM-DD")) ||
        null,
      comments: (modelData && modelData.comments) || "",
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("id is required"),
      // firstName: Yup.string().required("firstName is required"),
      // lastName: Yup.string().required("lastName is required"),
      // fullName: Yup.string().required("fullName is required"),
      // uniqueId: Yup.string().required("uniqueId is required"),
      // qualityInspectors: Yup.string().required("qualityInspectors is required"),
      // assosicateInspectors: Yup.string().required("assosicateInspectors is required"),
      // planEstimateInspectors: Yup.string().required("planEstimateInspectors is required"),
      // customerInspectors: Yup.string().required("customerInspectors is required"),
      // aor: Yup.string().required("aor is required"),
      // positionTitle: Yup.string().required("positionTitle is required"),
      // email: Yup.string().required("email is required"),
      // accessType: Yup.string().required("accessType is required"),
      // activeStatus: Yup.string().required("activeStatus is required"),
      // fullAdminRights: Yup.string().required("fullAdminRights is required"),
      // editRights: Yup.string().required("editRights is required"),
      // deleteRights: Yup.string().required("deleteRights is required"),
      // viewRights: Yup.string().required("viewRights is required"),
      // importRights: Yup.string().required("importRights is required"),
      // activateAutologout: Yup.string().required("activateAutologout is required"),
      // loginId: Yup.string().required("loginId is required"),
      // password: Yup.string().required("password is required"),
      // resetPassword: Yup.string().required("resetPassword is required"),
      // securityQuesOne: Yup.string().required("securityQuesOne is required"),
      // securityAnsOne: Yup.string().required("securityAnsOne is required"),
      // dateAccessGranted: Yup.string().required("dateAccessGranted is required"),
      // dateAccessRemoved: Yup.string().required("dateAccessRemoved is required"),
      // comments: Yup.string().required("comments is required"),
    }),

    onSubmit: values => {
      console.log("add-update save..01", values)

      const submitModel = {
        id: values.id,
        firstName: values.firstName,
        lastName: values.lastName,
        fullName: values.fullName,
        uniqueId: values.uniqueId,
        aor: _aorSelected.value,
        positionTitle: values.positionTitle,
        email: values.email,
        accessType: _accessTypeSelected.value,

        loginId: values.loginId,
        password: values.password,
        securityQuesOne: _securityQuestionSelected.value,
        securityAnsOne: values.securityAnsOne,
        dateAccessGranted: values.dateAccessGranted,
        dateAccessRemoved: values.dateAccessRemoved,
        comments: values.comments,

        qualityInspectors: qualityInspectors,
        assosicateInspectors: assosicateInspectors,
        planEstimateInspectors: planEstimateInspectors,
        customerInspectors: customerInspectors,
        activeStatus: activeStatus,
        fullAdminRights: fullAdminRights,
        editRights: editRights,
        deleteRights: deleteRights,
        viewRights: viewRights,
        importRights: importRights,
        activateAutologout: activateAutologout,
        resetPassword: resetPassword,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editUsersAddUpdate(submitModel?.id, submitModel)
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
        newUsersAddUpdate(submitModel)
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
    //USERLEVELACCESS
    getDDL("USERLEVELACCESS")
      .then(res => {
        if (res.data.length > 0) {
          set_accessTypeSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed USERLEVELACCESS_DDL: ", error)
      })

    //AREAOFRESPONSIBILITIES
    getDDL("AREAOFRESPONSIBILITIES")
      .then(res => {
        if (res.data.length > 0) {
          set_aorSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed AREAOFRESPONSIBILITIES_DDL: ", error)
      })

    //SECURITYQUESTIONS
    getDDL("SECURITYQUESTIONS")
      .then(res => {
        if (res.data.length > 0) {
          set_securityQuestionSelectItems(res.data)
        }
      })
      .catch(error => {
        console.log("Failed SECURITYQUESTIONS_DDL: ", error)
      })
  }

  return (
    <>
      <Modal isOpen={open} className="modal-dialog modal-lg">
        <ModalHeader tag="h4">
          {modelData?.id > 0 ? "Update UsersAddUpdate" : "New UsersAddUpdate"}
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
                  <Label className="form-label">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.firstName || ""}
                    invalid={
                      validation.touched.firstName &&
                      validation.errors.firstName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.firstName &&
                  validation.errors.firstName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.firstName}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.lastName || ""}
                    invalid={
                      validation.touched.lastName && validation.errors.lastName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.lastName && validation.errors.lastName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.lastName}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.fullName || ""}
                    invalid={
                      validation.touched.fullName && validation.errors.fullName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.fullName && validation.errors.fullName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.fullName}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Unique Id</Label>
                  <Input
                    id="uniqueId"
                    name="uniqueId"
                    type="text"
                    placeholder="uniqueId"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.uniqueId || ""}
                    invalid={
                      validation.touched.uniqueId && validation.errors.uniqueId
                        ? true
                        : false
                    }
                  />
                  {validation.touched.uniqueId && validation.errors.uniqueId ? (
                    <FormFeedback type="invalid">
                      {validation.errors.uniqueId}
                    </FormFeedback>
                  ) : null}
                </div>
                {/* checkbox */}
                {/* checkbox */}
                {/* checkbox */}
                {/* checkbox */}
                <div className="mb-3">
                  <Label className="form-label">Access Level</Label>

                  <Select
                    id="accessType"
                    name="accessType"
                    type="text"
                    onChange={e => {
                      set_accessTypeSelected({
                        label: e.label,
                        value: e.value,
                      })
                    }}
                    onBlur={validation.handleBlur}
                    options={_accessTypeSelectItems}
                    defaultValue={_accessTypeSelected}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select Access Type"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.accessType &&
                  validation.errors.accessType ? (
                    <FormFeedback type="invalid">
                      {validation.errors.accessType}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">
                    Choose Area Of Responsibilities
                  </Label>

                  <Select
                    id="aor"
                    name="aor"
                    type="text"
                    onChange={e => {
                      set_aorSelected({
                        label: e.label,
                        value: e.value,
                      })
                    }}
                    onBlur={validation.handleBlur}
                    options={_aorSelectItems}
                    defaultValue={_aorSelected}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Area Of Resp"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.aor && validation.errors.aor ? (
                    <FormFeedback type="invalid">
                      {validation.errors.aor}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Position Title</Label>
                  <Input
                    id="positionTitle"
                    name="positionTitle"
                    type="text"
                    placeholder="Position Title"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.positionTitle || ""}
                    invalid={
                      validation.touched.positionTitle &&
                      validation.errors.positionTitle
                        ? true
                        : false
                    }
                  />
                  {validation.touched.positionTitle &&
                  validation.errors.positionTitle ? (
                    <FormFeedback type="invalid">
                      {validation.errors.positionTitle}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.email || ""}
                    invalid={
                      validation.touched.email && validation.errors.email
                        ? true
                        : false
                    }
                  />
                  {validation.touched.email && validation.errors.email ? (
                    <FormFeedback type="invalid">
                      {validation.errors.email}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-md-6 col-sm-12">
                {/* checkbox */}
                {/* checkbox */}
                {/* checkbox */}
                {/* checkbox */}
                {/* checkbox */}
                {/* checkbox */}
                {/* checkbox */}
                <div className="mb-3">
                  <Label className="form-label">Login Id</Label>
                  <Input
                    id="loginId"
                    name="loginId"
                    type="text"
                    placeholder="loginId"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.loginId || ""}
                    invalid={
                      validation.touched.loginId && validation.errors.loginId
                        ? true
                        : false
                    }
                  />
                  {validation.touched.loginId && validation.errors.loginId ? (
                    <FormFeedback type="invalid">
                      {validation.errors.loginId}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="text"
                    placeholder="Password"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.password || ""}
                    invalid={
                      validation.touched.password && validation.errors.password
                        ? true
                        : false
                    }
                  />
                  {validation.touched.password && validation.errors.password ? (
                    <FormFeedback type="invalid">
                      {validation.errors.password}
                    </FormFeedback>
                  ) : null}
                </div>
                {/* checkbox */}
                <div className="mb-3">
                  <Label className="form-label">Security Questions</Label>
                  <Select
                    id="securityQ"
                    name="securityQ"
                    type="text"
                    onChange={e => {
                      set_securityQuestionSelectItems({
                        label: e.label,
                        value: e.value,
                      })
                    }}
                    onBlur={validation.handleBlur}
                    options={_securityQuestionSelectItems}
                    defaultValue={_securityQuestionSelected}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select Question"
                    isClearable={false}
                    isSearchable={true}
                    isLoading={false}
                    loadingMessage={() => "Fetching Data..."}
                    noOptionsMessage={() => "No Data Found."}
                  />
                  {validation.touched.securityQuesOne &&
                  validation.errors.securityQuesOne ? (
                    <FormFeedback type="invalid">
                      {validation.errors.securityQuesOne}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Security Answer</Label>
                  <Input
                    id="securityAnsOne"
                    name="securityAnsOne"
                    type="text"
                    placeholder="Security Answer"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.securityAnsOne || ""}
                    invalid={
                      validation.touched.securityAnsOne &&
                      validation.errors.securityAnsOne
                        ? true
                        : false
                    }
                  />
                  {validation.touched.securityAnsOne &&
                  validation.errors.securityAnsOne ? (
                    <FormFeedback type="invalid">
                      {validation.errors.securityAnsOne}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Date Access Granted</Label>
                  <Input
                    id="dateAccessGranted"
                    name="dateAccessGranted"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateAccessGranted"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateAccessGranted || ""}
                    invalid={
                      validation.touched.dateAccessGranted &&
                      validation.errors.dateAccessGranted
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateAccessGranted &&
                  validation.errors.dateAccessGranted ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateAccessGranted}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Date Access Removed</Label>
                  <Input
                    id="dateAccessRemoved"
                    name="dateAccessRemoved"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dateAccessRemoved"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateAccessRemoved || ""}
                    invalid={
                      validation.touched.dateAccessRemoved &&
                      validation.errors.dateAccessRemoved
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateAccessRemoved &&
                  validation.errors.dateAccessRemoved ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateAccessRemoved}
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
              </Col>
            </Row>

            <Row>
              <Col className="col-sm-3">
                <div className="mb-3">
                  <div className="form-check form-check-end">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="chkqualityInspectors"
                      defaultChecked={qualityInspectors}
                      onChange={e => {
                        set_qualityInspectors(e.target.checked)
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="chkqualityInspectors"
                    >
                      Quality Inspectors
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-check-end">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="chkassosicateInspectors"
                      defaultChecked={assosicateInspectors}
                      onChange={e => {
                        set_assosicateInspectors(e.target.checked)
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="chkassosicateInspectors"
                    >
                      Assosicate Inspectors
                    </label>
                  </div>
                </div>
              </Col>
              <Col className="col-sm-3">
                <div className="mb-3">
                  <div className="form-check form-check-end">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="chkplanEstimateInspectors"
                      defaultChecked={planEstimateInspectors}
                      onChange={e => {
                        set_planEstimateInspectors(e.target.checked)
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="chkplanEstimateInspectors"
                    >
                      Plan Estimate Inspectors
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check form-check-end">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="chkcustomerInspectors"
                      defaultChecked={customerInspectors}
                      onChange={e => {
                        set_customerInspectors(e.target.checked)
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="chkcustomerInspectors"
                    >
                      Customer Inspectors
                    </label>
                  </div>
                </div>
              </Col>
              <Col className="col-sm-3">
                <div className="mb-3">
                  <div className="form-check form-check-end">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="chkfullAdminRights"
                      defaultChecked={fullAdminRights}
                      onChange={e => {
                        set_fullAdminRights(e.target.checked)
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="chkfullAdminRights"
                    >
                      Full Admin Rights
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check form-check-end">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="chkviewRights"
                      defaultChecked={viewRights}
                      onChange={e => {
                        set_viewRights(e.target.checked)
                      }}
                    />
                    <label className="form-check-label" htmlFor="chkviewRights">
                      View Rights
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-check-end">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="chkimportRights"
                      defaultChecked={importRights}
                      onChange={e => {
                        set_importRights(e.target.checked)
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="chkimportRights"
                    >
                      Import Rights
                    </label>
                  </div>
                </div>
              </Col>
              <Col className="col-sm-3">
                <div className="mb-3">
                  <div className="form-check form-check-end">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="chkdeleteRights"
                      defaultChecked={deleteRights}
                      onChange={e => {
                        set_deleteRights(e.target.checked)
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="chkdeleteRights"
                    >
                      Delete Rights
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-check-end">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="chkeditRights"
                      defaultChecked={editRights}
                      onChange={e => {
                        set_editRights(e.target.checked)
                      }}
                    />
                    <label className="form-check-label" htmlFor="chkeditRights">
                      Edit Rights
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-check-end">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="chkactivateAutologout"
                      defaultChecked={activateAutologout}
                      onChange={e => {
                        set_activateAutologout(e.target.checked)
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="chkactivateAutologout"
                    >
                      Activate Auto logout
                    </label>
                  </div>
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

UsersAddUpdate.propTypes = {
  onSaveClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  open: PropTypes.bool,
  modelData: PropTypes.object,
}

export default UsersAddUpdate
