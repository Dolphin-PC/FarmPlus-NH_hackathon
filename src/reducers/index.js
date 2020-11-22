import { combineReducers } from "redux";
import user from "./userReducer";
import filter from "./filterReducer";
import post from "./postReducer";

export default combineReducers({
   user,
   filter,
   post,
});
