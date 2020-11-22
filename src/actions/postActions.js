import axios from "axios";
import { SET_POSTS, SET_POSTS_ERROR, SET_POSTS_LOADING } from "./types";

const url = "http://localhost:5000";

export const addNewProduct = () => {};

export const getPosts = () => async (dispatch) => {
   try {
      dispatch({
         type: SET_POSTS_LOADING,
      });

      const res = await axios.get(`${url}/posts`);

      dispatch({
         type: SET_POSTS,
         payload: res.data,
      });
   } catch (err) {
      console.error(err);
      dispatch({
         type: SET_POSTS_ERROR,
         payload: err,
      });
   }
};
export const setLoading = () => async (dispatch) => {};
