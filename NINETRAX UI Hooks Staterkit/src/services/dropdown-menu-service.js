import http from "./http-handler"
import appSettings from "../app-settings.json"

export const fetchTableView = async postData => {
  return http
    .post(
      appSettings.BASE_URL + "/d/TbDropDownMenus/GetDropDownMenusView",
      postData
    )
    .catch(error => {
      console.log("postData error", error.response)
      throw error.response.data
    })
}

export const newDropDownMenuAddUpdate = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbDropDownMenus", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const editDropDownMenuAddUpdate = async (id, postData) => {
  return http
    .put(appSettings.BASE_URL + "/d/TbDropDownMenus/" + id, postData)
    .catch(error => {
      throw error.response.data
    })
}

export const deleteDropDownMenu = async id => {
  return http
    .delete(appSettings.BASE_URL + "/d/TbDropDownMenus/" + id)
    .catch(error => {
      throw error.response.data
    })
}

export const exportTableView = async postData => {
  console.log("export data is fetching...", postData, appSettings.BASE_URL)
  return http
    .post(appSettings.BASE_URL + "/d/TbDropDownMenus/ExportToExcel", postData, {
      responseType: "blob",
    })
    .catch(error => {
      console.log("export postData error", error.response)
      throw error.response.data
    })
}
