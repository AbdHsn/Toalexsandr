import * as actionType from "./actionTypes"

const INIT_STATE = {
  isImporting: false,
  message: "",
  error: undefined,
}

const importFromMaximoReducer = (state = INIT_STATE, action) => {
  console.log("importFromMaximoReducer run", action.type, state)

  switch (action.type) {
    case actionType.IMPORT_FROM_MAXIMO:
      return {
        ...state,
        isImporting: true,
      }
    case actionType.IMPORT_FROM_MAXIMO_SUCCESS:
      return {
        ...state,
        message: "Import from Maximo succeded",
        isImporting: false,
      }

    case actionType.IMPORT_FROM_MAXIMO_FAIL:
      return {
        ...state,
        error: action.payload,
        isImporting: false,
        message: "Failed to import from Maximo",
      }
    default:
      return state
  }
}

export default importFromMaximoReducer
