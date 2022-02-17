import React, { useEffect, useRef, useState } from "react"
import MetaTags from "react-meta-tags"
import ReactPaginate from "react-paginate"
import { useSelector, useDispatch } from "react-redux"
import { isEmpty } from "lodash"
import * as moment from "moment"
import PropTypes from "prop-types"
import { useFormik } from "formik"
import * as Yup from "yup"
import classnames from "classnames"

import toastr from "toastr"
import "toastr/build/toastr.min.css"

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
  Collapse,
  Form,
  CardTitle,
  ButtonDropdown,
  Table,
  Accordion,
  Spinner,
} from "reactstrap"
import DeleteModal from "../../components/Common/DeleteModal"
import Loader from "../../components/Common/Loader"
import * as action from "store/work-order-inspections/actions"

import { fetchTableView, fetchViews1 } from "../../services/wo-inspect-service"
import { rowSizes as rowSizeDdl } from "../../services/common-service"

import Breadcrumbs from "components/Common/Breadcrumb"

const workOrderInspections = props => {
  const [pageSizeDrp, setPageSizeDrp] = useState(false)
  const [workOrderInspectionTbl, setWorkOrderInspectionTbl] = useState({})

  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [importMaximoModal, setImportMaximoModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const start = useRef(0)
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

  const updateColumnSearchValues = (column, value) => {
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

  useEffect(() => {
    loadView()
  }, [])

  const loadView = () => {
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

  const [filterOptions, setfilterOptions] = useState(false)

  const toggleFilterOptions = () => {
    setfilterOptions(!filterOptions)
  }

  const handlePressEnter = async e => {
    if (e.key === "Enter") {
      start.current = 0
      loadView()
    }
  }

  const handleActualFinishDateRangeCriteria = async (e, inputType) => {
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
                                onClick={e => {
                                  length.current = item
                                  loadView()
                                }}
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
                        //onClick={onAddDirectoryName}
                      >
                        <i className="bx bx-plus"></i> New
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-xs"
                        //onClick={onAddDirectoryName}
                      >
                        <i className="bx bx-file"></i> Export
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger w-xs"
                        //onClick={onAddDirectoryName}
                      >
                        <i className="bx bx-trash"></i> Bulk Delete
                      </button>
                    </div>
                  </div>

                  <Row className="my-2">
                    <div className="accordion-flush" id="accordion">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className={classnames(
                              "accordion-button",
                              "fw-medium",
                              { collapsed: !filterOptions }
                            )}
                            type="button"
                            onClick={toggleFilterOptions}
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
                                  <label className="p-0">
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
                                      handleActualFinishDateRangeCriteria(
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
                                      handleActualFinishDateRangeCriteria(
                                        e,
                                        "sActualFinishToDate"
                                      )
                                    }
                                  />
                                </div>
                                <div className="row">
                                  <label className="p-0">
                                    Choose date criteria{" "}
                                  </label>
                                  <select
                                    name="dateRangeCriteria"
                                    id="dateRangeCriteria"
                                    onChange={
                                      handleActualFinishDateRangeCriteria
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
                                  <label className="p-0">
                                    **Multiple WO Search
                                  </label>
                                  <input
                                    type="text"
                                    style={{ width: "100%" }}
                                    placeholder="Multi Work Order"
                                    name="sMultipleWorkOrder"
                                    id="sMultipleWorkOrder"
                                    onChange={e =>
                                      updateColumnSearchValues(
                                        "multipleWorkOrder",
                                        e.target.value
                                      )
                                    }
                                    onKeyUp={handlePressEnter}
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
                                              updateColumnSearchValues(
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
                                              updateColumnSearchValues(
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
                                              updateColumnSearchValues(
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
                                              updateColumnSearchValues(
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
                                              updateColumnSearchValues(
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
                                              updateColumnSearchValues(
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

                  <div className="table-responsive">
                    <Table className="table table-sm m-0">
                      <thead>
                        <tr>
                          {/* <th>Id</th> */}
                          <th>Annex</th>
                          <th>Spec Item</th>
                          <th>Title</th>
                          <th>Work Order</th>
                          <th>Description</th>
                          <th>Location</th>
                          <th>Asset</th>
                          <th>Crew</th>
                          <th>Lead</th>
                          <th>WorkType</th>
                          <th>SubWork Type</th>
                          <th>Actual Finish</th>
                          <th>QC Inspector</th>
                          <th>Ins. Results</th>
                          <th>Inspection Date</th>
                          <th>Record Date</th>
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
                              onKeyUp={handlePressEnter}
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
                                //setAnnex(e.target.value)
                                updateColumnSearchValues(
                                  "annex",
                                  e.target.value
                                )
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues(
                                  "specItem",
                                  e.target.value
                                )
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues(
                                  "title",
                                  e.target.value
                                )
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues(
                                  "workOrder",
                                  e.target.value
                                )
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues(
                                  "description",
                                  e.target.value
                                )
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues(
                                  "location",
                                  e.target.value
                                )
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues(
                                  "asset",
                                  e.target.value
                                )
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues("crew", e.target.value)
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues("lead", e.target.value)
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues(
                                  "workType",
                                  e.target.value
                                )
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues(
                                  "subWorkType",
                                  e.target.value
                                )
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues(
                                  "actualFinish",
                                  e.target.value
                                )
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues(
                                  "qcInspector",
                                  e.target.value
                                )
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues(
                                  "inspectionResults",
                                  e.target.value
                                )
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues(
                                  "inspectionDate",
                                  e.target.value
                                )
                              }
                              onKeyUp={handlePressEnter}
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
                                updateColumnSearchValues(
                                  "enteredDate",
                                  e.target.value
                                )
                              }
                              onKeyUp={handlePressEnter}
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
                                <td>{item.inspectionDate}</td>
                                <td>{item.enteredDate}</td>

                                <td>
                                  {/* <button
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
                                  </button> */}
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
                        workOrderInspectionTbl.totalRecords / +length.current
                      )}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={e => {
                        ;(start.current = e.selected * length.current),
                          loadView()
                      }}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      activeClassName={"active"}
                    />
                  </div>

                  {/* <Modal isOpen={modal} toggle={toggle}>
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
                      
                      </Form>
                    </ModalBody>
                  </Modal> */}

                  {/* <DeleteModal
                    show={deleteModal}
                    onDeleteClick={handleDelete}
                    onCloseClick={() => setDeleteModal(false)}
                  /> */}

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
