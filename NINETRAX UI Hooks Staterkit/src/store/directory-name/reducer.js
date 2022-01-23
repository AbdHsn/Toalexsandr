import {
  GET_DIRECTORYNAMES_VIEW_SUCCESS,
  GET_DIRECTORYNAMES_VIEW_FAIL,
  GET_DIRECTORYNAMES_SUCCESS,
  GET_DIRECTORYNAMES_FAIL,
  ADD_DIRECTORYNAME_SUCCESS,
  ADD_DIRECTORYNAME_FAIL,
  UPDATE_DIRECTORYNAME_SUCCESS,
  UPDATE_DIRECTORYNAME_FAIL,
  DELETE_DIRECTORYNAME_SUCCESS,
  DELETE_DIRECTORYNAME_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  // modelLstLoading: false,
  // directoryNamesModelLst: [],
  // directoryNameModel: {
  //   id: 0,
  //   personName: "",
  //   personTitle: "",
  //   baseOfOperation: "",
  // },

  // rowSizeDdl: ["10", "30", "50", "100", "All"],
  // start: 0,
  // length: "10",
  // totalRecords: 0,
  // columns: [],
  // searches: [],
  // orders: [
  //   {
  //     column: "Id",
  //     order_by: "DESC",
  //   },
  // ],

  searchById: undefined,
  searchByPersonName: undefined,
  searchByPersonTitle: undefined,
  searchByBaseOfOperation: undefined,

  directoryNames: [],
  directoryNamesTbl: {},
  directoryName: {},
  error: undefined,
}

const directoryNameReducer = (state = INIT_STATE, action) => {
  console.log("reducer run", action.type, state.directoryNamesTbl)

  switch (action.type) {
    case GET_DIRECTORYNAMES_VIEW_SUCCESS:
      return {
        ...state,
        directoryNamesTbl: action.payload,
      }

    case GET_DIRECTORYNAMES_VIEW_FAIL:
      return {
        ...state,
        error: "Failed to fetch DIRECTORYNAMES VIEW Data",
      }

    case GET_DIRECTORYNAMES_SUCCESS:
      return {
        ...state,
        directoryNames: action.payload,
      }

    case GET_DIRECTORYNAMES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_DIRECTORYNAME_SUCCESS:
      return {
        ...state,
        directoryNames: [...state.directoryNames, action.payload],
      }

    case ADD_DIRECTORYNAME_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_DIRECTORYNAME_SUCCESS:
      return {
        ...state,
        directoryNames: state.directoryNames.map(directoryName =>
          directoryName.id.toString() === action.payload.id.toString()
            ? { directoryName, ...action.payload }
            : directoryName
        ),
      }

    case UPDATE_DIRECTORYNAME_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_DIRECTORYNAME_SUCCESS:
      return {
        ...state,
        directoryNames: state.directoryNames.filter(
          directoryName =>
            directoryName.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_DIRECTORYNAME_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default directoryNameReducer
