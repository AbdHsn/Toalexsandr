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

function* onAddNewDirectoryName({ payload: directoryName }) {
  try {
    const response = yield call(
      postMethod,
      url.ADD_NEW_DIRECTORYNAME,
      directoryName
    )
    yield put(addDirectoryNameSuccess(response))
  } catch (error) {
    yield put(addDirectoryNameFail(error.data))
  }
}

function* onUpdateDirectoryName({ payload: directoryName }) {
  try {
    const response = yield call(
      putMethod,
      url.UPDATE_DIRECTORYNAME + directoryName.id,
      directoryName
    )
    yield put(updateDirectoryNameSuccess(response))
  } catch (error) {
    yield put(updateDirectoryNameFail(error.data))
  }
}

function* onDeleteDirectoryName({ payload: directoryName }) {
  try {
    const response = yield call(
      deleteMethod,
      url.DELETE_DIRECTORYNAME + directoryName
    )
    if (response) {
      yield put(deleteDirectoryNameSuccess(directoryName))
    } else {
      yield put(deleteDirectoryNameFail(false))
    }
  } catch (error) {
    yield put(deleteDirectoryNameFail(error.data))
  }
}

function* watchDirectoryNameSaga() {
  yield takeEvery(actionType.GET_DIRECTORYNAMES_VIEW, fetchDirectoryNamesView)
  yield takeEvery(actionType.ADD_NEW_DIRECTORYNAME, onAddNewDirectoryName)
  yield takeEvery(actionType.UPDATE_DIRECTORYNAME, onUpdateDirectoryName)
  yield takeEvery(actionType.DELETE_DIRECTORYNAME, onDeleteDirectoryName)
}

function* directoryNameSaga() {
  yield all([fork(watchDirectoryNameSaga)])
}

export default directoryNameSaga
