import axios from "axios"
import { envConfigurations } from "../App"

const header = {
  headers: {
    timeout: 30000,
    "Content-Type": "application/json",
    //"Content-Type": "multipart/form-data",
    Accept: "*/*",
    // Authorization:
    //   "Bearer " + JSON.parse(sessionStorage.getItem("token")).token,
    // "Access-Control-Allow-Origin": envConfigurations.baseUrl,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers":
      "origin,X-Requested-With,content-type,accept",
    "Access-Control-Allow-Credentials": "true",
  },
}

export default axios.create({ ...header })
