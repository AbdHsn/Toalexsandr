import { all, call, put, takeEvery, fork } from "redux-saga/effects"

// Ecommerce Redux States
import {
  GET_DIRECTORYNAMES_VIEW,
  GET_DIRECTORYNAMES,
  ADD_NEW_DIRECTORYNAME,
  DELETE_DIRECTORYNAME,
  UPDATE_DIRECTORYNAME,
} from "./actionTypes"
import {
  getDirectoryNamesViewSuccess,
  getDirectoryNamesViewFail,
  getDirectoryNamesFail,
  getDirectoryNamesSuccess,
  addDirectoryNameFail,
  addDirectoryNameSuccess,
  updateDirectoryNameSuccess,
  updateDirectoryNameFail,
  deleteDirectoryNameSuccess,
  deleteDirectoryNameFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getDirectoryNamesView,
  getDirectoryNames,
  addNewDirectoryName,
  updateDirectoryName,
  deleteDirectoryName,
} from "../../helpers/backend_helper"
import { delay } from "lodash"

function* fetchDirectoryNames() {
  try {
    const response = yield call(getDirectoryNames)
    yield put(getDirectoryNamesSuccess(response))
  } catch (error) {
    yield put(getDirectoryNamesFail(error))
  }
}

function* fetchDirectoryNamesView({ payload: directoryName }) {
  try {
    const response = yield call(getDirectoryNamesView, directoryName)
    console.log("Saga ---> ", directoryName)
    // yield delay(3000)
    console.log("Saga after---> ", response)
    yield put(getDirectoryNamesViewSuccess(response))
  } catch (error) {
    console.log("Saga after failed---> ", error)
    yield put(getDirectoryNamesViewFail(error))
  }
}

function* onUpdateDirectoryName({ payload: directoryName }) {
  try {
    const response = yield call(updateDirectoryName, directoryName)
    yield put(updateDirectoryNameSuccess(response))
  } catch (error) {
    yield put(updateDirectoryNameFail(error))
  }
}

function* onDeleteDirectoryName({ payload: directoryName }) {
  try {
    const response = yield call(deleteDirectoryName, directoryName)
    yield put(deleteDirectoryNameSuccess(response))
  } catch (error) {
    yield put(deleteDirectoryNameFail(error))
  }
}

function* onAddNewDirectoryName({ payload: directoryName }) {
  try {
    const response = yield call(addNewDirectoryName, directoryName)

    yield put(addDirectoryNameSuccess(response))
  } catch (error) {
    yield put(addDirectoryNameFail(error))
  }
}

function* watchDirectoryNameSaga() {
  //yield takeEvery(GET_DIRECTORYNAMES, fetchDirectoryNames)
  yield takeEvery(GET_DIRECTORYNAMES_VIEW, fetchDirectoryNamesView)
  // yield takeEvery(ADD_NEW_DIRECTORYNAME, onAddNewDirectoryName)
  // yield takeEvery(UPDATE_DIRECTORYNAME, onUpdateDirectoryName)
  // yield takeEvery(DELETE_DIRECTORYNAME, onDeleteDirectoryName)
}

// export function* watchFetchDemoData() {
//   yield takeEvery(GET_DEMO_DATA, fetchDemoData)
// }

function* directoryNameSaga() {
  yield all([fork(watchDirectoryNameSaga)])
}

export default directoryNameSaga
