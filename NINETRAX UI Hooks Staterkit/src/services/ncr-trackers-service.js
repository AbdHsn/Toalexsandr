import http from "./http-handler"
import appSettings from "../app-settings.json"

export const getNCRTrackersView = async postData => {
  return http
    .post(
      appSettings.BASE_URL + "/d/TbNcrtrackers/GetNCRTrackersView",
      postData
    )
    .catch(error => {
      throw error.response.data
    })
}

export const newNCRTrackerAddUpdate = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbNcrtrackers", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const editNCRTrackerAddUpdate = async (id, postData) => {
  return http
    .put(appSettings.BASE_URL + "/d/TbNcrtrackers/" + id, postData)
    .catch(error => {
      throw error.response.data
    })
}

export const deleteNCRTracker = async id => {
  return http
    .delete(appSettings.BASE_URL + "/d/TbNcrtrackers/" + id)
    .catch(error => {
      throw error.response.data
    })
}

export const exportNCRTrackersView = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbNcrtrackers/ExportToExcel", postData, {
      responseType: "blob",
    })
    .catch(error => {
      throw error.response.data
    })
}
