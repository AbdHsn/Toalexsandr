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
  getPAWTrackersView,
  exportPAWTrackersView,
  deletePAWTracker,
} from "../../services/paw-trackers-service"
import { appTitle, rowSizes as rowSizeDdl } from "../../services/common-service"

import Breadcrumbs from "components/Common/Breadcrumb"
import PAWTrackerAddUpdate from "./add-update"
import DeleteModal from "../../components/Common/DeleteModal"

const PAWTrackersView = props => {
  const [PAWTrackersViewMdl, setPAWTrackersViewMdl] = useState({})
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
  const pawNumber = useRef("")
  const location = useRef("")
  const description = useRef("")
  const par = useRef("")
  const dateReceived = useRef("")
  const dateAcknowledged = useRef("")
  const woNumber = useRef("")
  const dateToPar = useRef("")
  const status = useRef("")
  const annex = useRef("")
  const specItem = useRef("")
  const title = useRef("")
  const validity = useRef("")
  const pawResponse = useRef("")

  useEffect(() => {
    loadView()
  }, [])

  const onUpdateSearchFilter = (column, value) => {
    start.current = 0
    switch (column) {
      case "id":
        id.current = value
        break
      case "pawNumber":
        pawNumber.current = value
        break
      case "location":
        location.current = value
        break
      case "description":
        description.current = value
        break
      case "par":
        par.current = value
        break
      case "dateReceived":
        dateReceived.current = value
        break
      case "dateAcknowledged":
        dateAcknowledged.current = value
        break
      case "woNumber":
        woNumber.current = value
        break
      case "dateToPar":
        dateToPar.current = value
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
      case "validity":
        validity.current = value
        break
      case "pawResponse":
        pawResponse.current = value
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
        { search_by: "pawNumber", value: pawNumber.current },
        { search_by: "location", value: location.current },
        { search_by: "description", value: description.current },
        { search_by: "par", value: par.current },
        { search_by: "dateReceived", value: dateReceived.current },
        { search_by: "dateAcknowledged", value: dateAcknowledged.current },
        { search_by: "woNumber", value: woNumber.current },
        { search_by: "dateToPar", value: dateToPar.current },
        { search_by: "status", value: status.current },
        { search_by: "annex", value: annex.current },
        { search_by: "specItem", value: specItem.current },
        { search_by: "title", value: title.current },
        { search_by: "validity", value: validity.current },
        { search_by: "pawResponse", value: pawResponse.current },
      ],
    }

    setIsFetching(true)
    getPAWTrackersView(preparePostData)
      .then(res => {
        setPAWTrackersViewMdl(res.data)
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
        { search_by: "pawNumber", value: pawNumber.current },
        { search_by: "location", value: location.current },
        { search_by: "description", value: description.current },
        { search_by: "par", value: par.current },
        { search_by: "dateReceived", value: dateReceived.current },
        { search_by: "dateAcknowledged", value: dateAcknowledged.current },
        { search_by: "woNumber", value: woNumber.current },
        { search_by: "dateToPar", value: dateToPar.current },
        { search_by: "status", value: status.current },
        { search_by: "annex", value: annex.current },
        { search_by: "specItem", value: specItem.current },
        { search_by: "title", value: title.current },
        { search_by: "validity", value: validity.current },
        { search_by: "pawResponse", value: pawResponse.current },
      ],
    }

    setIsExporting(true)
    exportPAWTrackersView(preparePostData)
      .then(res => {
        let downloadLink = document.createElement("a")
        downloadLink.href = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.ms-excel",
          })
        )

        downloadLink.setAttribute("download", "PAWTrackersView.xlsx")
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
      deletePAWTracker(modelData.id)
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
          <title>PAW Trackers | {appTitle}</title>
        </MetaTags>

        <Container fluid>
          <Breadcrumbs title="PAW Trackers" breadcrumbItem="PAW Trackers" />

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
                              onClick={() => onOrderByClick("pawNumber")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "pawNumber"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              PAW Number
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
                              onClick={() => onOrderByClick("description")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "description"
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
                              onClick={() => onOrderByClick("par")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "par"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              PAR
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
                              onClick={() => onOrderByClick("dateAcknowledged")}
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "dateAcknowledged"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Date Acknowledged
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
                              onClick={() => onOrderByClick("dateToPar")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "dateToPar"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Date To PAR
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
                              onClick={() => onOrderByClick("validity")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "validity"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Validity
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("pawResponse")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "pawResponse"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              PAW Response
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
                                placeholder="PAW Number"
                                name="spawNumber"
                                id="spawNumber"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "pawNumber",
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
                                style={{ width: "300px" }}
                                type="text"
                                placeholder="Description"
                                name="sdescription"
                                id="sdescription"
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
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="PAR"
                                name="spar"
                                id="spar"
                                onChange={e =>
                                  onUpdateSearchFilter("par", e.target.value)
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
                                type="date"
                                style={{ width: "140px" }}
                                placeholder="Date Acknowledged"
                                name="sdateAcknowledged"
                                id="sdateAcknowledged"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "dateAcknowledged",
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
                                placeholder="Date To PAR"
                                name="sdateToPar"
                                id="sdateToPar"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "dateToPar",
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
                                placeholder="Validity"
                                name="svalidity"
                                id="svalidity"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "validity",
                                    e.target.value
                                  )
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "400px" }}
                                type="text"
                                placeholder="PAW Response"
                                name="spawResponse"
                                id="spawResponse"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "pawResponse",
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

                          {PAWTrackersViewMdl.data &&
                            PAWTrackersViewMdl.data.map((item, index) => {
                              return (
                                <tr key={index}>
                                  {/* <td>{item.id}</td> */}
                                  <td>
                                    {item.pawNumber ? (
                                      <Button
                                        type="button"
                                        color="info"
                                        className="btn-sm btn-rounded"
                                        onClick={e => onEditClick(item)}
                                      >
                                        {item.pawNumber}
                                      </Button>
                                    ) : null}
                                  </td>
                                  <td>{item.location}</td>
                                  <td>{item.description}</td>
                                  <td>{item.par}</td>
                                  <td>
                                    {item.dateReceived
                                      ? moment(item.dateReceived).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>
                                    {item.dateAcknowledged
                                      ? moment(item.dateAcknowledged).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>{item.woNumber}</td>
                                  <td>
                                    {item.dateToPar
                                      ? moment(item.dateToPar).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>{item.status}</td>
                                  <td>{item.annex}</td>
                                  <td>{item.specItem}</td>
                                  <td>{item.title}</td>
                                  <td>{item.validity}</td>
                                  <td>{item.pawResponse}</td>

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

                          {PAWTrackersViewMdl.data &&
                            PAWTrackersViewMdl.data.length === 0 && (
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
                            PAWTrackersViewMdl.totalRecords / +length.current
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
                        Total Records: {PAWTrackersViewMdl.totalRecords}
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

                  <PAWTrackerAddUpdate
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

export default PAWTrackersView
