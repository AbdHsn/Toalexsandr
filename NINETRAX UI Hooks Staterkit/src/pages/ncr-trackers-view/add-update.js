import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
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
  getDirectoryNamesView as onGetDirectoryNamesView,
  addNewDirectoryName as onAddNewDirectoryName,
  updateDirectoryName as onUpdateDirectoryName,
  deleteDirectoryName as onDeleteDirectoryName,
} from "store/directory-name/actions"

const NCRTrackerAddUpdate = ({
  open,
  modalTitle,
  onSaveClick,
  onCloseClick,
}) => {
  const dispatch = useDispatch()

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [directoryName, setDirectoryName] = useState({})

  useEffect(() => {
    //dispatch(onGetDirectoryNamesView(postData))
  }, [])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      personName: (directoryName && directoryName.personName) || "",
      personTitle: (directoryName && directoryName.personTitle) || "",
    },
    validationSchema: Yup.object({
      personName: Yup.string().required("Please Enter Person Name"),
      personTitle: Yup.string().required("Please Enter Person Title"),
    }),

    onSubmit: values => {
      if (isEdit) {
        const update = {
          id: directoryName ? directoryName.id : 0,
          personName: values.personName,
          personTitle: values.personTitle,
        }
        // update function
        dispatch(onUpdateDirectoryName(update))
        validation.resetForm()
      } else {
        const create = {
          personName: values["personName"],
          personTitle: values["personTitle"],
        }
        // save new function
        dispatch(onAddNewDirectoryName(create))
        validation.resetForm()
      }
      toggle()
    },
  })

  return (
    <>
      <Modal isOpen={open}>
        <ModalHeader tag="h4">{modalTitle}</ModalHeader>
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
                  <Label className="form-label">personName</Label>
                  <Input
                    name="personName"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.personName || ""}
                    invalid={
                      validation.touched.personName &&
                      validation.errors.personName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.personName &&
                  validation.errors.personName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.personName}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Person Title</Label>
                  <Input
                    name="personTitle"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.personTitle || ""}
                    invalid={
                      validation.touched.personTitle &&
                      validation.errors.personTitle
                        ? true
                        : false
                    }
                  />
                  {validation.touched.personTitle &&
                  validation.errors.personTitle ? (
                    <FormFeedback type="invalid">
                      {validation.errors.personTitle}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <button type="submit" className="btn btn-success">
                    SAVE
                  </button>{" "}
                  <button
                    onClick={() => {
                      // props.sendToParent(False)
                    }}
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
  onCloseClick: PropTypes.func,
  open: PropTypes.bool,
  modalTitle: PropTypes.string,
}

export default NCRTrackerAddUpdate
