import * as actionType from "./actionTypes"

export const importFromMaximo = obj => ({
  type: actionType.IMPORT_FROM_MAXIMO,
  payload: obj,
})

export const importFromMaximoSuccess = obj => ({
  type: actionType.IMPORT_FROM_MAXIMO_SUCCESS,
  payload: obj,
})

export const importFromMaximoFail = error => ({
  type: actionType.IMPORT_FROM_MAXIMO_FAIL,
  payload: error,
})
