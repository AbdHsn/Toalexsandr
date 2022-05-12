import http from "./http-handler"
import appSettings from "../app-settings.json"

export const getDirectoryNamesView = async postData => {
  return http
    .post(
      appSettings.BASE_URL + "/d/TbDirectoryNames/GetTbDirectoryNamesView",
      postData
    )
    .catch(error => {
      throw error.response.data
    })
}

export const newPDRTrackerAddUpdate = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbDirectoryNames", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const editPDRTrackerAddUpdate = async (id, postData) => {
  return http
    .put(appSettings.BASE_URL + "/d/TbDirectoryNames/" + id, postData)
    .catch(error => {
      throw error.response.data
    })
}

export const deletePDRTracker = async id => {
  return http
    .delete(appSettings.BASE_URL + "/d/TbDirectoryNames/" + id)
    .catch(error => {
      throw error.response.data
    })
}

export const exportDirectoryNamesView = async postData => {
  return http
    .post(
      appSettings.BASE_URL + "/d/TbDirectoryNames/ExportToExcel",
      postData,
      {
        responseType: "blob",
      }
    )
    .catch(error => {
      throw error.response.data
    })
}
