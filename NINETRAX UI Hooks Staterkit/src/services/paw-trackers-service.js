import http from "./http-handler"
import appSettings from "../app-settings.json"

export const getPAWTrackersView = async postData => {
  return http
    .post(
      appSettings.BASE_URL + "/d/TbPawtrackers/GetPAWTrackersView",
      postData
    )
    .catch(error => {
      throw error.response.data
    })
}

export const newPAWTrackerAddUpdate = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbPawtrackers", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const editPAWTrackerAddUpdate = async (id, postData) => {
  return http
    .put(appSettings.BASE_URL + "/d/TbPawtrackers/" + id, postData)
    .catch(error => {
      throw error.response.data
    })
}

export const deletePAWTracker = async id => {
  return http
    .delete(appSettings.BASE_URL + "/d/TbPawtrackers/" + id)
    .catch(error => {
      throw error.response.data
    })
}

export const exportPAWTrackersView = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbPawtrackers/ExportToExcel", postData, {
      responseType: "blob",
    })
    .catch(error => {
      throw error.response.data
    })
}
