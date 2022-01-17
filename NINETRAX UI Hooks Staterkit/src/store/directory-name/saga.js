import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import {
  GET_DIRECTORYNAMES,
  ADD_NEW_DIRECTORYNAME,
  DELETE_DIRECTORYNAME,
  UPDATE_DIRECTORYNAME,
} from "./actionTypes"
import {
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
  getDirectoryNames,
  addNewDirectoryName,
  updateDirectoryName,
  deleteDirectoryName,
} from "helpers/api_services"

function* fetchDirectoryNames() {
  try {
    const response = yield call(getDirectoryNames)
    yield put(getDirectoryNamesSuccess(response))
  } catch (error) {
    yield put(getDirectoryNamesFail(error))
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

function* directoryNameSaga() {
  yield takeEvery(GET_DIRECTORYNAMES, fetchDirectoryNames)
  yield takeEvery(ADD_NEW_DIRECTORYNAME, onAddNewDirectoryName)
  yield takeEvery(UPDATE_DIRECTORYNAME, onUpdateDirectoryName)
  yield takeEvery(DELETE_DIRECTORYNAME, onDeleteDirectoryName)
}

export default directoryNameSaga
