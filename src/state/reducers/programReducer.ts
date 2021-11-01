import { Program } from "../state-types/program";
import { ActionTypePrograms } from "../action-types/programsActionTypes";
import { ProgramsAction } from "../actions/programsAction";
// import { State, defaultState } from "../stateType";
interface ProgramState {
  loading: boolean;
  error: string | null;
  data: Program[];
}
const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (
  state: ProgramState = initialState,
  action: ProgramsAction
): ProgramState => {
  switch (action.type) {
    case ActionTypePrograms.PROGRAM_LIST_REQUEST: {
      return { loading: true, error: null, data: [] };
    }
    
    case ActionTypePrograms.PROGRAM_LIST_SUCCESS: {
      return { loading: false, error: null, data: action.payload };
    }

    case ActionTypePrograms.PROGRAM_LIST_FAIL: {
      return { loading: false, error: action.payload, data: [] };
    }

    case ActionTypePrograms.PROGRAM_DELTE_ITEM: {
      return {
        ...state,
        data: state.data.filter((x) => x.id !== action.payload),
      };
    }

    case ActionTypePrograms.PROGRAM_UPDATE_ITEM: {
      console.log("PROGRAM_UPDATE_ITEM");
      console.log("id updated", action.payload.id);

      return {
        ...state,
        data: state.data.map((program) =>
          program.id === action.payload.id ? action.payload : program
        ),
      };
    }

    case ActionTypePrograms.PROGRAM_UPDATE_ITEM_FAIL: {
      console.log("PROGRAM_CREATE_FAIL");

      return { loading: false, error: action.payload, data: [] };
    }

    case ActionTypePrograms.PROGRAM_CREATE_ITEM: {
      state.data.unshift(action.payload);

      return {
        ...state,
      };
    }

    case ActionTypePrograms.PROGRAM_CREATE_ITEM_FAIL: {
      console.log("PROGRAM_CREATE_ITEM_FAIL");

      return { loading: false, error: action.payload, data: [] };
    }

    default:
      return state;
  }
};

export default reducer;
