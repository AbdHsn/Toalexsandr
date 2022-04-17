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
  fetchTableView,
  exportTableView,
  deleteDropDownMenu,
} from "../../services/dropdown-menu-service"
import { rowSizes as rowSizeDdl } from "../../services/common-service"

import Breadcrumbs from "components/Common/Breadcrumb"

const DropDownMenuView = props => {
  const [DropDownMenuViewMdl, setDropDownMenuViewMdl] = useState({})
  const [pageSizeDrp, setPageSizeDrp] = useState(false)

  const [isFetching, setIsFetching] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [filterOptions, setFilterOptions] = useState(false)

  const [modal, setModal] = useState(false)
  const [modelData, setModelData] = useState({})
  const [deleteModal, setDeleteModal] = useState(false)

  const start = useRef(0)
  const orderColumn = useRef({
    column: "Id",
    order_by: "DESC",
  })
  const length = useRef("10")

  const id = useRef("")
  const causeCode = useRef("")
  const rootCause = useRef("")
  const correctiveAction = useRef("")
  const qcstatus = useRef("")
  const pdrstatusMenu = useRef("")
  const pawstatusMenu = useRef("")
  const pawrating = useRef("")
  const pawAssessment = useRef("")
  const ccrstatusMenu = useRef("")
  const validity = useRef("")
  const qctechs = useRef("")
  const mptPar = useRef("")
  const mptAsgnCode = useRef("")
  const jaxPar = useRef("")
  const pawunsat = useRef("")
  const pawrootCause = useRef("")
  const fmBldgManager = useRef("")
  const estimators = useRef("")

  useEffect(() => {
    loadView()
  }, [])

  const onUpdateSearchFilter = (column, value) => {
    start.current = 0
    switch (column) {
      case "id":
        id.current = value
        break
      case "causeCode":
        causeCode.current = value
        break
      case "rootCause":
        rootCause.current = value
        break
      case "correctiveAction":
        correctiveAction.current = value
        break
      case "qcstatus":
        qcstatus.current = value
        break
      case "pdrstatusMenu":
        pdrstatusMenu.current = value
        break
      case "pawstatusMenu":
        pawstatusMenu.current = value
        break
      case "pawrating":
        pawrating.current = value
        break
      case "pawAssessment":
        pawAssessment.current = value
        break
      case "ccrstatusMenu":
        ccrstatusMenu.current = value
        break
      case "validity":
        validity.current = value
        break
      case "qctechs":
        qctechs.current = value
        break
      case "mptPar":
        mptPar.current = value
        break
      case "mptAsgnCode":
        mptAsgnCode.current = value
        break
      case "jaxPar":
        jaxPar.current = value
        break
      case "pawunsat":
        pawunsat.current = value
        break
      case "pawrootCause":
        pawrootCause.current = value
        break
      case "fmBldgManager":
        fmBldgManager.current = value
        break
      case "estimators":
        estimators.current = value
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
        { search_by: "causeCode", value: causeCode.current },
        { search_by: "rootCause", value: rootCause.current },
        { search_by: "correctiveAction", value: correctiveAction.current },
        { search_by: "qcstatus", value: qcstatus.current },
        { search_by: "pdrstatusMenu", value: pdrstatusMenu.current },
        { search_by: "pawstatusMenu", value: pawstatusMenu.current },
        { search_by: "pawrating", value: pawrating.current },
        { search_by: "pawAssessment", value: pawAssessment.current },
        { search_by: "ccrstatusMenu", value: ccrstatusMenu.current },
        { search_by: "validity", value: validity.current },
        { search_by: "qctechs", value: qctechs.current },
        { search_by: "mptPar", value: mptPar.current },
        { search_by: "mptAsgnCode", value: mptAsgnCode.current },
        { search_by: "jaxPar", value: jaxPar.current },
        { search_by: "pawunsat", value: pawunsat.current },
        { search_by: "pawrootCause", value: pawrootCause.current },
        { search_by: "fmBldgManager", value: fmBldgManager.current },
        { search_by: "estimators", value: estimators.current },
      ],
    }

    setIsFetching(true)
    fetchTableView(preparePostData)
      .then(res => {
        setDropDownMenuViewMdl(res.data)
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
        { search_by: "causeCode", value: causeCode.current },
        { search_by: "rootCause", value: rootCause.current },
        { search_by: "correctiveAction", value: correctiveAction.current },
        { search_by: "qcstatus", value: qcstatus.current },
        { search_by: "pdrstatusMenu", value: pdrstatusMenu.current },
        { search_by: "pawstatusMenu", value: pawstatusMenu.current },
        { search_by: "pawrating", value: pawrating.current },
        { search_by: "pawAssessment", value: pawAssessment.current },
        { search_by: "ccrstatusMenu", value: ccrstatusMenu.current },
        { search_by: "validity", value: validity.current },
        { search_by: "qctechs", value: qctechs.current },
        { search_by: "mptPar", value: mptPar.current },
        { search_by: "mptAsgnCode", value: mptAsgnCode.current },
        { search_by: "jaxPar", value: jaxPar.current },
        { search_by: "pawunsat", value: pawunsat.current },
        { search_by: "pawrootCause", value: pawrootCause.current },
        { search_by: "fmBldgManager", value: fmBldgManager.current },
        { search_by: "estimators", value: estimators.current },
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

        downloadLink.setAttribute("download", "DropDownMenuView.xlsx")
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
    console.log("edit items: ", item)
  }

  const onAttemptDelete = id => {
    if (id > 0) {
      setDeleteModal(true)
      setModelData({ id: id })
    }
  }

  const onDeleteConfirmed = () => {
    if (modelData.id > 0) {
      deleteDropDownMenu(modelData.id)
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
          <title>DropDown Menu View | NINETRAX | QC Management</title>
        </MetaTags>

        <Container fluid>
          <Breadcrumbs
            title="DropDownMenuView"
            breadcrumbItem="DropDownMenuView"
          />

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
                              onClick={() => onOrderByClick("causeCode")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "causeCode"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Cause Code
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("rootCause")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "rootCause"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Root Cause
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("correctiveAction")}
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "correctiveAction"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Corrective Action
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("qcstatus")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "qcstatus"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              QC Status
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("pdrstatusMenu")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "pdrstatusMenu"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              PDR Status Menu
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("pawstatusMenu")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "pawstatusMenu"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              PAW Status Menu
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("pawrating")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "pawrating"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              PAW Rating
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("pawAssessment")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "pawAssessment"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              PAW Assessment
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("ccrstatusMenu")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "ccrstatusMenu"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              CCR Status Menu
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
                              onClick={() => onOrderByClick("qctechs")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "qctechs"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              QC Techs
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("mptPar")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "mptPar"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              MPT PAR
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("mptAsgnCode")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "mptAsgnCode"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              MPT Assign Code
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("jaxPar")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "jaxPar"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              JAX PAR
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("pawunsat")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "pawunsat"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              PAW unsat
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("pawrootCause")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "pawrootCause"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              PAW Root Cause
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("fmBldgManager")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "fmBldgManager"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              FM Building Manager
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("estimators")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "estimators"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Estimators
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
                                placeholder="Cause Code"
                                name="scauseCode"
                                id="scauseCode"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "causeCode",
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
                                placeholder="Root Cause"
                                name="srootCause"
                                id="srootCause"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "rootCause",
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
                                placeholder="Corrective Action"
                                name="scorrectiveAction"
                                id="scorrectiveAction"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "correctiveAction",
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
                                placeholder="QC Status"
                                name="sqcstatus"
                                id="sqcstatus"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "qcstatus",
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
                                placeholder="PDR Status Menu"
                                name="spdrstatusMenu"
                                id="spdrstatusMenu"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "pdrstatusMenu",
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
                                placeholder="PAW Status Menu"
                                name="spawstatusMenu"
                                id="spawstatusMenu"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "pawstatusMenu",
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
                                placeholder="PAW Rating"
                                name="spawrating"
                                id="spawrating"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "pawrating",
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
                                placeholder="PAW Assessment"
                                name="spawAssessment"
                                id="spawAssessment"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "pawAssessment",
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
                                placeholder="CCR Status Menu"
                                name="sccrstatusMenu"
                                id="sccrstatusMenu"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "ccrstatusMenu",
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
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="QC Techs"
                                name="sqctechs"
                                id="sqctechs"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "qctechs",
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
                                placeholder="MPT PAR"
                                name="smptPar"
                                id="smptPar"
                                onChange={e =>
                                  onUpdateSearchFilter("mptPar", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="MPT Asgn Code"
                                name="smptAsgnCode"
                                id="smptAsgnCode"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "mptAsgnCode",
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
                                placeholder="jaxPar"
                                name="sjaxPar"
                                id="sjaxPar"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "JAX PAR",
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
                                placeholder="PAW unsat"
                                name="spawunsat"
                                id="spawunsat"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "pawunsat",
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
                                placeholder="PAW Root Cause"
                                name="spawrootCause"
                                id="spawrootCause"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "pawrootCause",
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
                                placeholder="Building Manager"
                                name="sfmBldgManager"
                                id="sfmBldgManager"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "fmBldgManager",
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
                                placeholder="Estimators"
                                name="sestimators"
                                id="sestimators"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "estimators",
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

                          {DropDownMenuViewMdl.data &&
                            DropDownMenuViewMdl.data.map((item, index) => {
                              return (
                                <tr key={index}>
                                  {/* <td>{item.id}</td> */}
                                  <td>{item.causeCode}</td>
                                  <td>{item.rootCause}</td>
                                  <td>{item.correctiveAction}</td>
                                  <td>{item.qcstatus}</td>
                                  <td>{item.pdrstatusMenu}</td>
                                  <td>{item.pawstatusMenu}</td>
                                  <td>{item.pawrating}</td>
                                  <td>{item.pawAssessment}</td>
                                  <td>{item.ccrstatusMenu}</td>
                                  <td>{item.validity}</td>
                                  <td>{item.qctechs}</td>
                                  <td>{item.mptPar}</td>
                                  <td>{item.mptAsgnCode}</td>
                                  <td>{item.jaxPar}</td>
                                  <td>{item.pawunsat}</td>
                                  <td>{item.pawrootCause}</td>
                                  <td>{item.fmBldgManager}</td>
                                  <td>{item.estimators}</td>

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

                          {DropDownMenuViewMdl.data &&
                            DropDownMenuViewMdl.data.length === 0 && (
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
                            DropDownMenuViewMdl.totalRecords / +length.current
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
                        Total Records: {DropDownMenuViewMdl.totalRecords}
                      </div>
                    </Col>
                  </Row>

                  {/* <DeleteModal
                    show={deleteModal}
                    onDeleteClick={handleDelete}
                    onCloseClick={() => setDeleteModal(false)}
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

export default DropDownMenuView
