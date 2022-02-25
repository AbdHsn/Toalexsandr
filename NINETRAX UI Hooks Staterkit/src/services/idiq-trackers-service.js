import http from "./http-handler"
import appSettings from "../app-settings.json"

export const getIDIQTrackersView = async postData => {
  return http
    .post(
      appSettings.BASE_URL + "/d/TbIdiqtrackers/GetTbIdiqtrackersView",
      postData
    )
    .catch(error => {
      throw error.response.data
    })
}

export const exportIDIQTrackersView = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbIdiqtrackers/ExportToExcel", postData, {
      responseType: "blob",
    })
    .catch(error => {
      throw error.response.data
    })
}
