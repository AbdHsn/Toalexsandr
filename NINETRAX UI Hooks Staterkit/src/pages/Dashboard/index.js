import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { appTitle } from "../../services/common-service"
import { Line } from "react-chartjs-2"
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
import { getDashboardInspectionData } from "../../services/dashboard-service"
import * as moment from "moment"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
const Dashboard = props => {
  const [filteringOptionsDDL, setFilteringOptionsDDL] = useState(false)
  const filteringOptionSelected = useRef(false)

  const fromDate = useRef(false)
  const toDate = useRef(false)

  const [dashboardInspectionData, setDashboardInspectionData] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const onDateRangeChange = async (e, inputType) => {
    let fromdate = fromDate.current || null
    let todate = toDate.current || null

    switch (e.target.value) {
      case 1: //Today
        fromdate = moment().subtract(2, "d").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case 2: //Last Day
        fromdate = moment().subtract(1, "w").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case "3": //Current Week
        fromdate = moment().subtract(2, "w").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case "4": //Last Week
        fromdate = moment().subtract(30, "d").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case "5": //Current Month
        fromdate = moment().subtract(90, "d").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case "6": //Last Month
        fromdate = moment().subtract(0.5, "y").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case "7": //Current Year
        fromdate = moment().subtract(0.5, "y").format("YYYY-MM-DD")
        todate = moment().format("YYYY-MM-DD")
        break
      case "8": //Last Year
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

  useEffect(() => {
    loadView()
  }, [])

  const loadView = (fromDate, toDate) => {
    setIsFetching(true)
    getDashboardInspectionData(fromDate, toDate)
      .then(res => {
        setDashboardInspectionData(res.data)
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

  const pieChartData = {
    labels: ["SAT", "UNSAT", "INSPECTION", "PAW", "IDIQ"],

    datasets: [
      {
        data: [10, 8, 5, 3, 2],
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

  const satUnsatLineChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
    ],
    datasets: [
      {
        label: "SAT",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgba(85, 110, 230, 0.2)",
        borderColor: "green",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#556ee6",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#556ee6",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80],
      },
      {
        label: "UNSAT",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgba(235, 239, 242, 0.2)",
        borderColor: "red",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#ebeff2",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#ebeff2",
        pointHoverBorderColor: "#eef0f2",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [80, 23, 56, 65, 23, 35, 85, 25, 92, 36],
      },
    ],
  }

  const satUnsatLineChartOption = {
    scales: {
      yAxes: [
        {
          ticks: {
            max: 100,
            min: 20,
            stepSize: 10,
          },
        },
      ],
    },
  }

  const getDashboardData = async selectedValue => {
    console.log("getting dashboard data", selectedValue)
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
                  pattern="\d{4}-\d{2}-\d{2}"
                  onChange={e => (fromDate.current = e.target.value)}
                />

                <Input
                  id="dashboardEnd"
                  name="dashboardEnd"
                  type="date"
                  pattern="\d{4}-\d{2}-\d{2}"
                  onChange={e => (toDate.current = e.target.value)}
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
              <Card className="mini-stats-wid">
                <CardBody>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <p className="text-muted fw-medium">SAT</p>
                      <h4 className="mb-0">10</h4>
                    </div>
                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                      <span className="avatar-title rounded-circle bg-primary">
                        <i
                          className={"bx " + "bx-happy-alt " + " font-size-24"}
                        ></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="2">
              <Card className="mini-stats-wid">
                <CardBody>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <p className="text-muted fw-medium">UNSAT</p>
                      <h4 className="mb-0">8</h4>
                    </div>
                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                      <span className="avatar-title rounded-circle bg-primary">
                        <i className={"bx " + "bx-sad " + " font-size-24"}></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="2">
              <Card className="mini-stats-wid">
                <CardBody>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <p className="text-muted fw-medium">INSPECTION</p>
                      <h4 className="mb-0">5</h4>
                    </div>
                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                      <span className="avatar-title rounded-circle bg-primary">
                        <i
                          className={"bx " + "bx-search-alt " + " font-size-24"}
                        ></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="2">
              <Card className="mini-stats-wid">
                <CardBody>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <p className="text-muted fw-medium">PAW</p>
                      <h4 className="mb-0">3</h4>
                    </div>
                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                      <span className="avatar-title rounded-circle bg-primary">
                        <i
                          className={"bx " + "bx-line-chart " + " font-size-24"}
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
                      <h4 className="mb-0">2</h4>
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

          <Row className="mt-2">
            <Col xl="3">
              <Card>
                <CardBody>
                  <CardTitle className="h4 text-center">INSPECTIONS</CardTitle>

                  <hr />
                  <Line
                    width={474}
                    height={300}
                    data={satUnsatLineChartData}
                    options={satUnsatLineChartOption}
                  />

                  <CardTitle className="h4 text-center">
                    UNSATISFACTORY Breakdown
                  </CardTitle>
                  {/* <Pie width={474} height={260} data={pieChartData} /> */}
                </CardBody>
              </Card>
            </Col>
            <Col xl="9">
              {/* <Row>
                <Col md="4">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-muted fw-medium">title...</p>
                          <h4 className="mb-0">dd</h4>
                        </div>
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                          <span className="avatar-title rounded-circle bg-primary">
                            <i
                            // className={
                            //   "bx " + report.iconClass + " font-size-24"
                            // }
                            ></i>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row> */}
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
