import {
  GET_DIRECTORYNAMES,
  GET_DIRECTORYNAMES_FAIL,
  GET_DIRECTORYNAMES_SUCCESS,
  GET_DIRECTORYNAMES_VIEW,
  GET_DIRECTORYNAMES_VIEW_SUCCESS,
  GET_DIRECTORYNAMES_VIEW_FAIL,
  ADD_NEW_DIRECTORYNAME,
  ADD_DIRECTORYNAME_SUCCESS,
  ADD_DIRECTORYNAME_FAIL,
  UPDATE_DIRECTORYNAME,
  UPDATE_DIRECTORYNAME_SUCCESS,
  UPDATE_DIRECTORYNAME_FAIL,
  DELETE_DIRECTORYNAME,
  DELETE_DIRECTORYNAME_SUCCESS,
  DELETE_DIRECTORYNAME_FAIL,
} from "./actionTypes"

export const getDirectoryNamesView = directoryNames => ({
  type: GET_DIRECTORYNAMES_VIEW,
  payload: directoryNames,
})

export const getDirectoryNamesViewSuccess = directoryNames => ({
  type: GET_DIRECTORYNAMES_VIEW_SUCCESS,
  payload: directoryNames,
})

export const getDirectoryNamesViewFail = error => ({
  type: GET_DIRECTORYNAMES_VIEW_FAIL,
  payload: error,
})

export const getDirectoryNames = () => ({
  type: GET_DIRECTORYNAMES,
})

export const getDirectoryNamesSuccess = directoryNames => ({
  type: GET_DIRECTORYNAMES_SUCCESS,
  payload: directoryNames,
})

export const getDirectoryNamesFail = error => ({
  type: GET_DIRECTORYNAMES_FAIL,
  payload: error,
})

export const addNewDirectoryName = directoryName => ({
  type: ADD_NEW_DIRECTORYNAME,
  payload: directoryName,
})

export const addDirectoryNameSuccess = directoryName => ({
  type: ADD_DIRECTORYNAME_SUCCESS,
  payload: directoryName,
})

export const addDirectoryNameFail = error => ({
  type: ADD_DIRECTORYNAME_FAIL,
  payload: error,
})

export const updateDirectoryName = directoryName => ({
  type: UPDATE_DIRECTORYNAME,
  payload: directoryName,
})

export const updateDirectoryNameSuccess = directoryName => ({
  type: UPDATE_DIRECTORYNAME_SUCCESS,
  payload: directoryName,
})

export const updateDirectoryNameFail = error => ({
  type: UPDATE_DIRECTORYNAME_FAIL,
  payload: error,
})

export const deleteDirectoryName = directoryName => ({
  type: DELETE_DIRECTORYNAME,
  payload: directoryName,
})

export const deleteDirectoryNameSuccess = directoryName => ({
  type: DELETE_DIRECTORYNAME_SUCCESS,
  payload: directoryName,
})

export const deleteDirectoryNameFail = error => ({
  type: DELETE_DIRECTORYNAME_FAIL,
  payload: error,
})
