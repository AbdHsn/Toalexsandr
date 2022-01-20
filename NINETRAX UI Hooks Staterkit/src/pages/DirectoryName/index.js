import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
//redux
import { useSelector, useDispatch } from "react-redux"

// actions
import {
  getDirectoryNames,
  getDirectoryNamesView,
} from "../../store/directory-name/actions"

import { Card, CardBody, Col, Container, Row, Table } from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"

const DirectoryNames = props => {
  const dispatch = useDispatch()

  const { directoryNames } = useSelector(state => ({
    directoryNames: state.DirectoryName.directoryNames,
  }))

  const { directoryNamesModelLst } = useSelector(state => ({
    directoryNamesModelLst: state.DirectoryName.directoryNamesModelLst,
  }))

  //Get data...
  useEffect(() => {
    dispatch(
      // getDirectoryNamesView({
      //   columns: [],
      //   orders: [
      //     {
      //       column: "Id",
      //       order_by: "DESC",
      //     },
      //   ],
      //   start: 0,
      //   length: "All",
      //   search: {},
      //   searches: [],
      // })
      getDirectoryNames()
    )
  }, [dispatch])

  // // your API's response data will be in events variable.
  console.log("Directory Name view---> ", directoryNamesModelLst)

  // const toggle = () => {
  //   if (modal) {
  //     setModal(false)
  //     setCustomer(null)
  //   } else {
  //     setModal(true)
  //   }
  // }

  // const handleCustomerClick = arg => {
  //   const customer = arg

  //   setCustomer({
  //     id: customer.id,
  //     username: customer.username,
  //     phone: customer.phone,
  //     email: customer.email,
  //     address: customer.address,
  //     rating: customer.rating,
  //     walletBalance: customer.walletBalance,
  //     joiningDate: customer.joiningDate,
  //   })

  //   setIsEdit(true)
  //   toggle()
  // }

  // var node = useRef()
  // const onPaginationPageChange = page => {
  //   if (
  //     node &&
  //     node.current &&
  //     node.current.props &&
  //     node.current.props.pagination &&
  //     node.current.props.pagination.options
  //   ) {
  //     node.current.props.pagination.options.onPageChange(page)
  //   }
  // }

  //delete customer
  // const [deleteModal, setDeleteModal] = useState(false)

  // const onClickDelete = customer => {
  //   setCustomer(customer)
  //   setDeleteModal(true)
  // }

  // const handleDeleteCustomer = () => {
  //   if (customer.id) {
  //     dispatch(onDeleteCustomer(customer))
  //     onPaginationPageChange(1)
  //     setDeleteModal(false)
  //   }
  // }

  // const { SearchBar } = Search

  // useEffect(() => {
  //   if (customers && !customers.length) {
  //     dispatch(onGetCustomers())
  //   }
  // }, [dispatch, customers])

  // useEffect(() => {
  //   setCustomerList(customers)
  // }, [customers])

  // useEffect(() => {
  //   if (!isEmpty(customers)) {
  //     setCustomerList(customers)
  //   }
  // }, [customers])

  // // eslint-disable-next-line no-unused-vars
  // const handleTableChange = (type, { page, searchText }) => {
  //   setCustomerList(
  //     customers.filter(customer =>
  //       Object.keys(customer).some(key =>
  //         customer[key].toLowerCase().includes(searchText.toLowerCase())
  //       )
  //     )
  //   )
  // }

  // const handleCustomerClicks = () => {
  //   setCustomerList("")
  //   setIsEdit(false)
  //   toggle()
  // }

  // const defaultSorted = [
  //   {
  //     dataField: "id",
  //     order: "desc",
  //   },
  // ]

  // /** set Date formate */
  // const handleValidDate = date => {
  //   const date1 = moment(new Date(date)).format("DD MMM Y")
  //   return date1
  // }

  return (
    <React.Fragment>
      {/* <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCustomer}
        onCloseClick={() => setDeleteModal(false)}
      /> */}
      <div className="page-content">
        <MetaTags>
          <title>
            DirectoryName | Skote - React Admin & Dashboard Template
          </title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title="Directory Name"
            breadcrumbItem="Directory Name BreadCrumb"
          />

          {console.log("Directory Name view---> ", directoryNamesModelLst)}

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <Table className="table table-sm m-0">
                    <thead>
                      <tr>
                        {/* <th>Id</th> */}
                        <th>Name</th>
                        <th>Title</th>
                        <th>Base Operation</th>
                        <th></th>
                      </tr>
                      <tr>
                        {/* <th>
                          <input
                            type="text"
                            placeholder="Id Search"
                            name="searchById"
                            id="searchById"
                            value={this.state.searchById}
                            onChange={(e, type) =>
                              this.onColumnSearchChange(e, "Id")
                            }
                            list="idLst"
                          />

                          <datalist id="idLst">
                            {this.state.autoCompleteIdSuggestion$.map(
                              (item, index) => {
                                return <option key={index} value={item} />;
                              }
                            )}
                          </datalist>
                        </th> */}
                        <th>
                          {/* PersonTitle BaseOfOperation */}
                          {/* <input
                            type="text"
                            placeholder="Name Search"
                            name="PersonName"
                            id="PersonName"
                            defaultValue={this.searchByPersonName}
                            onChange={e =>
                              this.onColumnSearchChange(e, "PersonName")
                            }
                            onKeyUp={this.onColumnSearchPressEnter}
                          /> */}
                          {/* <datalist id="idLst">
                            {this.state.autoCompleteIdSuggestion$.map(
                              (item, index) => {
                                return <option key={index} value={item} />;
                              }
                            )}
                          </datalist> */}
                        </th>
                        <th>
                          {/* <input
                            type="text"
                            placeholder="Title Search"
                            name="PersonTitle"
                            id="PersonTitle"
                            defaultValue={this.state.searchByPersonTitle}
                            onChange={e =>
                              this.onColumnSearchChange(e, "PersonTitle")
                            }
                            onKeyUp={this.onColumnSearchPressEnter}
                          /> */}
                          {/* <datalist id="idLst">
                            {this.state.autoCompleteIdSuggestion$.map(
                              (item, index) => {
                                return <option key={index} value={item} />;
                              }
                            )}
                          </datalist> */}
                        </th>
                        <th>
                          {/* <input
                            type="text"
                            placeholder="Operation Search"
                            name="BaseOfOperation"
                            id="BaseOfOperation"
                            defaultValue={this.state.searchByBaseOfOperation}
                            onChange={e =>
                              this.onColumnSearchChange(e, "BaseOfOperation")
                            }
                            onKeyUp={this.onColumnSearchPressEnter}
                          /> */}
                          {/* <datalist id="idLst">
                            {this.state.autoCompleteIdSuggestion$.map(
                              (item, index) => {
                                return <option key={index} value={item} />;
                              }
                            )}
                          </datalist> */}
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {directoryNames.map((item, index) => {
                        return (
                          <tr key={index}>
                            {/* <td>{item.id}</td> */}
                            <td>{item.personName}</td>
                            <td>{item.personTitle}</td>
                            <td>{item.baseOfOperation}</td>
                            <td>
                              {/* <button onClick={e => this.onRowEditClick(item)}>
                                Edit
                              </button> */}
                              {/* <button
                                type="button"
                                className="btn btn-sm btn-outline-info"
                                onClick={e => this.openAddUpdateModal(item)}
                                data-toggle="modal"
                                data-target=".bs-example-modal-center"
                              >
                                <i className="far fa-edit"></i> Edit
                              </button>{" "} */}
                              {/* <button
                                type="button"
                                className="btn btn-sm btn-outline-danger ml-2"
                                onClick={e => this.onRowDeleteClick(item)}
                                data-toggle="modal"
                                data-target=".bs-example-modal-center"
                              >
                                <i className="far fa-trash-alt"></i> Delete
                              </button> */}
                            </td>
                          </tr>
                        )
                      })}
                      {/* 
                      <tr
                        hidden={this.state.modelLst.length > 0 ? true : false}
                      >
                        <td colSpan={100} className="text-center text-info">
                          Data is empty
                        </td>
                      </tr> */}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>

    //Old UI code...
    // <React.Fragment>
    //   <div className="page-content">
    //     <MetaTags>
    //       <title>
    //         Directory Names | Skote - React Admin & Dashboard Template
    //       </title>
    //     </MetaTags>
    //     <Container fluid>
    //       <h3>Directory Names</h3>
    //       {/* {console.log("component on renderer --->", directoryNames)} */}
    //       {/* <Breadcrumbs
    //         title="Directory Names"
    //         breadcrumbItem="DirectoryNames"
    //       /> */}
    //     </Container>
    //   </div>
    // </React.Fragment>
  )
}

export default DirectoryNames
