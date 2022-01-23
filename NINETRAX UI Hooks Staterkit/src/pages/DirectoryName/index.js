import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
//redux
import { useSelector, useDispatch } from "react-redux"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
// actions
// import {
//   //getDirectoryNames,
//   getDirectoryNamesView,
// } from "../../store/directory-name/actions"

import {
  getDirectoryNamesView as onGetDirectoryNamesView,
  // addNewCustomer as onAddNewCustomer,
  // updateCustomer as onUpdateCustomer,
  // deleteCustomer as onDeleteCustomer,
} from "store/directory-name/actions"

//import { getDirectoryNamesViewAxios } from "../../helpers/backend_helper"

import { Spinner, Card, CardBody, Col, Container, Row, Table } from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"

const DirectoryNames = props => {
  const dispatch = useDispatch()

  const { directoryNamesTbl } = useSelector(state => ({
    directoryNamesTbl: state.directoryNameData.directoryNamesTbl,
  }))

  const [customerList, setCustomerList] = useState([])
  const [directoryNamesList, setDirectoryNamesList] = useState([])
  const [directoryName, setDirectoryName] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [datatable, setDatatable] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [modelList, setModelList] = useState([])
  // const [modal, setModal] = useState(false)
  // const [isEdit, setIsEdit] = useState(false)

  // // validation
  // const validation = useFormik({
  //   // enableReinitialize : use this flag when initial values needs to be changed
  //   enableReinitialize: true,

  //   initialValues: {
  //     username: (customer && customer.username) || "",
  //     phone: (customer && customer.phone) || "",
  //     email: (customer && customer.email) || "",
  //     address: (customer && customer.address) || "",
  //     rating: (customer && customer.rating) || "",
  //     walletBalance: (customer && customer.walletBalance) || "",
  //     joiningDate: (customer && customer.joiningDate) || "",
  //   },
  //   validationSchema: Yup.object({
  //     username: Yup.string().required("Please Enter Your Name"),
  //     phone: Yup.string().required("Please Enter Your Phone"),
  //     email: Yup.string().required("Please Enter Your Email"),
  //     address: Yup.string().required("Please Enter Your Address"),
  //     rating: Yup.string().required("Please Enter Your Rating"),
  //     walletBalance: Yup.string().required(
  //       "Please Enter Your Wallet Balance"
  //     ),
  //     joiningDate: Yup.string().required("Please Enter Your Joining Date"),
  //   }),
  //   onSubmit: values => {
  //     if (isEdit) {
  //       const updateCustomer = {
  //         id: customer ? customer.id : 0,
  //         username: values.username,
  //         phone: values.phone,
  //         email: values.email,
  //         address: values.address,
  //         rating: values.rating,
  //         walletBalance: values.walletBalance,
  //         joiningDate: values.joiningDate,
  //       }
  //       // update customer
  //       dispatch(onUpdateCustomer(updateCustomer))
  //       validation.resetForm()
  //     } else {
  //       const newCustomer = {
  //         id: Math.floor(Math.random() * (30 - 20)) + 20,
  //         username: values["username"],
  //         phone: values["phone"],
  //         email: values["email"],
  //         address: values["address"],
  //         rating: values["rating"],
  //         walletBalance: values["walletBalance"],
  //         joiningDate: values["joiningDate"],
  //       }
  //       // save new customer
  //       dispatch(onAddNewCustomer(newCustomer))
  //       validation.resetForm()
  //     }
  //     toggle()
  //   },
  // })

  // //pagination customization
  // const pageOptions = {
  //   sizePerPage: 10,
  //   totalSize: customers.length, // replace later with size(orders),
  //   custom: true,
  // }

  // const EcommerceCustomerColumns = [
  //   {
  //     text: "id",
  //     dataField: "id",
  //     sort: true,
  //     hidden: true,
  //     // eslint-disable-next-line react/display-name
  //     formatter: (cellContent, row) => <>{row.id}</>,
  //   },
  //   {
  //     dataField: "username",
  //     text: "Username",
  //     sort: true,
  //   },
  //   {
  //     text: "Phone / Email",
  //     dataField: "phone",
  //     sort: true,
  //     // eslint-disable-next-line react/display-name
  //     formatter: (cellContent, row) => (
  //       <>
  //         <p className="mb-1">{row.phone}</p>
  //         <p className="mb-0">{row.email}</p>
  //       </>
  //     ),
  //   },
  //   {
  //     dataField: "address",
  //     text: "Address",
  //     sort: true,
  //   },
  //   {
  //     dataField: "rating",
  //     text: "Rating",
  //     sort: true,
  //     // eslint-disable-next-line react/display-name
  //     formatter: (cellContent, row) => (
  //       <Badge color="success" className="bg-success font-size-12">
  //         <i className="mdi mdi-star me-1" />
  //         {row.rating}
  //       </Badge>
  //     ),
  //   },
  //   {
  //     dataField: "walletBalance",
  //     text: "Wallet Balances",
  //     sort: true,
  //   },
  //   {
  //     dataField: "joiningDate",
  //     text: "Joining Date",
  //     sort: true,
  //     // eslint-disable-next-line react/display-name
  //     formatter: (cellContent, row) => handleValidDate(row.joiningDate),
  //   },
  //   {
  //     dataField: "menu",
  //     isDummyField: true,
  //     text: "Action",
  //     // eslint-disable-next-line react/display-name
  //     formatter: (cellContent, customer) => (
  //       <UncontrolledDropdown direction="left">
  //         <DropdownToggle href="#" className="card-drop" tag="i">
  //           <i className="mdi mdi-dots-horizontal font-size-18" />
  //         </DropdownToggle>
  //         <DropdownMenu className="dropdown-menu-end">
  //           <DropdownItem
  //             href="#"
  //             onClick={() => handleCustomerClick(customer)}
  //           >
  //             <i className="fas fa-pencil-alt text-success me-1" />
  //             Edit
  //           </DropdownItem>
  //           <DropdownItem href="#" onClick={() => onClickDelete(customer)}>
  //             <i className="fas fa-trash-alt text-danger me-1" />
  //             Delete
  //           </DropdownItem>
  //         </DropdownMenu>
  //       </UncontrolledDropdown>
  //     ),
  //   },
  // ]

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

  // //delete customer
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

  useEffect(() => {
    //if (directoryNamesTbl && !directoryNamesTbl?.data.length) {
    dispatch(
      onGetDirectoryNamesView({
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
    )
  }, [dispatch, directoryNamesTbl])

  // your API's response data will be in events variable.
  console.log("component data --->", directoryNamesTbl)

  useEffect(() => {
    setModelList(directoryNamesTbl)
  }, [directoryNamesTbl])

  useEffect(() => {
    if (!isEmpty(directoryNamesTbl)) {
      setModelList(directoryNamesTbl)
    }
  }, [directoryNamesTbl])

  const handleDelete = id => {
    const newDirectoryNames = directoryNameData.filter(f => f.id !== id)
    setDirectoryNameData(newDirectoryNames)
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
                  <h3>Directory Names</h3>

                  <div>
                    {name}

                    <br></br>
                    <button onClick={() => setName("Abdullah Bin Hasan")}>
                      Change Name
                    </button>
                  </div>

                  {isLoading && (
                    <>
                      <div className="m-auto text-warning">
                        {" "}
                        <Spinner animation="border" size="sm" />
                        Loading...
                      </div>
                    </>
                  )}

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
                      {modelList &&
                        modelList?.data?.map((item, index) => {
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

DirectoryNames.propTypes = {
  //customers: PropTypes.array,
  directoryNamesTbl: PropTypes.object,
  onGetDirectoryNamesView: PropTypes.func,
  //onGetCustomers: PropTypes.func,
  // onAddNewCustomer: PropTypes.func,
  // onDeleteCustomer: PropTypes.func,
  // onUpdateCustomer: PropTypes.func,
}
export default DirectoryNames
