import { all, call, put, takeEvery, fork } from "redux-saga/effects"

// Ecommerce Redux States
import * as actionType from "./actionTypes"
import { addImportFromMaximoSuccess, addImportFromMaximoFail } from "./actions"

import { postMethod } from "../../helpers/backend_helper"
import * as url from "../../helpers/url_helper"

function* onImportFromMaximo({ payload: obj }) {
  try {
    const response = yield call(postMethod, url.IMPORT_FROM_MAXIMO_URL, obj)
    yield put(addImportFromMaximoSuccess(response))
  } catch (error) {
    yield put(addImportFromMaximoFail(error.data))
  }
}

function* watchImportFromMaximoSaga() {
  yield takeEvery(actionType.ADD_NEW_IMPORT_FROM_MAXIMO, onImportFromMaximo)
}

function* importFromMaximoSaga() {
  yield all([fork(watchImportFromMaximoSaga)])
}

export default importFromMaximoSaga
