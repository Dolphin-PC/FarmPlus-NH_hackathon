import axios from "axios";
import shortid from "shortid";
import { FireStorage } from "../app/firebaseConfig";
import { serverUrl } from "../app/info";
import {
   ADD_POST,
   SET_POSTS,
   SET_POSTS_ERROR,
   SET_POSTS_LOADING,
   SET_POSTS_UPLOADING,
} from "./types";

export const addNewPost = (post, images, user) => async (dispatch) => {
   const id = shortid.generate(); // 게시글 id

   delete user.password;

   try {
      dispatch({
         type: SET_POSTS_UPLOADING,
      });

      const imageRef = FireStorage.ref(
         `${post.location}/${post.category}/images`
      ).child(post.title);

      await imageRef
         .put(images[0])
         .then(() => console.info("success upload image!"))
         .catch((err) => console.error(err));

      await imageRef.getDownloadURL().then((url) => {
         post.imageUrls.push(url);
      });

      await axios
         .post(`${serverUrl}/posts`, {
            id,
            ...post,
            cost: Number(post.cost),
            size: Number(post.size),
            seller: user,
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

      const res = await axios.get(`${serverUrl}/posts`);

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
