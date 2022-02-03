import { all, call, put, takeEvery, fork } from "redux-saga/effects"

import * as actionType from "./actionTypes"
import * as action from "./actions"

import * as httpMethod from "../../helpers/backend_helper"
import * as url from "../../helpers/url_helper"

function* workOrderInspectionApi({ payload: data }) {
  try {
    let response = yield call(
      httpMethod.postMethod,
      "/d/ATbNasinspections/GetATbNasinspectionsView",
      data
    )
    console.log("Saga wo success---> ", response)
    yield put(action.getWorkOrderInspectionsViewSuccess(response))
  } catch (error) {
    console.log("Saga wo failed---> ", error.data)
    yield put(action.getWorkOrderInspectionsViewFail(error.data))
  }
}

// function* onAddNewDirectoryName({ payload: directoryName }) {
//   try {
//     const response = yield call(
//       postMethod,
//       url.ADD_NEW_DIRECTORYNAME,
//       directoryName
//     )
//     yield put(addDirectoryNameSuccess(response))
//   } catch (error) {
//     yield put(addDirectoryNameFail(error.data))
//   }
// }

// function* onUpdateDirectoryName({ payload: directoryName }) {
//   try {
//     const response = yield call(
//       putMethod,
//       url.UPDATE_DIRECTORYNAME + directoryName.id,
//       directoryName
//     )
//     yield put(updateDirectoryNameSuccess(response))
//   } catch (error) {
//     yield put(updateDirectoryNameFail(error.data))
//   }
// }

// function* onDeleteDirectoryName({ payload: directoryName }) {
//   try {
//     const response = yield call(
//       deleteMethod,
//       url.DELETE_DIRECTORYNAME + directoryName
//     )
//     if (response) {
//       yield put(deleteDirectoryNameSuccess(directoryName))
//     } else {
//       yield put(deleteDirectoryNameFail(false))
//     }
//   } catch (error) {
//     yield put(deleteDirectoryNameFail(error.data))
//   }
// }

function* watchWorkOrderInspection() {
  yield takeEvery(
    actionType.GET_WORKORDER_INSPECTIONS_VIEW,
    workOrderInspectionApi
  )
  // yield takeEvery(actionType.ADD_NEW_DIRECTORYNAME, onAddNewDirectoryName)
  // yield takeEvery(actionType.UPDATE_DIRECTORYNAME, onUpdateDirectoryName)
  // yield takeEvery(actionType.DELETE_DIRECTORYNAME, onDeleteDirectoryName)
}

function* workOrderInspectionsSaga() {
  yield all([fork(watchWorkOrderInspection)])
}

export default workOrderInspectionsSaga
