import {
  ADD_NEW_IMPORT_FROM_MAXIMO,
  ADD_IMPORT_FROM_MAXIMO_SUCCESS,
  ADD_IMPORT_FROM_MAXIMO_FAIL,
} from "./actionTypes"

export const addNewImportFromMaximo = obj => ({
  type: ADD_NEW_IMPORT_FROM_MAXIMO,
  payload: obj,
})

export const addImportFromMaximoSuccess = obj => ({
  type: ADD_IMPORT_FROM_MAXIMO_SUCCESS,
  payload: obj,
})

export const addImportFromMaximoFail = error => ({
  type: ADD_IMPORT_FROM_MAXIMO_FAIL,
  payload: error,
})
