import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
//redux
import { useSelector, useDispatch } from "react-redux"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import {
  Button,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  Label,
  Container,
} from "reactstrap"

import {
  getDirectoryNamesView as onGetDirectoryNamesView,
  // addNewCustomer as onAddNewCustomer,
  // updateCustomer as onUpdateCustomer,
  // deleteCustomer as onDeleteCustomer,
} from "store/directory-name/actions"

//import { getDirectoryNamesViewAxios } from "../../helpers/backend_helper"

import Breadcrumbs from "components/Common/Breadcrumb"

const DirectoryNames = props => {
  const dispatch = useDispatch()

  const { directoryNamesTbl } = useSelector(state => ({
    directoryNamesTbl: state.directoryNameData.directoryNamesTbl,
  }))
  const { rowSizeDdl } = useSelector(state => ({
    rowSizeDdl: state.directoryNameData.rowSizeDdl,
  }))

  const [modal, setModal] = useState(false)
  const [dataTable, setDataTable] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [directoryName, setdirectoryName] = useState(null)
  const [pageSizeDrp, setPageSizeDrp] = useState(false)
  const [postData, setPostData] = useState({
    columns: [],
    orders: [
      {
        column: "Id",
        order_by: "DESC",
      },
    ],
    start: 0,
    length: "All",
    search: {},
    searches: [],
  })

  useEffect(() => {
    dispatch(onGetDirectoryNamesView(postData))
  }, [])

  const onChangePageSize = () => {}

  const pageOptions = {
    // sizePerPage: 10,
    // totalSize: customers.length, // replace later with size(orders),
    // custom: true,
  }

  const handleDelete = id => {
    const newDirectoryNames = directoryNameData.filter(f => f.id !== id)
    setDirectoryNameData(newDirectoryNames)
  }
  const onSizePerPageChange = number => {
    setPostData(...postData, {
      length: number,
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Directory Names | Skote - React Admin & Dashboard Template
          </title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="DN" breadcrumbItem="DN" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle className="h4"> Directory Names</CardTitle>

                  <div className="d-flex flex-wrap">
                    <div className="btn-group">
                      <ButtonDropdown
                        isOpen={pageSizeDrp}
                        toggle={() => setPageSizeDrp(!pageSizeDrp)}
                      >
                        <Button id="caret" color="info" disabled>
                          Row Size: {directoryNamesTbl.totalRecords}
                        </Button>
                        <DropdownToggle caret color="info">
                          <i className="mdi mdi-chevron-down" />
                        </DropdownToggle>
                        <DropdownMenu>
                          {rowSizeDdl.map((item, index) => {
                            return (
                              <DropdownItem
                                key={index}
                                onClick={e => onSizePerPageChange(item)}
                              >
                                {item}
                              </DropdownItem>
                            )
                          })}
                        </DropdownMenu>
                      </ButtonDropdown>
                    </div>
                  </div>

                  {/* {isLoading && (
                    <>
                      <div className="m-auto text-warning">
                        {" "}
                        <Spinner animation="border" size="sm" />
                        Loading...
                      </div>
                    </>
                  )} */}

                  <Table className="table table-sm m-0">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Base Operation</th>
                        <th></th>
                      </tr>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {directoryNamesTbl.data &&
                        directoryNamesTbl.data.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.id}</td>
                              <td>{item.personName}</td>
                              <td>{item.personTitle}</td>
                              <td>{item.baseOfOperation}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger ml-2"
                                  onClick={e => handleDelete(item.id)}
                                  data-toggle="modal"
                                  data-target=".bs-example-modal-center"
                                >
                                  <i className="far fa-trash-alt"></i> Delete
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

// DirectoryNames.propTypes = {
//   //customers: PropTypes.array,
//   directoryNamesTbl: PropTypes.object,
//   onGetDirectoryNamesView: PropTypes.func,
//   //onGetCustomers: PropTypes.func,
//   // onAddNewCustomer: PropTypes.func,
//   // onDeleteCustomer: PropTypes.func,
//   // onUpdateCustomer: PropTypes.func,
// }
export default DirectoryNames
