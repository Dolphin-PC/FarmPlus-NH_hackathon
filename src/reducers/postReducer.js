import {
   SET_POSTS,
   SET_POSTS_ERROR,
   SET_POSTS_LOADING,
} from "../actions/types";

const initialState = {
   posts: [],
   loading: false,
   error: null,
};

export default function post(state = initialState, action) {
   switch (action.type) {
      case SET_POSTS:
         return {
            posts: action.payload,
            loading: false,
         };
      case SET_POSTS_LOADING:
         return {
            ...state,
            loading: true,
         };
      case SET_POSTS_ERROR:
         return {
            ...state,
            error: action.payload,
            loading:false
         };
      default:
         return { ...state };
   }
}
