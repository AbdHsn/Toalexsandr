import React, { useEffect, useRef, useState } from "react"
import MetaTags from "react-meta-tags"
import ReactPaginate from "react-paginate"
import * as moment from "moment"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import "../../assets/scss/custom/_common.scss"
import DeleteModal from "../../components/Common/DeleteModal"
import CDRTrackerAddUpdate from "./add-update"
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
  getCDRTrackersView,
  exportCDRTrackersView,
  deleteCDRTracker,
} from "../../services/cdr-trackers-service"
import { appTitle, rowSizes as rowSizeDdl } from "../../services/common-service"

import Breadcrumbs from "components/Common/Breadcrumb"

const CDRTrackersView = props => {
  const [CDRTrackersViewMdl, setCDRTrackersViewMdl] = useState({})
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
  const cdrNumber = useRef("")
  const dateReceived = useRef("")
  const discrepancy = useRef("")
  const functionalManager = useRef("")
  const responseDueDate = useRef("")
  const memoNumber = useRef("")
  const fmResponse = useRef("")
  const responseDate = useRef("")
  const dateClosed = useRef("")
  const status = useRef("")
  const notes = useRef("")

  useEffect(() => {
    loadView()
  }, [])

  const onUpdateSearchFilter = (column, value) => {
    start.current = 0
    switch (column) {
      case "id":
        id.current = value
        break
      case "cdrNumber":
        cdrNumber.current = value
        break
      case "dateReceived":
        dateReceived.current = value
        break
      case "discrepancy":
        discrepancy.current = value
        break
      case "functionalManager":
        functionalManager.current = value
        break
      case "responseDueDate":
        responseDueDate.current = value
        break
      case "memoNumber":
        memoNumber.current = value
        break
      case "fmResponse":
        fmResponse.current = value
        break
      case "responseDate":
        responseDate.current = value
        break
      case "dateClosed":
        dateClosed.current = value
        break
      case "status":
        status.current = value
        break
      case "notes":
        notes.current = value
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
        { search_by: "cdrNumber", value: cdrNumber.current },
        { search_by: "dateReceived", value: dateReceived.current },
        { search_by: "discrepancy", value: discrepancy.current },
        { search_by: "functionalManager", value: functionalManager.current },
        { search_by: "responseDueDate", value: responseDueDate.current },
        { search_by: "memoNumber", value: memoNumber.current },
        { search_by: "fmResponse", value: fmResponse.current },
        { search_by: "responseDate", value: responseDate.current },
        { search_by: "dateClosed", value: dateClosed.current },
        { search_by: "status", value: status.current },
        { search_by: "notes", value: notes.current },
      ],
    }

    setIsFetching(true)
    getCDRTrackersView(preparePostData)
      .then(res => {
        setCDRTrackersViewMdl(res.data)
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
        { search_by: "cdrNumber", value: cdrNumber.current },
        { search_by: "dateReceived", value: dateReceived.current },
        { search_by: "discrepancy", value: discrepancy.current },
        { search_by: "functionalManager", value: functionalManager.current },
        { search_by: "responseDueDate", value: responseDueDate.current },
        { search_by: "memoNumber", value: memoNumber.current },
        { search_by: "fmResponse", value: fmResponse.current },
        { search_by: "responseDate", value: responseDate.current },
        { search_by: "dateClosed", value: dateClosed.current },
        { search_by: "status", value: status.current },
        { search_by: "notes", value: notes.current },
      ],
    }

    setIsExporting(true)
    exportCDRTrackersView(preparePostData)
      .then(res => {
        let downloadLink = document.createElement("a")
        downloadLink.href = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.ms-excel",
          })
        )

        downloadLink.setAttribute("download", "CDRTrackersView.xlsx")
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

  const onAttemptDelete = id => {
    if (id > 0) {
      setDeleteModal(true)
      setModelData({ id: id })
    }
  }

  const onDeleteConfirmed = () => {
    if (modelData.id > 0) {
      deleteCDRTracker(modelData.id)
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
          <title>CDR Trackers | {appTitle}</title>
        </MetaTags>

        <Container fluid>
          <Breadcrumbs title="CDR Trackers" breadcrumbItem="CDR Trackers" />

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
                              onClick={() => onOrderByClick("cdrNumber")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "cdrNumber"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              CDR Number
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("dateReceived")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "dateReceived"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Date Received
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("discrepancy")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "discrepancy"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Discrepancy
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() =>
                                onOrderByClick("functionalManager")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "functionalManager"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Functional Manager
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("responseDueDate")}
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "responseDueDate"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Response Due Date
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("memoNumber")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "memoNumber"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Memo No
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("fmResponse")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "fmResponse"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              FM Response
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("responseDate")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "responseDate"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Response Date
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("dateClosed")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "dateClosed"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Date Closed
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
                              onClick={() => onOrderByClick("notes")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "notes"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Notes
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
                                placeholder="CDR Number"
                                name="scdrNumber"
                                id="scdrNumber"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "cdrNumber",
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
                                placeholder="Date Received"
                                name="sdateReceived"
                                id="sdateReceived"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "dateReceived",
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
                                placeholder="Discrepancy"
                                name="sdiscrepancy"
                                id="sdiscrepancy"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "discrepancy",
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
                                placeholder="Functional Manager"
                                name="sfunctionalManager"
                                id="sfunctionalManager"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "functionalManager",
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
                                placeholder="Response Due Date"
                                name="sresponseDueDate"
                                id="sresponseDueDate"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "responseDueDate",
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
                                placeholder="Memo No"
                                name="smemoNumber"
                                id="smemoNumber"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "memoNumber",
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
                                placeholder="FM Response"
                                name="sfmResponse"
                                id="sfmResponse"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "fmResponse",
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
                                placeholder="Response Date"
                                name="sresponseDate"
                                id="sresponseDate"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "responseDate",
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
                                placeholder="Date Closed"
                                name="sdateClosed"
                                id="sdateClosed"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "dateClosed",
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
                                style={{ width: "350px" }}
                                type="text"
                                placeholder="Notes"
                                name="snotes"
                                id="snotes"
                                onChange={e =>
                                  onUpdateSearchFilter("notes", e.target.value)
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

                          {CDRTrackersViewMdl.data &&
                            CDRTrackersViewMdl.data.map((item, index) => {
                              return (
                                <tr key={index}>
                                  {/* <td>{item.id}</td> */}
                                  <td>
                                    {item.cdrNumber ? (
                                      <label
                                        className="label label-info custom-pointer"
                                        onClick={e => onEditClick(item)}
                                      >
                                        {item.cdrNumber}
                                      </label>
                                    ) : null}
                                  </td>
                                  <td>
                                    {item.dateReceived
                                      ? moment(item.dateReceived).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>{item.discrepancy}</td>
                                  <td>{item.functionalManager}</td>
                                  <td>
                                    {item.responseDueDate
                                      ? moment(item.responseDueDate).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>{item.memoNumber}</td>
                                  <td>{item.fmResponse}</td>
                                  <td>
                                    {item.responseDate
                                      ? moment(item.responseDate).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>
                                    {item.dateClosed
                                      ? moment(item.dateClosed).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>{item.status}</td>
                                  <td>{item.notes}</td>

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

                          {CDRTrackersViewMdl.data &&
                            CDRTrackersViewMdl.data.length === 0 && (
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
                            CDRTrackersViewMdl.totalRecords / +length.current
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
                        Total Records: {CDRTrackersViewMdl.totalRecords}
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

                  <CDRTrackerAddUpdate
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

export default CDRTrackersView
