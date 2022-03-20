import React, { useEffect, useRef, useState } from "react"
import MetaTags from "react-meta-tags"
import ReactPaginate from "react-paginate"
import * as moment from "moment"
import classnames from "classnames"
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
  Collapse,
  CardTitle,
  ButtonDropdown,
  Table,
} from "reactstrap"
import Loader from "../../components/Common/Loader"
import BtnExporting from "../../components/Common/BtnExporting"
import {
  fetchTableView,
  exportTableView,
} from "../../services/wo-inspect-service"
import { appTitle, rowSizes as rowSizeDdl } from "../../services/common-service"
import Breadcrumbs from "components/Common/Breadcrumb"
import InspectionAddUpdate from "./add-update"
import DeleteModal from "../../components/Common/DeleteModal"

const workOrderInspections = props => {
  const [workOrderInspectionTbl, setWorkOrderInspectionTbl] = useState({})
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
  const annex = useRef("")
  const specItem = useRef("")
  const title = useRef("")
  const workOrder = useRef("")
  const description = useRef("")
  const location = useRef("")
  const asset = useRef("")
  const crew = useRef("")
  const lead = useRef("")
  const workType = useRef("")
  const subWorkType = useRef("")
  const actualFinish = useRef("")
  const qcInspector = useRef("")
  const inspectionResults = useRef("")
  const inspectionDate = useRef("")
  const enteredDate = useRef("")
  const duration = useRef("")
  const actualFinishFromDate = useRef("")
  const actualFinishToDate = useRef("")
  const multipleWorkOrder = useRef("")

  useEffect(() => {
    loadView()
  }, [])

  const onUpdateSearchFilter = (column, value) => {
    start.current = 0
    switch (column) {
      case "id":
        id.current = value
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
      case "workOrder":
        workOrder.current = value
        break
      case "description":
        description.current = value
        break
      case "location":
        location.current = value
        break
      case "asset":
        asset.current = value
        break
      case "crew":
        crew.current = value
        break
      case "lead":
        lead.current = value
        break
      case "workType":
        workType.current = value
        break
      case "subWorkType":
        subWorkType.current = value
        break
      case "actualFinish":
        actualFinish.current = value
        break
      case "qcInspector":
        qcInspector.current = value
        break
      case "inspectionResults":
        inspectionResults.current = value
        break
      case "inspectionDate":
        inspectionDate.current = value
        break
      case "enteredDate":
        enteredDate.current = value
        break
      case "multipleWorkOrder":
        multipleWorkOrder.current = value
        break
      case "duration":
        duration.current = value
        start.current = 0
        loadView()
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
        { search_by: "Id", value: id.current },
        { search_by: "Annex", value: annex.current },
        { search_by: "SpecItem", value: specItem.current },
        { search_by: "Title", value: title.current },
        { search_by: "WorkOrder", value: workOrder.current },
        { search_by: "Description", value: description.current },
        { search_by: "Location", value: location.current },
        { search_by: "Asset", value: asset.current },
        { search_by: "Crew", value: crew.current },
        { search_by: "Lead", value: lead.current },
        { search_by: "WorkType", value: workType.current },
        { search_by: "SubWorkType", value: subWorkType.current },
        { search_by: "ActualFinish", value: actualFinish.current },
        { search_by: "QcInspector", value: qcInspector.current },
        { search_by: "InspectionResults", value: inspectionDate.current },
        { search_by: "InspectionDate", value: enteredDate.current },
        { search_by: "EnteredDate", value: inspectionResults.current },
        { search_by: "MultipleWorkOrder", value: multipleWorkOrder.current },
        { search_by: "Duration", value: duration.current },
        {
          search_by: "ActualFinishDateRange",
          fromdate: actualFinishFromDate.current || null,
          todate: actualFinishToDate.current || null,
        },
      ],
    }

    setIsFetching(true)
    fetchTableView(preparePostData)
      .then(res => {
        setWorkOrderInspectionTbl(res.data)
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
        { search_by: "Id", value: id.current },
        { search_by: "Annex", value: annex.current },
        { search_by: "SpecItem", value: specItem.current },
        { search_by: "Title", value: title.current },
        { search_by: "WorkOrder", value: workOrder.current },
        { search_by: "Description", value: description.current },
        { search_by: "Location", value: location.current },
        { search_by: "Asset", value: asset.current },
        { search_by: "Crew", value: crew.current },
        { search_by: "Lead", value: lead.current },
        { search_by: "WorkType", value: workType.current },
        { search_by: "SubWorkType", value: subWorkType.current },
        { search_by: "ActualFinish", value: actualFinish.current },
        { search_by: "QcInspector", value: qcInspector.current },
        { search_by: "InspectionResults", value: inspectionDate.current },
        { search_by: "InspectionDate", value: enteredDate.current },
        { search_by: "EnteredDate", value: inspectionResults.current },
        {
          search_by: "MultipleWorkOrder",
          value: multipleWorkOrder.current,
        },
        { search_by: "Duration", value: duration.current },
        {
          search_by: "ActualFinishDateRange",
          fromdate: actualFinishFromDate.current || null,
          todate: actualFinishToDate.current || null,
        },
      ],
    }

    setIsExporting(true)
    exportTableView(preparePostData)
      .then(res => {
        let downloadLink = document.createElement("a")
        downloadLink.href = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.ms-excel",
          })
        )

        downloadLink.setAttribute("download", "WorkOrderInspect.xlsx")
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

  const onChangeActualFinishDateRangeCriteria = async (e, inputType) => {
    let fromdate = actualFinishFromDate.current || null
    let todate = actualFinishToDate.current || null

    switch (e.target.value) {
      case "Last2Days":
        fromdate = moment().subtract(2, "d").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case "Last1Week":
        fromdate = moment().subtract(1, "w").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case "Last2Weeks":
        fromdate = moment().subtract(2, "w").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case "Last30Days":
        fromdate = moment().subtract(30, "d").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case "Last90Days":
        fromdate = moment().subtract(90, "d").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case "Last6Months":
        fromdate = moment().subtract(0.5, "y").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case "-1":
        fromdate = ""
        todate = ""
        break
      default:
        break
    }

    if (inputType === "sActualFinishFromDate") fromdate = e.target.value

    if (inputType === "sActualFinishToDate") todate = e.target.value

    actualFinishFromDate.current = fromdate
    actualFinishToDate.current = todate

    if (
      actualFinishFromDate.current &&
      actualFinishToDate.current &&
      moment(actualFinishToDate.current).diff(
        moment(actualFinishFromDate.current)
      ) >= 0
    ) {
      start.current = 0
      loadView()
    } else {
      //toastr.warning("Invalid date range.", "NINETRAX")
    }
  }

  const onOrderByClick = columnName => {
    console.log(
      "old selected column: ",
      orderColumn.current,
      orderColumn.current.column,
      orderColumn.current.order_by,
      columnName
    )

    if (orderColumn.current.column === columnName) {
      if (orderColumn.current.order_by === "DESC")
        orderColumn.current.order_by = "ASC"
      else orderColumn.current.order_by = "DESC"
    } else {
      orderColumn.current.column = columnName
      orderColumn.current.order_by = orderColumn.current.order_by
    }

    console.log(
      "latest selected column: ",
      orderColumn.current,
      orderColumn.current.column,
      orderColumn.current.order_by,
      columnName
    )
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

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>WO Inspection | {appTitle}</title>
        </MetaTags>

        <Container fluid>
          <Breadcrumbs title="Work Order Inspect" breadcrumbItem="WO Inspect" />

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
                      {/* <button
                        type="button"
                        className="btn btn-outline-danger w-xs"
                        //onClick={onBulkDeleteClick}
                      >
                        <i className="bx bx-trash"></i> Bulk Delete
                      </button> */}
                    </div>
                  </div>

                  <Row className="my-2">
                    <div className="accordion-flush" id="accordion">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className={classnames(
                              "accordion-button",
                              "p-1 py-3",
                              "fw-medium",
                              { collapsed: !filterOptions }
                            )}
                            type="button"
                            onClick={() => setFilterOptions(!filterOptions)}
                            style={{ cursor: "pointer" }}
                          >
                            Additional Filter Options
                          </button>
                        </h2>

                        <Collapse
                          isOpen={filterOptions}
                          className="accordion-collapse"
                        >
                          <div className="accordion-body">
                            <Row>
                              <Col xl={4}>
                                <div className="row">
                                  <label className="mb-0 mt-2 p-0">
                                    Seach WO by finish dates
                                  </label>

                                  <input
                                    type="date"
                                    style={{ width: "50%" }}
                                    placeholder="Start Date"
                                    name="sActualFinishFromDate"
                                    id="sActualFinishFromDate"
                                    pattern="\d{4}-\d{2}-\d{2}"
                                    value={actualFinishFromDate.current || ""}
                                    onChange={e =>
                                      onChangeActualFinishDateRangeCriteria(
                                        e,
                                        "sActualFinishFromDate"
                                      )
                                    }
                                  />
                                  <input
                                    type="date"
                                    style={{ width: "50%" }}
                                    placeholder="End Date"
                                    name="sActualFinishToDate"
                                    id="sActualFinishToDate"
                                    pattern="\d{4}-\d{2}-\d{2}"
                                    value={actualFinishToDate.current || ""}
                                    onChange={e =>
                                      onChangeActualFinishDateRangeCriteria(
                                        e,
                                        "sActualFinishToDate"
                                      )
                                    }
                                  />
                                </div>
                                <div className="row">
                                  <label className="mb-0 mt-2 p-0">
                                    Choose date criteria{" "}
                                  </label>
                                  <select
                                    name="dateRangeCriteria"
                                    id="dateRangeCriteria"
                                    onChange={
                                      onChangeActualFinishDateRangeCriteria
                                    }
                                  >
                                    <option value="-1">
                                      Date Range Criteria
                                    </option>
                                    <option value="Last2Days">
                                      Last 2 days
                                    </option>
                                    <option value="Last1Week">
                                      Last 1 week
                                    </option>
                                    <option value="Last2Weeks">
                                      Last 2 weeks
                                    </option>
                                    <option value="Last30Days">
                                      Last 30 days
                                    </option>
                                    <option value="Last90Days">
                                      Last 90 days
                                    </option>
                                    <option value="Last6Months">
                                      Last 6 months
                                    </option>
                                  </select>
                                </div>
                                <div className="row">
                                  <label className="mb-0 mt-2 p-0">
                                    **Multiple WO Search
                                  </label>
                                  <input
                                    type="text"
                                    style={{ width: "100%" }}
                                    placeholder="Multi Work Order"
                                    name="sMultipleWorkOrder"
                                    id="sMultipleWorkOrder"
                                    onChange={e =>
                                      onUpdateSearchFilter(
                                        "multipleWorkOrder",
                                        e.target.value
                                      )
                                    }
                                    onKeyUp={onPressEnter}
                                  />
                                </div>
                              </Col>
                              <Col xl={8}>
                                <div className="row">
                                  <Col xs={3}>
                                    <label>Select Base Site</label>
                                    <div className="border border-primary p-2 py-3">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="baseSite"
                                          id="radioAll"
                                          value="all"
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="radioAll"
                                        >
                                          All
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="baseSite"
                                          id="notIncludeBMD"
                                          value="notIncludeBMD"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="notIncludeBMD"
                                        >
                                          Do not include BMD
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="baseSite"
                                          id="onlyMBD"
                                          value="onlyMBD"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="onlyMBD"
                                        >
                                          Only BMD
                                        </label>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xs={6}>
                                    <label>Select Frequency</label>
                                    <div className="row border border-primary p-2 py-3">
                                      <Col xs="6">
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="rdoFrequency"
                                            id="frequencyAll"
                                            value="all"
                                            defaultChecked
                                            onChange={e =>
                                              onUpdateSearchFilter(
                                                "duration",
                                                ""
                                              )
                                            }
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="frequencyAll"
                                          >
                                            All
                                          </label>
                                        </div>
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="rdoFrequency"
                                            id="SemiA"
                                            value="SemiA"
                                            onChange={e =>
                                              onUpdateSearchFilter(
                                                "duration",
                                                "960:00"
                                              )
                                            }
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="SemiA"
                                          >
                                            Semi/A
                                          </label>
                                        </div>
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="rdoFrequency"
                                            id="monthly"
                                            value="monthly"
                                            onChange={e =>
                                              onUpdateSearchFilter(
                                                "duration",
                                                "720:00"
                                              )
                                            }
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="monthly"
                                          >
                                            Monthly
                                          </label>
                                        </div>
                                      </Col>
                                      <Col xs="6">
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="rdoFrequency"
                                            id="Anually"
                                            value="Anually"
                                            onChange={e =>
                                              onUpdateSearchFilter(
                                                "duration",
                                                "1440:00"
                                              )
                                            }
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="Anually"
                                          >
                                            Anually
                                          </label>
                                        </div>
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="rdoFrequency"
                                            id="quarterly"
                                            value="quarterly"
                                            onChange={e =>
                                              onUpdateSearchFilter(
                                                "duration",
                                                "480:00"
                                              )
                                            }
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="quarterly"
                                          >
                                            Quarterly
                                          </label>
                                        </div>
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="rdoFrequency"
                                            id="weekly"
                                            value="weekly"
                                            onClick={e =>
                                              onUpdateSearchFilter(
                                                "duration",
                                                "168:00"
                                              )
                                            }
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="weekly"
                                          >
                                            Weekly
                                          </label>
                                        </div>
                                      </Col>
                                    </div>
                                  </Col>
                                  <Col xs={3}>
                                    <label>Work Orders Copies</label>
                                    <textarea
                                      className="form-control text-primary"
                                      id="workOrdersCopies"
                                      rows="4"
                                    ></textarea>
                                  </Col>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Collapse>
                      </div>
                    </div>
                  </Row>

                  <Row>
                    <div className="table-responsive">
                      <Table
                        data-simplebar={true}
                        className="table table-sm m-0"
                      >
                        <thead>
                          <tr>
                            {/* <th>Id</th> */}
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("Annex")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "Annex"
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
                              onClick={() => onOrderByClick("SpecItem")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "SpecItem"
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
                              onClick={() => onOrderByClick("Title")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "Title"
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
                              onClick={() => onOrderByClick("WorkOrder")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "WorkOrder"
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
                              onClick={() => onOrderByClick("Description")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "Description"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Description
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("Location")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "Location"
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
                              onClick={() => onOrderByClick("Asset")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "Asset"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Asset
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("Crew")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "Crew"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Crew
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("Lead")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "Lead"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Lead
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("WorkType")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "WorkType"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Work Type
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("SubWorkType")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "SubWorkType"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Sub WorkType
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("ActualFinish")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "ActualFinish"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Actual Finish
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("QcInspector")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "QcInspector"
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
                                onOrderByClick("InspectionResults")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "InspectionResults"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Inspection Results
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("InspectionDate")}
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "InspectionDate"
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
                              onClick={() => onOrderByClick("EnteredDate")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "EnteredDate"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Entered Date
                            </th>

                            <th></th>
                          </tr>
                          <tr>
                            {/* <th>
                            {" "}
                            <input
                              type="text"
                              placeholder="Id"
                              name="sId"
                              id="sId"
                              onChange={e => setId(e.target.value)}
                              onKeyUp={onPressEnter}
                            />
                          </th> */}
                            <th>
                              {" "}
                              <input
                                style={{ width: "80px" }}
                                type="text"
                                placeholder="Annex"
                                name="sAnnex"
                                id="sAnnex"
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
                                name="sSpecItem"
                                id="sSpecItem"
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
                                name="sTitle"
                                id="sTitle"
                                onChange={e =>
                                  onUpdateSearchFilter("title", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "80px" }}
                                type="text"
                                placeholder="Work Order"
                                name="sWorkOrder"
                                id="sWorkOrder"
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
                                type="text"
                                style={{ width: "250px" }}
                                placeholder="Description"
                                name="sDescription"
                                id="sDescription"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "description",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                type="text"
                                style={{ width: "120px" }}
                                placeholder="Location"
                                name="sLocation"
                                id="sLocation"
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
                                type="text"
                                style={{ width: "80px" }}
                                placeholder="Asset"
                                name="sAsset"
                                id="sAsset"
                                onChange={e =>
                                  onUpdateSearchFilter("asset", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                type="text"
                                style={{ width: "80px" }}
                                placeholder="Crew"
                                name="sCrew"
                                id="sCrew"
                                onChange={e =>
                                  onUpdateSearchFilter("crew", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                type="text"
                                style={{ width: "80px" }}
                                placeholder="Lead"
                                name="sLead"
                                id="sLead"
                                onChange={e =>
                                  onUpdateSearchFilter("lead", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                type="text"
                                style={{ width: "80px" }}
                                placeholder="Work Type"
                                name="sWorkType"
                                id="sWorkType"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "workType",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                type="text"
                                style={{ width: "100px" }}
                                placeholder="SubWork Type"
                                name="sSubWorkType"
                                id="sSubWorkType"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "subWorkType",
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
                                placeholder="Actual Finish"
                                name="sActualFinish"
                                id="sActualFinish"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "actualFinish",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                type="text"
                                style={{ width: "100px" }}
                                placeholder="QC Inspector"
                                name="sQcInspector"
                                id="sQcInspector"
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
                                type="text"
                                style={{ width: "100px" }}
                                placeholder="Inspection Results"
                                name="sInspectionResults"
                                id="sInspectionResults"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "inspectionResults",
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
                                name="sInspectionDate"
                                id="sInspectionDate"
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
                                placeholder="Record Date"
                                name="sEnteredDate"
                                id="sEnteredDate"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "enteredDate",
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

                          {workOrderInspectionTbl.data &&
                            workOrderInspectionTbl.data.map((item, index) => {
                              return (
                                <tr key={index}>
                                  {/* <td>{item.id}</td> */}
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
                                  <td>
                                    {moment(item.actualFinish).format(
                                      "MM/DD/YYYY"
                                    )}
                                  </td>
                                  <td>{item.qcInspector}</td>
                                  <td>{item.inspectionResults}</td>
                                  <td>
                                    {item.inspectionDate
                                      ? moment(item.inspectionDate).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>
                                    {item.enteredDate
                                      ? moment(item.enteredDate).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>

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

                          {workOrderInspectionTbl.data &&
                            workOrderInspectionTbl.data.length === 0 && (
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
                            workOrderInspectionTbl.totalRecords /
                              +length.current
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
                        Total Records: {workOrderInspectionTbl.totalRecords}
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

                  <InspectionAddUpdate
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

export default workOrderInspections
