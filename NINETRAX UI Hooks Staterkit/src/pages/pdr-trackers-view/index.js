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
  getPDRTrackersView,
  exportPDRTrackersView,
  deletePDRTracker,
} from "../../services/pdr-trackers-service"
import { rowSizes as rowSizeDdl } from "../../services/common-service"
import Breadcrumbs from "components/Common/Breadcrumb"
import PDRTrackerAddUpdate from "./add-update"
import DeleteModal from "../../components/Common/DeleteModal"

const PDRTrackersView = props => {
  const [PDRTrackersViewMdl, setPDRTrackersViewMdl] = useState({})
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
  const pdrNumber = useRef("")
  const workOrder = useRef("")
  const location = useRef("")
  const qcInspector = useRef("")
  const annex = useRef("")
  const specItem = useRef("")
  const title = useRef("")
  const dateCompleted = useRef("")
  const unsatFindings = useRef("")
  const fmName = useRef("")
  const fmTitle = useRef("")
  const dateIssued = useRef("")
  const dateDue = useRef("")
  const status = useRef("")

  useEffect(() => {
    loadView()
  }, [])

  const onUpdateSearchFilter = (column, value) => {
    start.current = 0
    switch (column) {
      case "id":
        id.current = value
        break
      case "pdrNumber":
        pdrNumber.current = value
        break
      case "workOrder":
        workOrder.current = value
        break
      case "location":
        location.current = value
        break
      case "qcInspector":
        qcInspector.current = value
        break
      case "annex":
        annex.current = value
        break
      case "specItem":
        specItem.current = value
        break
      case "title":
        title.current = value
        break
      case "dateCompleted":
        dateCompleted.current = value
        break
      case "unsatFindings":
        unsatFindings.current = value
        break
      case "fmName":
        fmName.current = value
        break
      case "fmTitle":
        fmTitle.current = value
        break
      case "dateIssued":
        dateIssued.current = value
        break
      case "dateDue":
        dateDue.current = value
        break
      case "status":
        status.current = value
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
        { search_by: "pdrNumber", value: pdrNumber.current },
        { search_by: "workOrder", value: workOrder.current },
        { search_by: "location", value: location.current },
        { search_by: "qcInspector", value: qcInspector.current },
        { search_by: "annex", value: annex.current },
        { search_by: "specItem", value: specItem.current },
        { search_by: "title", value: title.current },
        { search_by: "dateCompleted", value: dateCompleted.current },
        { search_by: "unsatFindings", value: unsatFindings.current },
        { search_by: "fmName", value: fmName.current },
        { search_by: "fmTitle", value: fmTitle.current },
        { search_by: "dateIssued", value: dateIssued.current },
        { search_by: "dateDue", value: dateDue.current },
        { search_by: "status", value: status.current },
      ],
    }

    setIsFetching(true)
    getPDRTrackersView(preparePostData)
      .then(res => {
        setPDRTrackersViewMdl(res.data)
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
        { search_by: "pdrNumber", value: pdrNumber.current },
        { search_by: "workOrder", value: workOrder.current },
        { search_by: "location", value: location.current },
        { search_by: "qcInspector", value: qcInspector.current },
        { search_by: "annex", value: annex.current },
        { search_by: "specItem", value: specItem.current },
        { search_by: "title", value: title.current },
        { search_by: "dateCompleted", value: dateCompleted.current },
        { search_by: "unsatFindings", value: unsatFindings.current },
        { search_by: "fmName", value: fmName.current },
        { search_by: "fmTitle", value: fmTitle.current },
        { search_by: "dateIssued", value: dateIssued.current },
        { search_by: "dateDue", value: dateDue.current },
        { search_by: "status", value: status.current },
      ],
    }

    setIsExporting(true)
    exportPDRTrackersView(preparePostData)
      .then(res => {
        let downloadLink = document.createElement("a")
        downloadLink.href = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.ms-excel",
          })
        )

        downloadLink.setAttribute("download", "PDRTrackersView.xlsx")
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
  }

  const onAttemptDelete = id => {
    if (id > 0) {
      setDeleteModal(true)
      setModelData({ id: id })
    }
  }

  const onDeleteConfirmed = () => {
    if (modelData.id > 0) {
      deletePDRTracker(modelData.id)
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
          <title>PDR Trackers | NINETRAX | QC Management</title>
        </MetaTags>

        <Container fluid>
          <Breadcrumbs title="PDR Trackers" breadcrumbItem="PDR Trackers" />

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
                    <div className="table-responsive">
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
                              onClick={() => onOrderByClick("pdrNumber")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "pdrNumber"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              PDR Number
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("workOrder")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "workOrder"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Work Order
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
                              onClick={() => onOrderByClick("qcInspector")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "qcInspector"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              QC Inspector
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("annex")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "annex"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Annex
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("specItem")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "specItem"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Spec Item
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("title")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "title"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Title
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("dateCompleted")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "dateCompleted"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Date Completed
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("unsatFindings")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "unsatFindings"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Unsat Findings
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("fmName")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "fmName"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              FM Name
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("fmTitle")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "fmTitle"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              FM Title
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("dateIssued")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "dateIssued"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Date Issued
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("dateDue")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "dateDue"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Date Due
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("status")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "status"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Status
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
                                placeholder="PDR Number"
                                name="spdrNumber"
                                id="spdrNumber"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "pdrNumber",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "300px" }}
                                type="text"
                                placeholder="Work Order"
                                name="sworkOrder"
                                id="sworkOrder"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "workOrder",
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
                                placeholder="QC Inspector"
                                name="sqcInspector"
                                id="sqcInspector"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "qcInspector",
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
                                placeholder="Annex"
                                name="sannex"
                                id="sannex"
                                onChange={e =>
                                  onUpdateSearchFilter("annex", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="Spec Item"
                                name="sspecItem"
                                id="sspecItem"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "specItem",
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
                                placeholder="Title"
                                name="stitle"
                                id="stitle"
                                onChange={e =>
                                  onUpdateSearchFilter("title", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                type="date"
                                style={{ width: "140px" }}
                                placeholder="Date Completed"
                                name="sdateCompleted"
                                id="sdateCompleted"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "dateCompleted",
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
                                placeholder="Unsat Findings"
                                name="sunsatFindings"
                                id="sunsatFindings"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "unsatFindings",
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
                                placeholder="FM Name"
                                name="sfmName"
                                id="sfmName"
                                onChange={e =>
                                  onUpdateSearchFilter("fmName", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="FM Title"
                                name="sfmTitle"
                                id="sfmTitle"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "fmTitle",
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
                                placeholder="Date Issued"
                                name="sdateIssued"
                                id="sdateIssued"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "dateIssued",
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
                                placeholder="Date Due"
                                name="sdateDue"
                                id="sdateDue"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "dateDue",
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
                                placeholder="Status"
                                name="sstatus"
                                id="sstatus"
                                onChange={e =>
                                  onUpdateSearchFilter("status", e.target.value)
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

                          {PDRTrackersViewMdl.data &&
                            PDRTrackersViewMdl.data.map((item, index) => {
                              return (
                                <tr key={index}>
                                  {/* <td>{item.id}</td> */}
                                  <td>{item.pdrNumber}</td>
                                  <td>{item.workOrder}</td>
                                  <td>{item.location}</td>
                                  <td>{item.qcInspector}</td>
                                  <td>{item.annex}</td>
                                  <td>{item.specItem}</td>
                                  <td>{item.title}</td>
                                  <td>
                                    {item.dateCompleted
                                      ? moment(item.dateCompleted).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>{item.unsatFindings}</td>
                                  <td>{item.fmName}</td>
                                  <td>{item.fmTitle}</td>
                                  <td>
                                    {item.dateIssued
                                      ? moment(item.dateIssued).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>
                                    {item.dateDue
                                      ? moment(item.dateDue).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>{item.status}</td>

                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-primary ml-2"
                                      onClick={e => onEditClick(item)}
                                      data-toggle="modal"
                                      data-target=".bs-example-modal-center"
                                    >
                                      <i className="far fa-edit"></i> Edit
                                    </button>{" "}
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

                          {PDRTrackersViewMdl.data &&
                            PDRTrackersViewMdl.data.length === 0 && (
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
                            PDRTrackersViewMdl.totalRecords / +length.current
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
                        Total Records: {PDRTrackersViewMdl.totalRecords}
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

                  <PDRTrackerAddUpdate
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

export default PDRTrackersView
