// import {} from '../actions/types'

import { ADD_FAVORITE, CLEAR_USER, SET_FAVORITE, SET_USER, GET_USER } from "../actions/types";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        [state.user.favorite]: [...state.user.favorite, action.payload],
      };
    case SET_FAVORITE:
      return {
        ...state,
        [state.user.favorite]: action.payload,
      };
    default:
      return state;
  }
}
