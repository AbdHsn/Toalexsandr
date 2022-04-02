import React, { useEffect, useRef, useState } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
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
  CardTitle,
  Table,
} from "reactstrap"
import Loader from "../../components/Common/Loader"
import { getDailyInspectionReport } from "../../services/wo-inspect-service"
import { appTitle } from "../../services/common-service"
import Breadcrumbs from "components/Common/Breadcrumb"

const InspectionDailyReport = props => {
  const {
    match: { params },
  } = props

  const [inspectionReportTbl, setInspectionReportTbl] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  //const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"))
  //const inspectionResults = useRef("")

  const reportType = useRef("")
  const selectedDate = useRef(moment().format("YYYY-MM-DD"))

  useEffect(() => {
    if (params && params.reportType) {
      console.log("params.reportType", params.reportType)
      reportType.current = params.reportType
    }
    loadView()
  }, [reportType.current])

  const loadView = () => {
    setIsFetching(true)
    getDailyInspectionReport(
      moment(selectedDate.current).format("YYYY-MM-DD"),
      reportType.current
    )
      .then(res => {
        setInspectionReportTbl(res.data)
        if (res.data.length <= 0) {
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

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Inspection Daily Report | {appTitle}</title>
        </MetaTags>

        <Container fluid>
          <Breadcrumbs
            title="Inspect Daily Report"
            breadcrumbItem="Inspect Daily Report"
          />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle className="h4"> </CardTitle>

                  {/* <Row className="my-2">
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
                  </Row> */}

                  <Row>
                    <div className="table">
                      <Table
                        data-simplebar={true}
                        className="table table-sm m-0"
                      >
                        <thead>
                          <tr>
                            <th>Location</th>
                            <th>Work Order</th>
                            <th>Work Type</th>
                            <th>Description</th>
                            <th>Actual Finish</th>
                            <th>Inspection Results</th>
                            <th>Entered Date</th>
                            <th>Cause Code</th>
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

                          {inspectionReportTbl &&
                            inspectionReportTbl.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.location}</td>
                                  <td>{item.workOrder}</td>
                                  <td>{item.workType}</td>
                                  <td>{item.description}</td>
                                  <td>
                                    {moment(item.actualFinish).format(
                                      "MM/DD/YYYY"
                                    )}
                                  </td>
                                  <td>{item.inspectionResults}</td>
                                  <td>
                                    {item.enteredDate
                                      ? moment(item.enteredDate).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>{item.causeCode}</td>
                                </tr>
                              )
                            })}

                          {inspectionReportTbl &&
                            inspectionReportTbl.length === 0 && (
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

InspectionDailyReport.propTypes = {
  match: PropTypes.object,
}
export default InspectionDailyReport
