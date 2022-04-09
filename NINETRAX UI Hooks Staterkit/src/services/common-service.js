import http from "./http-handler"
import appSettings from "../app-settings.json"

export const appTitle = appSettings.APP_TITLE
export const rowSizes = ["10", "30", "50", "100", "All"]
export const reportTypes = ["NASJAX", "BUMED"]

export const dashboardFilteringOptions = [
  { label: "Today", value: 1 },
  { label: "Last Day", value: 2 },
  { label: "Current Week", value: 3 },
  { label: "Last Week", value: 4 },
  { label: "Current Month", value: 5 },
  { label: "Last Month", value: 6 },
  { label: "Current Year", value: 7 },
  { label: "Last Year", value: 8 },
]

export const lstOfSatisfactory = [
  { label: "Satisfactory", value: 10 },
  { label: "Unsatisfactory", value: 41 },
  { label: "Workmanship", value: 21 },
  { label: "Incomplete", value: 51 },
  { label: "Documentation", value: 11 },
  { label: "Timeliness", value: 10 },
  { label: "HouseKeeping", value: 31 },
  { label: "Communication", value: 11 },
]

export const getDDL = async ddlIndicator => {
  return http
    .get(
      appSettings.BASE_URL +
        "/Common/GetDropDownMenuDDL?ddlIndicator=" +
        ddlIndicator
    )
    .catch(error => {
      throw error.response.data
    })
}

export const importFromMaximo = async postData => {
  return http
    .post(
      appSettings.BASE_URL + "/d/ATbNasinspectionsImports/ImportFromMaximo",
      postData
    )
    .catch(error => {
      throw error.response.data
    })
}

export const getSampleExcel = async () => {
  console.log("getSampleExcel service called.")
  return http
    .get(appSettings.BASE_URL + "/d/ATbNasinspectionsImports/GetSampleExcel", {
      responseType: "blob",
    })
    .catch(error => {
      throw error.response.data
    })
}
