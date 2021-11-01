import { ActionTypePrograms } from "../action-types/programsActionTypes";
import { Program } from "../state-types/program";

interface ProgramListRequestAction {
  type: ActionTypePrograms.PROGRAM_LIST_REQUEST;
}
interface ProgramListSuccessAction {
  type: ActionTypePrograms.PROGRAM_LIST_SUCCESS;
  payload: Program[];
}
interface ProgramListFailAction {
  type: ActionTypePrograms.PROGRAM_LIST_FAIL;
  payload: string;
}

interface ProgramDeleteItem {
  type: ActionTypePrograms.PROGRAM_DELTE_ITEM;
  payload: string;
}

interface ProgramDeleteItemFail {
  type: ActionTypePrograms.PROGRAM_DELTE_ITEM_FAIL;
  payload: string;
}

interface ProgramUpdateItem {
  type: ActionTypePrograms.PROGRAM_UPDATE_ITEM;
  payload: Program;
}

interface ProgramUpdateItemFail {
  type: ActionTypePrograms.PROGRAM_UPDATE_ITEM_FAIL;
  payload: string;
}

interface ProgramCreateItem {
  type: ActionTypePrograms.PROGRAM_CREATE_ITEM;
  payload: Program;
}

interface ProgramCreateItemFail {
  type: ActionTypePrograms.PROGRAM_CREATE_ITEM_FAIL;
  payload: string;
}

interface ProgramsSearchedList {
  type: ActionTypePrograms.PROGRAM_SEARCHED_LIST;
  payload: Program[];
}

interface ProgramsSearchedListFail {
  type: ActionTypePrograms.PROGRAM_SEARCHED_LIST_FAIL;
  payload: string;
}

export type ProgramsAction =
  | ProgramListRequestAction
  | ProgramListSuccessAction
  | ProgramListFailAction
  | ProgramDeleteItem
  | ProgramDeleteItemFail
  | ProgramUpdateItem
  | ProgramUpdateItemFail
  | ProgramCreateItem
  | ProgramCreateItemFail
  | ProgramsSearchedList
  | ProgramsSearchedListFail;
