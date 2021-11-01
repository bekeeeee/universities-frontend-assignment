import { combineReducers } from "redux";

import programReducer from "./programReducer";
const reducers = combineReducers({
  programList: programReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
