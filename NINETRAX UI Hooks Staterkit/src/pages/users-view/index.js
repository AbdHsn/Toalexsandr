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
  getUsersView,
  exportUsersView,
  deleteUser,
} from "../../services/users-service"
import { rowSizes as rowSizeDdl } from "../../services/common-service"
import UsersAddUpdate from "./add-update"
import DeleteModal from "../../components/Common/DeleteModal"
import Breadcrumbs from "components/Common/Breadcrumb"

const UsersView = props => {
  const [UsersViewMdl, setUsersViewMdl] = useState({})
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
  const firstName = useRef("")
  const lastName = useRef("")
  const fullName = useRef("")
  const uniqueId = useRef("")
  const qualityInspectors = useRef("")
  const assosicateInspectors = useRef("")
  const planEstimateInspectors = useRef("")
  const customerInspectors = useRef("")
  const aor = useRef("")
  const positionTitle = useRef("")
  const email = useRef("")
  const accessType = useRef("")
  const activeStatus = useRef("")
  const fullAdminRights = useRef("")
  const editRights = useRef("")
  const deleteRights = useRef("")
  const viewRights = useRef("")
  const importRights = useRef("")
  const activateAutologout = useRef("")
  const loginId = useRef("")
  const password = useRef("")
  const resetPassword = useRef("")
  const securityQuesOne = useRef("")
  const securityAnsOne = useRef("")
  const dateAccessGranted = useRef("")
  const dateAccessRemoved = useRef("")
  const comments = useRef("")

  useEffect(() => {
    loadView()
  }, [])

  const onUpdateSearchFilter = (column, value) => {
    start.current = 0
    switch (column) {
      case "id":
        id.current = value
        break
      case "firstName":
        firstName.current = value
        break
      case "lastName":
        lastName.current = value
        break
      case "fullName":
        fullName.current = value
        break
      case "uniqueId":
        uniqueId.current = value
        break
      case "qualityInspectors":
        qualityInspectors.current = value
        break
      case "assosicateInspectors":
        assosicateInspectors.current = value
        break
      case "planEstimateInspectors":
        planEstimateInspectors.current = value
        break
      case "customerInspectors":
        customerInspectors.current = value
        break
      case "aor":
        aor.current = value
        break
      case "positionTitle":
        positionTitle.current = value
        break
      case "email":
        email.current = value
        break
      case "accessType":
        accessType.current = value
        break
      case "activeStatus":
        activeStatus.current = value
        break
      case "fullAdminRights":
        fullAdminRights.current = value
        break
      case "editRights":
        editRights.current = value
        break
      case "deleteRights":
        deleteRights.current = value
        break
      case "viewRights":
        viewRights.current = value
        break
      case "importRights":
        importRights.current = value
        break
      case "activateAutologout":
        activateAutologout.current = value
        break
      case "loginId":
        loginId.current = value
        break
      case "password":
        password.current = value
        break
      case "resetPassword":
        resetPassword.current = value
        break
      case "securityQuesOne":
        securityQuesOne.current = value
        break
      case "securityAnsOne":
        securityAnsOne.current = value
        break
      case "dateAccessGranted":
        dateAccessGranted.current = value
        break
      case "dateAccessRemoved":
        dateAccessRemoved.current = value
        break
      case "comments":
        comments.current = value
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
        { search_by: "firstName", value: firstName.current },
        { search_by: "lastName", value: lastName.current },
        { search_by: "fullName", value: fullName.current },
        { search_by: "uniqueId", value: uniqueId.current },
        { search_by: "qualityInspectors", value: qualityInspectors.current },
        {
          search_by: "assosicateInspectors",
          value: assosicateInspectors.current,
        },
        {
          search_by: "planEstimateInspectors",
          value: planEstimateInspectors.current,
        },
        { search_by: "customerInspectors", value: customerInspectors.current },
        { search_by: "aor", value: aor.current },
        { search_by: "positionTitle", value: positionTitle.current },
        { search_by: "email", value: email.current },
        { search_by: "accessType", value: accessType.current },
        { search_by: "activeStatus", value: activeStatus.current },
        { search_by: "fullAdminRights", value: fullAdminRights.current },
        { search_by: "editRights", value: editRights.current },
        { search_by: "deleteRights", value: deleteRights.current },
        { search_by: "viewRights", value: viewRights.current },
        { search_by: "importRights", value: importRights.current },
        { search_by: "activateAutologout", value: activateAutologout.current },
        { search_by: "loginId", value: loginId.current },
        { search_by: "password", value: password.current },
        { search_by: "resetPassword", value: resetPassword.current },
        { search_by: "securityQuesOne", value: securityQuesOne.current },
        { search_by: "securityAnsOne", value: securityAnsOne.current },
        { search_by: "dateAccessGranted", value: dateAccessGranted.current },
        { search_by: "dateAccessRemoved", value: dateAccessRemoved.current },
        { search_by: "comments", value: comments.current },
      ],
    }

    setIsFetching(true)
    getUsersView(preparePostData)
      .then(res => {
        setUsersViewMdl(res.data)
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
        { search_by: "firstName", value: firstName.current },
        { search_by: "lastName", value: lastName.current },
        { search_by: "fullName", value: fullName.current },
        { search_by: "uniqueId", value: uniqueId.current },
        { search_by: "qualityInspectors", value: qualityInspectors.current },
        {
          search_by: "assosicateInspectors",
          value: assosicateInspectors.current,
        },
        {
          search_by: "planEstimateInspectors",
          value: planEstimateInspectors.current,
        },
        { search_by: "customerInspectors", value: customerInspectors.current },
        { search_by: "aor", value: aor.current },
        { search_by: "positionTitle", value: positionTitle.current },
        { search_by: "email", value: email.current },
        { search_by: "accessType", value: accessType.current },
        { search_by: "activeStatus", value: activeStatus.current },
        { search_by: "fullAdminRights", value: fullAdminRights.current },
        { search_by: "editRights", value: editRights.current },
        { search_by: "deleteRights", value: deleteRights.current },
        { search_by: "viewRights", value: viewRights.current },
        { search_by: "importRights", value: importRights.current },
        { search_by: "activateAutologout", value: activateAutologout.current },
        { search_by: "loginId", value: loginId.current },
        { search_by: "password", value: password.current },
        { search_by: "resetPassword", value: resetPassword.current },
        { search_by: "securityQuesOne", value: securityQuesOne.current },
        { search_by: "securityAnsOne", value: securityAnsOne.current },
        { search_by: "dateAccessGranted", value: dateAccessGranted.current },
        { search_by: "dateAccessRemoved", value: dateAccessRemoved.current },
        { search_by: "comments", value: comments.current },
      ],
    }

    setIsExporting(true)
    exportUsersView(preparePostData)
      .then(res => {
        let downloadLink = document.createElement("a")
        downloadLink.href = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.ms-excel",
          })
        )

        downloadLink.setAttribute("download", "UsersView.xlsx")
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
      deleteUser(modelData.id)
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
          <title>User Settings | NINETRAX | QC Management</title>
        </MetaTags>

        <Container fluid>
          <Breadcrumbs title="User Settings" breadcrumbItem="User Settings" />

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

                      {/* {isExporting === true ? (
                        <BtnExporting isExporting={isExporting} />
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-secondary w-xs"
                          onClick={onExportClick}
                        >
                          <i className="bx bx-file"></i> Export
                        </button>
                      )} */}
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
                              onClick={() => onOrderByClick("firstName")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "firstName"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              First Name
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("lastName")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "lastName"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Last Name
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("fullName")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "fullName"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Full Name
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("uniqueId")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "uniqueId"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Unique Id
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() =>
                                onOrderByClick("qualityInspectors")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "qualityInspectors"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Quality Inspectors
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() =>
                                onOrderByClick("assosicateInspectors")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "assosicateInspectors"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Assosicate Inspectors
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() =>
                                onOrderByClick("planEstimateInspectors")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "planEstimateInspectors"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Llan Estimate Inspectors
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() =>
                                onOrderByClick("customerInspectors")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "customerInspectors"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Customer Inspectors
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("aor")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "aor"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              AOR
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("positionTitle")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "positionTitle"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Position Title
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("email")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "email"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Email
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("accessType")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "accessType"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Access Type
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("activeStatus")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "activeStatus"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Active Status
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("fullAdminRights")}
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "fullAdminRights"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Full Admin Rights
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("editRights")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "editRights"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Edit Rights
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("deleteRights")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "deleteRights"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Delete Rights
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("viewRights")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "viewRights"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              View Rights
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("importRights")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "importRights"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Import Rights
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() =>
                                onOrderByClick("activateAutologout")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "activateAutologout"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Activate Auto logout
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("loginId")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "loginId"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Login Id
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("securityQuesOne")}
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "securityQuesOne"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Security Question 01
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("securityAnsOne")}
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "securityAnsOne"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Security Answer 01
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() =>
                                onOrderByClick("dateAccessGranted")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "dateAccessGranted"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Date Access Granted
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() =>
                                onOrderByClick("dateAccessRemoved")
                              }
                            >
                              <i
                                className={
                                  orderColumn.current.column ===
                                  "dateAccessRemoved"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Date Access Removed
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("comments")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "comments"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              Comments
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
                                placeholder="First Name"
                                name="sfirstName"
                                id="sfirstName"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "firstName",
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
                                placeholder="Last Name"
                                name="slastName"
                                id="slastName"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "lastName",
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
                                placeholder="Full Name"
                                name="sfullName"
                                id="sfullName"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "fullName",
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
                                placeholder="UniqueId"
                                name="suniqueId"
                                id="suniqueId"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "uniqueId",
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
                                placeholder="AOR"
                                name="saor"
                                id="saor"
                                onChange={e =>
                                  onUpdateSearchFilter("aor", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="Position Title"
                                name="spositionTitle"
                                id="spositionTitle"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "positionTitle",
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
                                placeholder="Email"
                                name="semail"
                                id="semail"
                                onChange={e =>
                                  onUpdateSearchFilter("email", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="Access Type"
                                name="saccessType"
                                id="saccessType"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "accessType",
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
                                placeholder="LoginId"
                                name="sloginId"
                                id="sloginId"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "loginId",
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
                                placeholder="Security Question 01"
                                name="ssecurityQuesOne"
                                id="ssecurityQuesOne"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "securityQuesOne",
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
                                placeholder="Security Answer 01"
                                name="ssecurityAnsOne"
                                id="ssecurityAnsOne"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "securityAnsOne",
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
                                placeholder="DateAccessGranted"
                                name="sdateAccessGranted"
                                id="sdateAccessGranted"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "dateAccessGranted",
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
                                placeholder="dateAccessRemoved"
                                name="sdateAccessRemoved"
                                id="sdateAccessRemoved"
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "dateAccessRemoved",
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
                                placeholder="Comments"
                                name="scomments"
                                id="scomments"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "comments",
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

                          {UsersViewMdl.data &&
                            UsersViewMdl.data.map((item, index) => {
                              return (
                                <tr key={index}>
                                  {/* <td>{item.id}</td> */}
                                  <td>{item.firstName}</td>
                                  <td>{item.lastName}</td>
                                  <td>{item.fullName}</td>
                                  <td>{item.uniqueId}</td>
                                  <td>{item.aor}</td>
                                  <td>{item.positionTitle}</td>
                                  <td>{item.email}</td>
                                  <td>{item.accessType}</td>
                                  <td>{item.loginId}</td>
                                  {/* <td>{item.password}</td> */}
                                  <td>{item.securityQuesOne}</td>
                                  <td>{item.securityAnsOne}</td>
                                  <td>
                                    {item.dateAccessGranted
                                      ? moment(item.dateAccessGranted).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>
                                    {item.dateAccessRemoved
                                      ? moment(item.dateAccessRemoved).format(
                                          "MM/DD/YYYY"
                                        )
                                      : "No Data"}
                                  </td>
                                  <td>{item.comments}</td>

                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-primary ml-2"
                                      onClick={e => onEditClick(item)}
                                      data-toggle="modal"
                                      data-target=".bs-example-modal-center"
                                    >
                                      <i className="far fa-edit"></i> Edit
                                    </button>{" "}
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

                          {UsersViewMdl.data && UsersViewMdl.data.length === 0 && (
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
                            UsersViewMdl.totalRecords / +length.current
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
                        Total Records: {UsersViewMdl.totalRecords}
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

                  <UsersAddUpdate
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

export default UsersView
