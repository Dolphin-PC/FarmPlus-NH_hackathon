import { ADD_POST, CLEAR_CURRENT, CLEAR_POSTS, SET_CURRENT, SET_POSTS, SET_POSTS_ERROR, SET_POSTS_LOADING, SET_POSTS_UPLOADING } from "../actions/types";
import { TypePost, TypeUser } from "../data/types";

export type TypeStatePost = {
  posts: TypePost[];
  current: TypePost & { seller: TypeUser };
  loading: boolean;
  uploading: boolean;
  error?: any;
};

const initialState: TypeStatePost = {
  posts: [],
  current: null,
  loading: false,
  uploading: false,
  error: null,
};

export default function post(state = initialState, action): TypeStatePost {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        uploading: false,
      };
    case SET_POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS_UPLOADING:
      return {
        ...state,
        uploading: true,
      };
    case SET_POSTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    default:
      return { ...state };
  }
}
