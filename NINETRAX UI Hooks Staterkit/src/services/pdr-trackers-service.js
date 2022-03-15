import http from "./http-handler"
import appSettings from "../app-settings.json"

export const getPDRTrackersView = async postData => {
  return http
    .post(
      appSettings.BASE_URL + "/d/ATbPdrtrackers/GetPDRTrackersView",
      postData
    )
    .catch(error => {
      throw error.response.data
    })
}

export const newPDRTrackerAddUpdate = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/ATbPdrtrackers", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const editPDRTrackerAddUpdate = async (id, postData) => {
  return http
    .put(appSettings.BASE_URL + "/d/ATbPdrtrackers/" + id, postData)
    .catch(error => {
      throw error.response.data
    })
}

export const deletePDRTracker = async id => {
  return http
    .delete(appSettings.BASE_URL + "/d/ATbPdrtrackers/" + id)
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
