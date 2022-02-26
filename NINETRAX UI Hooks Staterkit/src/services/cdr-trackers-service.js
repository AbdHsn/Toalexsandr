import http from "./http-handler"
import appSettings from "../app-settings.json"

export const getCDRTrackersView = async postData => {
  return http
    .post(
      appSettings.BASE_URL + "/d/TbCdrtrackers/GetCDRTrackersView",
      postData
    )
    .catch(error => {
      throw error.response.data
    })
}

export const exportCDRTrackersView = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbCdrtrackers/ExportToExcel", postData, {
      responseType: "blob",
    })
    .catch(error => {
      throw error.response.data
    })
}
