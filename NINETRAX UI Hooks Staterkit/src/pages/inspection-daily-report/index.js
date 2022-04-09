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
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown,
  InputGroup,
  Input,
} from "reactstrap"
import Loader from "../../components/Common/Loader"
import { getDailyInspectionReport } from "../../services/wo-inspect-service"
import { appTitle, reportTypes } from "../../services/common-service"
import Breadcrumbs from "components/Common/Breadcrumb"

const InspectionDailyReport = props => {
  // const {
  //   match: { params },
  // } = props

  const [inspectionReportTbl, setInspectionReportTbl] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const [reportSelectionDrp, setReportSelectionDrp] = useState(false)
  //const [selectedReportType, setSelectedReportType] = useState("")
  //const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"))
  const selectedReportType = useRef("")

  const reportType = useRef("")
  const selectedDate = useRef(moment(new Date()).format("YYYY-MM-DD"))

  useEffect(() => {}, [])

  const loadView = () => {
    setIsFetching(true)
    getDailyInspectionReport(
      moment(selectedDate.current).format("YYYY-MM-DD"),
      //reportType.current
      selectedReportType.current
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
                  <Row>
                    <Col xl="4"></Col>
                    <Col xl="8">
                      <InputGroup>
                        <Input
                          id="reportDate"
                          name="reportDate"
                          type="date"
                          value={selectedDate.current}
                          pattern="\d{4}-\d{2}-\d{2}"
                          onChange={e => {
                            selectedDate.current = e.target.value
                            loadView()
                            //toDate.current = e.target.value
                            //onDateOptionChange(0)
                          }}
                        />

                        <ButtonDropdown
                          isOpen={reportSelectionDrp}
                          toggle={() =>
                            setReportSelectionDrp(!reportSelectionDrp)
                          }
                        >
                          <Button id="caret" color="info" disabled>
                            Select Report: {selectedReportType.current}
                          </Button>
                          <DropdownToggle caret color="info">
                            <i className="mdi mdi-chevron-down" />
                          </DropdownToggle>
                          <DropdownMenu>
                            {reportTypes.map((item, index) => {
                              return (
                                <DropdownItem
                                  key={index}
                                  onClick={() => {
                                    // length.current = item
                                    selectedReportType.current = item
                                    loadView()
                                    // loadView()
                                  }}
                                  title={
                                    item === "All"
                                      ? "Not recommended on large data"
                                      : ``
                                  }
                                  className={
                                    item === "All" ? `text-warning` : ``
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
                          className="btn btn-outline-info w-xs"
                          onClick={() => {
                            var printContents =
                              document.getElementById("printableArea").innerHTML
                            var originalContents = document.body.innerHTML

                            document.body.innerHTML = printContents

                            window.print()

                            document.body.innerHTML = originalContents
                          }}
                        >
                          <i className="bx bx-printer"></i> Print
                        </button>
                      </InputGroup>
                    </Col>
                  </Row>

                  <div className="d-flex flex-wrap">
                    <div className="btn-group"></div>
                  </div>

                  <div id="printableArea">
                    <Row
                      style={{
                        backgroundColor: `rgb(119, 192, 247)`,
                        marginTop: `10px`,
                      }}
                    >
                      <h4 className="text-center font-weight-bold mt-4">
                        {selectedReportType.current} Daily Inspection Summary
                        Report
                      </h4>
                      <label className="text-center">
                        Inspection Day of{" "}
                        {moment(selectedDate.current).format("MM/DD/YYYY")}
                      </label>

                      <Row>
                        <Col md="6" lg="6" xl="6">
                          <div className="d-flex justify-content-around">
                            <p>Total Completed Inspection</p>
                            <p className="float-right">
                              {inspectionReportTbl.total}
                            </p>
                          </div>
                        </Col>
                        <Col md="6" lg="6" xl="6">
                          <div className="d-flex justify-content-around">
                            <p>Satisfactory Inspection</p>
                            <p className="float-right">
                              {inspectionReportTbl.totalSatisfactory}
                            </p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6" lg="6" xl="6">
                          <div className="d-flex justify-content-around">
                            <p>Percent Satisfactory(%)</p>
                            <p className="float-right">
                              {inspectionReportTbl.satisfactoryPercent}
                            </p>
                          </div>
                        </Col>
                        <Col md="6" lg="6" xl="6">
                          <div className="d-flex justify-content-around">
                            <p>Unsatisfactory Inspection</p>
                            <p className="float-right">
                              {inspectionReportTbl.totalUnsatisfactory}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Row>
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
                              inspectionReportTbl?.data?.map((item, index) => {
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
                  </div>
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
  //match: PropTypes.object,
}
export default InspectionDailyReport
