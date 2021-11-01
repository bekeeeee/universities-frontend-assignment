import { Dispatch } from "redux";
import axios from "axios";
import { RootState } from "..";

import { ProgramsAction } from "../actions/programsAction";
import { ActionTypePrograms } from "../action-types/programsActionTypes";
import { Program } from "../state-types/program";
import { ProgramDetailsAction } from "../actions/programDetailsAction";
import { ActionTypeProgramDetails } from "../action-types/programDetailsTypes";

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
      dispatch({
        type: ActionTypePrograms.PROGRAM_DELTE_ITEM_FAIL,
        payload: err.message!,
      });
    }
  };
};

export const setProgramDetails = (programId: string) => {
  return async (
    dispatch: Dispatch<ProgramDetailsAction>,
    getState: () => RootState
  ) => {
    dispatch({
      type: ActionTypeProgramDetails.PROGRAM_DETAILS_REQUEST,
    });

    try {
      const data = await getState().programList.data.find(
        (program: Program) => program.id === programId
      );
      dispatch({
        type: ActionTypeProgramDetails.PROGRAM_DETAILS_SUCCESS,
        payload: data!,
      });
    } catch (err: any) {
      dispatch({
        type: ActionTypeProgramDetails.PROGRAM_DETAILS_FAIL,
        payload: err.message,
      });
    }
  };
};

export const clearProgramDetail = () => {
  return async (dispatch: Dispatch<ProgramDetailsAction>) => {
    try {
      dispatch({
        type: ActionTypeProgramDetails.PROGRAM_DETAILS_CLEAR,
        payload: null,
      });
    } catch (err: any) {
      dispatch({
        type: ActionTypeProgramDetails.PROGRAM_DETAILS_FAIL,
        payload: err.message,
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
      data.data.id = programId;

      dispatch({
        type: ActionTypePrograms.PROGRAM_UPDATE_ITEM,
        payload: data.data! as Program,
      });
    } catch (err: any) {
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
    try {
      const { data } = await instance.post(`/api/v1/program`, {
        ...body,
      });

      dispatch({
        type: ActionTypePrograms.PROGRAM_CREATE_ITEM,
        payload: data.data! as Program,
      });
    } catch (err: any) {
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
      dispatch({
        type: ActionTypePrograms.PROGRAM_CREATE_ITEM_FAIL,
        payload: err.message,
      });
    }
  };
};

export const listPrograms = () => {
  const instance = axios.create({
    withCredentials: true,
  });
  return async (dispatch: Dispatch<ProgramsAction>) => {
    dispatch({
      type: ActionTypePrograms.PROGRAM_LIST_REQUEST,
    });

    try {
      const { data } = await instance.get("/api/v1/program");
      dispatch({
        type: ActionTypePrograms.PROGRAM_LIST_SUCCESS,
        payload: data.data,
      });
    } catch (err: any) {
      dispatch({
        type: ActionTypePrograms.PROGRAM_LIST_FAIL,
        payload: err.message,
      });
    }
  };
};
