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
import directoryNameService from "services/directory-name.service";

class DirectoryNameAddOrUpdate extends Component {
  constructor(props) {
    super(props);

    this.onLengthValidation = this.onLengthValidation.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);

    this.state = {
      id: null,
      personName: "",
      personTitle: "",
      baseOfOperation: "",
      submitted: false,
    };
  }

  // componentDidMount() {
  //   this.loadTableData();
  // }

  onLengthValidation(e) {
    this.setState({
      personName: e.target.value,
    });
  }

  // loadTableData = async e => {
  //   const currentSearchLst = [
  //     {
  //       search_by: "Id",
  //       value: this.state.searchById,
  //     },
  //     {
  //       search_by: "PersonName",
  //       value: this.state.searchByPersonName,
  //     },
  //     {
  //       search_by: "PersonTitle",
  //       value: this.state.searchByPersonTitle,
  //     },
  //     {
  //       search_by: "BaseOfOperation",
  //       value: this.state.searchByBaseOfOperation,
  //     },
  //   ];

  //   const currentOrderLst = [
  //     {
  //       column: this.state?.orders[0]?.column,
  //       order_by: this.state?.orders[0]?.order_by,
  //     },
  //   ];

  //   // let updatedState = this.state;
  //   // updatedState.start = this.state.start;
  //   // updatedState.length = this.state.length;
  //   // updatedState.searches = currentSearchLst;
  //   // updatedState.orders = currentOrderLst;

  //   this.setState(preState => {
  //     preState.start = this.state.start;
  //     preState.length = this.state.length;
  //     preState.searches = currentSearchLst;
  //     preState.orders = currentOrderLst;
  //   });

  //   console.log("Current state: --->", this.state);

  //   await axios
  //     .post(
  //       "https://localhost:44324/api/settings/DirectoryNames/GetDirectoryNames",
  //       this.state
  //     )
  //     .then(response => {
  //       this.setState(preState => {
  //         preState.modelLst = response.data.data;
  //         preState.totalRecords = response.data.recordsTotal;
  //         return preState;
  //       });
  //       //this.render();
  //       // this.setState({
  //       //   modelLst: response.data.data,
  //       //   totalRecords: response.data.recordsTotal,
  //       //   // dataTable: {
  //       //   //   totalRecords: response.data.recordsTotal,
  //       //   // },
  //       // });
  //     })
  //     .catch(error => {
  //       // this.setState(s => {
  //       //   s.modelLstLoading = false;
  //       // });
  //       toastr.error("Failed to fetch data", "MESSAGE");
  //     });
  // };

  onSaveClick() {
    // if (item?.id > 0) {
    //   axios
    //     .put(
    //       "https://localhost:44324/api/settings/DirectoryNames/" + item.id,
    //       item
    //     )
    //     .then(response => {
    //       let updatedItem = this.state.modelLst.find(
    //         f => f.id === response.data.id
    //       );
    //       updatedItem.id = response.data.id;
    //       updatedItem.personName = response.data.personName;
    //       updatedItem.personTitle = response.data.personTitle;
    //       updatedItem.baseOfOperation = response.data.baseOfOperation;

    //       toastr.success("Update succeeded.", "MESSAGE");
    //       this.closeAddUpdateModal();
    //       //this.setState({ modelLst: response.data.data });
    //     })
    //     .catch(error => {
    //       toastr.error("Update failed", "MESSAGE");
    //     });
    // } else {
    //   axios
    //     .post("https://localhost:44324/api/settings/DirectoryNames/", item)
    //     .then(response => {
    //       // if reload needed, push new item into state is not needed.
    //       // this.setState(preState => {
    //       //   preState.modelLst = [response.data, ...preState.modelLst];
    //       // });

    //       toastr.success("New item created.", "MESSAGE");
    //       this.closeAddUpdateModal();
    //       this.loadTableData();
    //     })
    //     .catch(error => {
    //       toastr.error("Create failed", "MESSAGE");
    //     });
    // }

    let data = {
      personName: this.state.personName,
      personTitle: this.state.personTitle,
      baseOfOperation: this.state.baseOfOperation,
    };

    directoryNameService
      .create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          personName: response.data.personName,
          personTitle: response.data.personTitle,
          baseOfOperation: response.data.baseOfOperation,
        });

        console.log("Item saved succeeded.");
      })
      .catch(e => {
        console.log("Catched exception...", e);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Add or Update Directory Names | NINETRAX</title>
          </MetaTags>
          <div className="container-fluid">
            <Breadcrumbs
              title="Add Or Update Directory Namese"
              breadcrumbItem="Add Or Update Directory Names"
            />
          </div>

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4"> Directory Names</CardTitle>

                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      {this.state.modalTitle}
                    </h5>
                  </div>
                  <div className="modal-body">
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        id: (this.state && this.state.id) || 0,
                        personName: (this.state && this.state.personName) || "",
                        personTitle:
                          (this.state && this.state.personTitle) || "",
                        baseOfOperation:
                          (this.state && this.state.baseOfOperation) || "",
                      }}
                      validationSchema={Yup.object().shape({
                        personName: Yup.string().required(
                          "Person name is required"
                        ),
                        personTitle: Yup.string().required("Title is required"),
                        baseOfOperation: Yup.string().required(
                          "Base of operation is required"
                        ),
                      })}
                      onSubmit={this.onSaveClick}
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
                            {/* <button
                                type="reset"
                                className="btn btn-sm btn-outline-danger"
                                onClick={this.closeAddUpdateModal}
                              >
                                <i className="far fa-times-circle"></i> Close
                              </button> */}
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default DirectoryNameAddOrUpdate;
