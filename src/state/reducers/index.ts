import { combineReducers } from "redux";

import programReducer from "./programReducer";
import programDetailsReducer from "./programDetailsReducer";
import programSearchedReducer from "./programSearchedReducer";

const reducers = combineReducers({
  programList: programReducer,
  programDetails: programDetailsReducer,
  searchedPrograms: programSearchedReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
