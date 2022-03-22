import http from "./http-handler"
import appSettings from "../app-settings.json"

// export const getDashboardInspectionData = async postData => {
//   return http
//     .post(
//       appSettings.BASE_URL + "/d/TbCcrtrackers/GetCCRTrackersView",
//       postData
//     )
//     .catch(error => {
//       throw error.response.data
//     })
// }

// export const newCCRTrackerAddUpdate = async postData => {
//   return http
//     .post(appSettings.BASE_URL + "/d/TbCcrtrackers", postData)
//     .catch(error => {
//       throw error.response.data
//     })
// }

// export const editCCRTrackerAddUpdate = async (id, postData) => {
//   return http
//     .put(appSettings.BASE_URL + "/d/TbCcrtrackers/" + id, postData)
//     .catch(error => {
//       throw error.response.data
//     })
// }

export const getDashboardInspectionData = async (
  fromDate,
  toDate,
  inspectionResult
) => {
  return http
    .get(
      appSettings.BASE_URL +
        "/Dashboard/GetDashboardInspectionData?fromDate=" +
        fromDate +
        "&toDate=" +
        toDate +
        "&inspectionResult=" +
        inspectionResult
    )
    .catch(error => {
      throw error.response.data
    })
}

// export const exportCCRTrackersView = async postData => {
//   return http
//     .post(appSettings.BASE_URL + "/d/TbCcrtrackers/ExportToExcel", postData, {
//       responseType: "blob",
//     })
//     .catch(error => {
//       throw error.response.data
//     })
// }
