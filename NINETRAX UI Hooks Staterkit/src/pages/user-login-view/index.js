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
  getUserLoginView,
  exportUserLoginView,
} from "../../services/user-login-service"
import { rowSizes as rowSizeDdl } from "../../services/common-service"

import Breadcrumbs from "components/Common/Breadcrumb"

const UserLoginView = props => {
  const [UserLoginViewMdl, setUserLoginViewMdl] = useState({})
  const [pageSizeDrp, setPageSizeDrp] = useState(false)

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
  const unique_id = useRef("")
  const userFN = useRef("")
  const userLN = useRef("")
  const loginID = useRef("")
  const password = useRef("")
  const workSite = useRef("")
  const accessLevel = useRef("")
  const dbAccess = useRef("")
  const readRecordsOnly = useRef("")
  const editRecordsOnly = useRef("")
  const adminRights = useRef("")
  const resetPW = useRef("")
  const addUsers = useRef("")
  const deleteRecords = useRef("")
  const addRecords = useRef("")
  const securityQ1 = useRef("")
  const securityQ1A = useRef("")
  const securityQ2 = useRef("")
  const securityQ2A = useRef("")
  const securityQ3 = useRef("")
  const securityQ3A = useRef("")
  const dbMasterUnlock = useRef("")
  const canImportFiles = useRef("")
  const canChangeDBLocation = useRef("")
  const canBackupDB = useRef("")
  const activateAutoLogOut = useRef("")
  const dbUpdateNotification = useRef("")

  useEffect(() => {
    loadView()
  }, [])

  const onUpdateSearchFilter = (column, value) => {
    start.current = 0
    switch (column) {
      case "id":
        id.current = value
        break
      case "unique_id":
        unique_id.current = value
        break
      case "userFN":
        userFN.current = value
        break
      case "userLN":
        userLN.current = value
        break
      case "loginID":
        loginID.current = value
        break
      case "password":
        password.current = value
        break
      case "workSite":
        workSite.current = value
        break
      case "accessLevel":
        accessLevel.current = value
        break
      case "dbAccess":
        dbAccess.current = value
        break
      case "readRecordsOnly":
        readRecordsOnly.current = value
        break
      case "editRecordsOnly":
        editRecordsOnly.current = value
        break
      case "adminRights":
        adminRights.current = value
        break
      case "resetPW":
        resetPW.current = value
        break
      case "addUsers":
        addUsers.current = value
        break
      case "deleteRecords":
        deleteRecords.current = value
        break
      case "addRecords":
        addRecords.current = value
        break
      case "securityQ1":
        securityQ1.current = value
        break
      case "securityQ1A":
        securityQ1A.current = value
        break
      case "securityQ2":
        securityQ2.current = value
        break
      case "securityQ2A":
        securityQ2A.current = value
        break
      case "securityQ3":
        securityQ3.current = value
        break
      case "securityQ3A":
        securityQ3A.current = value
        break
      case "dbMasterUnlock":
        dbMasterUnlock.current = value
        break
      case "canImportFiles":
        canImportFiles.current = value
        break
      case "canChangeDBLocation":
        canChangeDBLocation.current = value
        break
      case "canBackupDB":
        canBackupDB.current = value
        break
      case "activateAutoLogOut":
        activateAutoLogOut.current = value
        break
      case "dbUpdateNotification":
        dbUpdateNotification.current = value
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
        { search_by: "unique_id", value: unique_id.current },
        { search_by: "userFN", value: userFN.current },
        { search_by: "userLN", value: userLN.current },
        { search_by: "loginID", value: loginID.current },
        { search_by: "password", value: password.current },
        { search_by: "workSite", value: workSite.current },
        { search_by: "accessLevel", value: accessLevel.current },
        { search_by: "dbAccess", value: dbAccess.current },
        { search_by: "readRecordsOnly", value: readRecordsOnly.current },
        { search_by: "editRecordsOnly", value: editRecordsOnly.current },
        { search_by: "adminRights", value: adminRights.current },
        { search_by: "resetPW", value: resetPW.current },
        { search_by: "addUsers", value: addUsers.current },
        { search_by: "deleteRecords", value: deleteRecords.current },
        { search_by: "addRecords", value: addRecords.current },
        { search_by: "securityQ1", value: securityQ1.current },
        { search_by: "securityQ1A", value: securityQ1A.current },
        { search_by: "securityQ2", value: securityQ2.current },
        { search_by: "securityQ2A", value: securityQ2A.current },
        { search_by: "securityQ3", value: securityQ3.current },
        { search_by: "securityQ3A", value: securityQ3A.current },
        { search_by: "dbMasterUnlock", value: dbMasterUnlock.current },
        { search_by: "canImportFiles", value: canImportFiles.current },
        {
          search_by: "canChangeDBLocation",
          value: canChangeDBLocation.current,
        },
        { search_by: "canBackupDB", value: canBackupDB.current },
        { search_by: "activateAutoLogOut", value: activateAutoLogOut.current },
        {
          search_by: "dbUpdateNotification",
          value: dbUpdateNotification.current,
        },
      ],
    }

    setIsFetching(true)
    getUserLoginView(preparePostData)
      .then(res => {
        setUserLoginViewMdl(res.data)
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
        { search_by: "unique_id", value: unique_id.current },
        { search_by: "userFN", value: userFN.current },
        { search_by: "userLN", value: userLN.current },
        { search_by: "loginID", value: loginID.current },
        { search_by: "password", value: password.current },
        { search_by: "workSite", value: workSite.current },
        { search_by: "accessLevel", value: accessLevel.current },
        { search_by: "dbAccess", value: dbAccess.current },
        { search_by: "readRecordsOnly", value: readRecordsOnly.current },
        { search_by: "editRecordsOnly", value: editRecordsOnly.current },
        { search_by: "adminRights", value: adminRights.current },
        { search_by: "resetPW", value: resetPW.current },
        { search_by: "addUsers", value: addUsers.current },
        { search_by: "deleteRecords", value: deleteRecords.current },
        { search_by: "addRecords", value: addRecords.current },
        { search_by: "securityQ1", value: securityQ1.current },
        { search_by: "securityQ1A", value: securityQ1A.current },
        { search_by: "securityQ2", value: securityQ2.current },
        { search_by: "securityQ2A", value: securityQ2A.current },
        { search_by: "securityQ3", value: securityQ3.current },
        { search_by: "securityQ3A", value: securityQ3A.current },
        { search_by: "dbMasterUnlock", value: dbMasterUnlock.current },
        { search_by: "canImportFiles", value: canImportFiles.current },
        {
          search_by: "canChangeDBLocation",
          value: canChangeDBLocation.current,
        },
        { search_by: "canBackupDB", value: canBackupDB.current },
        { search_by: "activateAutoLogOut", value: activateAutoLogOut.current },
        {
          search_by: "dbUpdateNotification",
          value: dbUpdateNotification.current,
        },
      ],
    }

    setIsExporting(true)
    exportUserLoginView(preparePostData)
      .then(res => {
        let downloadLink = document.createElement("a")
        downloadLink.href = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.ms-excel",
          })
        )

        downloadLink.setAttribute("download", "UserLoginView.xlsx")
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

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>UserLoginView | NINETRAX | QC Management</title>
        </MetaTags>

        <Container fluid>
          <Breadcrumbs title="UserLoginView" breadcrumbItem="UserLoginView" />

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
                            <th
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
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("unique_id")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "unique_id"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              unique_id
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("userFN")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "userFN"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              userFN
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("userLN")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "userLN"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              userLN
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("loginID")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "loginID"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              loginID
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("password")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "password"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              password
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("workSite")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "workSite"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              workSite
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("accessLevel")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "accessLevel"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              accessLevel
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("dbAccess")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "dbAccess"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              dbAccess
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("readRecordsOnly")}
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "readRecordsOnly"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              readRecordsOnly
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("editRecordsOnly")}
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "editRecordsOnly"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              editRecordsOnly
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("adminRights")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "adminRights"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              adminRights
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("resetPW")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "resetPW"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              resetPW
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("addUsers")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "addUsers"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              addUsers
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("deleteRecords")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "deleteRecords"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              deleteRecords
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("addRecords")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "addRecords"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              addRecords
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("securityQ1")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "securityQ1"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              securityQ1
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("securityQ1A")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "securityQ1A"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              securityQ1A
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("securityQ2")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "securityQ2"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              securityQ2
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("securityQ2A")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "securityQ2A"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              securityQ2A
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("securityQ3")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "securityQ3"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              securityQ3
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("securityQ3A")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "securityQ3A"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              securityQ3A
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("dbMasterUnlock")}
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "dbMasterUnlock"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              dbMasterUnlock
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("canImportFiles")}
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "canImportFiles"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              canImportFiles
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() =>
                                onOrderByClick("canChangeDBLocation")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "canChangeDBLocation"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              canChangeDBLocation
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("canBackupDB")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "canBackupDB"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              canBackupDB
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() =>
                                onOrderByClick("activateAutoLogOut")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "activateAutoLogOut"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              activateAutoLogOut
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() =>
                                onOrderByClick("dbUpdateNotification")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "dbUpdateNotification"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              dbUpdateNotification
                            </th>
                            <th></th>
                          </tr>
                          <tr>
                            <th>
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
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="unique_id"
                                name="sunique_id"
                                id="sunique_id"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "unique_id",
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
                                placeholder="userFN"
                                name="suserFN"
                                id="suserFN"
                                onChange={e =>
                                  onUpdateSearchFilter("userFN", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="userLN"
                                name="suserLN"
                                id="suserLN"
                                onChange={e =>
                                  onUpdateSearchFilter("userLN", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="loginID"
                                name="sloginID"
                                id="sloginID"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "loginID",
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
                                placeholder="password"
                                name="spassword"
                                id="spassword"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "password",
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
                                placeholder="workSite"
                                name="sworkSite"
                                id="sworkSite"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "workSite",
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
                                placeholder="accessLevel"
                                name="saccessLevel"
                                id="saccessLevel"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "accessLevel",
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
                                placeholder="adminRights"
                                name="sadminRights"
                                id="sadminRights"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "adminRights",
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
                                placeholder="resetPW"
                                name="sresetPW"
                                id="sresetPW"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "resetPW",
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
                                placeholder="securityQ1"
                                name="ssecurityQ1"
                                id="ssecurityQ1"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "securityQ1",
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
                                placeholder="securityQ1A"
                                name="ssecurityQ1A"
                                id="ssecurityQ1A"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "securityQ1A",
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
                                placeholder="securityQ2"
                                name="ssecurityQ2"
                                id="ssecurityQ2"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "securityQ2",
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
                                placeholder="securityQ2A"
                                name="ssecurityQ2A"
                                id="ssecurityQ2A"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "securityQ2A",
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
                                placeholder="securityQ3"
                                name="ssecurityQ3"
                                id="ssecurityQ3"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "securityQ3",
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
                                placeholder="securityQ3A"
                                name="ssecurityQ3A"
                                id="ssecurityQ3A"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "securityQ3A",
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

                          {UserLoginViewMdl.data &&
                            UserLoginViewMdl.data.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.id}</td>
                                  <td>{item.unique_id}</td>
                                  <td>{item.userFN}</td>
                                  <td>{item.userLN}</td>
                                  <td>{item.loginID}</td>
                                  <td>{item.password}</td>
                                  <td>{item.workSite}</td>
                                  <td>{item.accessLevel}</td>
                                  <td>{item.adminRights}</td>
                                  <td>{item.resetPW}</td>
                                  <td>{item.securityQ1}</td>
                                  <td>{item.securityQ1A}</td>
                                  <td>{item.securityQ2}</td>
                                  <td>{item.securityQ2A}</td>
                                  <td>{item.securityQ3}</td>
                                  <td>{item.securityQ3A}</td>

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

                          {UserLoginViewMdl.data &&
                            UserLoginViewMdl.data.length === 0 && (
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
                            UserLoginViewMdl.totalRecords / +length.current
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
                        Total Records: {UserLoginViewMdl.totalRecords}
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

export default UserLoginView
