import axios from "axios"
import appSettings from "../app-settings.json"

const header = {
  headers: {
    timeout: 30000,
    "Content-Type": "application/json",
    //"Content-Type": "multipart/form-data",
    Accept: "*/*",
    Authorization: `bearer ${
      JSON.parse(localStorage.getItem("authUser"))?.token || ""
    }`,
    "Access-Control-Allow-Origin": appSettings.BASE_URL,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers":
    "origin,X-Requested-With,content-type,accept",
    "Access-Control-Allow-Credentials": "true",
  },
}

export default axios.create({ ...header })
