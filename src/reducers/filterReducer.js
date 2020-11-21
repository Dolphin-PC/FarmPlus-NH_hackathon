import { CLEAR_FILTER, SET_CATEGORY, SET_LOCATION } from "../actions/types";

const initialState = {
   location: "전체",
   category: "전체",
};

export default function filter(state = initialState, action) {
   switch (action.type) {
      case SET_LOCATION:
         return {
            ...state,
            location: action.payload,
         };
      case SET_CATEGORY:
         return {
            ...state,
            category: action.payload,
         };
      case CLEAR_FILTER:
         return {
            location: "",
            category: "",
         };
      default:
         return { state };
   }
}
