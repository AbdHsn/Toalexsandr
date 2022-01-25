import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
//redux
import { useSelector, useDispatch } from "react-redux"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  FormFeedback,
  Label,
  Form,
  CardTitle,
  ButtonDropdown,
  Table,
} from "reactstrap"

import {
  getDirectoryNamesView as onGetDirectoryNamesView,
  // addNewCustomer as onAddNewCustomer,
  // updateCustomer as onUpdateCustomer,
  // deleteCustomer as onDeleteCustomer,
} from "store/directory-name/actions"

//import { getDirectoryNamesViewAxios } from "../../helpers/backend_helper"

import Breadcrumbs from "components/Common/Breadcrumb"

const DirectoryNames = props => {
  const dispatch = useDispatch()

  const { directoryNamesTbl } = useSelector(state => ({
    directoryNamesTbl: state.directoryNameData.directoryNamesTbl,
  }))
  const { rowSizeDdl } = useSelector(state => ({
    rowSizeDdl: state.directoryNameData.rowSizeDdl,
  }))

  const ini_PostingData = {
    start: 0,
    length: "10",
    search: {},
    columns: [],
    searches: [],
    orders: [
      {
        column: "Id",
        order_by: "DESC",
      },
    ],
  }
  const [postData, setPostData] = useState(ini_PostingData)
  const [pageSizeDrp, setPageSizeDrp] = useState(false)

  const [modal, setModal] = useState(false)
  const [customerList, setCustomerList] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [customer, setCustomer] = useState(null)
  const [directoryName, setDirectoryName] = useState(null)

  useEffect(() => {
    dispatch(onGetDirectoryNamesView(postData))
  }, [postData])

  const handleDelete = id => {
    const newDirectoryNames = directoryNameData.filter(f => f.id !== id)
    setDirectoryNameData(newDirectoryNames)
  }
  const handleEdit = id => {
    const newDirectoryNames = directoryNameData.filter(f => f.id !== id)
    setDirectoryNameData(newDirectoryNames)
  }

  const toggle = () => {
    if (modal) {
      setModal(false)
      setDirectoryName(null)
    } else {
      setModal(true)
    }
  }

  const onAddDirectoryName = () => {
    //setCustomerList("")
    setIsEdit(false)
    toggle()
  }

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      personName: (directoryName && directoryName.personName) || "",
      personTitle: (directoryName && directoryName.personTitle) || "",
      baseOfOperation: (directoryName && directoryName.baseOfOperation) || "",
    },
    validationSchema: Yup.object({
      personName: Yup.string().required("Please Enter Person Name"),
      personTitle: Yup.string().required("Please Enter Person Title"),
      baseOfOperation: Yup.string().required("Please Enter Base of Operation"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const update = {
          id: directoryName ? directoryName.id : 0,
          personName: values.personName,
          personTitle: values.personTitle,
          baseOfOperation: values.baseOfOperation,
        }
        // update function
        // dispatch(onUpdateCustomer(update))
        validation.resetForm()
      } else {
        const _new = {
          personName: values["personName"],
          personTitle: values["personTitle"],
          baseOfOperation: values["baseOfOperation"],
        }
        // save new function
        // dispatch(onAddNewCustomer(_new))
        validation.resetForm()
      }
      toggle()
    },
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Directory Names | Skote - React Admin & Dashboard Template
          </title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="DN" breadcrumbItem="DN" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle className="h4"> Directory Names</CardTitle>

                  <div className="d-flex flex-wrap">
                    <div className="btn-group">
                      <ButtonDropdown
                        isOpen={pageSizeDrp}
                        toggle={() => setPageSizeDrp(!pageSizeDrp)}
                      >
                        <Button id="caret" color="info" disabled>
                          Row Size: {postData.length}
                        </Button>
                        <DropdownToggle caret color="info">
                          <i className="mdi mdi-chevron-down" />
                        </DropdownToggle>
                        <DropdownMenu>
                          {rowSizeDdl.map((item, index) => {
                            return (
                              <DropdownItem
                                key={index}
                                onClick={e =>
                                  setPostData({ ...postData, length: item })
                                }
                              >
                                {item}
                              </DropdownItem>
                            )
                          })}
                        </DropdownMenu>
                      </ButtonDropdown>

                      <button
                        type="button"
                        className="btn btn-outline-secondary w-xs"
                        onClick={onAddDirectoryName}
                      >
                        <i className="bx bx-plus"></i> New
                      </button>
                    </div>
                  </div>

                  {/* {isLoading && (
                    <>
                      <div className="m-auto text-warning">
                        {" "}
                        <Spinner animation="border" size="sm" />
                        Loading...
                      </div>
                    </>
                  )} */}

                  <Table className="table table-sm m-0">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Base Operation</th>
                        <th></th>
                      </tr>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {directoryNamesTbl.data &&
                        directoryNamesTbl.data.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.id}</td>
                              <td>{item.personName}</td>
                              <td>{item.personTitle}</td>
                              <td>{item.baseOfOperation}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-primary ml-2"
                                  onClick={e => handleEdit(item.id)}
                                  data-toggle="modal"
                                  data-target=".bs-example-modal-center"
                                >
                                  <i className="far fa-pencil"></i> Edit
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger ml-2"
                                  onClick={e => handleDelete(item.id)}
                                  data-toggle="modal"
                                  data-target=".bs-example-modal-center"
                                >
                                  <i className="far fa-trash-alt"></i> Delete
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </Table>

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Customer" : "Add Customer"}
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

                            <div className="mb-3">
                              <Label className="form-label">
                                Base Of Operation
                              </Label>
                              <Input
                                name="baseOfOperation"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.baseOfOperation || ""}
                                invalid={
                                  validation.touched.baseOfOperation &&
                                  validation.errors.baseOfOperation
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.baseOfOperation &&
                              validation.errors.baseOfOperation ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.baseOfOperation}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-customer"
                              >
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

// DirectoryNames.propTypes = {
//   //customers: PropTypes.array,
//   directoryNamesTbl: PropTypes.object,
//   onGetDirectoryNamesView: PropTypes.func,
//   //onGetCustomers: PropTypes.func,
//   // onAddNewCustomer: PropTypes.func,
//   // onDeleteCustomer: PropTypes.func,
//   // onUpdateCustomer: PropTypes.func,
// }
export default DirectoryNames
