import http from "./http-handler"
import appSettings from "../app-settings.json"

export const getCCRTrackersView = async postData => {
  return http
    .post(
      appSettings.BASE_URL + "/d/TbCcrtrackers/GetCCRTrackersView",
      postData
    )
    .catch(error => {
      throw error.response.data
    })
}

export const exportCCRTrackersView = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbCcrtrackers/ExportToExcel", postData, {
      responseType: "blob",
    })
    .catch(error => {
      throw error.response.data
    })
}
