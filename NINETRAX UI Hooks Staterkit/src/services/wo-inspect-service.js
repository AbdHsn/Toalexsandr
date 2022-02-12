import http from "../services/http-handler"
import { envConfigurations } from "../App"

export const fetchTableView = async postData => {
  console.log("postData", postData, envConfigurations.baseUrl)
  return http
    .post(
      "http://localhost:7074/api/d/ATbNasinspections/GetATbNasinspectionsView",
      postData
    )
    .catch(error => {
      console.log("postData error", error)
    })
}

export const fetchViews1 = async postData => {}
