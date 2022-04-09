import React, { useEffect, useRef, useState } from "react"
import MetaTags from "react-meta-tags"
import ReactPaginate from "react-paginate"
import * as moment from "moment"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import "../../assets/scss/custom/_common.scss"
import DeleteModal from "../../components/Common/DeleteModal"

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
  ButtonDropdown,
  CardTitle,
  Table,
} from "reactstrap"
import Loader from "../../components/Common/Loader"
import BtnExporting from "../../components/Common/BtnExporting"
import {
  getNCRTrackersView,
  exportNCRTrackersView,
  deleteNCRTracker,
} from "../../services/ncr-trackers-service"
import { appTitle, rowSizes as rowSizeDdl } from "../../services/common-service"

import Breadcrumbs from "components/Common/Breadcrumb"
import NCRTrackerAddUpdate from "./add-update"

const NCRTrackersView = props => {
  const [NCRTrackersViewMdl, setNCRTrackersViewMdl] = useState({})
  const [pageSizeDrp, setPageSizeDrp] = useState(false)

  const [isFetching, setIsFetching] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [filterOptions, setFilterOptions] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const start = useRef(0)
  const orderColumn = useRef({
    column: "Id",
    order_by: "DESC",
  })
  const length = useRef("10")

  const id = useRef("")
  const ncrNumber = useRef("")
  const pdrNumber = useRef("")
  const woNumber = useRef("")
  const dateIssued = useRef("")
  const qcInspector = useRef("")
  const nonConformanceSummary = useRef("")
  const dateCAPDue = useRef("")
  const status = useRef("")
  const annex = useRef("")
  const specItem = useRef("")
  const title = useRef("")
  const responsiblePerson = useRef("")
  const responsibleSub = useRef("")

  useEffect(() => {
    loadView()
  }, [])

  const onUpdateSearchFilter = (column, value) => {
    start.current = 0
    switch (column) {
      case "id":
        id.current = value
        break
      case "ncrNumber":
        ncrNumber.current = value
        break
      case "pdrNumber":
        pdrNumber.current = value
        break
      case "woNumber":
        woNumber.current = value
        break
      case "dateIssued":
        dateIssued.current = value
        break
      case "qcInspector":
        qcInspector.current = value
        break
      case "nonConformanceSummary":
        nonConformanceSummary.current = value
        break
      case "dateCAPDue":
        dateCAPDue.current = value
        break
      case "status":
        status.current = value
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
      case "responsiblePerson":
        responsiblePerson.current = value
        break
      case "responsibleSub":
        responsibleSub.current = value
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
        { search_by: "ncrNumber", value: ncrNumber.current },
        { search_by: "pdrNumber", value: pdrNumber.current },
        { search_by: "woNumber", value: woNumber.current },
        { search_by: "dateIssued", value: dateIssued.current },
        { search_by: "qcInspector", value: qcInspector.current },
        {
          search_by: "nonConformanceSummary",
          value: nonConformanceSummary.current,
        },
        { search_by: "dateCAPDue", value: dateCAPDue.current },
        { search_by: "status", value: status.current },
        { search_by: "annex", value: annex.current },
        { search_by: "specItem", value: specItem.current },
        { search_by: "title", value: title.current },
        { search_by: "responsiblePerson", value: responsiblePerson.current },
        { search_by: "responsibleSub", value: responsibleSub.current },
      ],
    }

    setIsFetching(true)
    getNCRTrackersView(preparePostData)
      .then(res => {
        setNCRTrackersViewMdl(res.data)
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

  const onAttemptDelete = id => {
    if (id > 0) {
      setDeleteModal(true)
      setModelData({ id: id })
    }
  }

  const onDeleteConfirmed = () => {
    if (modelData.id > 0) {
      deleteNCRTracker(modelData.id)
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
        { search_by: "ncrNumber", value: ncrNumber.current },
        { search_by: "pdrNumber", value: pdrNumber.current },
        { search_by: "woNumber", value: woNumber.current },
        { search_by: "dateIssued", value: dateIssued.current },
        { search_by: "qcInspector", value: qcInspector.current },
        {
          search_by: "nonConformanceSummary",
          value: nonConformanceSummary.current,
        },
        { search_by: "dateCAPDue", value: dateCAPDue.current },
        { search_by: "status", value: status.current },
        { search_by: "annex", value: annex.current },
        { search_by: "specItem", value: specItem.current },
        { search_by: "title", value: title.current },
        { search_by: "responsiblePerson", value: responsiblePerson.current },
        { search_by: "responsibleSub", value: responsibleSub.current },
      ],
    }

    setIsExporting(true)
    exportNCRTrackersView(preparePostData)
      .then(res => {
        let downloadLink = document.createElement("a")
        downloadLink.href = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.ms-excel",
          })
        )

        downloadLink.setAttribute("download", "NCRTrackersView.xlsx")
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

  const [modal, setModal] = useState(false)
  const [modelData, setModelData] = useState({})

  const onNewClick = () => {
    setModal(true)
    setModelData(null)
  }

  const onEditClick = item => {
    setModal(true)
    setModelData(item)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>NCR Trackers | {appTitle}</title>
        </MetaTags>

        <Container fluid>
          <Breadcrumbs title="NCR Trackers" breadcrumbItem="NCR Trackers" />

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
                              onClick={() => onOrderByClick("ncrNumber")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "ncrNumber"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              NCR Number
                            </th>
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
                              onClick={() =>
                                onOrderByClick("nonConformanceSummary")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "nonConformanceSummary"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Non-Conformance Summary
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("dateCAPDue")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "dateCAPDue"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Date CAP Due
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
                              onClick={() =>
                                onOrderByClick("responsiblePerson")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "responsiblePerson"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Responsible Person
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("responsibleSub")}
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "responsibleSub"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Responsible Sub
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
                                placeholder="NCR Number"
                                name="sncrNumber"
                                id="sncrNumber"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "ncrNumber",
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
                                placeholder="Non-Conformance Summary"
                                name="snonConformanceSummary"
                                id="snonConformanceSummary"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "nonConformanceSummary",
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
                                placeholder="Date CAP Due"
                                name="sdateCAPDue"
                                id="sdateCAPDue"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "dateCAPDue",
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
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="Responsible Person"
                                name="sresponsiblePerson"
                                id="sresponsiblePerson"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "responsiblePerson",
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
                                placeholder="Responsible Sub"
                                name="sresponsibleSub"
                                id="sresponsibleSub"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "responsibleSub",
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

                          {NCRTrackersViewMdl.data &&
                            NCRTrackersViewMdl.data.map((item, index) => {
                              return (
                                <tr key={index}>
                                  {/* <td>{item.id}</td> */}
                                  <td>
                                    {item.ncrNumber ? (
                                      <label
                                        className="label label-info custom-pointer"
                                        onClick={e => onEditClick(item)}
                                      >
                                        {item.ncrNumber}
                                      </label>
                                    ) : null}
                                  </td>
                                  <td>{item.pdrNumber}</td>
                                  <td>{item.woNumber}</td>
                                  <td>
                                    {item.dateIssued
                                      ? moment(item.dateIssued).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>{item.qcInspector}</td>
                                  <td>{item.nonConformanceSummary}</td>
                                  <td>
                                    {item.dateCAPDue
                                      ? moment(item.dateCAPDue).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>{item.status}</td>
                                  <td>{item.annex}</td>
                                  <td>{item.specItem}</td>
                                  <td>{item.title}</td>
                                  <td>{item.responsiblePerson}</td>
                                  <td>{item.responsibleSub}</td>

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

                          {NCRTrackersViewMdl.data &&
                            NCRTrackersViewMdl.data.length === 0 && (
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
                            NCRTrackersViewMdl.totalRecords / +length.current
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
                        Total Records: {NCRTrackersViewMdl.totalRecords}
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

                  <NCRTrackerAddUpdate
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

export default NCRTrackersView
