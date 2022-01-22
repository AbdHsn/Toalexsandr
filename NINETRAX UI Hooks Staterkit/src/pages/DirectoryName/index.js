import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
//redux
import { useSelector, useDispatch } from "react-redux"
import { isEmpty } from "lodash"
// actions
import {
  //getDirectoryNames,
  getDirectoryNamesView,
} from "../../store/directory-name/actions"

import { Spinner, Card, CardBody, Col, Container, Row, Table } from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"

const DirectoryNames = props => {
  const [directoryNameData, setDirectoryNameData] = useState([
    {
      id: 67,
      personName: "Sean Spicer",
      personTitle: "Finance Manager",
      baseOfOperation: "JACNAS",
    },
    {
      id: 66,
      personName: "Randal Dane",
      personTitle: "BUMED Manager",
      baseOfOperation: "JACNAS",
    },
    {
      id: 65,
      personName: "Donald Kirk",
      personTitle: "Deputy Program Manager",
      baseOfOperation: "JACNAS",
    },
    {
      id: 64,
      personName: "Hosea Banks",
      personTitle: "FRC Supervisor",
      baseOfOperation: "JACNAS",
    },
    {
      id: 63,
      personName: "Cliff Partin",
      personTitle: "Facilities Manager",
      baseOfOperation: "JACNAS",
    },
    {
      id: 62,
      personName: "Sam Long",
      personTitle: "BSVE Manager",
      baseOfOperation: "JACNAS",
    },
    {
      id: 61,
      personName: "Wendell Hyde",
      personTitle: "IDIQ Supervisor",
      baseOfOperation: "JACNAS",
    },
    {
      id: 59,
      personName: "Derek Luis",
      personTitle: "Schindler Manager",
      baseOfOperation: "JACNAS",
    },
    {
      id: 56,
      personName: "Chuck Turner",
      personTitle: "Aegis Manager",
      baseOfOperation: "JACNAS",
    },
  ])

  const [isLoading, setIsLoading] = useState(true)

  const [name, setName] = useState("Abdullah")

  useEffect(() => {
    console.log("Use Effect run")
  }, [name])

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
              </tr>
            </thead>
            <tbody>
              {directoryNameData.map((item, index) => {
                return (
                  <tr key={index}>
                    {/* <td>{item.id}</td> */}
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
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DirectoryNames
