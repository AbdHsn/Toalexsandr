import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import * as url from "../url_helper"
import accessToken from "../jwt-token-access/accessToken"
import { directoryNameData } from "../../common/data"

let users = [
  {
    uid: 1,
    username: "admin",
    role: "admin",
    password: "123456",
    email: "admin@themesbrand.com",
  },
]

const backend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios)

  mock.onGet(url.GET_DIRECTORYNAMES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Directory Name: fakeBackend-->", directoryNameData)

        if (directoryNameData) {
          // Passing fake JSON data as response
          resolve([200, directoryNameData])
        } else {
          reject([400, "Cannot get directory name data"])
        }
      })
    })
  })

  mock.onPost(url.ADD_NEW_DIRECTORYNAME).reply(directoryName => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (directoryName && directoryName.data) {
          // Passing fake JSON data as response
          resolve([200, directoryName.data])
        } else {
          reject([400, "Cannot add directory name"])
        }
      })
    })
  })

  mock.onPut(url.UPDATE_DIRECTORYNAME).reply(directoryName => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (directoryName && directoryName.data) {
          // Passing fake JSON data as response
          resolve([200, directoryName.data])
        } else {
          reject([400, "Cannot update directory name"])
        }
      })
    })
  })

  mock.onDelete(url.DELETE_DIRECTORYNAME).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.directoryName])
        } else {
          reject([400, "Cannot delete directory name"])
        }
      })
    })
  })
}

export default backend
