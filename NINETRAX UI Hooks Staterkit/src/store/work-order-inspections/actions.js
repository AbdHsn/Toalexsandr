import * as actionType from "./actionTypes"

export const getWorkOrderInspectionsView = workOrderInspections => ({
  type: actionType.GET_WORKORDER_INSPECTIONS_VIEW,
  payload: workOrderInspections,
})

export const getWorkOrderInspectionsViewSuccess = workOrderInspections => ({
  type: actionType.GET_WORKORDER_INSPECTIONS_VIEW_SUCCESS,
  payload: workOrderInspections,
})

export const getWorkOrderInspectionsViewFail = error => ({
  type: actionType.GET_WORKORDER_INSPECTIONS_VIEW_FAIL,
  payload: error,
})

// export const getWorkOrderInspections = () => ({
//   type: GET_DIRECTORYNAMES,
// })

// export const getWorkOrderInspectionsSuccess = workOrderInspections => ({
//   type: GET_DIRECTORYNAMES_SUCCESS,
//   payload: workOrderInspections,
// })

// export const getWorkOrderInspectionsFail = error => ({
//   type: GET_DIRECTORYNAMES_FAIL,
//   payload: error,
// })

// export const addNewDirectoryName = directoryName => ({
//   type: ADD_NEW_DIRECTORYNAME,
//   payload: directoryName,
// })

// export const addDirectoryNameSuccess = directoryName => ({
//   type: ADD_DIRECTORYNAME_SUCCESS,
//   payload: directoryName,
// })

// export const addDirectoryNameFail = error => ({
//   type: ADD_DIRECTORYNAME_FAIL,
//   payload: error,
// })

// export const updateDirectoryName = directoryName => ({
//   type: UPDATE_DIRECTORYNAME,
//   payload: directoryName,
// })

// export const updateDirectoryNameSuccess = directoryName => ({
//   type: UPDATE_DIRECTORYNAME_SUCCESS,
//   payload: directoryName,
// })

// export const updateDirectoryNameFail = error => ({
//   type: UPDATE_DIRECTORYNAME_FAIL,
//   payload: error,
// })

// export const deleteDirectoryName = directoryName => ({
//   type: DELETE_DIRECTORYNAME,
//   payload: directoryName,
// })

// export const deleteDirectoryNameSuccess = directoryName => ({
//   type: DELETE_DIRECTORYNAME_SUCCESS,
//   payload: directoryName,
// })

// export const deleteDirectoryNameFail = error => ({
//   type: DELETE_DIRECTORYNAME_FAIL,
//   payload: error,
// })
