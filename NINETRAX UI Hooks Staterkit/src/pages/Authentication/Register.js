import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

// action
import { registerUser, apiError } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import { Link, useHistory } from "react-router-dom"

// import images
import profileImg from "../../assets/images/profile-img.png"
import logoImg from "../../assets/images/logo.svg"
import BtnProcessing from "../../components/Common/BtnProcessing"
import { userRegistration } from "../../services/auth-service"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

const Register = props => {
  const dispatch = useDispatch()
  let history = useHistory()
  const [isProcessing, setIsProcessing] = useState(false)

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      //dispatch(registerUser(values))

      const submitModel = {
        loginId: values.username,
        email: values.email,
        password: values.password,
      }

      registration(submitModel)
    },
  })

  const { user, registrationError, loading } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }))

  // handleValidSubmit
  const handleValidSubmit = values => {
    dispatch(registerUser(values))
  }

  useEffect(() => {
    dispatch(apiError(""))
  }, [])

  const registration = formValues => {
    console.log("submit values....", formValues)
    setIsProcessing(true)
    userRegistration(formValues)
      .then(res => {
        console.log("submit model update response: ", res)
        if (res.data.id > 0) {
          localStorage.setItem("authUser", JSON.stringify(res.data))
          history.push("/dashboard")
          toastr.success("Registration Successful.", "NINETRAX")
          setIsProcessing(false)
          validation.resetForm()
        } else {
          setIsProcessing(false)
          toastr.warning("Registration Failed.", "NINETRAX")
        }
      })
      .catch(error => {
        setIsProcessing(false)
        toastr.error(error, "NINETRAX")
      })
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | Skote - React Admin & Dashboard Template</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                        <p>Get your free NINETRAX account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Username</Label>
                        <Input
                          name="username"
                          type="text"
                          placeholder="Enter username"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username &&
                            validation.errors.username
                              ? true
                              : false
                          }
                        />
                        {validation.touched.username &&
                        validation.errors.username ? (
                          <FormFeedback type="invalid">
                            {validation.errors.username}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-4">
                        {/* <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Register
                        </button> */}
                        {isProcessing === true ? (
                          <BtnProcessing isProcessing={isProcessing} />
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-outline-success btn-block"
                          >
                            REGISTRATION
                          </button>
                        )}{" "}
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the NINETRAX{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} NINETRAX. Powered{" "}
                  <i className="mdi mdi-heart text-danger" /> by NINETRAX
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Register
