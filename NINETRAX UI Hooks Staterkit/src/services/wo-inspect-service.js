import http from "../services/http-handler"
import appSettings from "../app-settings.json"

export const fetchTableView = async postData => {
  return http
    .post(
      appSettings.BASE_URL + "/d/ATbNasinspections/GetATbNasinspectionsView",
      postData
    )
    .catch(error => {
      console.log("postData error", error.response)
      throw error.response.data
    })
}

export const newInspectionAddUpdate = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/ATbNasinspections", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const editInspectionAddUpdate = async (id, postData) => {
  return http
    .put(appSettings.BASE_URL + "/d/ATbNasinspections/" + id, postData)
    .catch(error => {
      throw error.response.data
    })
}

export const deleteInspection = async id => {
  return http
    .delete(appSettings.BASE_URL + "/d/ATbNasinspections/" + id)
    .catch(error => {
      throw error.response.data
    })
}

export const exportTableView = async postData => {
  console.log("export data is fetching...", postData, appSettings.BASE_URL)
  return http
    .post(
      appSettings.BASE_URL + "/d/ATbNasinspections/ExportToExcel",
      postData,
      { responseType: "blob" }
    )
    .catch(error => {
      console.log("export postData error", error.response)
      throw error.response.data
    })
}
