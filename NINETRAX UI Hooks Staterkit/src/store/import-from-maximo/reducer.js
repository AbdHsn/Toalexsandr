import * as actionType from "./actionTypes"

const INIT_STATE = {
  isProcessing: false,
  message: "",
  error: undefined,
}

const importFromMaximoReducer = (state = INIT_STATE, action) => {
  console.log("importFromMaximoReducer run", action.type, state)

  switch (action.type) {
    case actionType.ADD_NEW_IMPORT_FROM_MAXIMO:
      return {
        ...state,
        isProcessing: true,
      }
    case actionType.ADD_IMPORT_FROM_MAXIMO_SUCCESS:
      return {
        ...state,
        message: "Import from Maximo succeded",
        isProcessing: false,
      }

    case actionType.ADD_IMPORT_FROM_MAXIMO_FAIL:
      return {
        ...state,
        error: action.payload,
        isProcessing: false,
        message: "Failed to import from Maximo",
      }
    default:
      return state
  }
}

export default importFromMaximoReducer
