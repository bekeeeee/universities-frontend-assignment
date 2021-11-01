import { Program } from "../state-types/program";
import { ActionTypePrograms } from "../action-types/programsActionTypes";
import { ProgramsAction } from "../actions/programsAction";
// import { State, defaultState } from "../stateType";
interface SearchedProgramsState {
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
  state: SearchedProgramsState = initialState,
  action: ProgramsAction
): SearchedProgramsState => {
  console.log("type list", action.type);
  switch (action.type) {
  

    case ActionTypePrograms.PROGRAM_SEARCHED_LIST: {
      console.log("PROGRAM_SEARCHED_LIST", action.payload);

      return { loading: false, error: null, data: action.payload };
    }

    case ActionTypePrograms.PROGRAM_SEARCHED_LIST_FAIL: {
      console.log("PROGRAM_SEARCHED_LIST_FAIL");

      return { loading: false, error: action.payload, data: [] };
    }
    default:
      return state;
  }
};

export default reducer;
