import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Container } from "reactstrap"
import PropTypes from "prop-types"

import {
  getDirectoryNames as onGetDirectoryNames,
  // addNewCustomer as onAddNewCustomer,
  // updateCustomer as onUpdateCustomer,
  // deleteCustomer as onDeleteCustomer,
} from "store/directory-name/actions"
//redux
import { useSelector, useDispatch } from "react-redux"

const DirectoryNames = props => {
  const dispatch = useDispatch()

  const { directoryNames } = useSelector(state => ({
    directoryNames: state.DirectoryName.directoryNames,
  }))

  // const [directoryNameList, setdirectoryNameList] = useState([])

  useEffect(() => {
    if (directoryNames && !directoryNames.length) {
      console.log("fetch func call -->", directoryNames)

      dispatch(onGetDirectoryNames())
    }
    console.log("fetch func call 2 -->", directoryNames)
  }, [dispatch, directoryNames])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Directory Names | Skote - React Admin & Dashboard Template
          </title>
        </MetaTags>
        <Container fluid>
          {console.log("component on renderer --->", directoryNames)}
          {/* <Breadcrumbs
            title="Directory Names"
            breadcrumbItem="DirectoryNames"
          /> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

DirectoryNames.propTypes = {
  //customers: PropTypes.array,
  onGetDirectoryNames: PropTypes.func,
  // onAddNewCustomer: PropTypes.func,
  // onDeleteCustomer: PropTypes.func,
  // onUpdateCustomer: PropTypes.func,
}

export default DirectoryNames
