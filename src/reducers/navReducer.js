import { SET_NAV } from "../actions/types";

const initialState = {
   location: window.location.href.split("/")[3],
};

export default function nav(state = initialState, action) {
   switch (action.type) {
      case SET_NAV:
         return {
            ...state,
            location: action.payload,
         };
      default:
         return {
            ...state,
         };
   }
}
