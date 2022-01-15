// import React, { Component } from "react"
// import MetaTags from 'react-meta-tags';
// import {
//   Container,
// } from "reactstrap"

// class Dashboard extends Component {
//   render() {
//     return (
//       <React.Fragment>
//         <div className="page-content">
//           <MetaTags>
//             <title>Dashboard | Skote - React Admin & Dashboard Template</title>
//           </MetaTags>
//           <Container fluid>
//             <h4>Dashboard</h4>
//           </Container>
//         </div>
//       </React.Fragment>
//     )
//   }
// }

// export default Dashboard;
///////functional base....
import React from "react"
import MetaTags from "react-meta-tags"
import { Container } from "reactstrap"
import PropTypes from "prop-types"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const Dashboard = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          dashboard
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          /> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  // chartsData: PropTypes.any,
  // onGetChartsData: PropTypes.func,
}

export default Dashboard
