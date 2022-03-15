import http from "./http-handler"
import appSettings from "../app-settings.json"

export const getIDIQTrackersView = async postData => {
  return http
    .post(
      appSettings.BASE_URL + "/d/TbIdiqtrackers/GetIDIQTrackersView",
      postData
    )
    .catch(error => {
      throw error.response.data
    })
}

export const newIDIQTrackerAddUpdate = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbIdiqtrackers", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const editIDIQTrackerAddUpdate = async (id, postData) => {
  return http
    .put(appSettings.BASE_URL + "/d/TbIdiqtrackers/" + id, postData)
    .catch(error => {
      throw error.response.data
    })
}

export const deleteIDIQTracker = async id => {
  return http
    .delete(appSettings.BASE_URL + "/d/TbIdiqtrackers/" + id)
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
