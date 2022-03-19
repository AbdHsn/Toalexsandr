import http from "./http-handler"
import appSettings from "../app-settings.json"

export const rowSizes = ["10", "30", "50", "100", "All"]

export const getDDL = async ddlIndicator => {
  return http
    .get(
      appSettings.BASE_URL +
        "/Common/GetDropDownMenuDDL?ddlIndicator=" +
        ddlIndicator
    )
    .catch(error => {
      throw error.response.data
    })
}
