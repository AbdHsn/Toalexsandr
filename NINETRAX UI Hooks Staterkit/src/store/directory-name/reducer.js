import {
  GET_DIRECTORYNAMES_FAIL,
  GET_DIRECTORYNAMES_SUCCESS,
  ADD_DIRECTORYNAME_SUCCESS,
  ADD_DIRECTORYNAME_FAIL,
  UPDATE_DIRECTORYNAME_SUCCESS,
  UPDATE_DIRECTORYNAME_FAIL,
  DELETE_DIRECTORYNAME_SUCCESS,
  DELETE_DIRECTORYNAME_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  // products: [],
  // product: {},
  // orders: [],
  // cartData: {},
  // directoryNames: [],
  // shops: [],
  // productComments: [],

  directoryNames: [],
  directoryName: {},
  error: {},
}

const DirectoryName = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DIRECTORYNAMES_SUCCESS:
      console.log("reducer -->", action.payload, state)
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

export default DirectoryName
