import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
const token = accessToken

//apply base url for axios
export const API_URL = undefined

const axiosApi = axios.create({
  baseURL: API_URL,
  // timeout: 1900,
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },
})

// axiosApi.defaults.headers.common["Authorization"] = token

// axiosApi.interceptors.response.use(
//   response => response,
//   error => Promise.reject(error)
// )

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => {
    response.data
  })
}

export async function post(url, data, config = {}) {
  console.log("api_helper --->", url, data, config)
  return await axiosApi.post(url, { ...data }, { ...config }).then(response => {
    console.log("api_helper response", response.data)
    response.data
  })
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
