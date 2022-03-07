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

export const newNCRTracker = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbNcrtrackers", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const editNCRTracker = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbNcrtrackers", postData)
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
