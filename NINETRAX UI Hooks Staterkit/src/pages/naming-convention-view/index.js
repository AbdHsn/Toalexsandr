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
  getMenuNamingConventionView,
  exportMenuNamingConventionView,
} from "../../services/menu-naming-convention-service"
import { rowSizes as rowSizeDdl } from "../../services/common-service"

import Breadcrumbs from "components/Common/Breadcrumb"

const MenuNamingConventionView = props => {
  const [MenuNamingConventionViewMdl, setMenuNamingConventionViewMdl] =
    useState({})
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
  const trackerName = useRef("")
  const abrvName = useRef("")
  const prefix = useRef("")
  const numberSeq = useRef("")
  const postfix = useRef("")
  const namingConv = useRef("")
  const lastUsedConv = useRef("")
  const nextToUseConv = useRef("")
  const active = useRef("")
  const group = useRef("")

  useEffect(() => {
    loadView()
  }, [])

  const onUpdateSearchFilter = (column, value) => {
    start.current = 0
    switch (column) {
      case "id":
        id.current = value
        break
      case "trackerName":
        trackerName.current = value
        break
      case "abrvName":
        abrvName.current = value
        break
      case "prefix":
        prefix.current = value
        break
      case "numberSeq":
        numberSeq.current = value
        break
      case "postfix":
        postfix.current = value
        break
      case "namingConv":
        namingConv.current = value
        break
      case "lastUsedConv":
        lastUsedConv.current = value
        break
      case "nextToUseConv":
        nextToUseConv.current = value
        break
      case "active":
        active.current = value
        break
      case "group":
        group.current = value
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
        { search_by: "trackerName", value: trackerName.current },
        { search_by: "abrvName", value: abrvName.current },
        { search_by: "prefix", value: prefix.current },
        { search_by: "numberSeq", value: numberSeq.current },
        { search_by: "postfix", value: postfix.current },
        { search_by: "namingConv", value: namingConv.current },
        { search_by: "lastUsedConv", value: lastUsedConv.current },
        { search_by: "nextToUseConv", value: nextToUseConv.current },
        { search_by: "active", value: active.current },
        { search_by: "group", value: group.current },
      ],
    }

    setIsFetching(true)
    getMenuNamingConventionView(preparePostData)
      .then(res => {
        setMenuNamingConventionViewMdl(res.data)
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
        { search_by: "trackerName", value: trackerName.current },
        { search_by: "abrvName", value: abrvName.current },
        { search_by: "prefix", value: prefix.current },
        { search_by: "numberSeq", value: numberSeq.current },
        { search_by: "postfix", value: postfix.current },
        { search_by: "namingConv", value: namingConv.current },
        { search_by: "lastUsedConv", value: lastUsedConv.current },
        { search_by: "nextToUseConv", value: nextToUseConv.current },
        { search_by: "active", value: active.current },
        { search_by: "group", value: group.current },
      ],
    }

    setIsExporting(true)
    exportMenuNamingConventionView(preparePostData)
      .then(res => {
        let downloadLink = document.createElement("a")
        downloadLink.href = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.ms-excel",
          })
        )

        downloadLink.setAttribute("download", "MenuNamingConventionView.xlsx")
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
          <title>MenuNamingConventionView | NINETRAX | QC Management</title>
        </MetaTags>

        <Container fluid>
          <Breadcrumbs
            title="MenuNamingConventionView"
            breadcrumbItem="MenuNamingConventionView"
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
                              onClick={() => onOrderByClick("trackerName")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "trackerName"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              trackerName
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("abrvName")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "abrvName"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              abrvName
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("prefix")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "prefix"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              prefix
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("numberSeq")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "numberSeq"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              numberSeq
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("postfix")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "postfix"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              postfix
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("namingConv")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "namingConv"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              namingConv
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("lastUsedConv")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "lastUsedConv"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              lastUsedConv
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("nextToUseConv")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "nextToUseConv"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              nextToUseConv
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("active")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "active"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              active
                            </th>
                            <th
                              className="custom-pointer"
                              onClick={() => onOrderByClick("group")}
                            >
                              <i
                                className={
                                  orderColumn.current.column === "group"
                                    ? orderColumn.current.order_by === "DESC"
                                      ? "fa fa-sort-amount-down"
                                      : "fa fa-sort-amount-up"
                                    : ""
                                }
                              ></i>{" "}
                              group
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
                                placeholder="trackerName"
                                name="strackerName"
                                id="strackerName"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "trackerName",
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
                                placeholder="abrvName"
                                name="sabrvName"
                                id="sabrvName"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "abrvName",
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
                                placeholder="prefix"
                                name="sprefix"
                                id="sprefix"
                                onChange={e =>
                                  onUpdateSearchFilter("prefix", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="postfix"
                                name="spostfix"
                                id="spostfix"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "postfix",
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
                                placeholder="namingConv"
                                name="snamingConv"
                                id="snamingConv"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "namingConv",
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
                                placeholder="lastUsedConv"
                                name="slastUsedConv"
                                id="slastUsedConv"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "lastUsedConv",
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
                                placeholder="nextToUseConv"
                                name="snextToUseConv"
                                id="snextToUseConv"
                                onChange={e =>
                                  onUpdateSearchFilter(
                                    "nextToUseConv",
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
                                placeholder="active"
                                name="sactive"
                                id="sactive"
                                onChange={e =>
                                  onUpdateSearchFilter("active", e.target.value)
                                }
                                onKeyUp={onPressEnter}
                              />
                            </th>
                            <th>
                              {" "}
                              <input
                                style={{ width: "100px" }}
                                type="text"
                                placeholder="group"
                                name="sgroup"
                                id="sgroup"
                                onChange={e =>
                                  onUpdateSearchFilter("group", e.target.value)
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

                          {MenuNamingConventionViewMdl.data &&
                            MenuNamingConventionViewMdl.data.map(
                              (item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.trackerName}</td>
                                    <td>{item.abrvName}</td>
                                    <td>{item.prefix}</td>
                                    <td>{item.postfix}</td>
                                    <td>{item.namingConv}</td>
                                    <td>{item.lastUsedConv}</td>
                                    <td>{item.nextToUseConv}</td>
                                    <td>{item.active}</td>
                                    <td>{item.group}</td>

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
                              }
                            )}

                          {MenuNamingConventionViewMdl.data &&
                            MenuNamingConventionViewMdl.data.length === 0 && (
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
                            MenuNamingConventionViewMdl.totalRecords /
                              +length.current
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
                        Total Records:{" "}
                        {MenuNamingConventionViewMdl.totalRecords}
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

export default MenuNamingConventionView
