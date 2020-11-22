import axios from "axios";
import {
   ADD_POST,
   SET_POSTS,
   SET_POSTS_ERROR,
   SET_POSTS_LOADING,
   SET_POSTS_UPLOADING,
} from "./types";

const url = "http://localhost:5000";

export const addNewPost = (post) => async (dispatch) => {
   try {
      dispatch({
         type: SET_POSTS_UPLOADING,
      });

      await axios
         .post(`${url}/posts`, {
            ...post,
         })
         .then((res) => {
            dispatch({
               type: ADD_POST,
               payload: res.data,
            });
         });
   } catch (err) {
      console.error(err);
      dispatch({
         type: SET_POSTS_ERROR,
         payload: err,
      });
   }
};

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
