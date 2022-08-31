import axios from "axios"
import appSettings from "../app-settings.json"

const axiosInstance = axios.create({
  baseURL: appSettings.BASE_URL,
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("authUser")
      ? JSON.parse(localStorage.getItem("authUser")).token
      : ""
    const auth = token ? `Bearer ${token}` : ""
    config.headers.common["Authorization"] = auth
    return config
  },
  error => Promise.reject(error)
)

export default axiosInstance
