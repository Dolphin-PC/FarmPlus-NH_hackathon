import axios from "axios";
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
  delete user.password;
  console.info(user);
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
        ...post,
        cost: Number(post.cost),
        size: Number(post.size),
        ...user,
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
