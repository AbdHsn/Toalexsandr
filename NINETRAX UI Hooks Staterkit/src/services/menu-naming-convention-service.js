import http from "./http-handler"
import appSettings from "../app-settings.json"

export const getMenuNamingConventionView = async postData => {
  return http
    .post(
      appSettings.BASE_URL +
        "/d/TbMenuNamingConventions/GetTbMenuNamingConventionsView",
      postData
    )
    .catch(error => {
      throw error.response.data
    })
}

export const newMenuNamingConventionAddUpdate = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbMenuNamingConventions", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const editMenuNamingConventionAddUpdate = async (id, postData) => {
  return http
    .put(appSettings.BASE_URL + "/d/TbMenuNamingConventions/" + id, postData)
    .catch(error => {
      throw error.response.data
    })
}

export const deleteMenuNamingConvention = async id => {
  return http
    .delete(appSettings.BASE_URL + "/d/TbMenuNamingConventions/" + id)
    .catch(error => {
      throw error.response.data
    })
}

export const exportMenuNamingConventionView = async postData => {
  return http
    .post(
      appSettings.BASE_URL + "/d/TbMenuNamingConventions/ExportToExcel",
      postData,
      {
        responseType: "blob",
      }
    )
    .catch(error => {
      throw error.response.data
    })
}
