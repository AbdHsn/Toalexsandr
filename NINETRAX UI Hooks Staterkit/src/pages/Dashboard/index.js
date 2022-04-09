import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { appTitle } from "../../services/common-service"
import { Bar, Pie } from "react-chartjs-2"
import Loader from "../../components/Common/Loader"

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
  Label,
  Input,
  FormFeedback,
  InputGroup,
} from "reactstrap"
import React, { useEffect, useRef, useState } from "react"
import { dashboardFilteringOptions } from "../../services/common-service"
import {
  getDashboardInspectionData,
  exportSatUnsatData,
} from "../../services/dashboard-service"
import * as moment from "moment"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import BtnExporting from "../../components/Common/BtnExporting"

const Dashboard = props => {
  const [filteringOptionsDDL, setFilteringOptionsDDL] = useState(false)
  const filteringOptionSelected = useRef(false)

  const fromDate = useRef(moment(new Date()).format("YYYY-MM-DD"))
  const toDate = useRef(moment(new Date()).format("YYYY-MM-DD"))

  const [dashboardInspectionData, setDashboardInspectionData] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const [isSatExporting, setIsSatExporting] = useState(false)
  const [isUnsatExporting, setIsUnsatExporting] = useState(false)

  const onDateOptionChange = async selectedOption => {
    let fromdate = null
    let todate = null

    switch (selectedOption) {
      case 0: //Custom
        fromdate = moment(fromDate.current).format("YYYY-MM-DD")
        todate = moment(toDate.current).format("YYYY-MM-DD")
        break
      case 1: //Today
        fromdate = moment().format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case 2: //Last Day
        fromdate = moment().subtract(1, "d").format("YYYY-MM-DD")
        todate = moment().subtract(1, "d").format("YYYY-MM-DD")
        break
      case 3: //Current Week
        fromdate = moment().startOf("week").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case 4: //Last Week
        fromdate = moment()
          .startOf("week")
          .subtract(1, "w")
          .format("YYYY-MM-DD")
        todate = moment().startOf("week").format("YYYY-MM-DD")
        break
      case 5: //Current Month
        fromdate = moment().startOf("month").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case 6: //Last Month
        fromdate = moment()
          .subtract(1, "month")
          .startOf("month")
          .format("YYYY-MM-DD")
        todate = moment()
          .subtract(1, "month")
          .endOf("month")
          .format("YYYY-MM-DD")
        break
      case 7: //Current Year
        fromdate = moment().startOf("year").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case 8: //Last Year
        fromdate = moment()
          .subtract(1, "year")
          .startOf("year")
          .format("YYYY-MM-DD")
        todate = moment().subtract(1, "year").endOf("year").format("YYYY-MM-DD")
        break
      default:
        break
    }

    if (moment(todate).diff(moment(fromdate)) >= 0) {
      //Call loadView
      fromDate.current = fromdate
      toDate.current = todate
      loadView()
    } else {
      toastr.warning("Invalid date.", "NINETRAX")
    }
  }

  useEffect(() => {
    loadView()
  }, [])

  const loadView = () => {
    setIsFetching(true)
    getDashboardInspectionData(fromDate.current, toDate.current)
      .then(res => {
        setDashboardInspectionData(res.data)
        setIsFetching(false)
      })
      .catch(error => {
        setIsFetching(false)
        toastr.error("Failed to fetch data.", "NINETRAX")
      })
  }

  const satUnsatBarChartData = {
    labels: ["Sat & Unsat Analytics"],
    datasets: [
      {
        label: "Satisfactory",
        backgroundColor: "rgba(52, 195, 143, 0.8)",
        borderColor: "rgba(52, 195, 143, 0.8)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(52, 195, 143, 0.9)",
        hoverBorderColor: "rgba(52, 195, 143, 0.9)",
        data: [dashboardInspectionData?.satData?.length ?? 0],
      },
      {
        label: "Unsatisfactory",
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        borderColor: "rgba(245, 0, 0, 0.8)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(244, 0, 0, 0.9)",
        hoverBorderColor: "rgba(222, 0, 0, 0.9)",
        data: [dashboardInspectionData?.unsatData?.length ?? 0],
      },
    ],
  }

  const pieChartData = {
    labels: [
      `Communication (${
        dashboardInspectionData?.unsatBreakDown?.communication ?? 0
      })`,
      `Documentation (${
        dashboardInspectionData?.unsatBreakDown?.documentation ?? 0
      })`,
      `Housekeeping (${
        dashboardInspectionData?.unsatBreakDown?.housekeeping ?? 0
      })`,
      `Incomplete (${
        dashboardInspectionData?.unsatBreakDown?.incomplete ?? 0
      })`,
      `Timeliness (${
        dashboardInspectionData?.unsatBreakDown?.timeliness ?? 0
      })`,
      `Workmanship (${
        dashboardInspectionData?.unsatBreakDown?.workmanship ?? 0
      })`,
    ],

    datasets: [
      {
        data: [
          dashboardInspectionData?.unsatBreakDown?.communication ?? 0,
          dashboardInspectionData?.unsatBreakDown?.documentation ?? 0,
          dashboardInspectionData?.unsatBreakDown?.housekeeping ?? 0,
          dashboardInspectionData?.unsatBreakDown?.incomplete ?? 0,
          dashboardInspectionData?.unsatBreakDown?.timeliness ?? 0,
          dashboardInspectionData?.unsatBreakDown?.workmanship ?? 0,
        ],
        backgroundColor: [
          "#dae87f",
          "#a04fd4",
          "#a787d8",
          "#77a727",
          "#828d2a",
        ],
        hoverBackgroundColor: [
          "#34d38f",
          "#eb1ff2",
          "#03238f",
          "#1efff2",
          "#11138f",
        ],
        hoverBorderColor: "#fff",
      },
    ],
  }

  const onExportClick = result => {
    result === "SAT" ? setIsSatExporting(true) : setIsUnsatExporting(true)
    exportSatUnsatData(fromDate.current, toDate.current, result)
      .then(res => {
        let downloadLink = document.createElement("a")
        downloadLink.href = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.ms-excel",
          })
        )

        let fileName = ""
        result === "SAT"
          ? (fileName = "Satisfactory.xlsx")
          : (fileName = "Unsatisfactory.xlsx")

        downloadLink.setAttribute("download", fileName)
        document.body.appendChild(downloadLink)
        downloadLink.click()

        result === "SAT" ? setIsSatExporting(false) : setIsUnsatExporting(false)
        toastr.success("Export succeeded.", "NINETRAX")
      })
      .catch(error => {
        result === "SAT" ? setIsSatExporting(false) : setIsUnsatExporting(false)
        toastr.error("Failed to export data.", "NINETRAX")
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>{appTitle}</title>
        </MetaTags>
        <Container fluid>
          <Row>
            <Col xl="4"></Col>
            <Col xl="8">
              <InputGroup>
                <Input
                  id="dashboardStart"
                  name="dashboardStart"
                  type="date"
                  value={moment(fromDate.current).format("YYYY-MM-DD")}
                  pattern="\d{4}-\d{2}-\d{2}"
                  onChange={e => {
                    fromDate.current = e.target.value
                    onDateOptionChange(0)
                  }}
                />

                <Input
                  id="dashboardEnd"
                  name="dashboardEnd"
                  type="date"
                  value={moment(toDate.current).format("YYYY-MM-DD")}
                  pattern="\d{4}-\d{2}-\d{2}"
                  onChange={e => {
                    toDate.current = e.target.value
                    onDateOptionChange(0)
                  }}
                />

                <ButtonDropdown
                  isOpen={filteringOptionsDDL}
                  toggle={() => setFilteringOptionsDDL(!filteringOptionsDDL)}
                >
                  <Button id="caret" color="info" disabled>
                    Choose Options: {filteringOptionSelected.current}
                  </Button>
                  <DropdownToggle caret color="info">
                    <i className="mdi mdi-chevron-down" />
                  </DropdownToggle>

                  <DropdownMenu>
                    {dashboardFilteringOptions.map(item => {
                      return (
                        <DropdownItem
                          key={item.value}
                          onClick={() => {
                            filteringOptionSelected.current = item.label
                            //getDashboardData(item.value)
                            onDateOptionChange(item.value)
                          }}
                          className={""}
                        >
                          {item.label}
                        </DropdownItem>
                      )
                    })}
                  </DropdownMenu>
                </ButtonDropdown>
              </InputGroup>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md="3">
              <Row>
                <Card className="mini-stats-wid">
                  <CardBody>
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <p className="text-muted fw-medium">SAT</p>
                        <h4 className="mb-0">
                          {dashboardInspectionData?.summaryData?.totalSat}
                        </h4>
                      </div>
                      <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                        <span className="avatar-title rounded-circle bg-primary">
                          <i
                            className={
                              "bx " + "bx-happy-alt " + " font-size-24"
                            }
                          ></i>
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Row>
            </Col>
            <Col md="9">
              <Row>
                <Col md="3">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-muted fw-medium">UNSAT</p>
                          <h4 className="mb-0">
                            {dashboardInspectionData?.summaryData?.totalUnsat}
                          </h4>
                        </div>
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                          <span className="avatar-title rounded-circle bg-primary">
                            <i
                              className={"bx " + "bx-sad " + " font-size-24"}
                            ></i>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="3">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-muted fw-medium">INSPECT</p>
                          <h4 className="mb-0">
                            {" "}
                            {
                              dashboardInspectionData?.summaryData
                                ?.totalInspection
                            }
                          </h4>
                        </div>
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                          <span className="avatar-title rounded-circle bg-primary">
                            <i
                              className={
                                "bx " + "bx-search-alt " + " font-size-24"
                              }
                            ></i>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="3">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-muted fw-medium">PAW</p>
                          <h4 className="mb-0">
                            {dashboardInspectionData?.summaryData?.totalPAW}
                          </h4>
                        </div>
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                          <span className="avatar-title rounded-circle bg-primary">
                            <i
                              className={
                                "bx " + "bx-line-chart " + " font-size-24"
                              }
                            ></i>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="3">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-muted fw-medium">IDIQ</p>
                          <h4 className="mb-0">
                            {dashboardInspectionData?.summaryData?.totalIDIQ}
                          </h4>
                        </div>
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                          <span className="avatar-title rounded-circle bg-primary">
                            <i
                              className={"bx " + "bxs-truck" + " font-size-24"}
                            ></i>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col xl="3">
              <Row>
                <Card>
                  <CardBody>
                    <CardTitle className="h4 text-center">
                      INSPECTIONS
                    </CardTitle>
                    <hr />
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Satisfactory
                        <label className="label label-success">
                          {" "}
                          {dashboardInspectionData?.satData?.length ?? 0}
                        </label>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Unsatisfactory
                        <label className="label label-success">
                          {" "}
                          {dashboardInspectionData?.unsatData?.length ?? 0}
                        </label>
                      </li>
                    </ul>
                    <Bar width={474} height={300} data={satUnsatBarChartData} />

                    <br />
                    <CardTitle className="h4 text-center">
                      UNSATISFACTORY Breakdown
                    </CardTitle>
                    <hr />
                    <Pie width={474} height={460} data={pieChartData} />
                  </CardBody>
                </Card>
              </Row>
            </Col>
            <Col xl="9">
              <Card>
                <CardBody>
                  <CardTitle className="h4 text-center">SAT Data</CardTitle>
                  {isSatExporting === true ? (
                    <BtnExporting isExporting={isSatExporting} />
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => onExportClick("SAT")}
                    >
                      <i className="bx bx-file"></i> Export
                    </button>
                  )}
                  <hr />
                  <Row>
                    <div
                      className="table-responsive"
                      style={{ overflowY: "auto", height: "250px" }}
                    >
                      <Table
                        data-simplebar={true}
                        className="table table-sm m-0"
                      >
                        <thead>
                          <tr>
                            <th>Crew</th>
                            <th>WO</th>
                            <th>Insp. Date</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Lead</th>
                            <th>Cause Code</th>
                            <th>Finding</th>
                            <th>Status</th>
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

                          {dashboardInspectionData.satData &&
                            dashboardInspectionData.satData.map(
                              (item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{item.crew}</td>
                                    <td>{item.workOrder}</td>
                                    <td>
                                      {item.inspectionDate
                                        ? moment(item.inspectionDate).format(
                                            "MM/DD/YYYY"
                                          )
                                        : "No Data"}
                                    </td>
                                    <td>{item.description}</td>
                                    <td>{item.location}</td>p
                                    <td>{item.lead}</td>
                                    <td>{item.causeCode}</td>
                                    <td>{item.finding}</td>
                                    <td>{item.result}</td>
                                  </tr>
                                )
                              }
                            )}

                          {dashboardInspectionData.satData &&
                            dashboardInspectionData.satData.length === 0 && (
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

              <Card>
                <CardBody>
                  <CardTitle className="h4 text-center">UNSAT Data</CardTitle>

                  {isUnsatExporting === true ? (
                    <BtnExporting isExporting={isUnsatExporting} />
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => onExportClick("UNSAT")}
                    >
                      <i className="bx bx-file"></i> Export
                    </button>
                  )}
                  <hr />
                  <Row>
                    <div
                      className="table-responsive"
                      style={{ overflowY: "auto", height: "250px" }}
                    >
                      <Table
                        data-simplebar={true}
                        className="table table-sm m-0"
                      >
                        <thead>
                          <tr>
                            <th>Crew</th>
                            <th>WO</th>
                            <th>Insp. Date</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Lead</th>
                            <th>Cause Code</th>
                            <th>Finding</th>
                            <th>Status</th>
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

                          {dashboardInspectionData.unsatData &&
                            dashboardInspectionData.unsatData.map(
                              (item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{item.crew}</td>
                                    <td>{item.workOrder}</td>
                                    <td>
                                      {item.inspectionDate
                                        ? moment(item.inspectionDate).format(
                                            "MM/DD/YYYY"
                                          )
                                        : "No Data"}
                                    </td>
                                    <td>{item.description}</td>
                                    <td>{item.location}</td>p
                                    <td>{item.lead}</td>
                                    <td>{item.causeCode}</td>
                                    <td>{item.finding}</td>
                                    <td>{item.result}</td>
                                  </tr>
                                )
                              }
                            )}

                          {dashboardInspectionData.unsatData &&
                            dashboardInspectionData.unsatData.length === 0 && (
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

          <Row>
            <Col className="col-md-6 col-sm-12"></Col>
            <Col className="col-md-6 col-sm-12">
              <div className="d-flex flex-wrap"></div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  // chartsData: PropTypes.any,
  // onGetChartsData: PropTypes.func,
}

export default Dashboard
