import http from "../services/http-handler"
import appSettings from "../app-settings.json"

export const fetchTableView = async postData => {
  console.log("postData", postData, appSettings.BASE_URL)
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

export const fetchViews1 = async postData => {}
