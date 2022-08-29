import axios from "axios"
import appSettings from "../app-settings.json"
import { getToken } from "../services/auth-service"

const authHeader = {
  headers: {
    timeout: 30000,
    "Content-Type": "application/json",
    Accept: "*/*",
    Authorization: `bearer ${
      localStorage.getItem("authUser")
        ? JSON.parse(localStorage.getItem("authUser")).token
        : ""
    }`,
    "Access-Control-Allow-Origin": appSettings.BASE_URL,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers":
      "origin,X-Requested-With,content-type,accept",
    "Access-Control-Allow-Credentials": "true",
  },
}

export default axios.create({ ...authHeader })
