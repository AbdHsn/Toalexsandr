import * as actionType from "./actionTypes"

const INIT_STATE = {
  rowSizeDdl: ["10", "30", "50", "100", "All"],
  workOrderInspectionTbl: {},
  directoryName: {},
  isFetching: false,
  isSaving: false,
  isDeleting: false,
  message: "",
  error: undefined,
}

const workOrderInspectionsReducer = (state = INIT_STATE, action) => {
  console.log("reducer run", action.type, state)

  switch (action.type) {
    case actionType.GET_WORKORDER_INSPECTIONS_VIEW:
      return {
        ...state,
        isFetching: true,
      }
    case actionType.GET_WORKORDER_INSPECTIONS_VIEW_SUCCESS:
      return {
        ...state,
        workOrderInspectionTbl: action.payload,
        isFetching: false,
      }

    case actionType.GET_WORKORDER_INSPECTIONS_VIEW_FAIL:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        message: "Failed to fetch WO-inspections",
      }

    // case actionType.GET_DIRECTORYNAMES_SUCCESS:
    //   return {
    //     ...state,
    //     directoryNames: action.payload,
    //   }

    // case actionType.GET_DIRECTORYNAMES_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   }

    // case actionType.ADD_NEW_DIRECTORYNAME:
    //   return {
    //     ...state,
    //     isSaving: true,
    //   }
    // case actionType.ADD_DIRECTORYNAME_SUCCESS:
    //   return {
    //     ...state,
    //     directoryNamesTbl: {
    //       ...state.directoryNamesTbl,
    //       data: [action.payload, ...state.directoryNamesTbl.data],
    //     },
    //     isSaving: false,
    //   }

    // case actionType.ADD_DIRECTORYNAME_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //     isSaving: false,
    //     message: "Failed to save directory name",
    //   }

    // case actionType.UPDATE_DIRECTORYNAME_SUCCESS:
    //   return {
    //     ...state,
    //     directoryNamesTbl: {
    //       ...state.directoryNamesTbl,
    //       data: state.directoryNamesTbl.data.map(directoryName =>
    //         directoryName.id.toString() === action.payload.id.toString()
    //           ? { directoryName, ...action.payload }
    //           : directoryName
    //       ),
    //     },
    //   }

    // case actionType.UPDATE_DIRECTORYNAME_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   }

    // case actionType.DELETE_DIRECTORYNAME_SUCCESS:
    //   return {
    //     ...state,
    //     directoryNamesTbl: {
    //       ...state.directoryNamesTbl,
    //       data: state.directoryNamesTbl.data.filter(
    //         f => f.id.toString() !== action.payload.toString()
    //       ),
    //     },
    //   }

    // case actionType.DELETE_DIRECTORYNAME_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   }
    default:
      return state
  }
}

export default workOrderInspectionsReducer
