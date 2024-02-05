import { combineReducers } from "redux";
import user from "./userReducer";
import filter from "./filterReducer";
import post from "./postReducer";
import nav from "./navReducer";
import contract from "./contractReducer";

export const rootReducer = combineReducers({
  user,
  filter,
  post,
  nav,
  contract,
});

export type RootStateType = ReturnType<typeof rootReducer>;
