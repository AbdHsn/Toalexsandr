import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { appTitle } from "../../services/common-service"
import { Pie } from "react-chartjs-2"
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

const Dashboard = props => {
  const [filteringOptionsDDL, setFilteringOptionsDDL] = useState(false)
  const filteringOptionSelected = useRef(false)
  const fromDate = useRef(false)
  const toDate = useRef(false)

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
                            getDashboardData(item.value)
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
          </Row>

          <Row className="mt-2">
            <Col xl="3">
              <Card>
                <CardBody>
                  <CardTitle className="h4"> </CardTitle>
                  <Pie width={474} height={260} data={pieChartData} />
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
