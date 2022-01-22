import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
const token = accessToken

//apply base url for axios
const API_URL = "http://localhost:5200/api"

const axiosApi = axios.create({
  baseURL: API_URL,
})

// axiosApi.defaults.headers.common["Authorization"] = token

// axiosApi.interceptors.response.use(
//   response => response,
//   error => Promise.reject(error)
// )

export async function get(url, config = {}) {
  console.log("api_helper url, config", url, config)
  return await axiosApi.get(url, { ...config }).then(response => {
    console.log("api_helper response --->", response.data)
    response.data
  })

  // console.log("Plain axios 01 --->", url, axios.get(url))
  // return await axios.get(url).then(response => {
  //   console.log("Plain axios 02--->", response.data)
  //   response.data
  // })
}

export async function post(url, data, config = {}) {
  console.log("api_helper POST url, config", url, data, config)
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => {
      console.log("api_helper response", response.data)
      response.data
    })
    .catch(error => {
      console.log("api_helper POST error", error)
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
