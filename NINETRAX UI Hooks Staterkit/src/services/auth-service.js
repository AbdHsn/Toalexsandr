import http from "./http-handler"
import appSettings from "../app-settings.json"

export const loginRequest = async postData => {
  return http
    .post(appSettings.BASE_URL + "/Auth/LoginRequest", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const userRegistration = async postData => {
  return http
    .post(appSettings.BASE_URL + "/Auth/UserRegistration", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const editUserLoginAddUpdate = async (id, postData) => {
  return http
    .put(appSettings.BASE_URL + "/d/TbUserLogins/" + id, postData)
    .catch(error => {
      throw error.response.data
    })
}

export const deleteUserLogin = async id => {
  return http
    .delete(appSettings.BASE_URL + "/d/TbUserLogins/" + id)
    .catch(error => {
      throw error.response.data
    })
}

export const exportUserLoginView = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbUserLogins/ExportToExcel", postData, {
      responseType: "blob",
    })
    .catch(error => {
      throw error.response.data
    })
}
