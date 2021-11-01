import { ActionTypeProgramDetails } from "../action-types/programDetailsTypes";
import { Program } from "../state-types/program";

interface ProgramDetailsRequestAction {
  type: ActionTypeProgramDetails.PROGRAM_DETAILS_REQUEST;
}
interface ProgramDetailsSuccessAction {
  type: ActionTypeProgramDetails.PROGRAM_DETAILS_SUCCESS;
  payload: Program;
}
interface ProgramDetailsFailAction {
  type: ActionTypeProgramDetails.PROGRAM_DETAILS_FAIL;
  payload: string;
}
interface ProgramDetailsClearAction {
  type: ActionTypeProgramDetails.PROGRAM_DETAILS_CLEAR;
  payload: null;
}
export type ProgramDetailsAction =
  | ProgramDetailsRequestAction
  | ProgramDetailsSuccessAction
  | ProgramDetailsFailAction
  | ProgramDetailsClearAction;
