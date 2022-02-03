import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import ReactPaginate from "react-paginate"
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
import * as action from "store/work-order-inspections/actions"

import Breadcrumbs from "components/Common/Breadcrumb"

const workOrderInspections = props => {
  const dispatch = useDispatch()

  const { workOrderInspectionTbl } = useSelector(state => ({
    workOrderInspectionTbl: state.woInspectionData.workOrderInspectionTbl,
  }))
  const { rowSizeDdl } = useSelector(state => ({
    rowSizeDdl: state.woInspectionData.rowSizeDdl,
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

  const [wOInspection, setWOInspection] = useState({})
  const [id, setId] = useState("")
  const [annex, setAnnex] = useState("")
  const [specItem, setSpecItem] = useState("")
  const [title, setTitle] = useState("")
  const [workOrder, setWorkOrder] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [asset, setAsset] = useState("")
  const [crew, setCrew] = useState("")
  const [lead, setLead] = useState("")
  const [workType, setWorkType] = useState("")
  const [subWorkType, setSubWorkType] = useState("")
  const [actualFinish, setActualFinish] = useState("")
  const [qcInspector, setQcInspector] = useState("")
  const [inspectionResults, setInspectionResults] = useState("")
  const [inspectionDate, setInspectionDate] = useState("")
  const [enteredDate, setEnteredDate] = useState("")

  useEffect(() => {
    //dispatch(onGetDirectoryNamesView(postData))
    dispatch(action.getWorkOrderInspectionsView(postData))
  }, [postData])

  const onDeleteConfirmation = id => {
    if (id > 0) {
      setWOInspection({
        id: id,
      })
      setDeleteModal(true)
    }
  }

  // const onImportFromMAXIMODialog = () => {
  //   setImportMaximoModal(true)
  // }

  // const handleImportMaximo = () => {
  //   setImportMaximoModal(false)
  // }

  const handleDelete = () => {
    // if (directoryName.id > 0) {
    //   dispatch(onDeleteDirectoryName(directoryName.id))
    //   //onPaginationPageChange(1)
    //   setDeleteModal(false)
    // }
  }
  const handleEdit = item => {
    // setDirectoryName(item)
    // setIsEdit(true)
    // toggle()
  }

  // const handlePaginationChange = data => {
  //   console.log("dddd", data)
  // }

  const toggle = () => {
    // if (modal) {
    //   setModal(false)
    //   setDirectoryName(null)
    // } else {
    //   setModal(true)
    // }
  }

  const onAddDirectoryName = () => {
    // setIsEdit(false)
    // toggle()
  }

  const validation = useFormik({
    // // enableReinitialize : use this flag when initial values needs to be changed
    // enableReinitialize: true,
    // initialValues: {
    //   personName: (directoryName && directoryName.personName) || "",
    //   personTitle: (directoryName && directoryName.personTitle) || "",
    //   baseOfOperation: (directoryName && directoryName.baseOfOperation) || "",
    // },
    // validationSchema: Yup.object({
    //   personName: Yup.string().required("Please Enter Person Name"),
    //   personTitle: Yup.string().required("Please Enter Person Title"),
    //   baseOfOperation: Yup.string().required("Please Enter Base of Operation"),
    // }),
    // onSubmit: values => {
    //   if (isEdit) {
    //     const update = {
    //       id: directoryName ? directoryName.id : 0,
    //       personName: values.personName,
    //       personTitle: values.personTitle,
    //       baseOfOperation: values.baseOfOperation,
    //     }
    //     // update function
    //     dispatch(onUpdateDirectoryName(update))
    //     validation.resetForm()
    //   } else {
    //     const create = {
    //       personName: values["personName"],
    //       personTitle: values["personTitle"],
    //       baseOfOperation: values["baseOfOperation"],
    //     }
    //     // save new function
    //     dispatch(onAddNewDirectoryName(create))
    //     validation.resetForm()
    //   }
    //   toggle()
    // },
  })

  const handlePressEnter = e => {
    if (e.key === "Enter") {
      setPostData({
        ...postData,
        searches: [
          { search_by: "Id", value: id },
          { search_by: "Annex", value: annex },
          { search_by: "SpecItem", value: specItem },
          { search_by: "Title", value: title },
          { search_by: "WorkOrder", value: workOrder },
          { search_by: "Description", value: description },
          { search_by: "Location", value: location },
          { search_by: "Asset", value: asset },
          { search_by: "Crew", value: crew },
          { search_by: "Lead", value: lead },
          { search_by: "WorkType", value: workType },
          { search_by: "SubWorkType", value: subWorkType },
          { search_by: "ActualFinish", value: actualFinish },
          { search_by: "QcInspector", value: qcInspector },
          { search_by: "InspectionResults", value: inspectionDate },
          { search_by: "InspectionDate", value: enteredDate },
          { search_by: "EnteredDate", value: inspectionResults },
        ],
      })
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>WO Inspect | NINETRAX | Quality Management</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="WO Inspect" breadcrumbItem="WO Inspect" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle className="h4"> </CardTitle>

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
                        //onClick={e => onImportFromMAXIMODialog()}
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
                        <th>Annex</th>
                        <th>SpecItem</th>
                        <th>Title</th>
                        <th>WorkOrder</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Asset</th>
                        <th>Crew</th>
                        <th>Lead</th>
                        <th>WorkType</th>
                        <th>SubWorkType</th>
                        <th>ActualFinish</th>
                        <th>QC Inspector</th>
                        <th>Inspection Date</th>
                        <th>Entered Date</th>
                        <th>Inspection Results</th>
                        <th></th>
                      </tr>
                      <tr>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Id"
                            name="sId"
                            id="sId"
                            onChange={e => setId(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Annex"
                            name="sAnnex"
                            id="sAnnex"
                            onChange={e => setAnnex(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Spec Item"
                            name="sSpecItem"
                            id="sSpecItem"
                            onChange={e => setSpecItem(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Work Order"
                            name="sWorkOrder"
                            id="sWorkOrder"
                            onChange={e => setWorkOrder(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Description"
                            name="sDescription"
                            id="sDescription"
                            onChange={e => setDescription(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Location"
                            name="sLocation"
                            id="sLocation"
                            onChange={e => setLocation(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Asset"
                            name="sAsset"
                            id="sAsset"
                            onChange={e => setAsset(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Crew"
                            name="sCrew"
                            id="sCrew"
                            onChange={e => setCrew(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Lead"
                            name="sLead"
                            id="sLead"
                            onChange={e => setLead(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Work Type"
                            name="sWorkType"
                            id="sWorkType"
                            onChange={e => setWorkType(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="SubWork Type"
                            name="sSubWorkType"
                            id="sSubWorkType"
                            onChange={e => setSubWorkType(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Actual Finish"
                            name="sActualFinish"
                            id="sActualFinish"
                            onChange={e => setActualFinish(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="QC Inspector"
                            name="sQcInspector"
                            id="sQcInspector"
                            onChange={e => setQcInspector(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Inspection Results"
                            name="sInspectionResults"
                            id="sInspectionResults"
                            onChange={e => setInspectionResults(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Inspection Date"
                            name="sInspectionDate"
                            id="sInspectionDate"
                            onChange={e => setInspectionDate(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th>
                          {" "}
                          <input
                            type="text"
                            placeholder="Entered Date"
                            name="sEnteredDate"
                            id="sEnteredDate"
                            onChange={e => setEnteredDate(e.target.value)}
                            onKeyUp={handlePressEnter}
                          />
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {workOrderInspectionTbl.data &&
                        workOrderInspectionTbl.data.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.id}</td>
                              <td>{item.annex}</td>
                              <td>{item.specItem}</td>
                              <td>{item.title}</td>
                              <td>{item.workOrder}</td>
                              <td>{item.description}</td>
                              <td>{item.location}</td>
                              <td>{item.asset}</td>
                              <td>{item.crew}</td>
                              <td>{item.lead}</td>
                              <td>{item.workType}</td>
                              <td>{item.subWorkType}</td>
                              <td>{item.actualFinish}</td>
                              <td>{item.qcInspector}</td>
                              <td>{item.inspectionDate}</td>
                              <td>{item.enteredDate}</td>
                              <td>{item.inspectionResults}</td>

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
                        workOrderInspectionTbl.totalRecords / +postData.length
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
                      {isEdit ? "Edit WO Inspect" : "Add WO Inspect"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        {/* <Row form>
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
                        </Row> */}
                      </Form>
                    </ModalBody>
                  </Modal>

                  <DeleteModal
                    show={deleteModal}
                    onDeleteClick={handleDelete}
                    onCloseClick={() => setDeleteModal(false)}
                  />

                  {/* <ImportFromMaximoModal
                    show={importMaximoModal}
                    onImportClick={() => handleImportMaximo}
                    onCloseClick={() => setImportMaximoModal(false)}
                  /> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default workOrderInspections
