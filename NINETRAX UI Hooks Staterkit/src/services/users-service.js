import http from "./http-handler"
import appSettings from "../app-settings.json"

export const getUsersView = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbUsers/GetTbUsersView", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const newUserAddUpdate = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbUsers", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const editUserAddUpdate = async (id, postData) => {
  return http
    .put(appSettings.BASE_URL + "/d/TbUsers/" + id, postData)
    .catch(error => {
      throw error.response.data
    })
}

export const deleteUser = async id => {
  return http.delete(appSettings.BASE_URL + "/d/TbUsers/" + id).catch(error => {
    throw error.response.data
  })
}

export const exportUsersView = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbUsers/ExportToExcel", postData, {
      responseType: "blob",
    })
    .catch(error => {
      throw error.response.data
    })
}
