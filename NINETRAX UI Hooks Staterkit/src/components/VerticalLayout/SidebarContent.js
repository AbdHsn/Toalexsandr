import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/dashboard" className="">
                <i className="bx bx-home"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Inspections")} </li>
            <li>
              {/* <Link to="/directory-name-list" className="">
                <i className="bx bx-list-ul"></i>
                <span>{props.t("Directory Names")}</span>
              </Link> */}
            </li>
            <li>
              <Link to="#" className="">
                <i className="bx bx-import"></i>
                <span>{props.t("Import from MAXIMO")}</span>
              </Link>
            </li>
            <li>
              <Link to="/wo-inspect" className="">
                <i className="bx bx-check"></i>
                <span>{props.t("Select Inspections")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="">
                <i className="bx bx-x"></i>
                <span>{props.t("Close Inspections")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="">
                <i className="bx bx-edit"></i>
                <span>{props.t("Add/Modify Inspections")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="">
                <i className="bx bxs-report"></i>
                <span>{props.t("NASJAX Daily Report")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="">
                <i className="bx bxs-report"></i>
                <span>{props.t("BUMED Daily Report")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="">
                <i className="bx bx-reset"></i>
                <span>{props.t("Randomizer")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Quality Trackers")} </li>
            <li>
              <Link to="/idiq-trackers" className="">
                <i className="bx bx-import"></i>
                <span>{props.t("IDIQ Indefinite Deliv. indefinite Qty")}</span>
              </Link>
            </li>
            <li>
              <Link to="/pdr-trackers" className="">
                <i className="bx bx-check"></i>
                <span>{props.t("PDR Performance Deficiency Report")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="">
                <i className="bx bx-x"></i>
                <span>{props.t("PAW Performance Assmnt. Worksheet")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="">
                <i className="bx bx-edit"></i>
                <span>{props.t("CCR Customer Comments Report")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="">
                <i className="bx bxs-report"></i>
                <span>{props.t("NCR Non-Compliance Report")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="">
                <i className="bx bxs-report"></i>
                <span>{props.t("CDR Contract Deficiency Report")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Datasheet View")} </li>
            <li>
              <Link to="#" className="">
                <i className="bx bx-search-alt"></i>
                <span>{props.t("Inspections")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="">
                <i className="bx bx-news"></i>
                <span>{props.t("PDR")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="">
                <i className="bx bx-notepad"></i>
                <span>{props.t("IDIQ")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="">
                <i className="bx bxs-report"></i>
                <span>{props.t("Statistics")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Configurations")} </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-wrench"></i>
                <span>{props.t("Settings")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/email-inbox">{props.t("setting 01")}</Link>
                </li>
                <li>
                  <Link to="/email-inbox">{props.t("setting 02")}</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
