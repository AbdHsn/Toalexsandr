import React, { useEffect, useRef, useState } from "react"
import MetaTags from "react-meta-tags"
import ReactPaginate from "react-paginate"
import * as moment from "moment"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import "../../assets/scss/custom/_common.scss"
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
  CardTitle,
  ButtonDropdown,
  Table,
} from "reactstrap"
import Loader from "../../components/Common/Loader"
import BtnExporting from "../../components/Common/BtnExporting"
import {
  getIDIQTrackersView,
  exportIDIQTrackersView,
  deleteIDIQTracker,
} from "../../services/idiq-trackers-service"
import { appTitle, rowSizes as rowSizeDdl } from "../../services/common-service"
import Breadcrumbs from "components/Common/Breadcrumb"
import IDIQTrackerAddUpdate from "./add-update"
import DeleteModal from "../../components/Common/DeleteModal"

const IDIQTrackersView = props => {
  const [IDIQTrackersViewMdl, setIDIQTrackersViewMdl] = useState({})
  const [pageSizeDrp, setPageSizeDrp] = useState(false)
  const [modal, setModal] = useState(false)
  const [modelData, setModelData] = useState({})
  const [deleteModal, setDeleteModal] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [filterOptions, setFilterOptions] = useState(false)

  const start = useRef(0)
  const orderColumn = useRef({
    column: "Id",
    order_by: "DESC",
  })
  const length = useRef("10")

  const id = useRef("")
  const woNumber = useRef("")
  const idiqsowDescription = useRef("")
  const location = useRef("")
  const woType = useRef("")
  const estimator = useRef("")
  const parAssigned = useRef("")
  const verifiedBy = useRef("")
  const inspectionDate = useRef("")
  const dateToPar = useRef("")
  const dateFromPar = useRef("")
  const woStatus = useRef("")
  const comments = useRef("")

  useEffect(() => {
    loadView()
  }, [])

  const onUpdateSearchFilter = (column, value) => {
    start.current = 0
    switch (column) {
      case "id":
        id.current = value
        break
      case "woNumber":
        woNumber.current = value
        break
      case "idiqsowDescription":
        idiqsowDescription.current = value
        break
      case "location":
        location.current = value
        break
      case "woType":
        woType.current = value
        break
      case "estimator":
        estimator.current = value
        break
      case "parAssigned":
        parAssigned.current = value
        break
      case "verifiedBy":
        verifiedBy.current = value
        break
      case "inspectionDate":
        inspectionDate.current = value
        break
      case "dateToPar":
        dateToPar.current = value
        break
      case "dateFromPar":
        dateFromPar.current = value
        break
      case "woStatus":
        woStatus.current = value
        break
      case "comments":
        comments.current = value
        break
      default:
        break
    }
  }

  const loadView = () => {
    let preparePostData = {
      columns: [],
      orders: [orderColumn.current],
      start: start.current,
      length: length.current,
      search: {},
      searches: [
        { search_by: "id", value: id.current },
        { search_by: "woNumber", value: woNumber.current },
        { search_by: "idiqsowDescription", value: idiqsowDescription.current },
        { search_by: "location", value: location.current },
        { search_by: "woType", value: woType.current },
        { search_by: "estimator", value: estimator.current },
        { search_by: "parAssigned", value: parAssigned.current },
        { search_by: "verifiedBy", value: verifiedBy.current },
        { search_by: "inspectionDate", value: inspectionDate.current },
        { search_by: "dateToPar", value: dateToPar.current },
        { search_by: "dateFromPar", value: dateFromPar.current },
        { search_by: "woStatus", value: woStatus.current },
        { search_by: "comments", value: comments.current },
      ],
    }

    setIsFetching(true)
    getIDIQTrackersView(preparePostData)
      .then(res => {
        setIDIQTrackersViewMdl(res.data)
        if (res.data.data.length <= 0) {
          setIsFetching(false)
          toastr.warning("No data found", "NINETRAX")
        } else {
          setIsFetching(false)
        }
      })
      .catch(error => {
        setIsFetching(false)
        toastr.error("Failed to fetch data.", "NINETRAX")
      })
  }

  const onPressEnter = async e => {
    if (e.key === "Enter") {
      start.current = 0
      loadView()
    }
  }

  const onExportClick = () => {
    let preparePostData = {
      columns: [],
      orders: [
        {
          column: "Id",
          order_by: "DESC",
        },
      ],
      start: start.current,
      length: length.current,
      search: {},
      searches: [
        { search_by: "id", value: id.current },
        { search_by: "woNumber", value: woNumber.current },
        { search_by: "idiqsowDescription", value: idiqsowDescription.current },
        { search_by: "location", value: location.current },
        { search_by: "woType", value: woType.current },
        { search_by: "estimator", value: estimator.current },
        { search_by: "parAssigned", value: parAssigned.current },
        { search_by: "verifiedBy", value: verifiedBy.current },
        { search_by: "inspectionDate", value: inspectionDate.current },
        { search_by: "dateToPar", value: dateToPar.current },
        { search_by: "dateFromPar", value: dateFromPar.current },
        { search_by: "woStatus", value: woStatus.current },
        { search_by: "comments", value: comments.current },
      ],
    }

    setIsExporting(true)
    exportIDIQTrackersView(preparePostData)
      .then(res => {
        let downloadLink = document.createElement("a")
        downloadLink.href = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.ms-excel",
          })
        )

        downloadLink.setAttribute("download", "IDIQTrackersView.xlsx")
        document.body.appendChild(downloadLink)
        downloadLink.click()

        setIsExporting(false)
        toastr.success("Export succeeded.", "NINETRAX")
      })
      .catch(error => {
        setIsExporting(false)
        toastr.error("Failed to export data.", "NINETRAX")
      })
  }

  const onOrderByClick = columnName => {
    if (orderColumn.current.column === columnName) {
      if (orderColumn.current.order_by === "DESC")
        orderColumn.current.order_by = "ASC"
      else orderColumn.current.order_by = "DESC"
    } else {
      orderColumn.current.column = columnName
      orderColumn.current.order_by = orderColumn.current.order_by
    }
    loadView()
  }

  const onNewClick = () => {
    setModal(true)
    setModelData(null)
  }

  const onEditClick = item => {
    setModal(true)
    setModelData(item)
    console.log("edit items: ", item)
  }

  const onAttemptDelete = id => {
    if (id > 0) {
      setDeleteModal(true)
      setModelData({ id: id })
    }
  }

  const onDeleteConfirmed = () => {
    if (modelData.id > 0) {
      deleteIDIQTracker(modelData.id)
        .then(res => {
          if (res.data) {
            toastr.success("Selected item successfully deleted.", "NINETRAX")
            setDeleteModal(false)
            loadView()
          } else {
            toastr.warning("Selected item failed to delete.", "NINETRAX")
          }
        })
        .catch(error => {
          toastr.error("Failed to process data.", "NINETRAX")
        })
    } else {
      toastr.error("Can't process request.", "NINETRAX")
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>IDIQ Trackers | {appTitle}</title>
        </MetaTags>

        <Container fluid>
          <Breadcrumbs title="IDIQ Trackers" breadcrumbItem="IDIQ Trackers" />

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
                          Row Size: {length.current}
                        </Button>
                        <DropdownToggle caret color="info">
                          <i className="mdi mdi-chevron-down" />
                        </DropdownToggle>
                        <DropdownMenu>
                          {rowSizeDdl.map((item, index) => {
                            return (
                              <DropdownItem
                                key={index}
                                onClick={() => {
                                  length.current = item
                                  loadView()
                                }}
                                title={
                                  item === "All"
                                    ? "Not recommended on large data"
                                    : ``
                                }
                                className={item === "All" ? `text-warning` : ``}
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
                        onClick={onNewClick}
                      >
                        <i className="bx bx-plus"></i> New
                      </button>

                      {isExporting === true ? (
                        <BtnExporting isExporting={isExporting} />
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-secondary w-xs"
                          onClick={onExportClick}
                        >
                          <i className="bx bx-file"></i> Export
                        </button>
                      )}
                    </div>
                  </div>

                  <Row>
                    <div className="horizontal-scroll table-responsive">
                      <Table
                        data-simplebar={true}
                        className="table table-sm m-0"
                      >
                        <thead>
                          <tr>
                            {/* <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("id")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "id"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              id
                            </th> */}

                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("woNumber")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "woNumber"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              WO Number
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() =>
                                onOrderByClick("idiqsowDescription")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "idiqsowDescription"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              IDIQ SOW Description
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("location")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "location"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Location
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("woType")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "woType"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              WO Type
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("estimator")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "estimator"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Estimator
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("parAssigned")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "parAssigned"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Assigned PAR
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("verifiedBy")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "verifiedBy"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Verified By
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("inspectionDate")}
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "inspectionDate"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Inspection Date
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("dateToPar")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "dateToPar"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Date To PAR
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("dateFromPar")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "dateFromPar"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Date From PAR
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("woStatus")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "woStatus"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              WO Status
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("comments")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "comments"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Inspection Notes
                            </th>
                            <th></th>
                          </tr>
                          <tr>
                            {/* <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="number"
                                placeholder="id"
                                name="sid"
                                id="sid"
                                onChange={e =>
                                  onUpdateSearchFilter("id", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th> */}
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="WO Number"
                                name="swoNumber"
                                id="swoNumber"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "woNumber",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "450px" }}
                                type="text"
                                placeholder="IDIQ SOW Description"
                                name="sidiqsowDescription"
                                id="sidiqsowDescription"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "idiqsowDescription",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="Location"
                                name="slocation"
                                id="slocation"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "location",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="WO Type"
                                name="swoType"
                                id="swoType"
                                onChange={e =>
                                  onUpdateSearchFilter("woType", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="Estimator"
                                name="sestimator"
                                id="sestimator"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "estimator",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="Assigned Par"
                                name="sparAssigned"
                                id="sparAssigned"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "parAssigned",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="Verified By"
                                name="sverifiedBy"
                                id="sverifiedBy"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "verifiedBy",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                type="date"
                                style={{ width: "140px" }}
                                placeholder="Inspection Date"
                                name="sinspectionDate"
                                id="sinspectionDate"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "inspectionDate",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                type="date"
                                style={{ width: "140px" }}
                                placeholder="Date To PAR"
                                name="sdateToPar"
                                id="sdateToPar"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "dateToPar",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                type="date"
                                style={{ width: "140px" }}
                                placeholder="Date From PAR"
                                name="sdateFromPar"
                                id="sdateFromPar"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "dateFromPar",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="WO Status"
                                name="swoStatus"
                                id="swoStatus"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "woStatus",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "450px" }}
                                type="text"
                                placeholder="Inspection Notes"
                                name="scomments"
                                id="scomments"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "comments",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {isFetching === true ? (
                            <tr>
                              <td colSpan={100}>
                                <Loader isLoading={isFetching} />
                              </td>
                            </tr>
                          ) : null}

                          {IDIQTrackersViewMdl.data &&
                            IDIQTrackersViewMdl.data.map((item, index) => {
                              return (
                                <tr key={index}>
                                  {/* <td>{item.id}</td> */}

                                  <td>
                                    {item.woNumber ? (
                                      <label
                                        className="label label-info custom-pointer"
                                        onClick={e => onEditClick(item)}
                                      >
                                        {item.woNumber}
                                      </label>
                                    ) : null}
                                  </td>
                                  <td>{item.idiqsowDescription}</td>
                                  <td>{item.location}</td>
                                  <td>{item.woType}</td>
                                  <td>{item.estimator}</td>
                                  <td>{item.parAssigned}</td>
                                  <td>{item.verifiedBy}</td>
                                  <td>
                                    {item.inspectionDate
                                      ? moment(item.inspectionDate).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>
                                    {item.dateToPar
                                      ? moment(item.dateToPar).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>
                                    {item.dateFromPar
                                      ? moment(item.dateFromPar).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>{item.woStatus}</td>
                                  <td>{item.comments}</td>

                                  <td>
                                    {/* <button
                                      type="button"
                                      className="btn btn-sm btn-outline-primary ml-2"
                                      onClick={e => onEditClick(item)}
                                      data-toggle="modal"
                                      data-target=".bs-example-modal-center"
                                    >
                                      <i className="far fa-edit"></i> Edit
                                    </button>{" "} */}
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-danger ml-2"
                                      onClick={() => onAttemptDelete(item.id)}
                                      data-toggle="modal"
                                      data-target=".bs-example-modal-center"
                                    >
                                      <i className="far fa-trash-alt"></i>{" "}
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              )
                            })}

                          {IDIQTrackersViewMdl.data &&
                            IDIQTrackersViewMdl.data.length === 0 && (
                              <tr>
                                <td
                                  colSpan="100%"
                                  className="text-center text-danger font-weight-bold"
                                >
                                  No data
                                </td>
                              </tr>
                            )}
                        </tbody>
                      </Table>
                    </div>
                  </Row>

                  <Row>
                    <Col className="p-0" xs={12} md={8}>
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
                          pageCount={Math.floor(
                            IDIQTrackersViewMdl.totalRecords / +length.current
                          )}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={3}
                          onPageChange={e => {
                            ;(start.current = Math.floor(
                              e.selected * length.current
                            )),
                              loadView()
                          }}
                          pageClassName={"page-item"}
                          pageLinkClassName={"page-link"}
                          activeClassName={"active"}
                        />
                      </div>
                    </Col>
                    <Col className="p-0 mt-2" xs={6} md={4}>
                      <div className="mt-2 float-end">
                        Total Records: {IDIQTrackersViewMdl.totalRecords}
                      </div>
                    </Col>
                  </Row>
                  <DeleteModal
                    show={deleteModal}
                    onDeleteClick={() => onDeleteConfirmed()}
                    onCloseClick={() => {
                      setDeleteModal(false)
                      setModelData({})
                    }}
                  />

                  <IDIQTrackerAddUpdate
                    open={modal}
                    modelData={modelData}
                    onSaveClick={item => {
                      console.log("onSaveClick from index called...", item)
                      if (item?.id > 0) {
                        loadView()
                      }
                    }}
                    onCancelClick={setModal}
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

export default IDIQTrackersView
