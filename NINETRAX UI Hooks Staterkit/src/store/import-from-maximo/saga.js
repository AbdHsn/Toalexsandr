import { all, call, put, takeEvery, fork } from "redux-saga/effects"
import * as actionType from "./actionTypes"
import * as action from "./actions"
import { postMethod } from "../../helpers/backend_helper"

function* importFromMaximoApi({ payload: obj }) {
  console.log("importFromMaximoApi run", obj)
  try {
    const response = yield call(
      postMethod,
      "/d/ATbNasinspectionsImports/ImportFromMaximo",
      obj
    )
    yield put(action.importFromMaximoSuccess(response))
  } catch (error) {
    yield put(action.importFromMaximoFail(error.data))
  }
}

function* watchImportFromMaximo() {
  yield takeEvery(actionType.IMPORT_FROM_MAXIMO, importFromMaximoApi)
}

function* importFromMaximoSaga() {
  yield all([fork(watchImportFromMaximo)])
}

export default importFromMaximoSaga
