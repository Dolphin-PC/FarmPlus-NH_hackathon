import { combineReducers } from "redux";
import user from "./userReducer";
import filter from "./filterReducer";

export default combineReducers({
   user,
   filter,
});
