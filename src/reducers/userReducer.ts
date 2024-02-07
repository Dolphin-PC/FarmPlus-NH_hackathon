// import {} from '../actions/types'

import { ADD_FAVORITE, CLEAR_USER, SET_FAVORITE, SET_USER, GET_USER } from "../actions/types";
import { TypeUser } from "../data/types";

const initialState: TypeUser = JSON.parse(localStorage.getItem("user"));

export default function userReducer(state = initialState, action): TypeUser {
  switch (action.type) {
    case SET_USER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    case GET_USER:
      return state;
    case CLEAR_USER:
      return null;
    case ADD_FAVORITE:
      return {
        ...state,
        [state.favorite]: [...state.favorite, action.payload],
      };
    case SET_FAVORITE:
      return {
        ...state,
        [state.favorite]: action.payload,
      };
    default:
      return state;
  }
}
