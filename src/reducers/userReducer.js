// import {} from '../actions/types'

import { CLEAR_USER, SET_USER } from "../actions/types";

const initialState = {
   user: null,
};

export default function userReducer(state = initialState, action) {
   switch (action.type) {
      case SET_USER:
         return {
            user: action.payload,
         };
      case CLEAR_USER:
         return {
            user: null,
         };
      default:
         return state;
   }
}
