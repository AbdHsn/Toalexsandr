import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import ReactPaginate from "react-paginate"
//import ReactPaginate from "react-paginate"
//import "react-pagination-js/dist/styles.css" // import css
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
import DeleteModal from "../../components/Common/DeleteModal"
import ImportFromMaximoModal from "../import-from-maximo"
import {
  getDirectoryNamesView as onGetDirectoryNamesView,
  addNewDirectoryName as onAddNewDirectoryName,
  updateDirectoryName as onUpdateDirectoryName,
  deleteDirectoryName as onDeleteDirectoryName,
} from "store/directory-name/actions"

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
  const [deleteModal, setDeleteModal] = useState(false)
  const [importMaximoModal, setImportMaximoModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [directoryName, setDirectoryName] = useState({})

  const [searchId, setSearchId] = useState("")
  const [personName, setPersonName] = useState("")
  const [personTitle, setPersonTitle] = useState("")
  const [baseOfOperation, setBaseOfOperation] = useState("")

  useEffect(() => {
    dispatch(onGetDirectoryNamesView(postData))
  }, [postData])

  const onDeleteConfirmation = id => {
    if (id > 0) {
      setDirectoryName({
        id: id,
      })
      setDeleteModal(true)
    }
  }

  const onImportFromMAXIMODialog = () => {
    setImportMaximoModal(true)
  }

  const handleImportMaximo = () => {
    setImportMaximoModal(false)
  }
  const handleDelete = () => {
    if (directoryName.id > 0) {
      dispatch(onDeleteDirectoryName(directoryName.id))
      //onPaginationPageChange(1)
      setDeleteModal(false)
    }
  }
  const handleEdit = item => {
    setDirectoryName(item)
    setIsEdit(true)
    toggle()
  }

  // const handlePaginationChange = data => {
  //   console.log("dddd", data)
  // }

  const toggle = () => {
    if (modal) {
      setModal(false)
      setDirectoryName(null)
    } else {
      setModal(true)
    }
  }

  const onAddDirectoryName = () => {
    setIsEdit(false)
    toggle()
  }

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
        dispatch(onUpdateDirectoryName(update))
        validation.resetForm()
      } else {
        const create = {
          personName: values["personName"],
          personTitle: values["personTitle"],
          baseOfOperation: values["baseOfOperation"],
        }
        // save new function
        dispatch(onAddNewDirectoryName(create))
        validation.resetForm()
      }
      toggle()
    },
  })

  const handlePressEnter = e => {
    if (e.key === "Enter") {
      setPostData({
        ...postData,
        searches: [
          { search_by: "Id", value: searchId },
          { search_by: "PersonName", value: personName },
          { search_by: "PersonTitle", value: personTitle },
          { search_by: "BaseOfOperation", value: baseOfOperation },
        ],
      })
    }
  }

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

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger ml-2"
                        onClick={e => onImportFromMAXIMODialog()}
                        data-toggle="modal"
                        data-target=".bs-example-modal-center"
                      >
                        <i className="far fa-trash-alt"></i> Import MAXIMO
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
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Id Search"
                            name="searchById"
                            id="searchById"
                            onChange={e => setSearchId(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Person Name Search"
                            name="searchByPersonName"
                            id="searchByPersonName"
                            onChange={e => setPersonName(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Person Title Search"
                            name="searchByPersonTitle"
                            id="searchByPersonTitle"
                            onChange={e => setPersonTitle(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Base Operation Search"
                            name="searchByBaseOfOperation"
                            id="searchByBa"
                            onChange={e => setBaseOfOperation(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
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
                                  onClick={e => handleEdit(item)}
                                  data-toggle="modal"
                                  data-target=".bs-example-modal-center"
                                >
                                  <i className="far fa-edit"></i> Edit
                                </button>{" "}
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger ml-2"
                                  onClick={e => onDeleteConfirmation(item.id)}
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

                  <div className="mt-2">
                    <ReactPaginate
                      containerClassName={"pagination justify-content-left"}
                      previousLabel={"Previous"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextLabel={"Next"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      breakLabel={"..."}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      pageCount={Math.ceil(
                        directoryNamesTbl.totalRecords / +postData.length
                      )}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={e =>
                        setPostData({
                          ...postData,
                          start: e.selected * postData.length,
                        })
                      }
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      activeClassName={"active"}
                    />
                  </div>

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {isEdit ? "Edit Directory Name" : "Add Directory Name"}
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

                  <DeleteModal
                    show={deleteModal}
                    onDeleteClick={handleDelete}
                    onCloseClick={() => setDeleteModal(false)}
                  />

                  <ImportFromMaximoModal
                    show={importMaximoModal}
                    onImportClick={() => handleImportMaximo}
                    onCloseClick={() => setImportMaximoModal(false)}
                  />
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
