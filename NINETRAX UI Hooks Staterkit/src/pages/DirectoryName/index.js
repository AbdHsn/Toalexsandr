import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Container } from "reactstrap"

class DirectoryNames extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>
              Directory Name | NINETRAX - React Admin & Dashboard Template
            </title>
          </MetaTags>
          <Container fluid>
            <h4>NINETRAX- Directory Name working...</h4>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default DirectoryNames
