import http from "./http-handler"
import appSettings from "../app-settings.json"

export const getPDRTrackersView = async postData => {
  return http
    .post(
      appSettings.BASE_URL + "/d/ATbPdrtrackers/GetATbPdrtrackersView",
      postData
    )
    .catch(error => {
      throw error.response.data
    })
}

export const exportPDRTrackersView = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/ATbPdrtrackers/ExportToExcel", postData, {
      responseType: "blob",
    })
    .catch(error => {
      throw error.response.data
    })
}
