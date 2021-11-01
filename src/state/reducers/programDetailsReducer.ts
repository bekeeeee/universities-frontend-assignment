import { ProgramDetailsAction } from "../actions/programDetailsAction";
import { ActionTypeProgramDetails } from "../action-types/programDetailsTypes";
import { Program } from "../state-types/program";
// import { State, initialState } from "../stateType";
interface ProgramDetailsState {
  loading: boolean;
  error: string | null;
  data: Program | null;
}
const initialState = {
  loading: false,
  error: null,
  data: null,
};

const reducer = (
  state: ProgramDetailsState = initialState,
  action: ProgramDetailsAction
): ProgramDetailsState => {
  console.log("action.type", action.type);

  switch (action.type) {
    case ActionTypeProgramDetails.PROGRAM_DETAILS_REQUEST:
      console.log("PROGRAM_DETAILS_REQUEST");
      return { loading: true, error: null, data: null };
    case ActionTypeProgramDetails.PROGRAM_DETAILS_SUCCESS:
      return { loading: false, error: null, data: action.payload };

    case ActionTypeProgramDetails.PROGRAM_DETAILS_FAIL:
      return { loading: false, error: action.payload, data: null };

    case ActionTypeProgramDetails.PROGRAM_DETAILS_CLEAR:
      return { loading: false, error: null, data: null };

    default:
      return state;
  }
};

export default reducer;
