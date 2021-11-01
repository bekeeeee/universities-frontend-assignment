import { Dispatch } from "redux";
import axios from "axios";
import { RootState } from "..";

import { ProgramsAction } from "../actions/programsAction";
import { ActionTypePrograms } from "../action-types/programsActionTypes";
import { Program } from "../state-types/program";

export const deleteProgramItem = (itemId: string) => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<ProgramsAction>) => {
    try {
      const { data } = await instance.delete(`/api/v1/program/${itemId}`);

      dispatch({
        type: ActionTypePrograms.PROGRAM_DELTE_ITEM,
        payload: data.data.id,
      });
    } catch (err: any) {
      console.log("err delete", err);
      dispatch({
        type: ActionTypePrograms.PROGRAM_DELTE_ITEM_FAIL,
        payload: err.message!,
      });
    }
  };
};

export const updateProgram = (
  programId: string,
  updatedValues: Partial<Program>
) => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<ProgramsAction>) => {
    try {
      const { data } = await instance.patch(`/api/v1/program/${programId}`, {
        ...updatedValues,
      });
      console.log("update program response", data);
      data.data.id = programId;

      dispatch({
        type: ActionTypePrograms.PROGRAM_UPDATE_ITEM,
        payload: data.data! as Program,
      });
    } catch (err: any) {
      console.log("errrrrrrrrrrr", err.response.data.error);
      dispatch({
        type: ActionTypePrograms.PROGRAM_UPDATE_ITEM_FAIL,
        payload: err.response.data.error,
      });
    }
  };
};

export const createProgram = (body: Partial<Program>) => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<ProgramsAction>) => {
    console.log("create program variables", body);

    try {
      const { data } = await instance.post(`/api/v1/program`, {
        ...body,
      });
      console.log("create program response", data);

      dispatch({
        type: ActionTypePrograms.PROGRAM_CREATE_ITEM,
        payload: data.data! as Program,
      });
    } catch (err: any) {
      console.log("errrrrrrrrrrr", err);
      dispatch({
        type: ActionTypePrograms.PROGRAM_CREATE_ITEM_FAIL,
        payload: err.message,
      });
    }
  };
};

export const searchedProgrames = (university: string) => {
  return async (
    dispatch: Dispatch<ProgramsAction>,
    getState: () => RootState
  ) => {
    console.log("searched university", university);
    console.log("all programs", getState().programList.data!);
    try {
      if (!university)
        dispatch({
          type: ActionTypePrograms.PROGRAM_SEARCHED_LIST,
          payload: await getState().programList.data!,
        });
      const data = await getState().programList.data.filter((program) =>
        program.school.includes(university)
      );
      if (data)
        dispatch({
          type: ActionTypePrograms.PROGRAM_SEARCHED_LIST,
          payload: data,
        });
      else
        dispatch({
          type: ActionTypePrograms.PROGRAM_CREATE_ITEM_FAIL,
          payload: "Not Found",
        });
    } catch (err: any) {
      console.log("errrrrrrrrrrr", err);
      dispatch({
        type: ActionTypePrograms.PROGRAM_CREATE_ITEM_FAIL,
        payload: err.message,
      });
    }
  };
};
