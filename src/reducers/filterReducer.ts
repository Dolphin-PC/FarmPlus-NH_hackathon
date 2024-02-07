import { CLEAR_FILTER, SET_CATEGORY, SET_FILTER } from "../actions/types";

const initialState = {
  location: "전체",
  category: "전체",
};

export default function filter(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return {
        location: action.payload.location,
        category: action.payload.category,
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case CLEAR_FILTER:
      return {
        location: "전체",
        category: "전체",
      };
    default:
      return { ...state };
  }
}
