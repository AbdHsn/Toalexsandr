import React, { Component } from "react";
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
} from "reactstrap";
import MetaTags from "react-meta-tags"; // Added Meta Tag npm Package
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import ReactPaginate from "react-paginate";
// import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css"; // import css

import "toastr/build/toastr.min.css";
import toastr from "toastr";
import Swal from "sweetalert2";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

class DirectoryNameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddUpdateModalOpened: false,
      modalTitle: "",

      deleteConfirmation: false,

      modelLstLoading: false,
      modelLst: [],
      model: { id: 0, personName: "", personTitle: "", baseOfOperation: "" },

      rowSizeDdl: ["10", "30", "50", "100", "All"],
      // dataTable: {
      //   start: 0,
      //   length: "10",
      //   totalRecords: 0,
      //   columns: [],
      //   searches: [],
      //   orders: [
      //     {
      //       column: "Id",
      //       order_by: "DESC",
      //     },
      //   ],
      // },
      //Datatable properties
      start: 0,
      length: "10",
      totalRecords: 0,
      columns: [],
      searches: [],
      orders: [
        {
          column: "Id",
          order_by: "DESC",
        },
      ],

      //ColumnSearch Properties
      // searchById: undefined,
      // searchByPersonName: undefined,
      // searchByPersonTitle: undefined,
      // searchByBaseOfOperation: undefined,

      searchById: undefined,
      searchByPersonName: undefined,
      searchByPersonTitle: undefined,
      searchByBaseOfOperation: undefined,
    };

    this.openAddUpdateModal = this.openAddUpdateModal.bind(this);
    this.onRowDeleteClick = this.onRowDeleteClick.bind(this);
  }

  componentDidMount() {
    this.loadTableData();
  }

  loadTableData = async e => {
    const currentSearchLst = [
      {
        search_by: "Id",
        value: this.state.searchById,
      },
      {
        search_by: "PersonName",
        value: this.state.searchByPersonName,
      },
      {
        search_by: "PersonTitle",
        value: this.state.searchByPersonTitle,
      },
      {
        search_by: "BaseOfOperation",
        value: this.state.searchByBaseOfOperation,
      },
    ];

    const currentOrderLst = [
      {
        column: this.state?.orders[0]?.column,
        order_by: this.state?.orders[0]?.order_by,
      },
    ];

    // let updatedState = this.state;
    // updatedState.start = this.state.start;
    // updatedState.length = this.state.length;
    // updatedState.searches = currentSearchLst;
    // updatedState.orders = currentOrderLst;

    this.setState(preState => {
      preState.start = this.state.start;
      preState.length = this.state.length;
      preState.searches = currentSearchLst;
      preState.orders = currentOrderLst;
    });

    console.log("Current state: --->", this.state);

    await axios
      .post(
        "https://localhost:44324/api/settings/DirectoryNames/GetDirectoryNames",
        this.state
      )
      .then(response => {
        this.setState(preState => {
          preState.modelLst = response.data.data;
          preState.totalRecords = response.data.recordsTotal;
          return preState;
        });
        //this.render();
        // this.setState({
        //   modelLst: response.data.data,
        //   totalRecords: response.data.recordsTotal,
        //   // dataTable: {
        //   //   totalRecords: response.data.recordsTotal,
        //   // },
        // });
      })
      .catch(error => {
        // this.setState(s => {
        //   s.modelLstLoading = false;
        // });
        toastr.error("Failed to fetch data", "MESSAGE");
      });
  };

  onSizePerPageChange = e => {
    // this.setState(preState => {
    //   preState.start = 0;
    //   preState.length = e;
    //   //this.loadTableData();
    // });
    this.setState(preState => ({
      start: 0,
      length: e,
    }));
  };

  onColumnSearchChange = (e, columnName) => {
    console.log("change data----> ", e, columnName, this.state);
    switch (columnName) {
      case "Id": {
        this.setState(preState => {
          preState.searchById = e.target.value;
        });
        break;
      }
      case "PersonName": {
        this.setState(preState => {
          preState.searchByPersonName = e.target.value;
        });
        break;
      }
      case "PersonTitle": {
        this.setState(preState => {
          preState.searchByPersonTitle = e.target.value;
        });
        break;
      }
      case "BaseOfOperation": {
        this.setState(preState => {
          preState.searchByBaseOfOperation = e.target.value;
        });
        break;
      }
      default: {
        break;
      }
    }
    console.log("change event after", e, columnName, this.state);
  };

  onColumnSearchPressEnter = e => {
    if (e.key === "Enter") {
      console.log("key press event", e);
      this.loadTableData();
    }
  };

  onRowEditClick = item => {
    console.log("Edit Item ----> ", item);
  };

  openAddUpdateModal = item => {
    if (item?.id) {
      this.setState(preState => {
        preState.model = item;
        preState.isAddUpdateModalOpened = true;
        preState.modalTitle = "Update Directory Name";
      });
    } else {
      this.setState(preState => {
        preState.isAddUpdateModalOpened = true;
        preState.modalTitle = "Add New Directory Name";
      });
    }
    this.setState({ visible: true });
  };

  closeAddUpdateModal = e => {
    this.setState(preState => {
      preState.model = {};
      preState.isAddUpdateModalOpened = false;
    });
    this.setState({ visible: false });
  };

  onRowDeleteClick = item => {
    console.log("onRowDeleteClicked: ", item);
    if (item?.id) {
      Swal.fire({
        title: `Are you sure to delete ${item.personName}?`,
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then(result => {
        if (result.isConfirmed) {
          axios
            .delete(
              "https://localhost:44324/api/settings/DirectoryNames/" + item.id
            )
            .then(response => {
              if (response.data) {
                toastr.success("Delete succeeded", "MESSAGE");
                this.loadTableData();
                Swal.close();
              }
            })
            .catch(error => {
              toastr.error("Delete failed", "MESSAGE");
              Swal.close();
            });
        }

        // if (result.isConfirmed) {
        //   Swal.fire("Deleted!", "Your file has been deleted.", "success");
        // }
      });
    }
  };

  onSaveClick = item => {
    if (item?.id > 0) {
      axios
        .put(
          "https://localhost:44324/api/settings/DirectoryNames/" + item.id,
          item
        )
        .then(response => {
          let updatedItem = this.state.modelLst.find(
            f => f.id === response.data.id
          );
          updatedItem.id = response.data.id;
          updatedItem.personName = response.data.personName;
          updatedItem.personTitle = response.data.personTitle;
          updatedItem.baseOfOperation = response.data.baseOfOperation;

          toastr.success("Update succeeded.", "MESSAGE");
          this.closeAddUpdateModal();
          //this.setState({ modelLst: response.data.data });
        })
        .catch(error => {
          toastr.error("Update failed", "MESSAGE");
        });
    } else {
      axios
        .post("https://localhost:44324/api/settings/DirectoryNames/", item)
        .then(response => {
          // if reload needed, push new item into state is not needed.
          // this.setState(preState => {
          //   preState.modelLst = [response.data, ...preState.modelLst];
          // });

          toastr.success("New item created.", "MESSAGE");
          this.closeAddUpdateModal();
          this.loadTableData();
        })
        .catch(error => {
          toastr.error("Create failed", "MESSAGE");
        });
    }
  };

  onPageItemClick = pageSelected => {
    this.setState(preState => {
      preState.start = pageSelected.selected * +this.state.length;
      this.loadTableData();
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Directory Names | NINETRAX</title>
          </MetaTags>
          <div className="container-fluid">
            <Breadcrumbs
              title=" Directory Namese"
              breadcrumbItem=" Directory Names"
            />
          </div>

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4"> Directory Names</CardTitle>

                  <div className="d-flex flex-wrap">
                    <div className="btn-group btn-sm mb-2">
                      <ButtonDropdown
                        isOpen={this.state.drp_primary1}
                        toggle={() =>
                          this.setState({
                            drp_primary1: !this.state.drp_primary1,
                          })
                        }
                      >
                        <Button id="caret" color="primary" disabled>
                          Row Size: {this.state.length}
                        </Button>
                        <DropdownToggle caret color="primary"></DropdownToggle>
                        <DropdownMenu>
                          {this.state.rowSizeDdl.map((item, index) => {
                            return (
                              <DropdownItem
                                key={index}
                                onClick={e => this.onSizePerPageChange(item)}
                              >
                                {item}
                              </DropdownItem>
                            );
                          })}
                        </DropdownMenu>
                      </ButtonDropdown>

                      <button
                        type="button"
                        className="btn btn-outline-success ml-2"
                        onClick={() => this.openAddUpdateModal(undefined)}
                        data-toggle="modal"
                        data-target=".bs-example-modal-center"
                      >
                        <i className="far fa-plus-square"></i> New Directory
                      </button>
                    </div>
                  </div>

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
                          <input
                            type="text"
                            placeholder="Name Search"
                            name="PersonName"
                            id="PersonName"
                            defaultValue={this.searchByPersonName}
                            onChange={e =>
                              this.onColumnSearchChange(e, "PersonName")
                            }
                            onKeyUp={this.onColumnSearchPressEnter}
                          />
                          {/* <datalist id="idLst">
                            {this.state.autoCompleteIdSuggestion$.map(
                              (item, index) => {
                                return <option key={index} value={item} />;
                              }
                            )}
                          </datalist> */}
                        </th>
                        <th>
                          <input
                            type="text"
                            placeholder="Title Search"
                            name="PersonTitle"
                            id="PersonTitle"
                            defaultValue={this.state.searchByPersonTitle}
                            onChange={e =>
                              this.onColumnSearchChange(e, "PersonTitle")
                            }
                            onKeyUp={this.onColumnSearchPressEnter}
                          />
                          {/* <datalist id="idLst">
                            {this.state.autoCompleteIdSuggestion$.map(
                              (item, index) => {
                                return <option key={index} value={item} />;
                              }
                            )}
                          </datalist> */}
                        </th>
                        <th>
                          <input
                            type="text"
                            placeholder="Operation Search"
                            name="BaseOfOperation"
                            id="BaseOfOperation"
                            defaultValue={this.state.searchByBaseOfOperation}
                            onChange={e =>
                              this.onColumnSearchChange(e, "BaseOfOperation")
                            }
                            onKeyUp={this.onColumnSearchPressEnter}
                          />
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
                      {this.state.modelLst.map((item, index) => {
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
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-info"
                                onClick={e => this.openAddUpdateModal(item)}
                                data-toggle="modal"
                                data-target=".bs-example-modal-center"
                              >
                                <i className="far fa-edit"></i> Edit
                              </button>{" "}
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger ml-2"
                                onClick={e => this.onRowDeleteClick(item)}
                                data-toggle="modal"
                                data-target=".bs-example-modal-center"
                              >
                                <i className="far fa-trash-alt"></i> Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}

                      <tr
                        hidden={this.state.modelLst.length > 0 ? true : false}
                      >
                        <td colSpan={100} className="text-center text-info">
                          Data is empty
                        </td>
                      </tr>
                    </tbody>
                  </Table>

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
                      pageCount={this.state.totalRecords / +this.state.length}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={this.onPageItemClick}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      activeClassName={"active"}
                    />
                  </div>

                  <Modal
                    isOpen={this.state.isAddUpdateModalOpened}
                    toggle={this.openAddUpdateModal}
                    scrollable={true}
                    backdrop={"static"}
                    centered={true}
                    id="staticBackdrop"
                  >
                    <div className="modal-header">
                      <h5 className="modal-title" id="staticBackdropLabel">
                        {this.state.modalTitle}
                      </h5>
                    </div>
                    <div className="modal-body">
                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          id: (this.state && this.state.model.id) || 0,
                          personName:
                            (this.state && this.state.model.personName) || "",
                          personTitle:
                            (this.state && this.state.model.personTitle) || "",
                          baseOfOperation:
                            (this.state && this.state.model.baseOfOperation) ||
                            "",
                        }}
                        validationSchema={Yup.object().shape({
                          personName: Yup.string().required(
                            "Person name is required"
                          ),
                          personTitle:
                            Yup.string().required("Title is required"),
                          baseOfOperation: Yup.string().required(
                            "Base of operation is required"
                          ),
                        })}
                        onSubmit={values => this.onSaveClick(values)}
                      >
                        {({ errors, status, touched }) => (
                          <Form className="needs-validation">
                            <div className="mb-3">
                              <Label className="form-label">Persone Name</Label>
                              <Field
                                name="personName"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.personName && touched.personName
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="personName"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Title</Label>
                              <Field
                                name="personTitle"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.personTitle && touched.personTitle
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="personTitle"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">
                                Base of Operation
                              </Label>
                              <Field
                                name="baseOfOperation"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.baseOfOperation &&
                                  touched.baseOfOperation
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="baseOfOperation"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>

                            <div className="d-flex flex-wrap gap-2">
                              <button
                                type="submit"
                                className="btn btn-sm btn-outline-success"
                              >
                                <i className="far fa-save"></i> Save
                              </button>
                              <button
                                type="reset"
                                className="btn btn-sm btn-outline-danger"
                                onClick={this.closeAddUpdateModal}
                              >
                                <i className="far fa-times-circle"></i> Close
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default DirectoryNameList;
