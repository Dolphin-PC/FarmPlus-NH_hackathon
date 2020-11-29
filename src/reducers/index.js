import { combineReducers } from "redux";
import user from "./userReducer";
import filter from "./filterReducer";
import post from "./postReducer";
import nav from "./navReducer";

export default combineReducers({
   user,
   filter,
   post,
   nav,
});
