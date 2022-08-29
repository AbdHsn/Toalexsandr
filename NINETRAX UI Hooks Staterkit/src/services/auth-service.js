import http from "./http-handler"
import appSettings from "../app-settings.json"

export const loginRequest = async postData => {
  return http
    .post(appSettings.BASE_URL + "/Auth/LoginRequest", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const saveToken = async data => {
  console.log("token saving..", data)
  localStorage.clear()
  localStorage.setItem("authUser", JSON.stringify(data))
}

export const getToken = async () => {
  let authUser = JSON.parse(localStorage.getItem("authUser"))
  console.log("get authUser..", authUser)
  console.log("get token..", authUser.token)
  return authUser ? authUser.token : null
}

export const extractToken = async () => {
  let getToken = getToken()
  const decoded = jwt_decode(token)
  console.log(decoded)
  return decoded
}

// export const getUser = async () => {
//   let user = localStorage.getItem("token")
//   console.log("get token..", user)
//   return user ?? null
// }

export const userRegistration = async postData => {
  return http
    .post(appSettings.BASE_URL + "/Auth/UserRegistration", postData)
    .catch(error => {
      throw error.response.data
    })
}

export const editUserLoginAddUpdate = async (id, postData) => {
  return http
    .put(appSettings.BASE_URL + "/d/TbUserLogins/" + id, postData)
    .catch(error => {
      throw error.response.data
    })
}

export const deleteUserLogin = async id => {
  return http
    .delete(appSettings.BASE_URL + "/d/TbUserLogins/" + id)
    .catch(error => {
      throw error.response.data
    })
}

export const exportUserLoginView = async postData => {
  return http
    .post(appSettings.BASE_URL + "/d/TbUserLogins/ExportToExcel", postData, {
      responseType: "blob",
    })
    .catch(error => {
      throw error.response.data
    })
}
