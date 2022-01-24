import { all, call, put, takeEvery, fork } from "redux-saga/effects"

// Ecommerce Redux States
import * as actionType from "./actionTypes"
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

import {
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
} from "../../helpers/backend_helper"
import * as url from "../../helpers/url_helper"

function* fetchDirectoryNames() {
  try {
    const response = yield call(getDirectoryNames)
    yield put(getDirectoryNamesSuccess(response))
  } catch (error) {
    yield put(getDirectoryNamesFail(error))
  }
}

function* fetchDirectoryNamesView({ payload: data }) {
  try {
    let response = yield call(postMethod, url.GET_DIRECTORYNAMES_VIEW, data)
    console.log("Saga success---> ", response)
    yield put(getDirectoryNamesViewSuccess(response))
  } catch (error) {
    console.log("Saga failed---> ", error.data)
    yield put(getDirectoryNamesViewFail(error.data))
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
  yield takeEvery(actionType.GET_DIRECTORYNAMES_VIEW, fetchDirectoryNamesView)
  // yield takeEvery(ADD_NEW_DIRECTORYNAME, onAddNewDirectoryName)
  // yield takeEvery(UPDATE_DIRECTORYNAME, onUpdateDirectoryName)
  // yield takeEvery(DELETE_DIRECTORYNAME, onDeleteDirectoryName)
}

function* directoryNameSaga() {
  yield all([fork(watchDirectoryNameSaga)])
}

export default directoryNameSaga
