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
  newMenuNamingConventionAddUpdate,
  editMenuNamingConventionAddUpdate,
} from "../../services/menu-naming-convention-service"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import BtnSaving from "../../components/Common/BtnSaving"
const MenuNamingConventionAddUpdate = ({
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
      trackerName: (modelData && modelData.trackerName) || "",
      abrvName: (modelData && modelData.abrvName) || "",
      prefix: (modelData && modelData.prefix) || "",
      postfix: (modelData && modelData.postfix) || "",
      namingConv: (modelData && modelData.namingConv) || "",
      lastUsedConv: (modelData && modelData.lastUsedConv) || "",
      nextToUseConv: (modelData && modelData.nextToUseConv) || "",
      active: (modelData && modelData.active) || "",
      group: (modelData && modelData.group) || "",
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("id is required"),
      // trackerName: Yup.string().required("trackerName is required"),
      // abrvName: Yup.string().required("abrvName is required"),
      // prefix: Yup.string().required("prefix is required"),
      // postfix: Yup.string().required("postfix is required"),
      // namingConv: Yup.string().required("namingConv is required"),
      // lastUsedConv: Yup.string().required("lastUsedConv is required"),
      // nextToUseConv: Yup.string().required("nextToUseConv is required"),
      // active: Yup.string().required("active is required"),
      // group: Yup.string().required("group is required"),
    }),

    onSubmit: values => {
      console.log("add-update save..01", values)

      const submitModel = {
        id: values.id,
        trackerName: values.trackerName,
        abrvName: values.abrvName,
        prefix: values.prefix,
        numberSeq: values.numberSeq,
        postfix: values.postfix,
        namingConv: values.namingConv,
        lastUsedConv: values.lastUsedConv,
        nextToUseConv: values.nextToUseConv,
        active: values.active,
        group: values.group,
      }

      if (submitModel && submitModel?.id > 0) {
        setIsSaving(true)
        editMenuNamingConventionAddUpdate(submitModel?.id, submitModel)
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
        newMenuNamingConventionAddUpdate(submitModel)
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
          {modelData?.id > 0
            ? "Update Naming Convention "
            : "New Naming Convention"}
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
                  <Label className="form-label">Tracker Name</Label>
                  <Input
                    id="trackerName"
                    name="trackerName"
                    type="text"
                    placeholder="Tracker Name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.trackerName || ""}
                    invalid={
                      validation.touched.trackerName &&
                      validation.errors.trackerName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.trackerName &&
                  validation.errors.trackerName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.trackerName}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Abrv Name</Label>
                  <Input
                    id="abrvName"
                    name="abrvName"
                    type="text"
                    placeholder="Abrv Name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.abrvName || ""}
                    invalid={
                      validation.touched.abrvName && validation.errors.abrvName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.abrvName && validation.errors.abrvName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.abrvName}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Prefix</Label>
                  <Input
                    id="prefix"
                    name="prefix"
                    type="text"
                    placeholder="Prefix"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.prefix || ""}
                    invalid={
                      validation.touched.prefix && validation.errors.prefix
                        ? true
                        : false
                    }
                  />
                  {validation.touched.prefix && validation.errors.prefix ? (
                    <FormFeedback type="invalid">
                      {validation.errors.prefix}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Postfix</Label>
                  <Input
                    id="postfix"
                    name="postfix"
                    type="text"
                    placeholder="Postfix"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.postfix || ""}
                    invalid={
                      validation.touched.postfix && validation.errors.postfix
                        ? true
                        : false
                    }
                  />
                  {validation.touched.postfix && validation.errors.postfix ? (
                    <FormFeedback type="invalid">
                      {validation.errors.postfix}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Naming Convention</Label>
                  <Input
                    id="namingConv"
                    name="namingConv"
                    type="text"
                    placeholder="Naming Convention"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.namingConv || ""}
                    invalid={
                      validation.touched.namingConv &&
                      validation.errors.namingConv
                        ? true
                        : false
                    }
                  />
                  {validation.touched.namingConv &&
                  validation.errors.namingConv ? (
                    <FormFeedback type="invalid">
                      {validation.errors.namingConv}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <Label className="form-label">Last Used Convention</Label>
                  <Input
                    id="lastUsedConv"
                    name="lastUsedConv"
                    type="text"
                    placeholder="Last Used Convention"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.lastUsedConv || ""}
                    invalid={
                      validation.touched.lastUsedConv &&
                      validation.errors.lastUsedConv
                        ? true
                        : false
                    }
                  />
                  {validation.touched.lastUsedConv &&
                  validation.errors.lastUsedConv ? (
                    <FormFeedback type="invalid">
                      {validation.errors.lastUsedConv}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Next To Use Convention</Label>
                  <Input
                    id="nextToUseConv"
                    name="nextToUseConv"
                    type="text"
                    placeholder="Next To Use Convention"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.nextToUseConv || ""}
                    invalid={
                      validation.touched.nextToUseConv &&
                      validation.errors.nextToUseConv
                        ? true
                        : false
                    }
                  />
                  {validation.touched.nextToUseConv &&
                  validation.errors.nextToUseConv ? (
                    <FormFeedback type="invalid">
                      {validation.errors.nextToUseConv}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Active</Label>
                  <Input
                    id="active"
                    name="active"
                    type="text"
                    placeholder="Active"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.active || ""}
                    invalid={
                      validation.touched.active && validation.errors.active
                        ? true
                        : false
                    }
                  />
                  {validation.touched.active && validation.errors.active ? (
                    <FormFeedback type="invalid">
                      {validation.errors.active}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Group</Label>
                  <Input
                    id="group"
                    name="group"
                    type="text"
                    placeholder="Group"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.group || ""}
                    invalid={
                      validation.touched.group && validation.errors.group
                        ? true
                        : false
                    }
                  />
                  {validation.touched.group && validation.errors.group ? (
                    <FormFeedback type="invalid">
                      {validation.errors.group}
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

MenuNamingConventionAddUpdate.propTypes = {
  onSaveClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  open: PropTypes.bool,
  modelData: PropTypes.object,
}

export default MenuNamingConventionAddUpdate
