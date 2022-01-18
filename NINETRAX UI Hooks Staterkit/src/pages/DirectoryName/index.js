import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Container } from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

// actions
import { getDirectoryNames } from "../../store/directory-name/actions"

const DirectoryNames = props => {
  const dispatch = useDispatch()
  const { directoryNames } = useSelector(state => ({
    directoryNames: state.DirectoryName.directoryNames,
  }))

  // /*
  // get data
  // */
  useEffect(() => {
    console.log("UseEffect C:I")
    dispatch(getDirectoryNames())
  }, [dispatch])

  // // your API's response data will be in events variable.
  // console.log("Directory Name ---> ", directoryNames)

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
          {/* {console.log("component on renderer --->", directoryNames)} */}
          {/* <Breadcrumbs
            title="Directory Names"
            breadcrumbItem="DirectoryNames"
          /> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DirectoryNames
